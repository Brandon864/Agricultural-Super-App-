import React, { useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState({ name: "Guest" });

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Logged in as: {user.name}</p>
    </div>
  );
}

export default ProfilePage;
