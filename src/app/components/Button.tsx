type ButtonProps = React.ComponentProps<"button">;

const Button = ({ children, onClick, className, type }: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        className={`${className} rounded bg-green-500 text-white hover:bg-green-400
         dark:bg-slate-100/10 dark:hover:bg-slate-100/20 dark:hover:text-white dark:text-white transition-colors px-4 py-1`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
