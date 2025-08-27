import React, { useState } from 'react';
import plus from '../assets/plus.svg';
import user from '../assets/user.svg';

interface TimeSlotData {
  id: string;
  time: string;
  status: 'available' | 'booked';
  bookedBy?: string;
}

interface TimeSlotProps {
  slot: TimeSlotData;
  isBooked: boolean;
  onBook: (slotId: string) => void;
  roomName: string;
  selectedDate: Date;
  bookedBy?: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ slot, isBooked, onBook, roomName, selectedDate, bookedBy }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleBookClick = () => {
    onBook(slot.id);
  };

  if (isBooked) {
    return (
      <div className="bg-[#f4f4f6] relative rounded-[6px] w-full h-full">
        <div className="flex flex-col items-center justify-between p-4 w-full h-full">
          <div className="flex items-center justify-between w-full">
            <div className="font-inter font-bold text-[14px] text-[#121c2d] leading-[1.5]">
              {slot.time}
            </div>
            <div className="bg-[#cacdd8] px-2 py-0.5 rounded-[4px]">
              <div className="font-inter font-medium text-xs text-[#121c2d] leading-[1.5]">
                Booked
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-start w-full">
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              <img src={user} alt="User" className="w-[18px] h-[18px]" />
            </div>
            <div className="font-inter font-normal text-[14px] text-[#606b85] leading-[1.5]">
              {bookedBy || slot.bookedBy || 'Unknown'}
            </div>
          </div>
        </div>
        <div className="absolute border border-[#cacdd8] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-[6px] w-full h-full transition-colors ${
        isHovered ? 'bg-white' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-center justify-between p-4 w-full h-full">
        <div className="flex items-center justify-between w-full">
          <div className={`font-inter font-bold text-[14px] leading-[1.5] ${
            isHovered ? 'text-[#0e7c3a]' : 'text-[#121c2d]'
          }`}>
            {slot.time}
          </div>
          <div className="bg-[#edfdf3] px-2 py-0.5 rounded-[4px]">
            <div className="font-inter font-medium text-xs text-[#0e7c3a] leading-[1.5]">
              Available
            </div>
          </div>
        </div>
        <button
          onClick={handleBookClick}
          className="bg-white flex gap-1 items-center justify-center px-3 py-1.5 rounded-[6px] hover:bg-gray-50 transition-colors"
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center">
            <img src={plus} alt="Book" className="w-[18px] h-[18px]" />
          </div>
          <div className="font-inter font-medium text-xs text-[#606b85] leading-[1.5]">
            Book now
          </div>
        </button>
      </div>
      <div className={`absolute border border-solid inset-0 pointer-events-none rounded-[6px] ${
        isHovered ? 'border-[#36d576]' : 'border-[#e1e3ea]'
      }`} />
    </div>
  );
};

export default TimeSlot;
