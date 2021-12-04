import { Collapse, Spin } from "antd";

import { Button } from "antd";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getSubmissions } from "../services/api";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export default function Submission() {
  const { id } = useParams();

  const { data, error } = useSWR(`${id}-submission`, () => getSubmissions(id), {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ width: "100vw", maxWidth: 300, height: "auto" }}
          src="/error.png"
          alt=""
        />
        <Link to="/">
          <Button type="primary" size="large">
            Return Home
          </Button>
        </Link>
      </div>
    );

  return (
    <div>
      {!data ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <div style={{ width: "100vw", maxWidth: 600, margin: "40px 20px" }}>
            <Link
              to={`/${id}`}
              style={{ display: "flex", alignItems: "center" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style={{ fill: "currentcolor" }}
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
              </svg>
              <span>Back to exam summary</span>
            </Link>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>
              {data.title} - Submission
            </h2>
            <Collapse>
              {data.submission.map(
                ({ email, name, correct, total, questions, answers }) => (
                  <Collapse.Panel
                    key={email}
                    header={`${name} (${email}) - ${correct} / ${total}`}
                  >
                    {questions.map((question, index) => (
                      <Fragment key={index}>
                        <h3>
                          {question.html ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: `Question ${index + 1}: ${
                                  question.html
                                }`,
                              }}
                            />
                          ) : (
                            <span>Question {index + 1}</span>
                          )}
                        </h3>
                        {question.answers &&
                          Object.entries(question.answers).map(
                            ([_, answer], index) => (
                              <div key={index}>
                                {answer.value && (
                                  <div
                                    style={{
                                      display: "flex",
                                      color: "#00ff00",
                                    }}
                                  >
                                    <span style={{ fontWeight: "bold" }}>
                                      {answer.label}:{" "}
                                    </span>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: answer.value,
                                      }}
                                    ></span>
                                  </div>
                                )}
                              </div>
                            )
                          )}
                        {answers[question._id] && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p
                              style={{
                                color: answers[question._id].isCorrect
                                  ? "#1e90ff"
                                  : "#ff0000",
                              }}
                            >
                              Your answer:{" "}
                              {
                                question.answers[answers[question._id].answerId]
                                  .label
                              }
                            </p>
                            <p style={{ color: "#198754" }}>
                              Correct answer:{" "}
                              {
                                question.answers[answers[question._id].correct]
                                  .label
                              }
                            </p>
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </Collapse.Panel>
                )
              )}
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
}
