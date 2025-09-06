import "dotenv/config.js";
import User from "../models/UserModel.js";
import Otp from "../models/OtpModel.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import mailSender from "../utils/mailSender.js";

//---------------send Otp------------------

const sendOtp = async (req, res) => {
  try {
    // fetch email from req
    const { email } = req.body;

    // check if user already exist

    const checkUserExists = await User.findOne({
      email: email,
    });

    if (checkUserExists) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // generate otp

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp is generator here by the sendOtp controller", otp);

    // create the entry in db for otp

    const otpBody = await Otp.create({
      email: email,
      otp: otp,
    });

    //return the response
    return res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      otpBody,
    });
  } catch (error) {
    console.log("error occur in sendOtp controller");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//----------------signUp------------------

const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

    console.log("all data is here",otp)

    //validate data

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Password and confirm password does not match",
      });
    }

    //check if user already exist

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Registered",
      });
    }

    // find the most recent otp
    console.log("recent opt is here",otp)


    const recentOtp = await Otp.findOne({email:email}).sort({createdAt:-1}).limit(1);




    if (recentOtp.otp.length === 0 || !recentOtp) {
      return res.status(403).json({
        success: false,
        message: "Otp not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(403).json({
        success: false,
        message: "Otp is Invalid. Please try again",
      });
    }

    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    //--------------create User Avatar
    const avatarUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`;

    //create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      image: avatarUrl,
    });

    //send email

    return res.status(200).json({
      success: true,
      message: "User is Registered successfully",
      user,
    });
  } catch (error) {
    console.log("error occur in signUp controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//-------------------logIn-----------------

const logIn = async (req, res) => {
  try {
    //  fetch data from request body
    const { email, password } = req.body;

    // validate the data

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }

    // check if user exist

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not Registered",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    // compare the password and generate the JWT token
    if (await bcrypt.compare(password, user.password)) {
      const token = JWT.sign(payload, process.env.JWT_SECRET, { expiresIn: "3d" });

      let userObject = user.toObject();
      userObject.token = token;
      userObject.password = undefined;

      //   create cookie and send the response

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.cookie("cookieData", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        userObject,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    console.log("error occur in logIn controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//------------------change password--------------------

const changePassword = async (req, res) => {
  try {
    //Get user details
    const userDetails = await User.findById(req.user.id);

    //Fetch data
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // validate the oldPassword

    const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    //validate the new password and confirm password

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password does not match",
      });
    }

    //Update the password

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: encryptedPassword,
      },
      { new: true },
    );

    // Send the notification Email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password Changed",
        `Your password has been changed successfully ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
      );
      console.log("email Response is here", emailResponse);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

const ContactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const mailSent = await mailSender(
      "studynotion557@gmail.com",
      "SomeOne Connect Us",
      `<h1> my name is ${firstName} ${lastName} . I want to connect with us  </h1> <p>${message} </p> /n thank you so much  <p>${email}`,
    );

    if (!mailSent) {
      return res.status(400).json({
        success: false,
        message: "Error sending mail",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    console.log("error occur", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while sending mail",
      error: error.message,
    });
  }
};

export { sendOtp, signUp, logIn, changePassword,ContactUs };
