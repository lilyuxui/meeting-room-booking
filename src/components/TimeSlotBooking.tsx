import React, { useState } from 'react';
import TimeSlot from './TimeSlot';
import clock from '../assets/clock.svg';
import BookingDetailModal from './BookingDetailModal';
import BookingConfirmationModal from './BookingConfirmationModal';

interface TimeSlotBookingProps {
  selectedRoom: 'lime' | 'teal';
  selectedDate: Date;
}

interface TimeSlotData {
  id: string;
  time: string;
  status: 'available' | 'booked';
  bookedBy?: string;
}

const TimeSlotBooking: React.FC<TimeSlotBookingProps> = ({ selectedRoom, selectedDate }) => {
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set(['8:30-9:00']));
  const [slotBookings, setSlotBookings] = useState<Map<string, { name: string; email: string }>>(
    new Map([['8:30-9:00', { name: 'Lily', email: 'lily@example.com' }]])
  );
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotData | null>(null);
  const [lastBookingData, setLastBookingData] = useState<{ name: string; email: string } | null>(null);

  const timeSlots: TimeSlotData[] = [
    { id: '8:00-8:30', time: '8:00 - 8:30 AM', status: 'available' },
    { id: '8:30-9:00', time: '8:30 - 9:00 AM', status: 'booked', bookedBy: 'Lily' },
    { id: '9:00-9:30', time: '9:00 - 9:30 AM', status: 'available' },
    { id: '9:30-10:00', time: '9:30 - 10:00 AM', status: 'available' },
    { id: '10:00-10:30', time: '10:00 - 10:30 AM', status: 'available' },
    { id: '10:30-11:00', time: '10:30 - 11:00 AM', status: 'available' },
    { id: '11:00-11:30', time: '11:00 - 11:30 AM', status: 'available' },
    { id: '11:30-12:00', time: '11:30 - 12:00 PM', status: 'available' },
    { id: '12:00-12:30', time: '12:00 - 12:30 PM', status: 'available' },
    { id: '12:30-1:00', time: '12:30 - 1:00 PM', status: 'available' },
    { id: '1:00-1:30', time: '1:00 - 1:30 PM', status: 'available' },
    { id: '1:30-2:00', time: '1:30 - 2:00 PM', status: 'available' },
    { id: '2:00-2:30', time: '2:00 - 2:30 PM', status: 'available' },
    { id: '2:30-3:00', time: '2:30 - 3:00 PM', status: 'available' },
    { id: '3:00-3:30', time: '3:00 - 3:30 PM', status: 'available' },
    { id: '3:30-4:00', time: '3:30 - 4:00 PM', status: 'available' },
    { id: '4:00-4:30', time: '4:00 - 4:30 PM', status: 'available' },
    { id: '4:30-5:00', time: '4:30 - 5:00 PM', status: 'available' },
  ];

  const handleBookSlot = (slotId: string) => {
    const slot = timeSlots.find(s => s.id === slotId);
    if (slot) {
      setSelectedSlot(slot);
      setShowBookingModal(true);
    }
  };

  const handleBookingConfirm = (bookingData: { name: string; email: string }) => {
    if (selectedSlot) {
      setLastBookingData(bookingData);
      setBookedSlots(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedSlot.id);
        return newSet;
      });
      setSlotBookings(prev => {
        const newMap = new Map(prev);
        newMap.set(selectedSlot.id, bookingData);
        return newMap;
      });
      setShowBookingModal(false);
      setShowConfirmationModal(true);
    }
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedSlot(null);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setLastBookingData(null);
  };

  const getRoomDisplayName = () => {
    return selectedRoom === 'lime' ? 'Room Lime' : 'Room Teal';
  };

  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <>
      <div className="bg-background-light flex flex-col gap-6 items-start justify-start p-4 rounded-2xl w-full border border-border-light relative">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-4 items-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <img src={clock} alt="Clock" className="w-5 h-5" />
            </div>
            <h2 className="font-inter font-bold text-xl text-text-primary leading-tight">
              Book Slot
            </h2>
          </div>
          <p className="font-inter font-normal text-base text-text-secondary leading-tight">
            Click available 30-minute slots to book
          </p>
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          {/* Responsive grid: Mobile (1 column), Tablet (2 columns), Desktop (2 columns with larger slots) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            {timeSlots.map((slot) => (
              <TimeSlot
                key={slot.id}
                slot={slot}
                isBooked={bookedSlots.has(slot.id)}
                onBook={handleBookSlot}
                roomName={getRoomDisplayName()}
                selectedDate={selectedDate}
                bookedBy={slotBookings.get(slot.id)?.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedSlot && (
        <BookingDetailModal
          isOpen={showBookingModal}
          onClose={handleCloseBookingModal}
          onConfirm={handleBookingConfirm}
          roomName={getRoomDisplayName()}
          date={formatDate(selectedDate)}
          time={selectedSlot.time}
        />
      )}

      {/* Booking Confirmation Modal */}
      {lastBookingData && (
        <BookingConfirmationModal
          isOpen={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          roomName={getRoomDisplayName()}
          date={formatDate(selectedDate)}
          time={selectedSlot?.time || ''}
          userName={lastBookingData.name}
          userEmail={lastBookingData.email}
        />
      )}
    </>
  );
};

export default TimeSlotBooking;
