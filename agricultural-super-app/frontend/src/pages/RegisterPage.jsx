import React, { useState } from 'react';

export default function RegisterPage() {
  const [user, setUser] = useState({ name: "Guest" });

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
