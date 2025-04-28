'use client';

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftIcon, XMarkIcon, PaperAirplaneIcon, QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

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
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionState, setConnectionState] = useState('')
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | undefined>()
  const [isTyping, setIsTyping] = useState(false)
  const [agentName, setAgentName] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && !agentName) {
      setIsConnecting(true)
      const name = getRandomAgentName()
      
      // Initial connection message
      setConnectionState('Connecting to agent...')
      
      // After 1.5 seconds (reduced from 2.5), show connecting to specific agent
      setTimeout(() => {
        setConnectionState(`Connecting to ${name}...`)
        
        // After another 1.5 seconds (3 seconds total, reduced from 5), complete connection
        setTimeout(() => {
          setAgentName(name)
          setIsConnecting(false)
          
          // First message
          setIsTyping(true)
          setTimeout(() => {
            setIsTyping(false)
            setMessages([
              {
                role: 'assistant',
                content: `Hi there! I'm ${name}. Sorry to hear you're having car trouble.`
              }
            ])
            
            // Second message after 1.5 seconds (reduced from 3.5)
            setTimeout(() => {
              setIsTyping(true)
              setTimeout(() => {
                setIsTyping(false)
                setMessages(prev => [...prev, {
                  role: 'assistant',
                  content: "Could you tell me a bit about the problems you're noticing with your car right now?"
                }])
                
                // Third message after 1.5 seconds
                setTimeout(() => {
                  setIsTyping(true)
                  setTimeout(() => {
                    setIsTyping(false)
                    setMessages(prev => [...prev, {
                      role: 'assistant',
                      content: "For example, any damage or mechanical issues?",
                      options: ["Structural Damage", "Mechanical", "Windshield Damage", "Paint"]
                    }])
                  }, 1500)
                }, 1500)
              }, 1500)
            }, 1500)
          }, 1500)
        }, 1500) // Complete 3 second connection (1500 + 1500)
      }, 1500)
    }
  }, [isOpen, agentName])

  const handleOptionClick = async (option: string) => {
    if (isLoading) return
    
    // Add the user's selection as a message
    setMessages(prev => [...prev, { role: 'user', content: option }])
    
    // Show typing indicator
    setIsTyping(true)
    
    // Wait 1 second before showing response (reduced from 2)
    setTimeout(() => {
      setIsTyping(false)
      
      if (option === "Yes, schedule an appointment") {
        // Add the simplified response for scheduling
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Let's get that taken care of for you."
        }])
      } else {
        // Add the response and immediately follow with booking prompt
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Ouch, that sounds frustrating! Thanks for sharing. Let's get that taken care of for you."
        }])
      }

      // Show typing for booking prompt
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const dateOptions = generateDateOptions();
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Choose a day this week to get your vehicle serviced:",
            options: dateOptions.map(opt => opt.displayDate)
          }])
        }, 1000)
      }, 1000)
    }, 1000)
  }

  const handleDateSelection = async (selectedDate: string) => {
    const dateOptions = generateDateOptions();
    const selectedDateOption = dateOptions.find(opt => opt.displayDate === selectedDate);
    
    if (selectedDateOption) {
      setMessages(prev => [...prev, { role: 'user', content: selectedDate }]);
      setIsTyping(true);
      
      try {
        console.log('Selected date option:', selectedDateOption);
        const response = await fetch(`/api/calendar?date=${encodeURIComponent(selectedDateOption.date)}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Calendar API error:', errorData);
          throw new Error(errorData.error || 'Failed to fetch time slots');
        }
        
        const data = await response.json();
        console.log('Calendar API response:', data);
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        if (data.timeSlots) {
          const availableSlots = (data.timeSlots as CalendarTimeSlot[]).filter(slot => slot.available);
          console.log('Available slots:', availableSlots);
          
          if (availableSlots.length === 0) {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: "I apologize, but there are no available time slots for this date. Would you like to try another day?",
              options: dateOptions.map(opt => opt.displayDate)
            }]);
            return;
          }
          
          setIsTyping(false);
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Available times for ${selectedDate}:`,
            options: availableSlots.map((slot: CalendarTimeSlot) => ({
              display: slot.time,
              value: JSON.stringify({ startTime: slot.startTime, endTime: slot.endTime })
            }))
          }]);
        }
      } catch (error) {
        console.error('Error fetching time slots:', error);
        setIsTyping(false);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I apologize, but I'm having trouble checking the calendar right now. Would you like to try another day or call us directly at (770) 495-0050?",
          options: [
            "Try Another Day",
            "Call Now"
          ]
        }]);
      }
    }
  };

  const handleTimeSelection = async (timeOption: string) => {
    try {
      const { startTime, endTime } = JSON.parse(timeOption);
      
      // Ensure we have a valid state before updating
      setBookingDetails((prev) => {
        if (!prev) return { state: 'collecting_name', startTime, endTime };
        return {
          ...prev,
          state: 'collecting_name',
          startTime,
          endTime
        };
      });
      
      setMessages(prev => [...prev, { 
        role: 'user', 
        content: new Date(startTime).toLocaleTimeString() 
      }]);
      
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "What's your full name?"
        }]);
      }, 500);
    } catch (error) {
      console.error('Error handling time selection:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, but there was an error processing your time selection. Would you like to try again?",
        options: ["Select Another Time", "Try Another Day"]
      }]);
    }
  };

  const handleMessage = async (message: string) => {
    setIsLoading(true);
    
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    
    try {
      // Check if message is a greeting
      const isGreeting = /^(hi|hello|hey|greetings|good (morning|afternoon|evening))/i.test(message.toLowerCase());
      
      // If it's a greeting, reset the booking details
      if (isGreeting) {
        setBookingDetails(undefined);
      }
      
      // Send message to chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          bookingDetails: isGreeting ? undefined : bookingDetails
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Show typing indicator
      setIsTyping(true);
      
      // Add a small delay to make the typing feel natural
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update booking details if provided
      if (data.bookingDetails) {
        setBookingDetails(data.bookingDetails);
      }
      
      // Add assistant's response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.content,
        options: data.options
      }]);
      
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, but I'm having trouble processing your message. Please try again or call us at (770) 495-0050.",
      }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
      setInput('');
    }
  };

  const formatProblemSummary = (problem: string): string => {
    const cleanProblem = problem.toLowerCase()
      .replace(/my car|my vehicle|i have|there is|there's|got|has|had|having/g, '')
      .trim()
    
    if (cleanProblem.includes('accident') || cleanProblem.includes('crash')) {
      return `I understand you've been in an accident. Let's get your vehicle taken care of right away.`
    } else if (cleanProblem.includes('dent') || cleanProblem.includes('ding')) {
      return `I understand about the damage. Let's get that fixed up for you.`
    } else if (cleanProblem.includes('scratch') || cleanProblem.includes('paint')) {
      return `I understand about the paint damage. We can definitely help with that.`
    } else if (cleanProblem.includes('headlight') || cleanProblem.includes('light')) {
      return `I understand about the headlight issue. We can get that resolved for you.`
    } else {
      return `I understand the issue. Let's get that taken care of for you.`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    await handleMessage(userMessage);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`bg-white rounded-2xl shadow-2xl w-[400px] overflow-hidden border border-gray-100 ${!isMinimized ? 'mb-4' : ''}`}
          >
            {/* Header - Always visible */}
            <div 
              className="bg-[#0088CC] p-4 text-white flex justify-between items-center cursor-pointer"
              onClick={() => isMinimized && setIsMinimized(false)}
            >
              <div className="flex items-center space-x-3">
                {agentName && !isConnecting && (
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-lg border-2 border-white/20">
                      {agentName[0]}
                    </div>
                    {isMinimized && messages.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0088CC]" />
                    )}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg">Chat with Us</h3>
                  {agentName && !isConnecting && (
                    <p className="text-sm text-blue-100">Speaking with {agentName}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(!isMinimized);
                  }}
                  className="text-white hover:text-blue-100 transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  {isMinimized ? (
                    <ChevronUpIcon className="h-6 w-6" />
                  ) : (
                    <ChevronDownIcon className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    setAgentName('');
                    setMessages([]);
                    setConnectionState('');
                    setIsMinimized(false);
                  }}
                  className="text-white hover:text-blue-100 transition-colors p-1 hover:bg-white/10 rounded-lg"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Chat Content - Only visible when not minimized */}
            {!isMinimized && (
              <>
                {isConnecting ? (
                  <ConnectingScreen connectionState={connectionState} agentName={agentName} />
                ) : (
                  <div className="h-[450px] overflow-y-auto p-5 bg-gradient-to-b from-gray-50 to-white">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex-shrink-0 mr-2">
                            <div className="w-8 h-8 rounded-full bg-[#0088CC] flex items-center justify-center text-white font-semibold text-sm">
                              {agentName[0]}
                            </div>
                          </div>
                        )}
                        <div className={`max-w-[75%] ${message.role === 'user' ? 'bg-[#0088CC] text-white' : 'bg-gray-100 text-gray-800'} rounded-2xl px-4 py-2`}>
                          <p>{message.content}</p>
                          {message.options && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {message.options.map((option, optionIndex) => {
                                const optionText = typeof option === 'string' ? option : option.display;
                                const optionValue = typeof option === 'string' ? option : option.value;
                                
                                return (
                                  <button
                                    key={optionIndex}
                                    onClick={() => {
                                      if (message.content.includes("Choose a day")) {
                                        handleDateSelection(optionValue);
                                      } else if (message.content.includes("Available times for")) {
                                        handleTimeSelection(optionValue);
                                      } else {
                                        handleOptionClick(optionValue);
                                      }
                                    }}
                                    className="bg-white text-[#0088CC] hover:bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md w-full text-left"
                                  >
                                    {optionText}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="mb-4">
                        <TypingIndicator agentName={agentName} />
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}

                {!isConnecting && (
                  <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0088CC] focus:ring-2 focus:ring-[#0088CC]/20 transition-all"
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#0088CC] text-white p-3 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                      >
                        <PaperAirplaneIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial chat button - Only shown when chat is completely closed */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-[#0088CC] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center w-16 h-16"
        >
          {agentName ? (
            <span className="text-2xl font-semibold">{agentName[0]}</span>
          ) : (
            <span className="text-4xl font-bold">?</span>
          )}
        </motion.button>
      )}
    </div>
  );
} 