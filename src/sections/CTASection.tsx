import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

export function CTASection() {
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
      id="contact"
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/cta-image.jpg" 
              alt="Business professional in car" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 lg:p-16">
            {/* Left - Text */}
            <div className="text-white space-y-6">
              <h2 
                className={`text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Ready to Start Sharing{' '}
                <span className="text-[#d4a574]">Rides?</span>
              </h2>
              
              <p 
                className={`text-lg text-gray-300 max-w-lg transition-all duration-700 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                Join thousands of smart travelers who are saving money and reducing 
                their carbon footprint every day.
              </p>

              <div 
                className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <a href="#" className="btn-primary flex items-center gap-2">
                  Get Started Today
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 px-6 py-3 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Contact Us
                </a>
              </div>
            </div>

            {/* Right - Stats */}
            <div 
              className={`flex flex-col justify-center space-y-6 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#d4a574]">500k+</div>
                  <div className="text-sm text-gray-300 mt-1">Saved by users</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#d4a574]">600+</div>
                  <div className="text-sm text-gray-300 mt-1">Rides completed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#d4a574]">50+</div>
                  <div className="text-sm text-gray-300 mt-1">Active drivers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-4xl font-bold text-[#d4a574]">98%</div>
                  <div className="text-sm text-gray-300 mt-1">Satisfaction rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
