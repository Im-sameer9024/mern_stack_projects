import JWT from "jsonwebtoken";
import "dotenv/config.js";

//-----------auth------------

const auth = async (req, res, next) => {
  try {
    //extract token from header
    const token =req.header("Authorization").replace("Bearer ", "") || req.body.token || req.cookies.token ; 


    if (!token) {
      return res.status(401).json({
        success: false,
        message: "no token found",
      });
    }

    //verify token

    try {
      const decode = JWT.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (error) {
      console.log("error occur in auth middleware",error)
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
    }

    next();
  } catch (error) {
    console.log("error occur in auth middleware",error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

//-----------isStudent------------

const isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This Route is only for Student",
      });
    }

    next();
  } catch (error) {
    console.log("error occur in isStudent middleware");
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

//-------------------isAdmin--------------------

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This Route is only for Admin",
      });
    }

    next();
  } catch (error) {
    console.log("Error occur in isAdmin middleware");
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

//-------------------isInstructor--------------------

const isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This Route is only for Instructor",
      });
    }

    next();
  } catch (error) {
    console.log("Error occur in isInstructor middleware");
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export { auth, isStudent,isAdmin,isInstructor };
