import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
