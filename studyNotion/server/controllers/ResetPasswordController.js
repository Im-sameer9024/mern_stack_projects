import User from "../models/UserModel.js";
import mailSender from "../utils/mailSender.js";
import bcrypt from "bcrypt"


//----------------resetPassword Token------------------

const resetPasswordToken = async (req, res) => {
  try {
    //----------Get email form req body
    const { email } = req.body;

    //----------Check user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //----------Generate token for reset password
    const token = crypto.randomUUID();

    //-------------save token in user model and update the model
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true },
    );
    //-----------Generate link for reset password
    const url = `http://localhost:5173/update-password/${token}`;

    //--------------Send email to user
    await mailSender(email, "Password Rest", `Click on the link to reset your password ${url}`);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
      updatedUser,
    });
  } catch (error) {
    console.log("error occur in reset password token", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//------------------resetPassword------------------

const resetPassword = async(req,res) =>{
    try {

        //---------------fetch Data----------

        const{token,password,confirmPassword} = req.body;

        //---------------validate Data----------

        if(!token || !password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields"
            })
        }

        //-------------find the user ----------------

        const user = await User.findOne({token:token})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }

        //-------------check token expire or not------------
        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success:false,
                message:"Token expired"
            })

        }

        //--------------hash password---------------
        const hashedPassword = await bcrypt.hash(password,10)

        //--------------update password---------------

        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
        
    } catch (error) {

        console.log("error occur in resetPassword",error)

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
}

export { resetPasswordToken,resetPassword };
