interface StaticResponse {
  /**
   * Serve a fixture as the response body.
   */
  fixture?: string;
  /**
   * Serve a static string/JSON object as the response body.
   */
  body?: string | object | object[];
  /**
   * HTTP headers to accompany the response.
   * @default {}
   */
  headers?: { [key: string]: string };
  /**
   * The HTTP status code to send.
   * @default 200
   */
  statusCode?: number;
  /**
   * If 'forceNetworkError' is truthy, Cypress will destroy the browser connection
   * and send no response. Useful for simulating a server that is not reachable.
   * Must not be set in combination with other options.
   */
  forceNetworkError?: boolean;
  /**
   * Milliseconds to delay before the response is sent.
   */
  delayMs?: number;
  /**
   * Kilobits per second to send 'body'.
   */
  throttleKbps?: number;
}

export interface MockGraphQLQuery {
  query: string;
  data: any;
}

function staticResponse(s: StaticResponse): StaticResponse {
  return {
    ...{
      headers: {
        "access-control-allow-origin": window.location.origin,
        "Access-Control-Allow-Credentials": "true",
      },
      ...s,
    },
  };
}

export function cySetup(cy) {
  cy.viewport(1280, 720);
}

export interface MockGraphQLArgs {
  mocks: MockGraphQLQuery[];
  alias?: string;
}

export function cyInterceptGraphQL(cy, mocks: MockGraphQLQuery[]): void {
  const queryCalls: any = {};
  for (const mock of mocks) {
    queryCalls[mock.query] = 0;
  }
  cy.intercept("**/graphql", (req) => {
    const { body } = req;
    const queryBody = body.query.replace(/\s+/g, " ").replace("\n", "").trim();
    let handled = false;
    for (const mock of mocks) {
      if (
        queryBody.indexOf(`{ ${mock.query}(`) !== -1 ||
        queryBody.indexOf(`{ ${mock.query} {`) !== -1
      ) {
        const data = Array.isArray(mock.data) ? mock.data : [mock.data];
        const body = data[Math.min(queryCalls[mock.query], data.length - 1)];
        req.alias = mock.query;
        req.reply(
          staticResponse({
            body: {
              data: body,
              errors: null,
            },
          })
        );
        queryCalls[mock.query] += 1;
        handled = true;
        break;
      }
    }
    if (!handled) {
      console.error(`failed to handle query for given mock queries`);
      console.error(mocks.map((m) => m.query));
      console.error(req);
    }
  });
}

export function mockGQL(query: string, data: any | any[]): MockGraphQLQuery {
  return {
    query,
    data,
  };
}

export function cyMockConfig(): MockGraphQLQuery {
  return mockGQL("appConfig", {
    appConfig: { googleClientId: "test" }
  });
}

export function cyLogin(cy): MockGraphQLQuery {
  cy.setCookie("accessToken", "accessToken");
  return mockGQL("login", {
    login: {
      user: {
        id: "kayla",
        name: "Kayla",
        email: "kayla@opentutor.com",
      },
      accessToken: "test",
    },
  });
}
