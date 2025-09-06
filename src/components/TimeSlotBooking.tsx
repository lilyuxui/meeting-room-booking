import React, { useState } from 'react';
import TimeSlot from './TimeSlot';
import clock from '../assets/clock.svg';
import BookingDetailModal from './BookingDetailModal';
import BookingConfirmationModal from './BookingConfirmationModal';

// Helpers for per-room, per-date keys (module scope to avoid hook deps warnings)
const toDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getKey = (room: 'lime' | 'teal', date: Date) => `${room}|${toDateKey(date)}`;

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

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
  // Per-room, per-date booking state
  type BookingMap = Map<string, Set<string>>; // key -> set of slot IDs
  type BookingDetailMap = Map<string, Map<string, { name: string; email: string }>>; // key -> slotId -> details

  const [bookings, setBookings] = useState<BookingMap>(new Map());
  const [bookingDetails, setBookingDetails] = useState<BookingDetailMap>(new Map());

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotData | null>(null);
  const [lastBookingData, setLastBookingData] = useState<{ name: string; email: string } | null>(null);

  const timeSlots: TimeSlotData[] = [
    { id: '8:00-8:30', time: '8:00 - 8:30 AM', status: 'available' },
    { id: '8:30-9:00', time: '8:30 - 9:00 AM', status: 'available' },
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

  // Seed example booking for "today" per room without overwriting existing entries
  React.useEffect(() => {
    if (!isToday(selectedDate)) return;
    const key = getKey(selectedRoom, selectedDate);

    setBookings(prev => {
      if (prev.has(key)) return prev;
      const next = new Map(prev);
      next.set(key, new Set(['8:30-9:00']));
      return next;
    });
    setBookingDetails(prev => {
      if (prev.has(key)) return prev;
      const next = new Map(prev);
      next.set(key, new Map([['8:30-9:00', { name: 'Lily', email: 'lily@example.com' }]]));
      return next;
    });
  }, [selectedDate, selectedRoom]);

  const handleBookSlot = (slotId: string) => {
    const slot = timeSlots.find(s => s.id === slotId);
    if (slot) {
      setSelectedSlot(slot);
      setShowBookingModal(true);
    }
  };

  const handleBookingConfirm = (bookingData: { name: string; email: string }) => {
    if (!selectedSlot) return;
    const key = getKey(selectedRoom, selectedDate);

    setLastBookingData(bookingData);

    setBookings(prev => {
      const next = new Map(prev);
      const current = next.get(key) ? new Set(next.get(key)!) : new Set<string>();
      current.add(selectedSlot.id);
      next.set(key, current);
      return next;
    });

    setBookingDetails(prev => {
      const next = new Map(prev);
      const current = next.get(key) ? new Map(next.get(key)!) : new Map<string, { name: string; email: string }>();
      current.set(selectedSlot.id, bookingData);
      next.set(key, current);
      return next;
    });

    setShowBookingModal(false);
    setShowConfirmationModal(true);
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
            {(() => {
              const key = getKey(selectedRoom, selectedDate);
              const currentBooked = bookings.get(key) ?? new Set<string>();
              const currentDetails = bookingDetails.get(key) ?? new Map<string, { name: string; email: string }>();
              return timeSlots.map((slot) => (
                <TimeSlot
                  key={slot.id}
                  slot={slot}
                  isBooked={currentBooked.has(slot.id)}
                  onBook={handleBookSlot}
                  roomName={getRoomDisplayName()}
                  selectedDate={selectedDate}
                  bookedBy={currentDetails.get(slot.id)?.name}
                />
              ));
            })()}
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
