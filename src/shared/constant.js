export const INFO_URL = (id) =>
  `https://cwl2xau78j.execute-api.ap-southeast-1.amazonaws.com/prod/unit/${id}?_populate=video`;

export const RESOURCES_URL = (examId) =>
  `https://iptoqoeg36.execute-api.ap-southeast-1.amazonaws.com/prod/exam/${examId}`;

export const QUESTIONS_URL = (examId) =>
  `https://iptoqoeg36.execute-api.ap-southeast-1.amazonaws.com/prod/question?exam=${examId}`;

export const SUBMISSIONS_URL = (examId, userId) =>
  `https://iptoqoeg36.execute-api.ap-southeast-1.amazonaws.com/prod/submission?exam=${examId}&_populate=questions+generateQuestion${
    userId ? `userId=${userId}` : ""
  }`;
