import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getData = async () => {
    try {
      await axios
        .get(`https://api.publicapis.org/categories`)
        .then((response) => {
          setData(response.data.categories);
        });
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const searchCategory = (value) => {
    setSearchInput(value);
    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        placeholder="Search..."
        style={{ padding: "10px", width: "200px" }}
        onChange={(e) => searchCategory(e.target.value)}
      />

      <div style={{ marginTop: 20 }}>
        {searchInput.length > 1
          ? filteredResults.map((item, key) => {
              return (
                <div key={key}>
                  <span>{item}</span>
                </div>
              );
            })
          : data.map((item, key) => {
              return (
                <div key={key}>
                  <span>{item}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default App;
