import { Collapse, Spin } from "antd";
import { Link, useParams } from "react-router-dom";

import { Button } from "antd";
import { Fragment } from "react";
import { leakData } from "../services/api";
import useSWR from "swr";

export default function Leak() {
  const { id } = useParams();
  const { data, error } = useSWR(id, () => leakData(id), {
    revalidateOnFocus: false,
  });

  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          gap: 20,
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
    <>
      {!data ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
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
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 16,
                gap: 8,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                style={{ fill: "currentcolor" }}
                viewBox="0 0 24 24"
              >
                <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path>
              </svg>
              Back to Home
            </Link>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>
              {data.title || `Search result for ${id}`}
            </h2>
            <Collapse>
              {data.settings && (
                <Collapse.Panel header="Settings">
                  {Object.entries(data.settings).map(([key, value]) => (
                    <p key={key} style={{ margin: 0 }}>
                      <b>
                        {key[0].toUpperCase() +
                          key
                            .split(/(?=[A-Z])/)
                            .map((item) => item.toLowerCase())
                            .join(" ")
                            .slice(1)}
                      </b>
                      : {String(value)}
                    </p>
                  ))}
                </Collapse.Panel>
              )}
              {data.questions && (
                <Collapse.Panel header="Questions">
                  {data.questions.map((question, index) => (
                    <div key={index}>
                      <h3>
                        {question.html ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: `Question ${index + 1}: ${question.html}`,
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
                                <div style={{ display: "flex" }}>
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
                    </div>
                  ))}
                </Collapse.Panel>
              )}
              {data.resources && (
                <Collapse.Panel header="Resources">
                  {data.resources.map((resource, index) => (
                    <Fragment key={index}>
                      <div style={{ marginBottom: 20 }}>
                        <a href={resource} target="_blank">
                          {resource}
                        </a>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: 0,
                          paddingBottom: "100%",
                          position: "relative",
                        }}
                      >
                        <iframe
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                          }}
                          src={resource}
                          frameborder="0"
                        ></iframe>
                      </div>
                    </Fragment>
                  ))}
                </Collapse.Panel>
              )}
              {["test", "exercise"].includes(data.type) && (
                <Collapse.Panel header="Submissions">
                  <Link to={`/${id}/submission`}>
                    <p style={{ margin: 0 }}>View the submissions.</p>
                    <p style={{ margin: 0 }}>The size may be big.</p>
                    <p style={{ margin: 0 }}>
                      Make sure your machine is strong enough.
                    </p>
                  </Link>
                </Collapse.Panel>
              )}
              <Collapse.Panel header="Links">
                {Object.entries(data.urls).map(([key, value]) => (
                  <p key={key}>
                    {key}:{" "}
                    <a href={value} target="_blank">
                      {value}
                    </a>
                  </p>
                ))}
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
      )}
    </>
  );
}
