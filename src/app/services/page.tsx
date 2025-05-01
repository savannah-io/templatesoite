'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, Suspense, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MouseFollowGradient from '@/components/MouseFollowGradient'
import { 
  WrenchScrewdriverIcon, 
  SparklesIcon, 
  PaintBrushIcon, 
  ExclamationTriangleIcon,
  WrenchIcon,
  BeakerIcon,
  CheckIcon,
  ArrowRightIcon,
  XMarkIcon,
  ShieldCheckIcon,
  CogIcon,
  TruckIcon,
  DocumentCheckIcon,
  SparklesIcon as SparklesOutlineIcon,
  WrenchScrewdriverIcon as WrenchScrewdriverOutlineIcon,
  CogIcon as CogOutlineIcon
} from '@heroicons/react/24/outline'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

// Add at the top of the file after the imports
declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      minimize?: () => void;
    };
  }
}

// Add type for the icon prop
interface SectionProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ icon: Icon, title, children }) => (
  <div className="relative">
    <div className="flex items-start gap-4 group">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-200">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h4>
        <div className="mt-2 text-gray-600 space-y-3">
          {children}
        </div>
      </div>
    </div>
  </div>
);

function ServicesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    console.log('Selecting category:', categoryId);
    setSelectedCategory(categoryId);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setSelectedCategory(null);
  };

  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCategory]);

  const serviceCategories = [
    {
      id: "collision",
      title: "Collision Services",
      icon: <ExclamationTriangleIcon className="w-full h-full" />,
      description: "Complete collision repair services to restore your vehicle to pre-accident condition",
      bgImage: "/images/back1.png",
      color: "from-primary-500 to-primary-600",
      services: [
        {
          title: "Collision Repair",
          description: "Expert repair of vehicle damage from accidents",
          icon: <WrenchScrewdriverIcon className="w-6 h-6" />
        },
        {
          title: "Frame & Alignment",
          description: "Precise frame straightening and alignment services",
          icon: <CogIcon className="w-6 h-6" />
        },
        {
          title: "Paint Services",
          description: "Professional auto painting with color matching",
          icon: <PaintBrushIcon className="w-6 h-6" />
        },
        {
          title: "Dent Removal",
          description: "Skilled dent removal using advanced techniques",
          icon: <WrenchIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: "cosmetic",
      title: "Cosmetic Services",
      icon: <SparklesOutlineIcon className="w-full h-full" />,
      description: "Premium cosmetic services to enhance and protect your vehicle&apos;s appearance",
      bgImage: "/images/back5.png",
      color: "from-primary-500 to-primary-600",
      services: [
        {
          title: "Auto Detailing",
          description: "Comprehensive interior and exterior detailing",
          icon: <SparklesIcon className="w-6 h-6" />
        },
        {
          title: "Paint Protection",
          description: "Advanced paint protection and ceramic coating",
          icon: <ShieldCheckIcon className="w-6 h-6" />
        },
        {
          title: "Classic Restoration",
          description: "Expert restoration of vintage vehicles",
          icon: <WrenchScrewdriverOutlineIcon className="w-6 h-6" />
        },
        {
          title: "Wheel & Rim Services",
          description: "Professional wheel repair and restoration",
          icon: <CogOutlineIcon className="w-6 h-6" />
        }
      ]
    },
    {
      id: "mechanical",
      title: "Mechanical Services",
      icon: <CogIcon className="w-full h-full" />,
      description: "Essential mechanical services and diagnostics for optimal vehicle performance",
      bgImage: "/images/back4.png",
      color: "from-primary-500 to-primary-600",
      services: [
        {
          title: "Diagnostic Services",
          description: "Comprehensive vehicle diagnostics and assessment",
          icon: <BeakerIcon className="w-6 h-6" />
        },
        {
          title: "Check Engine Light",
          description: "Professional diagnosis and resolution",
          icon: <ExclamationTriangleIcon className="w-6 h-6" />
        },
        {
          title: "Fleet Services",
          description: "Specialized fleet maintenance and repair",
          icon: <TruckIcon className="w-6 h-6" />
        },
        {
          title: "Custom Fabrication",
          description: "Specialized metal fabrication and repairs",
          icon: <WrenchIcon className="w-6 h-6" />
        }
      ]
    }
  ];

  const selectedCategoryData = serviceCategories.find(c => c.id === selectedCategory);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large blurred circles */}
          <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-primary-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute w-[400px] h-[400px] -bottom-48 -right-48 bg-primary-300/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          </div>
          
          {/* Subtle light beams */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-gradient-to-b from-primary-400/30 to-transparent rotate-12 transform-gpu"></div>
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-gradient-to-t from-primary-400/30 to-transparent -rotate-12 transform-gpu"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <Image 
                  src="/medal.svg" 
                  alt="Certified Auto Body Shop" 
                  width={24} 
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium text-white">Certified Auto Body Shop</span>
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-white">Our Auto Body </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-100">Services</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-blue-50 leading-relaxed max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Expert collision repair and auto body services in Duluth, GA. Quality work guaranteed.
            </motion.p>

            <div className="flex justify-center gap-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-blue-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 font-display">15+</div>
                  <div className="text-sm text-blue-100 font-medium">Years Experience</div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary-500 rounded-xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1 font-display">5000+</div>
                  <div className="text-sm text-blue-100 font-medium">Cars Repaired</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 overflow-hidden relative">
        <MouseFollowGradient variant="light" opacity={0.6} />
        <div className="container mx-auto px-4">
          <div className="max-w-[90rem] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative bg-black rounded-2xl overflow-hidden aspect-[3/4] transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                >
                  <Image
                    src={category.bgImage}
                    alt={category.title}
                    width={1200}
                    height={1600}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center p-4 mb-4 transform transition-transform duration-300 group-hover:scale-110`}>
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-2">
                      {category.title}
                    </h2>
                    <p className="text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <button 
                      onClick={() => handleCategorySelect(category.id)}
                      className="w-full px-4 py-3 bg-white/10 hover:bg-primary-500 border border-white/20 rounded-lg text-white font-medium transition-all duration-200"
                    >
                      Learn More
                      <ArrowRightIcon className="w-4 h-4 ml-2 inline-block" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCategory && selectedCategoryData && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            <motion.div 
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl relative overflow-y-auto max-h-[90vh] md:max-h-[85vh]"
              >
                <button
                  onClick={handleCloseModal}
                  className="fixed right-6 top-6 p-2 rounded-full bg-white/90 hover:bg-gray-100 z-10 transition-colors duration-200 shadow-lg"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-600" />
                </button>

                <div className="relative h-[250px] md:h-[400px]">
                  <Image
                    src={selectedCategoryData.bgImage}
                    alt={selectedCategoryData.title}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-start md:items-center gap-4 md:gap-6">
                      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${selectedCategoryData.color} text-white flex items-center justify-center p-3 md:p-4`}>
                        {selectedCategoryData.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 md:mb-2">
                          {selectedCategoryData.title}
                        </h2>
                        <p className="text-gray-200 text-base md:text-lg line-clamp-2 md:line-clamp-none">
                          {selectedCategoryData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                    {selectedCategoryData.services.map((service, idx) => (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 md:p-6 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${selectedCategoryData.color} text-white flex items-center justify-center p-2 md:p-3 shrink-0`}>
                            {service.icon}
                          </div>
                          <div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                              {service.title}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Why Expertise Matters Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 via-primary-200/30 to-transparent rounded-full blur-3xl animate-float-slow transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-primary-100/30 via-blue-200/20 to-transparent rounded-full blur-3xl animate-float transform translate-x-1/4 translate-y-1/4"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-primary-300/40 to-blue-200/40 blur-2xl animate-float top-1/4 left-1/4"></div>
            <div className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-blue-200/40 to-primary-300/40 blur-2xl animate-float-slow top-3/4 right-1/3 animation-delay-2000"></div>
            <div className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-primary-200/40 to-blue-300/40 blur-2xl animate-float-slower bottom-1/4 left-1/3 animation-delay-4000"></div>
          </div>

          {/* Light beams */}
          <div className="absolute top-0 left-1/3 w-full h-full bg-gradient-to-b from-primary-100/20 via-transparent to-transparent transform -rotate-45 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-full h-full bg-gradient-to-t from-blue-100/20 via-transparent to-transparent transform rotate-45 animate-pulse animation-delay-2000"></div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-30px) translateX(-15px); }
          }
          @keyframes float-slower {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-15px) translateX(20px); }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float-slow {
            animation: float-slow 12s ease-in-out infinite;
          }
          .animate-float-slower {
            animation: float-slower 15s ease-in-out infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
                Why Expert Auto Body Repair Matters
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Modern vehicles are complex machines requiring specialized knowledge and equipment for proper repairs. Choosing the right auto body shop can make all the difference in your vehicle's safety and longevity.
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-6xl mx-auto relative space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 mr-8 group-hover:scale-110 transition-transform duration-300 relative">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="relative flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Safety First</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Proper repairs ensure your vehicle's structural integrity and safety systems function correctly, protecting you and your passengers.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden flex items-center">
                <div className="absolute inset-0 bg-gradient-to-l from-primary-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 mr-8 group-hover:scale-110 transition-transform duration-300 relative">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="relative flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Advanced Technology</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We use state-of-the-art equipment and techniques to diagnose and repair modern vehicles with precision and accuracy.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center shrink-0 mr-8 group-hover:scale-110 transition-transform duration-300 relative">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="relative flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Long-Term Value</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Expert repairs maintain your vehicle's value and prevent future problems, saving you money in the long run.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20">
        {/* Diagonal stripes background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 40px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-[2px] rounded-xl py-8 px-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                  Ready to Get Your Car Back to Perfect?
                </h2>
                <p className="text-xl text-blue-50 mb-6">
                  Schedule your appointment today and experience the difference expert auto body repair makes.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/#schedule';
                    }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-primary-600 font-semibold rounded-lg transition-colors duration-200"
                  >
                    Schedule Now
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </a>
                  <a
                    href="tel:+17704950050"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Call Us Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function Services() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
} 