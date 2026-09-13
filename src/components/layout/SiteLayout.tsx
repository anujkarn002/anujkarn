import React from "react";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative z-10 min-h-screen w-full text-white pt-16">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};
