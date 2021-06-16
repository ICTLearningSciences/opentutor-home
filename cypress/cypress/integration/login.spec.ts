/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import {
  cySetup,
  MockGraphQLQuery,
  mockGQL,
  cyMockDefault,
} from "../support/functions";

function cyMockLessons(): MockGraphQLQuery {
  return mockGQL("lessons", {
    edges: [
      {
        node: {
          lessonId: "lesson1",
          name: "lesson 1",
        },
      },
      {
        node: {
          lessonId: "lesson2",
          name: "lesson 2",
        },
      },
    ],
  });
}

describe("Login", () => {
  it("shows login button if no accessToken", () => {
    cySetup(cy);
    cyMockDefault(cy, { noAccessToken: true, gqlQueries: [cyMockLessons()] });
    cy.visit("/");
    cy.get("[data-cy=login]").should("exist");
  });

  it("login disabled if missing config", () => {
    cySetup(cy);
    cyMockDefault(cy, {
      noAccessToken: true,
      noConfig: true,
      gqlQueries: [cyMockLessons()],
    });
    cy.visit("/");
    cy.get("[data-cy=login]").should("be.disabled");
  });

  it("shows logout button if logged in", () => {
    cySetup(cy);
    cyMockDefault(cy, { gqlQueries: [cyMockLessons()] });
    cy.visit("/");
    cy.get("[data-cy=logout]").should("not.be.disabled");
    cy.get("[data-cy=logout]").contains("Kayla");
  });

  it("logs out", () => {
    cySetup(cy);
    cyMockDefault(cy, { gqlQueries: [cyMockLessons()] });
    cy.visit("/");
    cy.get("[data-cy=login]").should("not.exist");
    cy.get("[data-cy=logout]").trigger("mouseover").click();
    cy.get("[data-cy=login]").should("exist");
    cy.get("[data-cy=logout]").should("not.exist");
  });
});
