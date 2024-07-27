import React, { useState, useEffect } from "react";
import Input from "./input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CheckBox } from "@components/ui/checkbox";




interface AccordionProps {
	title?: string;
  options?: Option[];
  filter_key?: string;
}

export interface Option {
  id: number;
  option: string;
  image?: string;
  value: string,
  type?: string
 }

 interface ContactFormValues {
	name: string;
}

/**
 * Accordion component
 *
 * A collapsible component that shows or hides its children.
 *
 * @param {AccordionProps} props The properties of the component
 * @param {string} props.title The title of the accordion
 * @param {React.ReactNode} props.answer The content of the accordion
 */
const Accordion: React.FC<AccordionProps> = ({ title, options, filter_key }) => {
  /**
   * The state of the accordion. If true, the answer is shown, otherwise it's hidden.
   */
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
  const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormValues>();

  const router = useRouter();


  function handleItemClick(e: any, option: Option): void {

    console.log(filter_key);


    


	}










  return (
    <div className="py-0">
      <button
        /**
         * Event handler for when the button is clicked. Toggles the `accordionOpen` state
         */
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full border-black border-s-[2px] border-[1px] p-2 mb-0 items-center"
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
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm mb-1 ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
            <ul className="flex justify-center gap-5 cursor-pointer mt-1">
                {
                  options?.map((option : Option) => {
                    return option.type == "input" ? 
                      <div 
                        key={option.id} 
                        className="border-[1px] border-gray-300 p-3"
                      >
                        <label className="text-black font-bold">Laser Engraving <span className="text-red-500 font-bold">(+₹500.00)</span></label>
                        <img className="h-[175px] w-[150px]" src="https://heegasports.com/wp-content/uploads/2022/04/1.webp" />
                        <Input
                          placeholderKey="forms:placeholder-name"
                          {...register("name", { required: "forms:name-required" })}
                          className="w-full  "
                          errorKey={errors.name?.message}
                          variant="solid"
                        />
                      </div> 
                      : 
                      <li 
                        className="flex flex-col items-center flex flex-col items-center bg-gray-300 p-3" 
                        key={option.id} 
                        onClick={(e) => handleItemClick(e, option)}
                      >
                        {
                          option.image && option.image !== "" ? <img className="h-[175px] w-[150px] " src={option.image} />
                          :
                          null
                        }
                        <span className="text-black font-bold mt-1">{option.option}</span>
                        {/* <CheckBox
                          key={option.id}
                          label={option.option}
                          name={option.option.toLowerCase()}
                          checked={formState.includes(option.id.toString())}
                          value={option.id.toString()}
                          onChange={handleItemClick}
                        /> */}
                      </li>
                    }
                  )
                }
                
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
