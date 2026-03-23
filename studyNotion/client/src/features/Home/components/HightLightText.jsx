const HighlightText = ({ txt }) => {
  return (
    <span className={`bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent `}>
      {txt}
    </span>
  );
};

export default HighlightText;
