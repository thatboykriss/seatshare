import { useEffect, useRef, useState } from 'react';
import { Search, Calendar, Car } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Find Your Ride',
    description: 'Enter your pickup and drop-off locations. Browse available rides from verified drivers heading your way.',
    icon: Search,
    image: '/step-1.jpg',
  },
  {
    id: 2,
    title: 'Book Instantly',
    description: 'Select your preferred ride and confirm your booking with our secure payment system. No hidden fees.',
    icon: Calendar,
    image: '/step-2.jpg',
  },
  {
    id: 3,
    title: 'Travel Together',
    description: 'Meet your driver at the pickup point. Enjoy a comfortable ride and split the costs fairly.',
    icon: Car,
    image: '/step-3.jpg',
  },
];

export function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="how-it-works"
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span 
            className={`section-label transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            How It Works
          </span>
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Your Journey in <span className="text-gradient">3 Simple Steps</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Steps List */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                    isActive 
                      ? 'bg-[#faf7f2] border-2 border-[#b5894e]' 
                      : 'bg-white border-2 border-transparent hover:bg-gray-50'
                  } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#b5894e] text-white' 
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-semibold ${
                          isActive ? 'text-[#b5894e]' : 'text-gray-400'
                        }`}>
                          Step {step.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className={`text-gray-600 transition-all duration-300 ${
                        isActive ? 'opacity-100 max-h-24' : 'opacity-70 max-h-0 lg:max-h-24 overflow-hidden'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-11 top-full w-0.5 h-6 bg-gray-200" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right - Image */}
          <div 
            className={`relative transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              {steps.map((step, index) => (
                <img
                  key={step.id}
                  src={step.image}
                  alt={step.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    activeStep === index 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                />
              ))}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Step indicator */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeStep === index 
                          ? 'bg-[#b5894e] w-8' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white text-sm font-medium">
                  {activeStep + 1} / {steps.length}
                </span>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-[#b5894e]/10 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
