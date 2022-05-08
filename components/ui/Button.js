const Button = (props) => {
  const { onClick, block, disabled, loading, type = "button" } = props;

  return (
    <button
      type={type}
      onClick={() => {
        onClick && onClick();
      }}
      disabled={disabled || loading}
      className={`
        bg-black text-white font-bold px-6 py-2 rounded-full border-4 border-black transition
        hover:bg-white hover:text-black
          disabled:opacity-50 disabled:bg-black disabled:text-white
        ${block ? "w-full" : "w-fit"}
      `}
    >
      {loading ? "Loading..." : props.children}
    </button>
  );
};

export default Button;
