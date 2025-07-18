import React, { useState } from "react";

function MessagesPage() {
  const [user, setUser] = useState({ name: "Guest" });

  return (
    <div>
      <h1>Messages Page</h1>
      <p>User: {user.name}</p>
    </div>
  );
}

export default MessagesPage;
