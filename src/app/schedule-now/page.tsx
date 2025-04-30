'use client';

import { useState, useEffect } from 'react';
import { format, addDays, isBefore, isAfter, startOfDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckIcon, ArrowLeftIcon, ArrowRightIcon, CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import MouseFollowGradient from '@/components/MouseFollowGradient';

interface TimeSlot {
  time: string;
  available: boolean;
  startTime: string;
  endTime: string;
}

export default function ScheduleNow() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    service: '',
    customService: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    startTime: '',
    endTime: '',
  });

  // Calculate date range
  const today = startOfDay(new Date());
  const twoWeeksFromNow = addDays(today, 14);

  const filterDate = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Disable Sundays (0) and Saturdays (6)
  };

  const fetchTimeSlots = async (date: string) => {
    try {
      setLoading(true);
      setError('');
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await fetch(`/api/calendar?date=${date}&timezone=${timezone}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch time slots');
      }
      
      const data = await response.json();
      console.log('Fetched time slots:', {
        date,
        timezone,
        slotsCount: data.timeSlots.length,
        hasSlots: data.timeSlots.length > 0
      });
      
      setAvailableTimeSlots(data.timeSlots);
    } catch (error) {
      console.error('Error fetching time slots:', error);
      setError('Failed to fetch available times. Please try again.');
      setAvailableTimeSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelection = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime('');
    
    if (date) {
      const dateStr = date.toLocaleDateString('en-CA');
      console.log('Selected date:', {
        date: dateStr,
        dayOfWeek: date.getDay(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
      fetchTimeSlots(dateStr);
    }
  };

  const handleTimeSelection = (startTime: string, endTime: string, displayTime: string) => {
    setSelectedTime(displayTime);
  };

  const formatPhoneNumber = (input: string): string => {
    const cleaned = input.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startTime: formData.startTime,
          endTime: formData.endTime,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          carMake: formData.carMake,
          carModel: formData.carModel,
          serviceType: formData.service === 'Other' ? formData.customService : formData.service
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to success page or show success message
        setStep(4); // Success step
      } else {
        throw new Error(data.error || 'Failed to book appointment');
      }
    } catch (err) {
      setError('Failed to book appointment. Please try again or call us.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stepIcons = [
    <UserIcon key="user" className="w-5 h-5" />,
    <CalendarIcon key="calendar" className="w-5 h-5" />,
    <ClockIcon key="clock" className="w-5 h-5" />
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Let&apos;s Get You Scheduled
            </h1>
            <p className="text-lg text-blue-50">
              We&apos;ll have your vehicle back to its best condition
            </p>
          </div>
        </div>
      </section>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
              <h1 className="text-3xl font-display font-bold text-white text-center">Schedule Service</h1>
            </div>
            
            {/* Progress Steps */}
            <div className="px-8 pt-8">
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-5 right-5 h-0.5">
                  <div className="relative h-full">
                    <div className="absolute inset-0 bg-gray-200"></div>
                    <div 
                      className="absolute inset-0 bg-blue-500 transition-all duration-300"
                      style={{ width: `${((step - 1) / 2) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Steps */}
                <div className="relative flex justify-between">
                  {[1, 2, 3].map((stepNumber) => (
                    <div key={stepNumber} className="flex flex-col items-center">
                      <motion.div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= stepNumber 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white border-2 border-gray-200 text-gray-400'
                        }`}
                        initial={false}
                        animate={{
                          scale: step === stepNumber ? 1.1 : 1,
                          backgroundColor: step >= stepNumber ? '#3b82f6' : '#fff',
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {stepIcons[stepNumber - 1]}
                      </motion.div>
                      <span className="mt-2 text-sm font-medium text-gray-600">
                        {stepNumber === 1 ? 'Service' : stepNumber === 2 ? 'Date & Time' : 'Details'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mx-8 mt-6">
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              </div>
            )}

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Type
                        </label>
                        {formData.service === 'Other' ? (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                          >
                            <input
                              type="text"
                              value={formData.customService}
                              onChange={(e) => setFormData(prev => ({ ...prev, customService: e.target.value }))}
                              placeholder="Please describe the service you need"
                              className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, service: '', customService: '' }))}
                              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                              ← Back to service selection
                            </button>
                          </motion.div>
                        ) : (
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            required
                          >
                            <option value="">Select a service</option>
                            <option value="Collision Repair">Collision Repair</option>
                            <option value="Paint Service">Paint Service</option>
                            <option value="Dent Repair">Dent Repair</option>
                            <option value="Frame Repair">Frame Repair</option>
                            <option value="Scratch Repair">Scratch Repair</option>
                            <option value="Bumper Repair">Bumper Repair</option>
                            <option value="Glass Repair">Glass Repair</option>
                            <option value="Paint Protection">Paint Protection</option>
                            <option value="Other">Other Service</option>
                          </select>
                        )}
                      </div>
                      <motion.button
                        type="button"
                        onClick={() => {
                          if (formData.service === 'Other' && !formData.customService) return;
                          if (formData.service) setStep(2);
                        }}
                        className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                        disabled={!formData.service || (formData.service === 'Other' && !formData.customService)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Next
                      </motion.button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                          Let&apos;s Schedule Your Appointment
                        </h2>
                        <p className="text-gray-600 mt-2">
                          Choose a convenient date and time for your service
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <div className="calendar-wrapper flex justify-center">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleDateSelection}
                            filterDate={filterDate}
                            inline
                            calendarClassName="custom-calendar"
                            dayClassName={date => 
                              format(date, 'yyyy-MM-dd') === formData.date
                                ? "selected-day"
                                : "normal-day"
                            }
                            minDate={today}
                            maxDate={twoWeeksFromNow}
                          />
                          <style jsx global>{`
                            .calendar-wrapper {
                              margin: 0 auto;
                              max-width: 400px;
                            }
                            .custom-calendar {
                              width: 100% !important;
                              border: none !important;
                              font-family: inherit !important;
                            }
                            .react-datepicker {
                              width: 100% !important;
                              border: 1px solid #e5e7eb !important;
                              border-radius: 0.5rem !important;
                              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1) !important;
                              overflow: hidden !important;
                            }
                            .react-datepicker__month-container {
                              width: 100% !important;
                            }
                            .react-datepicker__header {
                              background: #f3f4f6 !important;
                              border-bottom: 1px solid #e5e7eb !important;
                              padding: 1rem !important;
                            }
                            .react-datepicker__day-names {
                              display: flex !important;
                              justify-content: space-around !important;
                              padding: 0 0.5rem !important;
                            }
                            .react-datepicker__day-name {
                              color: #6b7280 !important;
                              font-weight: 500 !important;
                              width: 2.5rem !important;
                              line-height: 2.5rem !important;
                              margin: 0.2rem !important;
                            }
                            .react-datepicker__month {
                              padding: 0.5rem !important;
                            }
                            .react-datepicker__day {
                              width: 2.5rem !important;
                              line-height: 2.5rem !important;
                              margin: 0.2rem !important;
                              border-radius: 0.375rem !important;
                              transition: all 0.2s !important;
                            }
                            .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
                              background-color: #f3f4f6 !important;
                            }
                            .react-datepicker__day--selected {
                              background-color: #2563eb !important;
                              color: white !important;
                            }
                            .react-datepicker__day--disabled {
                              color: #d1d5db !important;
                              cursor: not-allowed !important;
                            }
                            .react-datepicker__current-month {
                              color: #374151 !important;
                              font-weight: 600 !important;
                              font-size: 1rem !important;
                              margin-bottom: 0.5rem !important;
                            }
                            .react-datepicker__navigation {
                              top: 1rem !important;
                            }
                            .react-datepicker__navigation-icon::before {
                              border-color: #6b7280 !important;
                            }
                            .react-datepicker__day--today {
                              font-weight: bold !important;
                              color: #2563eb !important;
                            }
                            .react-datepicker__week {
                              display: flex !important;
                              justify-content: space-around !important;
                            }
                          `}</style>
                        </div>
                      </div>

                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Available Times
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {loading ? (
                              <div className="col-span-full flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                              </div>
                            ) : availableTimeSlots.length > 0 ? (
                              availableTimeSlots.map((slot) => (
                                <motion.button
                                  key={slot.startTime}
                                  type="button"
                                  onClick={() => handleTimeSelection(slot.startTime, slot.endTime, slot.time)}
                                  className={`p-3 text-sm rounded-lg font-medium transition-all duration-200 ${
                                    selectedTime === slot.time
                                      ? 'bg-primary-600 text-white shadow-lg'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {slot.time}
                                </motion.button>
                              ))
                            ) : (
                              <p className="col-span-full text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
                                No available times for this date
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}

                      <div className="flex justify-between gap-4 pt-4">
                        <motion.button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Back
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => (selectedDate && selectedTime) ? setStep(3) : null}
                          className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                          disabled={!selectedDate || !selectedTime}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Next
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Car Make
                          </label>
                          <input
                            type="text"
                            value={formData.carMake}
                            onChange={(e) => setFormData(prev => ({ ...prev, carMake: e.target.value }))}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Car Model
                          </label>
                          <input
                            type="text"
                            value={formData.carModel}
                            onChange={(e) => setFormData(prev => ({ ...prev, carModel: e.target.value }))}
                            className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-4">
                        <motion.button
                          type="button"
                          onClick={() => setStep(2)}
                          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Back
                        </motion.button>
                        <motion.button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Booking...</span>
                            </div>
                          ) : (
                            'Book Appointment'
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                      >
                        <CheckIcon className="w-10 h-10 text-green-600" />
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                          Appointment Confirmed!
                        </h2>
                        <p className="text-gray-600">
                          Your appointment has been scheduled for{' '}
                          <span className="font-medium text-gray-900">
                            {format(selectedDate || new Date(), 'MMMM d, yyyy')}
                          </span>{' '}
                          at{' '}
                          <span className="font-medium text-gray-900">
                            {selectedTime}
                          </span>
                          <br />
                          <span className="font-medium text-gray-900">
                            Service: {formData.service === 'Other' ? formData.customService : formData.service}
                          </span>
                        </p>
                        <p className="text-gray-600 mt-2">
                          We'll send you a confirmation email with the details.
                        </p>
                      </div>
                      <motion.button
                        type="button"
                        onClick={() => window.location.href = '/'}
                        className="bg-primary-600 text-white py-3 px-6 rounded-lg font-medium shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Home
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </main>
  );
} 