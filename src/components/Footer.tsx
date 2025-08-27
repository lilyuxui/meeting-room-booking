import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light px-2.5 py-5 w-full">
      <div className="flex gap-6 items-center justify-center max-w-896 mx-auto">
        <div className="font-inter font-normal h-full text-sm text-text-secondary text-center w-full">
          Made by Lily Yang with love
        </div>
      </div>
    </footer>
  );
};

export default Footer;
