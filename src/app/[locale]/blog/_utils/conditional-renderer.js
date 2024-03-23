const ConditionalRenderer = ({ condition, children }) => {
  if (condition) return children;
  return null;
};

export default ConditionalRenderer;
