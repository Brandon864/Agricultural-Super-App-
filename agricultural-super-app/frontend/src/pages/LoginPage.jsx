import React, { useState } from 'react';

export default function LoginPage() {
  const [user, setUser] = useState({ name: "Guest" });

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
