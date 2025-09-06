import ChangeUserImage from "../components/core/Settings/ChangeUserImage";
import UpdateUserDetails from "../components/core/Settings/UpdateUserDetails";

const SettingPage = () => {
  return (
    <div className="w-full min-h-[100vh] my-10 lg:mt-0 mt-16 px-4 sm:px-6">
      <div className="font-inter w-full md:w-11/12 lg:w-10/12 mx-auto flex flex-col gap-6 text-white h-full my-6 p-4">
        <h2 className="text-2xl font-bold">Edit Profile</h2>

        {/*--------------- Profile Picture Section------------------ */}
        <ChangeUserImage />

        {/*---------------- User Details------------ */}
        <UpdateUserDetails/>
      </div>
    </div>
  );
};

export default SettingPage;
