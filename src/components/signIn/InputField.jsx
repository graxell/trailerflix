import React from "react";

const InputField = (props) => {
  const { type, label, name, setValue, value, input, checks, inputStyle } =
    props;
  // const { data, valid } = input;
  return (
    <>
      <div className="input__container">
        {input && input.valid === true && (
          <div className="input__valid--check circle">&#10004;</div>
        )}
        <input
          className={inputStyle}
          value={value}
          type={type}
          name={name}
          onKeyUp={checks}
          onInput={setValue}
        />
        <label className={input.data && "input--filled"}>{label}</label>
      </div>
    </>
  );
};

export default InputField;
