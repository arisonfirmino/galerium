const Hint = ({ message }: { message?: string }) => {
  return (
    <p className="text-center text-xs font-medium text-red-400">
      <span className="text-red-600">!</span>important&nbsp;&nbsp;
      <span className="text-muted-foreground font-normal">{message}</span>
    </p>
  );
};

export default Hint;
