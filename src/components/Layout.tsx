import React from 'react';

type IProps = {
  children: React.ReactNode;
};

function Layout({ children }: IProps) {
  return (
    <>
      <div className="py-4 bg-gray-200 flex justify-center">Playground</div>
      <div>{children}</div>
    </>
  );
}

export default Layout;
