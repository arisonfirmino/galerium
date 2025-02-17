const Hint = ({ message }: { message: string }) => {
  return (
    <p className="text-xs font-medium text-red-400">
      <span className="text-red-600">!</span>important&nbsp;&nbsp;
      <span className="font-normal text-muted-foreground">{message}</span>
    </p>
  );
};

export default Hint;
