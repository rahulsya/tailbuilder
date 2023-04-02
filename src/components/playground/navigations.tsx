import React from 'react';

const NavTypeOne = () => {
  return (
    <div className="flex justify-between items-center px-5 py-5 bg-gray-800 text-gray-100 text-sm rounded-lg">
      <div className="font-bold">Zanrly</div>
      <div className="flex">
        <div className="pr-2">Features</div>
        <div className="pr-2">Solutions</div>
        <div className="pr-2">Resources</div>
        <div>Pricing</div>
      </div>
      <div>Log in</div>
    </div>
  );
};
const NavTypeTwo = () => {
  return (
    <div className="flex justify-between items-center px-5 py-5 bg-white text-gray-800 text-sm rounded-lg">
      <div className="font-bold">Zanrly</div>
      <div className="flex">
        <div className="pr-2">Features</div>
        <div className="pr-2">Solutions</div>
        <div className="pr-2">Resources</div>
        <div>Pricing</div>
      </div>
      <div>Log in</div>
    </div>
  );
};

function Navigations({ type }: { type?: string }) {
  if (type == 'dark') {
    return <NavTypeOne />;
  }
  return <NavTypeTwo />;
}

export default Navigations;
