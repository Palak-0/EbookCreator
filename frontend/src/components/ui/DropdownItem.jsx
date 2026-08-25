import React from "react";

const DropdownItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 text-left"
      role="menuitem"
      tabIndex="-1"
    >
      {children}
    </button>
  );
};

export default DropdownItem;
