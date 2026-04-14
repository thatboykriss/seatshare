import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

interface PopularRoutesProps {
  onBookNow: () => void;
}

const routes = [
  {
    id: 1,
    name: 'Lagos',
    distance: '304 km',
    duration: '6hr 9m',
    price: 'From ₦40k',
    image: '/route-1.jpg',
  },
  {
    id: 2,
    name: 'Abuja',
    distance: '385 km',
    duration: '7hr 21m',
    price: 'From ₦50k',
    image: '/route-2.jpg',
  },
  {
    id: 3,
    name: 'University to Airport',
    distance: '8.5 km',
    duration: '12 mins',
    price: 'From ₦25k',
    image: '/route-3.jpg',
  },
];

export function PopularRoutes({ onBookNow }: PopularRoutesProps) {
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
      id="routes"
      className="py-20 lg:py-32 bg-[#faf7f2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span 
            className={`section-label transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Popular Routes
          </span>
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Most Traveled <span className="text-gradient">Routes</span>
          </h2>
          <p 
            className={`text-lg text-gray-600 mt-4 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Discover our most popular routes with the best fares and reliable service
          </p>
        </div>

        {/* Route Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <div
              key={route.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{route.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#b5894e]" />
                    {route.distance}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#b5894e]" />
                    {route.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-[#b5894e]">{route.price}</span>
                    <span className="text-sm text-gray-500">/person</span>
                  </div>
                  <button 
                    onClick={onBookNow}
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div 
          className={`text-center mt-12 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button 
            onClick={onBookNow}
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All Routes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
