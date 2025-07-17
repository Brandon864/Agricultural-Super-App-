import React, { useState } from "react";

function PostPage() {
  const [user, setUser] = useState({ name: "Guest" });

  return (
    <div>
      <h1>Post Page</h1>
      <p>Hi {user.name}, view your post below.</p>
    </div>
  );
}

export default PostPage;
