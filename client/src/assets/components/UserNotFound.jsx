import React from "react";
import AppNavbar from "./AppNavbar";

const UserNotFound = () => {
  return (
    <div>
      <AppNavbar />
      <h2>User Not Found</h2>
      <p>The user you are looking for does not exist.</p>
    </div>
  );
};

export default UserNotFound;
