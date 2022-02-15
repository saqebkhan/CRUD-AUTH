import React from "react";

const LogInForm = ({ onLogIn }) => {
  return (
    <form>
      <input type="text" placeholder="Enter your username" />
      <br />
      <br />
      <input type="password" placeholder="Enter your password" />
      <br />
      <br />
      <button type="sumbit" onClick={() => onLogIn()}>
        Log in
      </button>
    </form>
  );
};

export default LogInForm;
