const FormInput = ({
    name,
    value,
    handleChange,
    title,
    placeholder,
    type = "text",
    text = "",
    minLength = 0,
    errorMsg = "",
    required = false,
    readOnly = false }) => {
    return (
        <div className="mb-3">
            <label htmlFor="username" className="form-label">{title}</label>
            <input className="form-control"
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                minLength={minLength}
                required={required ? "required" : ""} 
                readOnly={readOnly ? "readonly" : ""}
            />
            <div className="form-text">{text}</div>
            <span className="text-danger">{errorMsg}</span>
        </div>
    );
}

export default FormInput;