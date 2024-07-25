type LinkButtonProps = React.ComponentProps<"a">;

const LinkButton = ({
  children,
  onClick,
  className,
  href,
}: LinkButtonProps) => {
  return (
    <>
      <a
        href={href}
        className={`${className} rounded border border-neutral-300 text-neutral-800 hover:bg-neutral-50 dark:hover:bg-slate-100/20 dark:hover:text-white dark:text-white transition-colors px-6 py-3`}
        onClick={onClick}
      >
        {children}
      </a>
    </>
  );
};

export default LinkButton;
