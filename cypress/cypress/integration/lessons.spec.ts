// /*
// This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
// Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

// The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
// */
// describe("Latest Lessons", () => {
//   beforeEach(() => {
//     cy.server();
//     cy.visit("/");
//   });

//   it("displays list of lessons", () => {
//     cy.get("#lessons").children().should("have.length", 2);
//     cy.get("#lesson-0").contains("lesson 1");
//     cy.get("#image-0").should(
//       "have.css",
//       "background-image",
//       `url("https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg")`
//     );
//     cy.get("#lesson-1").contains("lesson 2");
//     cy.get("#image-1").should(
//       "have.css",
//       "background-image",
//       `url("https://i.insider.com/5df126b679d7570ad2044f3e?width=1100&format=jpeg&auto=webp")`
//     );
//   });

//   it("launches a lesson", () => {
//     cy.get("#lesson-0").click();
//     cy.location("pathname").should("contain", "/tutor");
//     cy.location("search").should("contain", "lesson=lesson1");
//   });
// });
