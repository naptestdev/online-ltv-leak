import { Button, Form, Input } from "antd";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate(`/${values.url.split("/").slice(-1)[0]}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img style={{ width: 100, height: 100 }} src="/logo.png" alt="" />
      <h1>Online LTV Leak</h1>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="url"
          rules={[
            {
              required: true,
              pattern:
                /https:\/\/online\.luongthevinh\.com\.vn\/course-online-learning\/.+\/.+\/.+/gm,
              message: "The URL format is incorrect",
            },
          ]}
        >
          <Input
            style={{ width: "100vw", maxWidth: 300 }}
            placeholder="Enter your URL"
            autoComplete="off"
            autoFocus
            size="large"
          />
        </Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Leak The Question
        </Button>
      </Form>
    </div>
  );
}
