import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import RightHeader from "./RightHeader";
import "../../styles/Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <div className="top-bar">
        <div className="left">
          <div className="site-menu">
            <div className="hamburger">
              <button className="toggle-menu">
                <div></div>
                <div></div>
                <div></div>
              </button>
            </div>
            <div className="site-nav">
              <nav>
                <ul className="menu-list">
                  <Link to="/">Home</Link>
                  <Link to="blog">Blog</Link>
                </ul>
              </nav>
            </div>
          </div>
          <div className="logo">Logo</div>
        </div>
        <RightHeader />
      </div>
      <div className="bottom-bar">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
