'use client';

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, PaperAirplaneIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface MessageOption {
  display: string;
  value: string;
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  options?: string[] | MessageOption[]
}

interface TimeSlot {
  time: string;
  available: boolean;
  startTime: string;
  endTime: string;
}

interface BookingDetails {
  state: 'collecting_name' | 'collecting_phone' | 'collecting_email' | 'collecting_car_make' | 'collecting_car_model' | 'confirming';
  service?: string;
  problem?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
  email?: string;
  carMake?: string;
  carModel?: string;
  startTime?: string;
  endTime?: string;
}

interface CalendarTimeSlot {
  time: string;
  available: boolean;
  startTime: string;
  endTime: string;
}

interface DateOption {
  date: string;
  displayDate: string;
  timeSlots: TimeSlot[];
}

// Array of possible agent names
const AGENT_NAMES = [
  'Sarah',
  'Michael',
  'Rachel',
  'David',
  'Emily',
  'James',
  'Lisa',
  'Thomas',
  'Amanda',
  'Robert'
]

const getRandomAgentName = () => {
  return AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)]
}

const InitialAvatar = ({ name }: { name: string }) => {
  const initial = name.charAt(0)
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500'
  ]
  const color = colors[name.length % colors.length]

  return (
    <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white font-semibold text-sm`}>
      {initial}
    </div>
  )
}

const ConnectingScreen = ({ connectionState, agentName }: { connectionState: string, agentName?: string }) => {
  const showInitial = connectionState.startsWith('Connecting to ') && connectionState !== 'Connecting to agent...'
  
  return (
    <div className="h-[450px] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white p-5">
      <div className="relative mb-8">
        {/* Decorative circles in the background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-50 rounded-full opacity-10"></div>
        </div>
        
        {/* Agent initial animation when showing agent name */}
        {showInitial ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0088CC] to-[#006699] flex items-center justify-center text-white text-2xl font-semibold shadow-lg"
          >
            {agentName?.[0]}
          </motion.div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0088CC] to-[#006699] flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center space-y-2"
      >
        <p className="text-gray-800 font-semibold text-lg tracking-wide">
          {connectionState}
        </p>
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-[#0088CC] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#0088CC] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#0088CC] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </motion.div>
    </div>
  )
}

const TypingIndicator = ({ agentName }: { agentName: string }) => (
  <div className="flex items-center space-x-2">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#0088CC] to-[#006699] flex items-center justify-center text-white font-semibold text-sm">
        {agentName[0]}
      </div>
    </div>
    <div className="flex items-end h-6 space-x-1 px-3 py-2 bg-gray-100 rounded-xl">
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
)

const generateDateOptions = (): DateOption[] => {
  const options: DateOption[] = [];
  const today = new Date();
  
  // Generate next 14 days
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Skip Sundays (0) and Saturdays (6)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const dateStr = date.toISOString().split('T')[0];
      // Format as "Monday, Apr 23" or "Tuesday, Apr 24" etc.
      const displayDate = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
      
      options.push({
        date: dateStr,
        displayDate,
        timeSlots: [] // Will be populated when date is selected
      });
    }
  }
  
  return options;
};

const formatPhoneNumber = (input: string): string => {
  // Remove all non-digits
  const cleaned = input.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length >= 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`;
  }
  return cleaned;
};

