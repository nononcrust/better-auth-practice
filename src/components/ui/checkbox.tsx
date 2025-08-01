"use client";

import { Checkbox as CheckboxBase } from "@base-ui-components/react/checkbox";
import { CheckboxGroup as CheckboxGroupBase } from "@base-ui-components/react/checkbox-group";
import { CheckIcon, MinusIcon } from "lucide-react";
import { tv, VariantProps } from "tailwind-variants";
import { cn, noop } from "@/lib/utils";

const DEFAULT_SIZE = "medium";

export const checkboxVariants = tv({
  slots: {
    root: cn(
      "border-border shadow-xs outline-hidden peer size-4 shrink-0 border",
      "data-checked:border-primary data-checked:bg-primary data-checked:text-white",
      "data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-white",
      "disabled:pointer-events-none disabled:opacity-50"
    ),
    icon: "stroke-3",
    label: "font-medium",
  },
  variants: {
    size: {
      small: {
        root: "size-4 rounded-[0.25rem]",
        icon: "size-[0.75rem]",
        label: "ml-2 text-sm",
      },
      medium: {
        root: "size-5 rounded-[0.3125rem]",
        icon: "size-[0.875rem]",
        label: "ml-2.5 text-[0.9375rem]",
      },
      large: {
        root: "size-6 rounded-[0.375rem]",
        icon: "size-[1.125rem]",
        label: "ml-3 text-base",
      },
    },
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
  },
});

type CheckboxProps = Omit<
  CheckboxBase.Root.Props,
  "onChange" | "onCheckedChange"
> &
  VariantProps<typeof checkboxVariants> & {
    onChange?: (checked: boolean) => void;
  };

const Checkbox = ({
  className,
  checked,
  "aria-invalid": ariaInvalid,
  size,
  children,
  onChange = noop,
  ...props
}: CheckboxProps) => {
  const variants = checkboxVariants({ size });

  const CheckboxInput = () => {
    return (
      <CheckboxBase.Root
        className={cn(
          variants.root(),
          ariaInvalid &&
            "border-error focus-visible:ring-ring-error data-checked:border-error data-checked:bg-error"
        )}
        checked={checked}
        aria-invalid={ariaInvalid}
        onCheckedChange={onChange}
        {...props}
      >
        <CheckboxBase.Indicator
          className="flex items-center justify-center"
          render={(props, state) => (
            <span {...props}>
              {state.indeterminate ? (
                <MinusIcon className={variants.icon()} />
              ) : (
                <CheckIcon className={variants.icon()} />
              )}
            </span>
          )}
        />
      </CheckboxBase.Root>
    );
  };

  if (!children) {
    return <CheckboxInput />;
  }

  return (
    <label className={cn("flex w-fit items-center", className)}>
      <CheckboxInput />
      <span className={cn(variants.label())}>{children}</span>
    </label>
  );
};

type CheckboxGroupValue = string[] | readonly string[];

type CheckboxGroupProps = Omit<
  CheckboxGroupBase.Props,
  "onValueChange" | "onChange" | "value" | "allValues"
> & {
  value?: CheckboxGroupValue;
  onChange?: (value: CheckboxGroupValue) => void;
  allValues: CheckboxGroupValue;
};

const CheckboxGroup = ({
  value,
  onChange,
  allValues,
  ...props
}: CheckboxGroupProps) => {
  return (
    <CheckboxGroupBase
      value={value as string[]}
      allValues={allValues as string[]}
      onValueChange={onChange as (value: string[]) => void}
      {...props}
    />
  );
};

Checkbox.Group = CheckboxGroup;

export { Checkbox };
