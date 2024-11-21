import React from "react";

function TaskSvg() {
  return (
    <svg width="54" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 19.5H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="task line"
      />
      <path
        d="M11 12.5H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="task line2"
      />
      <path
        d="M11 5.5H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="task line3"
      />
      <path
        d="M3 5.5L4 6.5L7 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="task checked"
      />
      <path
        d="M3 12.5L4 13.5L7 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="task checked2"
      />
      <path
        d="M3 19.5L4 20.5L7 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="task checked3"
      />
    </svg>
  );
}

export default TaskSvg;
