/*
This software is Copyright ©️ 2020 The University of Southern California. All Rights Reserved. 
Permission to use, copy, modify, and distribute this software and its documentation for educational, research and non-profit purposes, without fee, and without a written agreement is hereby granted, provided that the above copyright notice and subject to the full license file found in the root of this software deliverable. Permission to make commercial use of this software may be obtained by contacting:  USC Stevens Center for Innovation University of Southern California 1150 S. Olive Street, Suite 2300, Los Angeles, CA 90115, USA Email: accounting@stevens.usc.edu

The full terms of this copyright and license should always be found in the root directory of this software deliverable as "license.txt" and if these terms are not found with this software, please contact the USC Stevens Center for the full license.
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionType = any;

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
}

export interface Question {
  text: string;
  expectations: Expectation[];
}

export interface Expectation {
  text: string;
}

export interface UserResponse {
  text: string;
  expectationScores: ExpectationScore[];
}

export interface ExpectationScore {
  classifierGrade: string;
  graderGrade?: string;
}

export interface Lesson {
  id: string;
  lessonId: string;
  name: string;
  intro: string;
  question: string;
  image: string;
  conclusion: string[];
  expectations: LessonExpectation[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  features: any;
  lastTrainedAt: string;
  isTrainable: boolean;
  deleted: boolean;
}

export interface LessonExpectation {
  expectation: string;
  features: any;
  hints: Hint[];
}

export interface Hint {
  text: string;
}

export interface FetchLessons {
  lessons: Connection<Lesson>;
}

export interface FetchProfile {
  data: Profile;
}

export interface Profile {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  gender: string;
  email: string;
}
