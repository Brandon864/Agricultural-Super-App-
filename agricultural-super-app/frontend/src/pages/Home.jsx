import React, { useState } from "react";

const Home = () => {
  const [user, setUser] = useState({ name: "Guest" });

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Hello, {user.name}!</p>
    </div>
  );
};

export default Home;
