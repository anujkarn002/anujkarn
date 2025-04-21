import React from "react";
import type { ButtonHTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react";
import clsx from "clsx";

// Polymorphic Button: supports 'button' and 'a' elements safely

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = (props: ButtonProps) => {
  const { children, variant = "primary", className = "" } = props;

  // Variant styles - only matte black and white
  const base =
    'inline-flex items-center justify-center font-bold rounded transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-matte-black shadow-lg';
  const variants = {
    primary: 'bg-white text-matte-black border-2 border-white hover:bg-matte-black hover:text-white',
    secondary: 'bg-matte-black text-white border-2 border-white hover:bg-white hover:text-matte-black',
  };

  const classes = `${base} ${variants[variant]} ${className || ''}`;

  if (props.as === "a") {
    const { as, ...anchorProps } = props;
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }
  const { as, ...buttonProps } = props;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
};
