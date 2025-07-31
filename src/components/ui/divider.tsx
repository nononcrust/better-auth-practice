import { cn } from "@/lib/utils";

type DividerProps = React.ComponentPropsWithRef<"hr">;

const Divider = ({ className, ...props }: DividerProps) => {
  return <div className={cn("bg-border h-px", className)} {...props} />;
};

export { Divider };
