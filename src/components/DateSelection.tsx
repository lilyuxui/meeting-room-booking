import React from 'react';
import calendar from '../assets/calendar.svg';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';
import DatePicker from './DatePicker';

interface DateSelectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DateSelection: React.FC<DateSelectionProps> = ({ selectedDate, onDateChange }) => {
  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className="bg-background-light flex flex-col gap-6 items-start justify-start p-4 rounded-2xl w-full border border-border-light relative">
      <div className="flex items-start justify-between w-full">
        <div className="flex gap-4 items-center">
          <div className="w-6 h-6 flex items-center justify-center">
            <img src={calendar} alt="Calendar" className="w-5 h-5" />
          </div>
          <h2 className="font-inter font-bold text-xl text-text-primary leading-tight">
            Schedule Date
          </h2>
        </div>
        <button
          onClick={goToToday}
          className={`px-3 py-1.5 rounded-md font-inter font-medium text-xs transition-colors ${
            isToday
              ? 'bg-brand-default text-brand-secondary'
              : 'bg-background-light text-text-primary border border-border-light hover:bg-background-gray'
          }`}
        >
          Today
        </button>
      </div>
      
      <div className="flex items-center justify-between w-full">
        {/* Always side by side for all breakpoints */}
        <div className="flex flex-row items-center justify-between w-full">
          <button
            onClick={goToPreviousDay}
            className="bg-background-light p-1.5 rounded-md border border-border-light hover:bg-background-gray transition-colors flex items-center gap-1"
          >
            <img src={arrowLeft} alt="Previous" className="w-4 h-4" />
          </button>
          
          <div className="flex flex-col gap-2 items-center justify-center w-full md:w-60">
            <DatePicker 
              key={selectedDate.toDateString()} 
              selectedDate={selectedDate} 
              onDateChange={onDateChange} 
            />
          </div>
          
          <button
            onClick={goToNextDay}
            className="bg-background-light p-1.5 rounded-md border border-border-light hover:bg-background-gray transition-colors flex items-center gap-1"
          >
            <img src={arrowRight} alt="Next" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
