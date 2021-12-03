import {
  INFO_URL,
  QUESTIONS_URL,
  RESOURCES_URL,
  SUBMISSIONS_URL,
} from "../shared/constant";

import axios from "axios";

export const leakData = async (id) => {
  // Final response object
  let response = { urls: {} };

  // INFO
  const infoUrl = INFO_URL(id);
  const infoData = (await axios.get(infoUrl)).data;
  !infoData &&
    (() => {
      throw new Error();
    })();
  response.urls.Info = infoUrl;

  // Set the type for rendering
  response.type = infoData.type;

  // Set title
  infoData.title && (response.title = infoData.title);

  // Set settings if exists
  infoData.settings && (response.settings = infoData.settings);

  if (["test", "exercise"].includes(infoData.type)) {
    const examId = infoData.exam;

    // RESOURCES
    const resourcesUrl = RESOURCES_URL(examId);
    const resourcesData = (await axios.get(resourcesUrl)).data;
    response.urls.Resources = resourcesUrl;

    // Set recourses settings if exists
    resourcesData.settings && (response.settings = resourcesData.settings);

    // If resources exist add it to the response
    const resources = resourcesData.resources;
    resources &&
      resources.length > 0 &&
      (response.resources = resources.map(
        (resource) =>
          `${resource.origin?.bucket ? resource.origin.bucket + "/" : ""}${
            resource.origin?.link
          }`
      ));

    // QUESTIONS
    const questionsUrl = QUESTIONS_URL(examId);
    const questionData = (await axios.get(questionsUrl)).data;
    response.urls.Questions = questionsUrl;

    // Set questions if exists
    questionData &&
      questionData.length > 0 &&
      (response.questions = questionData.reverse());
  } else if (["homework", "pdf"].includes(infoData.type)) {
    let href = infoData.syllabus?.origin
      ? `${
          infoData.syllabus?.origin?.bucket
            ? infoData.syllabus?.origin?.bucket + "/"
            : ""
        }${infoData.syllabus?.origin?.link}`
      : infoData.pdf?.origin
      ? `${
          infoData.pdf?.origin?.bucket ? infoData.pdf?.origin?.bucket + "/" : ""
        }${infoData.pdf?.origin?.link}`
      : null;

    response.resources = [href];
  } else {
    throw new Error();
  }

  console.log(response);
  return response;
};

export const getSubmissions = async (id) => {
  const infoData = (await axios.get(INFO_URL(id))).data;

  const title = infoData.title;

  const examId = infoData.exam;

  const submissionData = (await axios.get(SUBMISSIONS_URL(examId))).data;

  return {
    title,
    submission: submissionData,
  };
};
