import React from 'react';
import ChangePassword from '../components/ChangePassword';

const Setting = () => {
  return (
    <div className="space-y-8 text-white">
      {/* Heading */}
      <h2 className="text-2xl font-semibold">Settings</h2>

      <ChangePassword />
    </div>
  );
};

export default Setting;
