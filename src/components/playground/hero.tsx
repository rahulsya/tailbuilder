import React from 'react';
import Image from 'next/image';

const HerOne = () => {
  return (
    <div className="w-full flex justify-center items-start bg-white rounded-lg py-12">
      <div className="w-[370px] mr-10">
        <Image
          alt="tablet"
          className="rounded-md"
          src={require(`../../assets/Tablet.jpg`)}
        />
      </div>
      <div className="flex flex-col ml-10 ">
        <div className="uppercase">Feature</div>
        <div className="text-3xl w-[300px] font-bold">
          Let’s track your business{' '}
          <span className="text-blue-400">easily!</span>
        </div>
        <div className="font-semibold text-xs w-[400px] pt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          venenatis volutpat velit.
        </div>
      </div>
    </div>
  );
};

const HeroTwo = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white rounded-lg py-12">
      <div className="flex flex-col mr-10 ">
        <div className="uppercase py-4">BEST CAPTION HERE</div>
        <div className="text-4xl w-[300px] font-bold">
          Build better products <span className="text-red-400">faster</span>
        </div>
        <div className="text-4xl w-[300px] font-bold"> than ever.</div>
        <div className="font-semibold text-xs w-[400px] pt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          venenatis volutpat velit.
        </div>
      </div>
      <div className="ml-10">
        <Image
          alt="tablet"
          className="rounded-md object-cover w-[370px] h-[500px]"
          src={require(`../../assets/Tabletone.jpg`)}
        />
      </div>
    </div>
  );
};

function Hero({ type }: { type?: string }) {
  if (type == 'hero-two') {
    return <HeroTwo />;
  }
  return <HerOne />;
}

export default Hero;
