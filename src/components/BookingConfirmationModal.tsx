import React from 'react';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';
import email from '../assets/email.svg';
import cross from '../assets/cross.svg';
import tickCircle from '../assets/tick-circle.svg';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomName: string;
  date: string;
  time: string;
  userName: string;
  userEmail: string;
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  roomName,
  date,
  time,
  userName,
  userEmail
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 py-4">
      <div className="bg-white rounded-[16px] p-4 w-[calc(100%-32px)] max-w-md">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex gap-6 items-center">
                <div className="w-[30px] h-[30px] flex items-center justify-center">
                  <img src={tickCircle} alt="Success" className="w-[30px] h-[30px]" />
                </div>
                <h2 className="font-inter font-bold text-[20px] text-[#121c2d] leading-[1.5]">
                  Booking Success
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-[30px] h-[30px] flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
              >
                <img src={cross} alt="Close" className="w-[30px] h-[30px]" />
              </button>
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="bg-[#edfdf3] rounded-[6px] p-4">
            <div className="flex items-center mb-4">
              <h3 className="font-inter font-bold text-[16px] text-[#121c2d] leading-[1.5]">
                {roomName}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex gap-[15px] items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img src={calendar} alt="Calendar" className="w-6 h-6" />
                  </div>
                  <span className="font-inter font-normal text-[16px] text-[#121c2d] leading-[1.5]">
                    {date}
                  </span>
                </div>
                <div className="flex gap-[15px] items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img src={clock} alt="Clock" className="w-6 h-6" />
                  </div>
                  <span className="font-inter font-normal text-[16px] text-[#121c2d] leading-[1.5]">
                    {time}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-[15px] items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img src={user} alt="User" className="w-6 h-6" />
                  </div>
                  <span className="font-inter font-normal text-[16px] text-[#121c2d] leading-[1.5]">
                    {userName}
                  </span>
                </div>
                <div className="flex gap-[15px] items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img src={email} alt="Email" className="w-6 h-6" />
                  </div>
                  <span className="font-inter font-normal text-[16px] text-[#121c2d] leading-[1.5]">
                    {userEmail}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="text-center">
            <p className="font-inter font-normal text-[16px] text-[#606b85] leading-[1.5]">
              An confirmation email has been sent to email:{' '}
              <span className="text-[#121c2d]">{userEmail}</span>
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#0e7c3a] px-3 py-1.5 rounded-[6px] font-inter font-medium text-[12px] text-white leading-[1.5] hover:bg-[#0a5f2e] transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
