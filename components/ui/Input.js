const Input = (props) => {
  const { placeholder, onChange, type = "text", required, value } = props;

  return (
    <input
      value={value}
      type={type}
      required={required}
      onChange={(e) => onChange && onChange(e)}
      className="font-bold px-4 py-2 rounded-xl border-4 border-black w-full transition"
      placeholder={placeholder}
    />
  );
};

export default Input;
