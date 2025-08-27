import React, { useState, useEffect } from 'react';
import arrowDown from '../assets/arrow-down.svg';
import arrowUp from '../assets/arrow-up.svg';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  // Sync currentMonth with selectedDate changes
  useEffect(() => {
    setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  }, [selectedDate]);

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      day: days[date.getDay()],
      date: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    };
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const handleDateSelect = (date: Date) => {
    // Only allow selection of current or future dates
    if (!isPastDate(date)) {
      onDateChange(date);
      setIsOpen(false);
    }
  };

  const { day, date } = formatDate(selectedDate);
  const days = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="relative">
      {/* Date Display Button - Default State */}
      <div className="bg-white relative rounded-3xl w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex gap-2 items-center justify-center px-6 py-2 w-full rounded-3xl hover:bg-gray-100 transition-colors"
        >
          <div className="flex gap-2 items-center justify-center w-40">
            <div className="flex flex-col font-inter font-bold justify-center text-black">
              <p className="leading-[1.5] text-nowrap text-sm">{day}</p>
            </div>
            <div className="flex flex-col font-inter font-normal justify-center text-[#676767]">
              <p className="leading-[1.5] text-nowrap text-sm">{date}</p>
            </div>
          </div>
          <div className="relative shrink-0 size-6">
            <img 
              src={isOpen ? arrowUp : arrowDown} 
              alt={isOpen ? "Close calendar" : "Open calendar"} 
              className="block max-w-none size-full" 
            />
          </div>
        </button>
        <div aria-hidden="true" className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-3xl" />
      </div>

      {/* Calendar Dropdown - Expanded State */}
      {isOpen && (
        <div className="absolute bg-white left-0 rounded-md top-12 w-60 z-10 shadow-lg border border-[#d9d9d9]">
          <div className="grid grid-cols-7 grid-rows-[auto_auto_auto_auto_auto_auto_auto] gap-0 overflow-hidden p-2 w-60">
            {/* Month Navigation */}
            <div className="col-span-7 flex items-center justify-between px-2 py-2 h-8">
              <button
                onClick={goToPreviousMonth}
                className="place-self-center relative shrink-0 size-6 hover:bg-background-gray rounded transition-colors"
              >
                <img src={arrowLeft} alt="Previous month" className="block max-w-none size-full" />
              </button>
              <div className="font-inter font-bold text-[#121c2d] text-sm">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button
                onClick={goToNextMonth}
                className="place-self-center relative shrink-0 size-6 hover:bg-background-gray rounded transition-colors"
              >
                <img src={arrowRight} alt="Next month" className="block max-w-none size-full" />
              </button>
            </div>

            {/* Week Days Header */}
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
              <div key={index} className="bg-white flex items-center justify-center px-2 py-2 h-6 relative rounded shrink-0">
                <div className="font-inter font-normal text-[#606b85] text-xs">
                  {day}
                </div>
              </div>
            ))}

            {/* Calendar Days */}
            {days.map((day, index) => (
              <div key={index} className={`flex items-center justify-center px-2 py-2 h-8 relative rounded shrink-0 ${
                day && isSelected(day)
                  ? 'bg-[#0e7c3a]'
                  : day && isToday(day)
                  ? 'bg-[#edfdf3]'
                  : 'bg-white'
              }`}>
                {day ? (
                  <button
                    onClick={() => handleDateSelect(day)}
                    disabled={isPastDate(day)}
                    className={`
                      font-inter font-normal text-xs text-nowrap leading-[1.5] 
                      ${isSelected(day)
                        ? 'text-white'
                        : isToday(day)
                        ? 'text-[#121c2d]'
                        : isPastDate(day)
                        ? 'text-[#9ca3af] cursor-not-allowed'
                        : 'text-[#121c2d] hover:text-[#0e7c3a]'
                      }
                      ${!isPastDate(day) ? 'hover:bg-gray-50' : ''}
                      transition-colors
                    `}
                  >
                    {day.getDate()}
                  </button>
                ) : (
                  <div className="w-6 h-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;