import React, { useState } from "react";

function CommunityPage() {
  const [user, setUser] = useState({ name: "Guest" });

  return (
    <div>
      <h1>Community Page</h1>
      <p>Welcome to the community, {user.name}!</p>
    </div>
  );
}

export default CommunityPage;
