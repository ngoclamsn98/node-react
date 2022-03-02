import React, { useState } from "react";

export const Home = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <button onClick={() => setCounter(counter + 1)}>Click</button>
    </div>
  );
};
