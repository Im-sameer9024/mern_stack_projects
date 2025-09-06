import React from "react";
import { FaCheck } from "react-icons/fa6";


const steps = [
  {
    id: 1,
    step: 0,
    stepNo: 1,
    icon: <FaCheck />,
    title: "Course Information",
  },
  {
    id: 2,
    step: 1,
    stepNo: 2,
    icon: <FaCheck />,
    title: "Course Builder",
  },
  {
    id: 3,
    step: 2,
    stepNo: 3,
    icon: <FaCheck />,
    title: "Publish",
  },
];

const AddCourseStepper = ({ activeStep }) => {
  return (
    <div className="flex justify-between items-center mt-10 w-full">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div
              className={`p-6 rounded-full w-10 h-10 flex items-center justify-center text-center ${
                step.step < activeStep
                  ? "border-yellow-400 text-black bg-yellow-400 border-2"
                  : step.step === activeStep
                  ? "border-yellow-50 text-yellow-50 border-2 bg-yellow-300/30"
                  : "bg-opacity-60 bg-transparent/30 border-2 border-gray-500 text-gray-400"
              }`}
            >
              {step.step < activeStep ? (
                <span className="text-black">{step.icon}</span>
              ) : (
                step.stepNo
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium text-nowrap ${
                step.step <= activeStep ? "text-white" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-full border-dashed mx-6 ${
                step.step < activeStep
                  ? "border border-yellow-400"
                  : "border border-gray-400"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AddCourseStepper;
