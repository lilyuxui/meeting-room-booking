import React from 'react';
import illustration from '../assets/illustration.png';

interface RoomSelectionProps {
  selectedRoom: 'lime' | 'teal';
  onRoomChange: (room: 'lime' | 'teal') => void;
}

const RoomSelection: React.FC<RoomSelectionProps> = ({ selectedRoom, onRoomChange }) => {
  return (
    <div className="bg-background-light flex flex-col gap-6 items-center justify-start p-4 rounded-2xl w-full">
      {/* Illustration */}
      <div className="bg-brand-tertiary h-40 w-80 rounded-lg flex items-center justify-center overflow-hidden">
        <img src={illustration} alt="Room Selection" className="w-full h-full object-cover" />
      </div>
      
      <div className="flex gap-4 items-center justify-center w-full">
        <div className="flex flex-col gap-0.5 items-center text-center w-72">
          <h2 className="font-inter font-bold text-xl text-text-primary leading-tight">
            Select Booth Room
          </h2>
          <p className="font-inter font-normal text-base text-text-secondary leading-tight">
            Choose which room to view and book
          </p>
        </div>
      </div>
      
      <div className="bg-background-gray p-1.5 rounded-3xl flex gap-2.5">
        <button
          onClick={() => onRoomChange('lime')}
          className={`px-6 py-2 rounded-3xl font-inter font-bold text-sm transition-colors ${
            selectedRoom === 'lime'
              ? 'bg-brand-default text-brand-secondary'
              : 'bg-transparent text-text-primary hover:bg-background-light'
          }`}
        >
          Room Lime
        </button>
        <button
          onClick={() => onRoomChange('teal')}
          className={`px-6 py-2 rounded-3xl font-inter font-bold text-sm transition-colors ${
            selectedRoom === 'teal'
              ? 'bg-brand-default text-brand-secondary'
              : 'bg-transparent text-text-primary hover:bg-background-light'
          }`}
        >
          Room Teal
        </button>
      </div>
    </div>
  );
};

export default RoomSelection;
