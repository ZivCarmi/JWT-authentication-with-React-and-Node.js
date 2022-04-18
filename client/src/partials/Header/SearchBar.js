import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) =>
    e.target.value ? setSearchInput(e.target.value) : "";

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    console.log(searchInput);
  };

  return (
    <div className="searchbar">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="left"></div>
        <div className="center">
          <input
            type="text"
            name="searchInput"
            className="search-input"
            onChange={handleSearchInput}
          />
        </div>
        <div className="right">
          <button type="submit" className="search-submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
