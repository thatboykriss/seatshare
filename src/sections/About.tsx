import { useEffect, useRef, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const features = [
  'Verified drivers and secure payments',
  'Real-time tracking and ETA updates',
  'Flexible scheduling for daily commutes',
  '24/7 customer support',
];

export function About() {
  const [isVisible, setIsVisible] = useState(false);
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
      id="about"
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div 
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="section-label">About SeatShare</span>
            </div>
            
            <h2 
              className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Making Travel Better for{' '}
              <span className="text-gradient">Everyone</span>
            </h2>
            
            <p 
              className={`text-lg text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              SeatShare is a real-time digital marketplace that connects ABUAD students with trusted transport operators. It allows operators to list trips while students can easily browse, compare, and book seats, with smart recommendations ensuring the best options. The platform simplifies intercity travel, making it more affordable, reliable, and organized for everyone.
            </p>

            {/* Features List */}
            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-6 h-6 bg-[#b5894e] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div 
              className={`pt-6 transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-[#b5894e] font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Image */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-3'
            }`}
          >
            <div className="relative">
              {/* Gold accent line */}
              <div className="absolute -left-4 top-1/4 w-1 h-1/2 bg-gradient-to-b from-[#b5894e] to-[#d4a574] rounded-full" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/about-image.jpg" 
                  alt="People sharing a ride" 
                  className="w-full h-auto object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating stats card */}
              <div 
                className={`absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 transition-all duration-700 delay-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#b5894e]/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#b5894e]">4.9</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">User Rating</div>
                    <div className="text-xs text-gray-500">Based on 10K+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