const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [connectionState, setConnectionState] = useState('Connecting to agent...');
  const [agentName, setAgentName] = useState(getRandomAgentName());
  const [isTyping, setIsTyping] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({ state: 'collecting_name' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [dateOptions, setDateOptions] = useState<DateOption[]>(generateDateOptions());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => {
      setConnectionState(`Connected to ${agentName}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [agentName]);

  const handleOptionClick = async (option: string) => {
    setMessages(prev => [...prev, { role: 'user', content: option }]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response: Message;
    switch (bookingDetails.state) {
      case 'collecting_name':
        setBookingDetails(prev => ({ ...prev, name: option, state: 'collecting_phone' }));
        response = {
          role: 'assistant',
          content: `Thanks ${option}! What's your phone number?`,
          options: []
        };
        break;
      case 'collecting_phone':
        if (!isValidPhone(option)) {
          response = {
            role: 'assistant',
            content: 'Please enter a valid 10-digit phone number.',
            options: []
          };
        } else {
          setBookingDetails(prev => ({ ...prev, phone: option, state: 'collecting_email' }));
          response = {
            role: 'assistant',
            content: 'Great! What\'s your email address?',
            options: []
          };
        }
        break;
      case 'collecting_email':
        if (!isValidEmail(option)) {
          response = {
            role: 'assistant',
            content: 'Please enter a valid email address.',
            options: []
          };
        } else {
          setBookingDetails(prev => ({ ...prev, email: option, state: 'collecting_car_make' }));
          response = {
            role: 'assistant',
            content: 'What\'s the make of your vehicle?',
            options: []
          };
        }
        break;
      case 'collecting_car_make':
        setBookingDetails(prev => ({ ...prev, carMake: option, state: 'collecting_car_model' }));
        response = {
          role: 'assistant',
          content: 'What\'s the model of your vehicle?',
          options: []
        };
        break;
      case 'collecting_car_model':
        setBookingDetails(prev => ({ ...prev, carModel: option, state: 'confirming' }));
        response = {
          role: 'assistant',
          content: 'Great! Let me confirm your details...',
          options: []
        };
        break;
      default:
        response = {
          role: 'assistant',
          content: 'I\'m not sure what to do with that. Please try again.',
          options: []
        };
    }

    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const handleDateSelection = async (selectedDate: string) => {
    setSelectedDate(selectedDate);
    setIsTyping(true);

    // Simulate API call to fetch time slots
    await new Promise(resolve => setTimeout(resolve, 1000));

    const timeSlots = [
      { time: '9:00 AM', available: true, startTime: '09:00', endTime: '10:00' },
      { time: '10:00 AM', available: true, startTime: '10:00', endTime: '11:00' },
      { time: '11:00 AM', available: true, startTime: '11:00', endTime: '12:00' },
      { time: '1:00 PM', available: true, startTime: '13:00', endTime: '14:00' },
      { time: '2:00 PM', available: true, startTime: '14:00', endTime: '15:00' },
      { time: '3:00 PM', available: true, startTime: '15:00', endTime: '16:00' },
      { time: '4:00 PM', available: true, startTime: '16:00', endTime: '17:00' }
    ];

    setTimeSlots(timeSlots);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Here are the available time slots:',
      options: timeSlots.map(slot => slot.time)
    }]);
    setIsTyping(false);
  };

  const handleTimeSelection = async (timeOption: string) => {
    const selectedSlot = timeSlots.find(slot => slot.time === timeOption);
    if (selectedSlot && selectedDate) {
      setBookingDetails(prev => ({
        ...prev,
        date: selectedDate,
        time: selectedSlot.time,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime
      }));
    }

    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Great! I\'ve scheduled your appointment. Would you like to receive a confirmation email?',
      options: ['Yes, please', 'No, thanks']
    }]);
    setIsTyping(false);
  };

  const handleMessage = async (message: string) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response: Message;
    if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
      response = {
        role: 'assistant',
        content: `Hello! I'm ${agentName}, how can I help you today?`,
        options: ['Schedule an appointment', 'Get a quote', 'Ask a question']
      };
    } else if (message.toLowerCase().includes('schedule') || message.toLowerCase().includes('appointment')) {
      response = {
        role: 'assistant',
        content: 'I\'d be happy to help you schedule an appointment. What\'s your name?',
        options: []
      };
    } else if (message.toLowerCase().includes('quote') || message.toLowerCase().includes('estimate')) {
      response = {
        role: 'assistant',
        content: 'I can help you get a quote. Could you describe the damage to your vehicle?',
        options: []
      };
    } else {
      response = {
        role: 'assistant',
        content: 'I\'m not sure I understand. Could you please rephrase that?',
        options: ['Schedule an appointment', 'Get a quote', 'Ask a question']
      };
    }

    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const formatProblemSummary = (problem: string): string => {
    // Format the problem description for display
    return problem.length > 50 ? problem.substring(0, 50) + '...' : problem;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await handleMessage(input);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-[400px] bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-[#0088CC] to-[#006699] p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <div className="w-6 h-6 text-[#0088CC] font-semibold">{agentName[0]}</div>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{agentName}</h3>
                  <p className="text-white/80 text-sm">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="h-[450px] overflow-y-auto p-4 space-y-4">
              {connectionState !== 'Connected to ' + agentName ? (
                <ConnectingScreen connectionState={connectionState} agentName={agentName} />
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-[#0088CC] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{message.content}</p>
                        {message.options && message.options.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.options.map((option, i) => (
                              <button
                                key={i}
                                onClick={() => handleOptionClick(typeof option === 'string' ? option : option.value)}
                                className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                                  message.role === 'user'
                                    ? 'bg-white/20 hover:bg-white/30'
                                    : 'bg-white hover:bg-gray-50'
                                }`}
                              >
                                {typeof option === 'string' ? option : option.display}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && <TypingIndicator agentName={agentName} />}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0088CC]"
                />
                <button
                  type="submit"
                  className="bg-[#0088CC] text-white rounded-lg px-4 py-2 hover:bg-[#006699] transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#0088CC] text-white rounded-full p-3 shadow-lg hover:bg-[#006699] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 