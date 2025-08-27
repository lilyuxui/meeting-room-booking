import React from 'react';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <header className="bg-background-light px-2.5 py-5 w-full">
      <div className="flex gap-6 items-center justify-start max-w-896 mx-auto">
        <div className="bg-brand-tertiary rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>
        <div className="flex flex-col gap-0.5 grow min-w-0">
          <h1 className="font-inter font-bold text-2xl text-text-primary leading-tight">
            GL - Meeting Booth Booking App
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
