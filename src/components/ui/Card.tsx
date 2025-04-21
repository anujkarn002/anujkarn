import React from "react";
import type { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={clsx(
        "bg-white/5 border border-white/10 rounded-lg shadow-md p-6 transition hover:shadow-lg hover:border-accent/70 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
