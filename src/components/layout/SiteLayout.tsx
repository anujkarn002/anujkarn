import React from "react";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full bg-matte-black text-white">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};
