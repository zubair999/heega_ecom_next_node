import React, { useState } from "react";

interface WillowGradeAccordionProps {
	title?: string;
	answer?: string;
  options?: Option[];
}

export interface Option {
  id: number;
  option: string;
  value: string;
  image?: string;
 }


/**
 * Accordion component
 *
 * A collapsible component that shows or hides its children.
 *
 * @param {WillowGradeAccordionProps} props The properties of the component
 * @param {string} props.title The title of the accordion
 * @param {React.ReactNode} props.answer The content of the accordion
 */
const Accordion: React.FC<WillowGradeAccordionProps> = ({ title, answer, options }) => {
  /**
   * The state of the accordion. If true, the answer is shown, otherwise it's hidden.
   */
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-0">
      <button
        /**
         * Event handler for when the button is clicked. Toggles the `accordionOpen` state
         */
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full border-black border-s-[2px] border-[1px] p-2 mb-2 items-center"
      >
        <span className="">{title}</span>
        {/* {accordionOpen ? <span>-</span> : <span>+</span>} */}
        <svg
          /**
           * The plus/minus icon for the accordion. It is rotated depending on the
           * `accordionOpen` state using CSS transforms.
           */
          className="fill-indigo-500 shrink-0 ml-8"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            /**
             * The top rectangle of the plus/minus icon. It's opacity is animated
             * using CSS transitions when the accordion is opened/closed.
             */
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            /**
             * The bottom rectangle of the plus/minus icon. It's opacity is animated
             * using CSS transitions when the accordion is opened/closed.
             */
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        /**
         * The container for the answer. Its height is animated using CSS transitions
         * when the accordion is opened/closed. Its opacity is also animated using CSS
         * transitions when the accordion is opened/closed.
         */
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm mb-2 ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
            <ul className="flex justify-center gap-5 cursor-pointer">
                {
                    options?.map((option) => (
                        <li className="flex flex-col items-center bg-gray-300 p-3" key={option.id}>
                          {
                            option.image ? <img src={option.image} />
                            :
                            null
                          }
                            <span>{option.option}</span>
                        </li>
                    ))  
                }
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
