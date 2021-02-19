/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
export function cySetup(cy) {
  cy.server();
  cy.viewport(1280, 720);
}

export interface MockGraphQLQuery {
  (req: any, grapqlBody: any): void;
}

export interface MockGraphQLArgs {
  mocks: MockGraphQLQuery[];
  alias?: string;
}

export function cyMockByQueryName(query: string, data: any, me = false): MockGraphQLQuery {
  return (req: any, grapqlBody: any) => {
    const q = grapqlBody.query.replace(/\s+/g, " ").replace("\n", "").trim();
    if (q.indexOf(`{ ${query}`) !== -1) {
      req.reply({
        body: {
          data: data,
          errors: null,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      req.alias = query;
    }
  };
}

export function cyMockGraphQL(cy, args: MockGraphQLArgs): void {
  const r = cy.route2(
    {
      method: "POST",
      url: "**/graphql",
    },
    (req) => {
      const g = JSON.parse(req.body);
      for (const m of args.mocks) {
        m(req, g);
      }
    }
  );
  if (args.alias) {
    r.as(args.alias);
  }
}

export function cyLogin(cy): MockGraphQLQuery {
  cy.route("**/config", { GOOGLE_CLIENT_ID: "test", API_SECRET: "test" });
  cy.setCookie("accessToken", "accessToken");
  return cyMockByQueryName("login", {
    login: {
      user: {
        id: "kayla",
        name: "Kayla",
        email: "kayla@opentutor.com",
      },
      accessToken: 'test'
    }
  });
}