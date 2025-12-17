import React from 'react';

const LifeMatters = () => {
    return (
        <div className='bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30'>
            <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
     <h2 className="text-3xl md:text-4xl font-bold text-purple">Why Learning From Life Matters</h2>
    <p className="mt-3 text-gray-300 max-w-2xl mx-auto">Life itself is the best teacher. Every experience helps us grow, understand ourselves, and move forward wisely.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-2 text-purple-800">Real-Life Experience</h3>
    <p className="text-sm text-gray-600">Life teaches practical lessons through real situations that no textbook can fully explain.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-2 text-purple-800">Emotional Growth</h3>
    <p className="text-sm text-gray-600"> Facing challenges builds patience, empathy, and emotional strength over time.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-2 text-purple-800">Better Decision Making</h3>
     <p className="text-sm text-gray-600">Past mistakes and successes guide smarter and more confident choices.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
    <h3 className="text-xl font-semibold mb-2 text-purple-800">Clear Life Direction</h3>
    <p className="text-sm text-gray-600">Life lessons help define values, priorities, and long-term goals.</p>
          </div>

        </div>
      </div>
    </div>
        </div>
    
  );
};

export default LifeMatters;