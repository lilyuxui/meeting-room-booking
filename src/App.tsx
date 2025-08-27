import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RoomSelection from './components/RoomSelection';
import DateSelection from './components/DateSelection';
import TimeSlotBooking from './components/TimeSlotBooking';
import Footer from './components/Footer';

function App() {
  const [selectedRoom, setSelectedRoom] = useState<'lime' | 'teal'>('lime');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Set document title
  useEffect(() => {
    document.title = 'GL - Meeting Booth Booking App';
  }, []);

  return (
    <div className="min-h-screen bg-background-light font-inter">
      <Header />
      <main className="flex flex-col items-center justify-start gap-8 px-4 py-12 pb-24 md:px-8 lg:px-0">
        <div className="w-full max-w-896 flex flex-col gap-8">
          <RoomSelection 
            selectedRoom={selectedRoom} 
            onRoomChange={setSelectedRoom} 
          />
          <div className="flex flex-col gap-8">
            <DateSelection 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate} 
            />
            <TimeSlotBooking 
              selectedRoom={selectedRoom} 
              selectedDate={selectedDate} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
