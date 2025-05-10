'use client';

import { Circle, CircleCheck } from 'lucide-react';

import { cn } from '@/lib/utils';

interface StepperProps {
  steps: { stepTitle: string; stepContent: React.JSX.Element }[];
  activeStep: number;
  onStepClick: React.Dispatch<React.SetStateAction<number>>;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}
const Stepper = ({ steps, activeStep, onStepClick }: StepperProps) => {
  return (
    <>
      <div className="flex gap-2">
        {/* stepper Header */}
        <div className="w-[18%] p-2">
          {steps.map((step, i) => (
            <div key={step.stepTitle} className="flex flex-col">
              <div className="flex gap-3">
                {i < activeStep ? (
                  <CircleCheck
                    size={36}
                    className="my-1 rounded-full bg-primary text-white"
                  />
                ) : (
                  <div
                    className={cn(
                      'm-1 flex items-center justify-center rounded-full text-lg',
                      {
                        'h-8 w-8 border-2 border-primary bg-[#046ac4] text-white dark:bg-secondary-foreground dark:text-secondary':
                          activeStep === i,
                      },
                      {
                        'h-7 w-7 bg-[#E4E7EC] text-white dark:bg-muted-foreground dark:text-muted':
                          activeStep !== i,
                      },
                    )}
                  >
                    <Circle size={11} fill="#fff" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onStepClick(() => {
                      return activeStep <= i ? i : i;
                      // return i;
                    });
                  }}
                  className={cn('font-extrabold', {
                    'text-[#344054]': i !== activeStep,
                    'text-primary': i < activeStep,
                    'text-[#046ac4] dark:text-[#046ac4]': i === activeStep,
                  })}
                >
                  {step.stepTitle}
                </button>
              </div>

              {i <= activeStep && i != steps.length - 1 && (
                <div
                  className={cn('ms-[17px] h-10 w-1', {
                    'bg-primary': i < activeStep,
                    'bg-[#E4E7EC]': !(i < activeStep),
                  })}
                ></div>
              )}
            </div>
          ))}
        </div>
        {/* stepper Content */}
        <div className="w-[82%]">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn('w-full', {
                hidden: activeStep !== i,
              })}
            >
              {step.stepContent}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stepper;

{
  /* <>
<div className="container flex flex-col items-center p-2 md:px-8">
  {steps?.map((step, i) => (
    <div
      key={i}
      className="w-full"
    >
      <div className={`flex flex-col items-start`}>
        <div className="flex items-center justify-center gap-1.5">
          {i < activeStep ? (
            <CircleCheck
              size={36}
              className="my-1 rounded-full bg-primary text-white"
            />
          ) : (
            <div
              className={cn(
                'm-1 flex h-8 w-8 items-center justify-center rounded-full text-lg',
                {
                  'bg-[#046ac4] text-white dark:bg-secondary-foreground dark:text-secondary border-2 border-primary ':
                    activeStep === i,
                },
                {
                  'bg-gray-500 text-white dark:bg-muted-foreground dark:text-muted':
                    activeStep !== i,
                }
              )}
            >
              <Circle size={16} fill='#fff'/>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              onStepClick(() => {
                return activeStep <= i ? i : i
                // return i;
              })
            }}
            className={cn('font-extrabold', {
              'text-gray-500': i !== activeStep,
              'bg-primary': i < activeStep,
              'text-[#046ac4] dark:text-[#046ac4]': i === activeStep,
            })}
          >
            {step.stepTitle}
          </button>
        </div>
        {/* step content container */
}
//         <div
//           className={cn('my-2 flex w-full  ', {
//             hidden: activeStep !== i,
//           })}
//         >
//           {/* line between steps. active step and the next step.  */}
//           <div
//             className={cn('mx-5  w-1 rounded-lg text-center', {
//               'bg-green-600': i < activeStep,
//               'bg-[#314454]': !(i < activeStep),
//             })}
//           ></div>
//           <div className="grow rounded bg-white p-6 dark:text-primary">
//             {step.stepContent}
//           </div>
//         </div>
//         {i != activeStep && i != steps.length - 1 && (
//           <div
//             className={cn('mr-4 h-8 w-1 rounded-lg  text-center', {
//               'bg-primary': i < activeStep,
//               'bg-gray-500': i > activeStep,
//             })}
//           ></div>
//         )}
//       </div>
//     </div>
//   ))}
// </div>
// </> */}
