import React from "react";
import "../styles/formInput.css";
const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  error = "",
}) => {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`form-input ${error ? "error" : ""}`}
        //   preventing autofill kind of thing
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="off"
        //    disabling copy paste or cut
        onPaste={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        //  this for avoiding password manager autofill
        data-lpignore="true"
        data-form-type="other"
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormInput;
