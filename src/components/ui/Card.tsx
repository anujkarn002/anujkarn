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
        "hud-panel tilt-card rounded-lg shadow-md p-6",
        className
      )}
    >
      {children}
    </div>
  );
};
