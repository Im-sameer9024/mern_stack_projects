import React from "react";

const Loader: React.FC = () => {
  return (
    <div className=" w-full h-[100vh] flex items-center justify-center">
      <span className="loader relative inline-block w-12 h-12">
        <style>
          {`
           .loader {
  width: 48px;
  height: 48px;
  border: 5px dotted #111111;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
          `}
        </style>
      </span>
    </div>
  );
};

export default Loader;
