import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import instance from "../config/razorpay.js";
import mailSender from "../utils/mailSender.js";
import "dotenv/config.js";

//------------capture the payment and initiate the razorpay order--------------

const capturePayment = async (req, res) => {
  //----------get courseId and userId-----------
  const { courseId } = req.body;
  const userId = req.user.id;

  //-----------validation--------------
  if (!courseId || !userId) {
    return res.status(403).json({
      success: false,
      message: "Please provide all the required details",
    });
  }
  //-----------valid courseId or valid courseDetail

  let course;
  try {
    course = Course.findById(courseId);
    if (!course) {
      return res.status(403).json({
        success: false,
        message: "Course not found",
      });
    }

    //-----------check user already paid for this course enrolled or not----------

    const uid = new mongoose.Types.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(403).json({
        success: false,
        message: "You have already enrolled in this course",
      });
    }
  } catch (error) {
    console.log("error in course find", error);
    return res.status(403).json({
      success: false,
      message: " Network Error",
    });
  }

  //-----------order create----------------
  const amount = course.price * 100; // it is multiplied by 100 because the razorpay api takes the amount in like 399.00 form
  const currency = process.env.CURRENCY;

  const options = {
    amount: amount,
    currency: currency,
    receipt: crypto.randomUUID(),
    notes: {
      courseId: courseId,
      userId: userId,
    },
  };

  //------------ create order or initial the payment using razorpay -----------

  try {
    const paymentResponse = instance.orders.create(options);
    console.log("payment Response is here", paymentResponse);

    return res.status(200).json({
      success: true,
      message: "Payment Initiated",
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      orderId: paymentResponse.id,
      currency: paymentResponse.currency,
      amount: paymentResponse.amount,
    });
  } catch (error) {
    console.log("error occur when order is creating ", error);
    return res.status(403).json({
      success: false,
      message: "Network Error",
    });
  }
};

//------------ verify payment signature and server using razorpay -----------

const verifySignature = async (req, res) => {
  const webhookSecret = "12345678";

  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);

  shasum.update(JSON.stringify(req.body));

  const digest = shasum.digest("hex");

  if (signature === digest) { //---------- if the signature and digest are same then payment is authorized------------
    console.log("payment is Authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      //---------find the course and enrolled the student in course--------------

      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true },
      );

      if (!enrolledCourse) {
        return res.status(403).json({
          success: false,
          message: "Course not found",
        });
      }

      console.log("enrolledCourse", enrolledCourse);

      //-------find the student and add the course in enrolled courses---------

      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true },
      );

      console.log("enrolledStudent", enrolledStudent);

      //------------- confirmation mail send ----------

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations on your successful purchase",
        "You have successfully enrolled in the course",
      );

      console.log("email Response is here",emailResponse)

      return res.status(200).json({
        success: true,
        message: "Course enrolled successfully",
      })

    } catch (error) {
        console.log("error occur when verify the Signature",error)
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        })
    }
  }else{
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    })
  }
};



export {capturePayment,verifySignature}