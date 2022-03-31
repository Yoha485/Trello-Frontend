import React, { useState } from "react";

const Input = (props) => {
  const [focused, setFocused] = useState(false);
  const { onChange, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="flex w-full">
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        className="my-2 w-full rounded-md p-2 outline-none border-stone-300 placeholder:text-gray-200 text-sm bg-inherit text-white"
      />
    </div>
  );
};

export default Input;
