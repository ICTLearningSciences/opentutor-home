/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
import axios from "axios";
import { Lesson, FetchLessons, Connection } from "types";

export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "/graphql";
export const TUTOR_ENDPOINT = process.env.TUTOR_ENDPOINT || "/tutor";
export const ADMIN_ENDPOINT = process.env.ADMIN_ENDPOINT || "/admin";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

interface GQLResponse<T> {
  errors?: { message: string }[];
  data?: T;
}
export async function fetchLessons(): Promise<Connection<Lesson>> {
  const filter = { image: { $nin: [null, ""] } };
  const result = await axios.post<GQLResponse<FetchLessons>>(GRAPHQL_ENDPOINT, {
    query: `
        query {
          lessons(
            filter:"${encodeURI(JSON.stringify(filter))}"
            sortBy:"updatedAt",
            limit:5,
          ) {
            edges {
              node {
                lessonId
                image
                name
              }
            }
          }
        }
      `,
  });

  return result.data.data!.lessons;
}
