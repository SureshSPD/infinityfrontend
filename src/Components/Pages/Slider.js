import { useEffect } from "react";

export default function Slider({ onClose,sliderOpen, setSliderOpen, width, children, title }) {
// console.log(sliderOpen)
  useEffect(() => {
    setSliderOpen(true);
    // console.log("hello")
  }, [setSliderOpen]);

  function handleClose() {
    if (!sliderOpen) {
      onClose();
    }
  }
  // console.log('inside slider',title) 

  return (
    <>
      <div
        className="fixed inset-0 z-20"
        onClick={() => setSliderOpen(false)}
      ></div>
      <div
        style={{ width: width + "%" }}
        onTransitionEnd={() => handleClose()}
        className={`flex fixed flex-col h-full border-r  border-gray-200 text-light-textcolor dark:text-dark-textcolor dark:border-dark-border shadow-2xl bg-light-navbar dark:bg-dark-navbar top-0 right-0 z-50 bg-slate-50 transition-all duration-500 ${
          sliderOpen ? "translate-x-0" : " translate-x-full"
        }`}
      >
        <div className="pl40 h-[50px] flex">
          <div
            onClick={() => setSliderOpen(false)}
            className="h-full flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-dark-navbartext cursor-pointer hover:opacity-70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>

          <div className="h-full pl-4 flex items-center font-medium text-xl">
            {title}
          </div>
        </div>
        <div style={{ height: "calc(100vh - 50px)" }}>{children}</div>
      </div>
    </>
  );
}