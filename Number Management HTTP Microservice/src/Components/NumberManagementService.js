import React from "react";
import { useState } from "react";

const NumberManagementService = () => {
  const [numbers, setNumbers] = useState([]);
  const [flag, setFlags] = useState(false);

  const fetchNumbers = async (urls) => {
    setFlags(true);

    const fetched_numbers = new Set();

    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          data.numbers.forEach((number) => fetched_numbers.add(number));
        }
      } catch (error) {
        console.log("Some Error Occured During the fetching of data" + error );
      }
    }

    setFlags(false);
    setNumbers(Array.from(fetched_numbers).sort((a, b) => a - b));
  };

  const handleFetch = () => {
    const query = new URLSearchParams(window.location.search);
    const urls = query.getAll("url");

    fetchNumbers(urls);
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <button onClick={handleFetch}>Get Numbers </button>

      {!flag && (
        <div>
          <h2>Showing Output Numbers: </h2>
          <pre>{JSON.stringify({ numbers }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default NumberManagementService;
