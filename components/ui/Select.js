const Select = (props) => {
  const { onChange, options = [] } = props;

  return (
    <select
      onChange={(e) => onChange && onChange(e)}
      className="font-bold px-4 py-2 rounded-xl border-4 border-black w-full transition"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
