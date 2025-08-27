import React, { useState } from 'react';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import cross from '../assets/cross.svg';

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: { name: string; email: string }) => void;
  roomName: string;
  date: string;
  time: string;
}

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  roomName,
  date,
  time
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onConfirm({ name: name.trim(), email: email.trim() });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[16px] p-4 w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h2 className="font-inter font-bold text-[20px] text-[#121c2d] leading-[1.5]">
                Confirm Booking
              </h2>
              <button
                onClick={onClose}
                className="w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <img src={cross} alt="Close" className="w-[30px] h-[30px]" />
              </button>
            </div>
            <p className="font-inter font-normal text-[16px] text-[#606b85] leading-[1.5]">
              Complete your booking details
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-[#f4f4f6] rounded-[6px] p-4">
            <div className="flex items-center mb-4">
              <h3 className="font-inter font-bold text-[16px] text-[#121c2d] leading-[1.5]">
                {roomName}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-[15px] items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={calendar} alt="Calendar" className="w-6 h-6" />
                </div>
                <span className="font-inter font-normal text-[16px] text-[#606b85] leading-[1.5]">
                  {date}
                </span>
              </div>
              <div className="flex gap-[15px] items-center">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={clock} alt="Clock" className="w-6 h-6" />
                </div>
                <span className="font-inter font-normal text-[16px] text-[#606b85] leading-[1.5]">
                  {time}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-inter font-bold text-[14px] text-[#121c2d] leading-[1.5] mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="bg-white border border-[#e1e3ea] rounded-[4px] px-3 py-2 h-9 font-inter font-normal text-[14px] text-[#121c2d] leading-[20px] focus:outline-none focus:border-[#0e7c3a] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-inter font-bold text-[14px] text-[#121c2d] leading-[1.5] mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-white border border-[#e1e3ea] rounded-[4px] px-3 py-2 h-9 font-inter font-normal text-[14px] text-[#121c2d] leading-[20px] focus:outline-none focus:border-[#0e7c3a] transition-colors"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 items-center justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-white border border-[#e1e3ea] px-3 py-1.5 rounded-[6px] font-inter font-medium text-[12px] text-[#121c2d] leading-[1.5] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#0e7c3a] px-3 py-1.5 rounded-[6px] font-inter font-medium text-[12px] text-white leading-[1.5] hover:bg-[#0a5f2e] transition-colors"
              >
                Book room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
