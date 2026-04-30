import React from "react";
import UserProfile from "../components/UserProfile";
import ClearUserData from "../components/ClearUserData";
import DeleteAccount from "../components/DeleteAccount";

const SettingsPage = () => {
  return (
    <div className="space-y-6 bg-white rounded p-4">
      <UserProfile />

      {/* Clear Data */}
      <ClearUserData />

      {/* Delete Account */}
      <DeleteAccount />
    </div>
  );
};

export default SettingsPage;