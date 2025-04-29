'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface FormData {
  vehicleIssue: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  appointmentDate: Date | null;
  appointmentTime: string;
  carMake: string;
  carModel: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  startTime: string;
  endTime: string;
}

interface DateSlots {
  date: string;
  slots: TimeSlot[];
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    vehicleIssue: '',
    fullName: '',
    phoneNumber: '',
    email: '',
    appointmentDate: null,
    appointmentTime: '',
    carMake: '',
    carModel: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // State to store available slots for each date
  const [availableSlots, setAvailableSlots] = useState<DateSlots[]>([]);
  const [datesLoading, setDatesLoading] = useState(true);

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, '');
    if (cleaned.length >= 7) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`.trim();
    } else if (cleaned.length >= 4) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}`.trim();
    } else if (cleaned.length > 0) {
      return `(${cleaned}`;
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phoneNumber' ? formatPhoneNumber(value) : value
    }));
  };

  const handleDateClick = (e: React.MouseEvent, date: Date) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      appointmentDate: date
    }));
  };

  const handleTimeClick = (e: React.MouseEvent, time: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData(prev => ({
      ...prev,
      appointmentTime: time
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.appointmentDate || !formData.appointmentTime || !formData.fullName || !formData.phoneNumber || 
        !formData.email || !formData.vehicleIssue) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Log the form data for debugging
      console.log('Form Data:', formData);

      const appointmentTime = formData.appointmentTime;
      const appointmentDate = formData.appointmentDate?.toISOString().split('T')[0];
      
      console.log('Date and Time:', { appointmentDate, appointmentTime });

      // Create the date object with the correct time
      const [hours, minutes] = appointmentTime.split(':');
      const date = new Date(appointmentDate);
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      
      // Ensure we're using the local timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const isoTimestamp = date.toISOString();

      console.log('Final ISO Timestamp:', isoTimestamp);
      
      const bookingData = {
        date: isoTimestamp,
        service: formData.vehicleIssue,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        carMake: formData.carMake || '',
        carModel: formData.carModel || '',
        timezone
      };

      console.log('Sending booking data:', bookingData);

      const apiResponse = await fetch(`/api/calendar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        console.error('API Error Response:', errorData);
        setError(errorData.message || 'Failed to book appointment');
        return;
      }

      const responseData = await apiResponse.json();
      console.log('API Success Response:', responseData);
      setSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Submission Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      vehicleIssue: '',
      fullName: '',
      phoneNumber: '',
      email: '',
      appointmentDate: null,
      appointmentTime: '',
      carMake: '',
      carModel: '',
    });
  };

  // Generate next 14 days, grouped into weeks starting with Sunday and ending with Saturday, but left-align the first week
  const generateCalendarWeeks = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    // Group into weeks starting with Sunday
    const weeks = [];
    let week = [];
    for (let i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    // Pad the last week if needed (add nulls at the end)
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }
    return weeks;
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00'
  ];

  const formatDisplayTime = (time: string): string => {
    const [hours] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Fetch available slots for the next 14 days
  useEffect(() => {
    const fetchSlots = async (days: Date[]) => {
      setDatesLoading(true);
      try {
        const slots = await Promise.all(
          days.map(async (date) => {
            try {
              const dateStr = date.toISOString().split('T')[0];
              const res = await fetch(`/api/calendar?date=${dateStr}`);
              
              if (!res.ok) {
                const errorData = await res.json();
                console.error(`Failed to fetch slots for ${dateStr}:`, {
                  status: res.status,
                  statusText: res.statusText,
                  error: errorData
                });
                return { 
                  date: dateStr, 
                  slots: [] 
                };
              }

              const data = await res.json();
              
              if (!data.timeSlots || !Array.isArray(data.timeSlots)) {
                console.error(`Invalid slots data for ${dateStr}:`, data);
                return {
                  date: dateStr,
                  slots: []
                };
              }

              return { 
                date: dateStr, 
                slots: data.timeSlots.map((slot: TimeSlot) => ({
                  ...slot,
                  available: !!slot.available
                }))
              };
            } catch (error) {
              console.error(`Error fetching slots for date ${date}:`, error);
              return { 
                date: date.toISOString().split('T')[0], 
                slots: [] 
              };
            }
          })
        );
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        setDatesLoading(false);
      }
    };

    const days = generateCalendarWeeks().flat().filter((date): date is Date => date !== null);
    fetchSlots(days);
  }, []);

  const isDateAvailable = (date: Date): boolean => {
    // Sunday is not available
    if (date.getDay() === 0) return false;

    // Check if date is today
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      // For today, check if we're within 2 hours of current time
      const now = new Date();
      const twoHoursFromNow = new Date(now.getTime() + (2 * 60 * 60 * 1000));
      const dateStr = date.toISOString().split('T')[0];
      const slotsForDate = availableSlots.find(slot => slot.date === dateStr);
      
      if (!slotsForDate) return false;

      // Check if any slots are available after the 2-hour buffer
      return slotsForDate.slots.some(slot => {
        const slotTime = new Date(`${dateStr}T${slot.time}`);
        return slot.available && slotTime > twoHoursFromNow;
      });
    }

    // For future dates, check if there are any available slots
    const dateStr = date.toISOString().split('T')[0];
    const slotsForDate = availableSlots.find(slot => slot.date === dateStr);
    return slotsForDate?.slots.some(slot => slot.available) ?? false;
  };

  return (
    <div className="relative z-30">
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
        {/* Left Column - Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s going on with your vehicle today?</h3>
          
          {/* Vehicle Issue Text Area */}
          <div className="mb-8">
            <textarea
              id="vehicleIssue"
              name="vehicleIssue"
              value={formData.vehicleIssue}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors h-32 resize-none cursor-text"
              placeholder="Please describe the issues you're experiencing with your vehicle..."
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-text"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-text"
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-text"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="carMake" className="block text-sm font-medium text-gray-700 mb-2">Car Make</label>
              <input
                id="carMake"
                type="text"
                name="carMake"
                value={formData.carMake}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-text"
                placeholder="e.g. Toyota"
                required
              />
            </div>
            <div>
              <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 mb-2">Car Model</label>
              <input
                id="carModel"
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-text"
                placeholder="e.g. Camry"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Date & Time</h3>
          
          {/* Calendar */}
          <div className="mb-8">
            <div className="grid gap-1">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center text-sm text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              {generateCalendarWeeks().map((week, wIdx) => (
                <div key={wIdx} className="grid grid-cols-7 gap-1">
                  {week.map((date, dIdx) => (
                    date ? (
                      <button
                        type="button"
                        key={dIdx}
                        onClick={(e) => {
                          if (isDateAvailable(date)) handleDateClick(e, date);
                        }}
                        className={`p-2 rounded-lg border text-center transition-all duration-200 cursor-pointer ${
                          date.toDateString() === formData.appointmentDate?.toDateString()
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : date.getDay() === 0
                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                            : isDateAvailable(date)
                            ? 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                        }`}
                        disabled={!isDateAvailable(date)}
                      >
                        <span className="text-xs text-gray-500 block">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-sm font-medium block">
                          {date.getDate()}
                        </span>
                      </button>
                    ) : (
                      <div key={dIdx}></div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots - Only show if date is selected */}
          {formData.appointmentDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
              <div className="grid grid-cols-4 gap-2">
                {formData.appointmentDate ? (() => {
                  const appointmentDate = formData.appointmentDate!.toISOString().split('T')[0];
                  return (availableSlots.find(slot => slot.date === appointmentDate)?.slots || [])
                    .filter(slot => slot.available)
                    .map((slot) => (
                      <button
                        type="button"
                        key={slot.time}
                        onClick={(e) => handleTimeClick(e, slot.time)}
                        className={`p-2 rounded-lg border text-center transition-all duration-200 cursor-pointer hover:border-primary-200 ${
                          formData.appointmentTime === slot.time
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-sm font-medium">{formatDisplayTime(slot.time)}</span>
                      </button>
                    ))
                })() : null}
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 text-green-500 text-sm">
              Appointment scheduled successfully!
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Scheduling...' : 'Schedule Appointment'}
          </motion.button>
        </div>
      </form>
    </div>
  );
} 