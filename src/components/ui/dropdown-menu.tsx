"use client";

import { Menu as DropdownMenuBase } from "@base-ui-components/react/menu";
import { CheckIcon } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { checkboxVariants } from "./checkbox";

type DropdownMenuProps = DropdownMenuBase.Root.Props;

const DropdownMenu = ({ children, ...props }: DropdownMenuProps) => {
  return <DropdownMenuBase.Root {...props}>{children}</DropdownMenuBase.Root>;
};

type DropdownMenuContentProps = DropdownMenuBase.Popup.Props;

const DropdownMenuContent = ({
  className,
  children,
  ...props
}: DropdownMenuContentProps) => {
  return (
    <DropdownMenuBase.Portal>
      <DropdownMenuBase.Backdrop />
      <DropdownMenuBase.Positioner
        className="outline-hidden"
        sideOffset={4}
        side="bottom"
      >
        <DropdownMenuBase.Popup
          className={cn(
            "border-border bg-background text-main outline-hidden z-50 min-w-40 rounded-md border py-1 shadow-lg",
            "data-starting-style:opacity-0 data-open:duration-150",
            "data-[side=top]:data-starting-style:translate-y-[0.5rem]",
            "data-[side=bottom]:data-starting-style:translate-y-[-0.5rem]",
            "data-[side=left]:data-starting-style:translate-x-[0.5rem]",
            "data-[side=right]:data-starting-style:translate-x-[-0.5rem]",
            className
          )}
          {...props}
        >
          {children}
        </DropdownMenuBase.Popup>
      </DropdownMenuBase.Positioner>
    </DropdownMenuBase.Portal>
  );
};

const dropdownMenuItemVariants = tv({
  base: cn(
    "outline-hidden relative flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm font-medium",
    "focus:bg-background-hover",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:shrink-0"
  ),
  variants: {
    variant: {
      default: "text-main",
      danger: "text-error",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type DropdownMenuItemProps = DropdownMenuBase.Item.Props &
  VariantProps<typeof dropdownMenuItemVariants>;

const DropdownMenuItem = ({
  className,
  children,
  variant,
  ...props
}: DropdownMenuItemProps) => {
  return (
    <DropdownMenuBase.Item
      className={cn(dropdownMenuItemVariants({ variant }), className)}
      {...props}
    >
      {children}
    </DropdownMenuBase.Item>
  );
};

type DropdownMenuGroupLabelProps = DropdownMenuBase.GroupLabel.Props;

const DropdownMenuGroupLabel = ({
  className,
  children,
  ...props
}: DropdownMenuGroupLabelProps) => {
  return (
    <DropdownMenuBase.GroupLabel
      className={cn("text-subtle px-3 py-1.5 text-xs font-medium", className)}
      {...props}
    >
      {children}
    </DropdownMenuBase.GroupLabel>
  );
};

type DropdownMenuSeparatorProps = DropdownMenuBase.Separator.Props;

const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return (
    <DropdownMenuBase.Separator
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
};

type DropdownMenuCheckboxItemProps = DropdownMenuBase.CheckboxItem.Props;

const DropdownMenuCheckboxItem = ({
  className,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) => {
  return (
    <DropdownMenuBase.CheckboxItem
      className={cn(
        dropdownMenuItemVariants({ variant: "default" }),
        className
      )}
      {...props}
    >
      {children}
      <DropdownMenuBase.CheckboxItemIndicator
        keepMounted
        className={cn(
          "group ml-3 flex items-center justify-center",
          checkboxVariants({ size: "medium" }).root()
        )}
      >
        <CheckIcon
          className={cn(
            "group-data-unchecked:hidden",
            checkboxVariants({ size: "medium" }).icon()
          )}
        />
      </DropdownMenuBase.CheckboxItemIndicator>
    </DropdownMenuBase.CheckboxItem>
  );
};

DropdownMenu.Trigger = DropdownMenuBase.Trigger;
DropdownMenu.Group = DropdownMenuBase.Group;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.GroupLabel = DropdownMenuGroupLabel;
DropdownMenu.Separator = DropdownMenuSeparator;
DropdownMenu.CheckboxItem = DropdownMenuCheckboxItem;

export { DropdownMenu };
