// RenderSteps.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm';
import CoursePublish from './CoursePublish';
import { Spinner } from '@/components/ui/spinner';
import { Check } from 'lucide-react';

const steps = [
  { id: 1, title: 'Course Information' },
  { id: 2, title: 'Course Builder' },
  { id: 3, title: 'Publish' },
];

// ── Step circle ────────────────────────────────────────────────────────────
const StepCircle = ({ stepNumber, isCompleted, isActive }) => (
  <div className="flex flex-col items-center gap-2.5">
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center
                  text-sm font-bold border-2 transition-all duration-300
        ${
          isCompleted
            ? 'bg-yellow-400 border-yellow-400 text-black'
            : isActive
              ? 'bg-yellow-400 border-yellow-400 text-black'
              : 'bg-transparent border-richBlack-500 text-richBlack-300'
        }`}
    >
      {isCompleted ? <Check size={16} strokeWidth={3} /> : stepNumber}
    </div>
    <span
      className={`text-xs whitespace-nowrap font-medium transition-colors duration-300
        ${isActive || isCompleted ? 'text-white' : 'text-richBlack-400'}`}
    >
      {steps[stepNumber - 1].title}
    </span>
  </div>
);

// ── Dashed connector ───────────────────────────────────────────────────────
// Matches the dashed line in the reference image exactly
const Connector = ({ completed }) => (
  <div className="flex-1 mx-3 mb-6 flex items-center">
    <div
      className={`w-full border-b-2 border-dashed transition-colors duration-300
        ${completed ? 'border-yellow-400' : 'border-richBlack-500'}`}
    />
  </div>
);

// ── Main ───────────────────────────────────────────────────────────────────
const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  return (
    <div className="w-full mt-6">
      {/* Stepper */}
      <div className="flex items-center justify-center w-full mb-8  mx-auto">
        {steps.map((item, index) => {
          const stepNumber = index + 1;
          const isCompleted = step > stepNumber;
          const isActive = step === stepNumber;

          return (
            <React.Fragment key={item.id}>
              <StepCircle stepNumber={stepNumber} isCompleted={isCompleted} isActive={isActive} />
              {index < steps.length - 1 && <Connector completed={step > stepNumber} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step content */}

      <>
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <CoursePublish />}
      </>
    </div>
  );
};

export default RenderSteps;
