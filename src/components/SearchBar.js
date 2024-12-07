{/* Simple search bar component for the user tickets page to search between tickets 
*/}
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the search term back to the parent
  };

  return (
    <div style={{ margin: "20px 50px" }}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search tickets..."
        style={{
          width: "50%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default SearchBar;
