import { Outlet } from "react-router-dom";
import { Header, Footer } from "../partials";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
