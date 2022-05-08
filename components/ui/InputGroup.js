const InputGroup = (props) => {
  const { label, error } = props;

  return (
    <div className="mb-6">
      {label && <div className="mb-1 ml-1 font-bold">{label}</div>}
      {props.children}
      {error && (
        <div className="ml-1 mt-[4px] text-xs text-red-500">{error}</div>
      )}
    </div>
  );
};

export default InputGroup;
