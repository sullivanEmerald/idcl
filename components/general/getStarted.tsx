import Link from "next/link";

export default function GetStarted() {
    return (
        <button
            className="
                flex items-center justify-center
                min-w-[145px] h-[42px]          
                rounded-[56px]                 
                bg-[#005DFF]                   
                px-[33px] py-[12px]           
                gap-[10px]                      
                hover:bg-[#0045CC]              
                transition-colors duration-200  
                no-underline
                border-none
            "
        >
            <span className="
        font-roboto                     
        font-medium                    
        text-[15.36px]                
        leading-none                   
        tracking-[0]                                       
        text-center text-[#FFFFFF]                 
        w-[79px]
          
      ">
                Get Started
            </span>
        </button>
    )
}