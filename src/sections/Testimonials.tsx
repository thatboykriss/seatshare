import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'David A.',
    role: 'Abuad Student',
    image: '/testimonial-1.jpg',
    content: 'SeatShare made travelling from school so much easier. I found a ride in minutes, and it was cheaper than what i usually pay.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mr. Adeyemi',
    role: 'Driver',
    image: '/testimonial-2.jpg',
    content: 'As a driver, I love how SeatShare helps me fill up seats faster. No more last-minute empty spaces or losses.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Chioma Ugoeze',
    role: 'Abuad Student',
    image: '/testimonial-3.jpg',
    content: 'I love how organized everything is. From booking to boarding, it feels safe, smooth, and stress-free.',
    rating: 5,
  },
];

export function Testimonials() {
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
      id="testimonials"
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
            Testimonials
          </span>
          <h2 
            className={`text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            What Our <span className="text-gradient">Community</span> Says
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${300 + index * 150}ms`,
                transform: isVisible ? `rotate(${index === 0 ? '-1' : index === 2 ? '1' : '0'}deg)` : 'rotate(0deg)'
              }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-2 w-10 h-10 bg-[#b5894e] rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-[#b5894e] text-[#b5894e]"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#e8dcc6]">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
