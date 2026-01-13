import React from 'react';
import { FaLightbulb, FaHeart, FaBullseye, FaCompass } from 'react-icons/fa';

const LifeMatters = () => {
  const cards = [
    {
      Icon: FaLightbulb,
      title: "Real-Life Experience",
      description: "Life teaches practical lessons through real situations that no textbook can fully explain."
    },
    {
      Icon: FaHeart,
      title: "Emotional Growth",
      description: "Facing challenges builds patience, empathy, and emotional strength over time."
    },
    {
      Icon: FaBullseye,
      title: "Better Decision Making",
      description: "Past mistakes and successes guide smarter and more confident choices."
    },
    {
      Icon: FaCompass,
      title: "Clear Life Direction",
      description: "Life lessons help define values, priorities, and long-term goals."
    }
  ];

  return (
    <div className='relative bg-gradient-to-br from-primary via-secondary to-primary text-white overflow-hidden'>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-5"></div>
      </div>

      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="badge badge-lg bg-white text-primary border-0 font-bold tracking-wide uppercase shadow-xl px-6 py-4">
                Life Wisdom
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Why Learning From Life Matters
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Life itself is the best teacher. Every experience helps us grow, understand ourselves, and move forward wisely.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {cards.map((card, index) => {
              const { Icon } = card;
              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animation: `slideUp 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  {/* Hover glow effect using theme colors */}
                  <div className="absolute -inset-1 bg-primary rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition duration-500"></div>
                  
                  {/* Card */}
                  <div className="card bg-base-100 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 h-full relative overflow-hidden border border-primary/10">
                    {/* Decorative top stripe using primary color */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>
                    
                    <div className="card-body p-8">
                      {/* Icon with primary color background */}
                      <div className="inline-flex p-5 rounded-2xl bg-primary/10 mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 w-fit">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      
                      <h3 className="card-title text-2xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors duration-300">
                        {card.title}
                      </h3>
                      
                      <p className="text-base-content/70 leading-relaxed text-base flex-grow">
                        {card.description}
                      </p>

                      {/* Animated bottom line */}
                      <div className="card-actions justify-start mt-6">
                        <div className="h-1 w-12 bg-primary rounded-full group-hover:w-full transition-all duration-500"></div>
                      </div>
                    </div>

                    {/* Background pattern */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <Icon className="w-full h-full text-secondary" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="text-center mt-20 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <button className="btn btn-lg bg-white text-primary border-0 hover:bg-white/90 shadow-2xl hover:shadow-white/30 transition-all hover:scale-105 font-bold px-10 group">
              Start Your Journey
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LifeMatters;