import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import PersistLogin from "./layouts/PersistLogin";
import { Home, Login, Register, Blog, Private, Error } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/private" element={<Private />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="*" element={<Error />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
