import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home page Route */}

          {/* Question page Route */}

          {/* Answer page Route */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
