import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Leak from "./pages/Leak";
import Submission from "./pages/Submission";

export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path=":id">
          <Route index element={<Leak />} />
          <Route path="submission" element={<Submission />} />
        </Route>
      </Routes>
    </div>
  );
}
