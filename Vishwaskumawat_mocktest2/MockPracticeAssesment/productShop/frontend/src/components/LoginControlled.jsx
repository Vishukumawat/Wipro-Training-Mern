// question 2  
// 
// React State + Controlled and Uncontrolled Components 


import React, { useRef, useState } from "react";

const LoginControlled = () => {
  const [username, setUsername] = useState(""); // controlled
  const passwordRef = useRef(); // uncontrolled

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", passwordRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: 20 }}>
      <h3>Login Form</h3>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input type="password" placeholder="Enter Password" ref={passwordRef} />

      <br /><br />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginControlled;
