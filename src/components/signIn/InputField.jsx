import React from "react";

const InputField = (props) => {
  const { type, label, name, setValue, value, input, checks, inputStyle } =
    props;
  return (
    <>
      <div className="input__container">
        {/* {input && input.error && (
          <div className="input__valid--check circle">&#10004;</div>
        )} */}
        <input
          className={inputStyle}
          value={value}
          type={type}
          name={name}
          onKeyUp={checks}
          onInput={setValue}
        />
        <label className={input && "input--filled"}>{label}</label>
      </div>
    </>
  );
};

export default InputField;
