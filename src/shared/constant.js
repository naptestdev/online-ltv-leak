export const INFO_URL = (id) =>
  `https://cwl2xau78j.execute-api.ap-southeast-1.amazonaws.com/prod/unit/${id}?_populate=video`;

export const RESOURCES_URL = (examId) =>
  `https://iptoqoeg36.execute-api.ap-southeast-1.amazonaws.com/prod/exam/${examId}`;

export const QUESTIONS_URL = (examId) =>
  `https://iptoqoeg36.execute-api.ap-southeast-1.amazonaws.com/prod/question?exam=${examId}`;

export const SUBMISSIONS_URL = (examId, userId) =>
  `https://iptoqoeg36.execute-api.ap-southeast-1.amazonaws.com/prod/submission?exam=${examId}&_populate=questions+generateQuestion${
    userId ? `&userId=${userId}` : ""
  }`;

export const USER_IDS = [
  "7d91fe30-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d8ec9e0-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d844290-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7cfaee50-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d026860-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d0352c0-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d03a0e0-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d924c50-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d91b010-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7e9c1b30-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7e142680-4b53-11ea-bc35-c343e947a6b9",
  "7e14e9d0-4b53-11ea-bc35-c343e947a6b9",
  "7e129fe0-4b53-11ea-bc35-c343e947a6b9",
  "7e1efbf0-4b53-11ea-bc35-c343e947a6b9",
  "7cf8f280-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d85c930-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7e136330-4b53-11ea-bc35-c343e947a6b9",
  "7e1eadd0-4b53-11ea-bc35-c343e947a6b9",
  "7d03ef00-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d01cc20-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7ea36e30-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7cf82f30-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7cf87d50-4b53-11ea-8ac0-f3a6bea1dd2d",
  "8e262960-90fe-11ea-914e-6157dbe36fe8",
  "7d868c80-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d8f1800-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d861750-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7cf76be0-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7d8f6620-4b53-11ea-8ac0-f3a6bea1dd2d",
  "7e203470-4b53-11ea-bc35-c343e947a6b9",
  "7e1474a0-4b53-11ea-bc35-c343e947a6b9",
  "7e155f00-4b53-11ea-bc35-c343e947a6b9",
];
