import React from 'react';

const contributors = [
  {
    id: 1,
    name: 'Alice',
    lessons: 'Embrace failure as a lesson. Every setback is an opportunity to learn and grow stronger. By viewing mistakes not as defeats but as valuable teachers, you build resilience and pave the way for future success.',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'Bob',
    lessons: 'Consistency beats talent. While natural abilities can give a head start, it\'s regular effort and discipline that lead to mastery. Keep showing up every day, and over time, you\'ll outperform those who rely solely on innate gifts.',
    avatar: 'https://i.pravatar.cc/150?img=2'
  },
  {
    id: 3,
    name: 'Charlie',
    lessons: 'Help others to grow yourself. By sharing knowledge and supporting those around you, you reinforce your own understanding and build meaningful connections. Personal growth often comes from lifting others up along the way.',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Diana',
    lessons: 'Time is your most valuable asset. Unlike money or possessions, time cannot be regained once spent. Prioritize what truly matters, invest it wisely in pursuits that align with your goals, and avoid wasting it on distractions.',
    avatar: 'https://i.pravatar.cc/150?img=4'
  },
  {
    id: 5,
    name: 'Ethan',
    lessons: 'Learn daily, even small things. Continuous learning keeps your mind sharp and opens new opportunities. No matter how minor the new knowledge seems, accumulating it over time compounds into profound wisdom and skill.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 6,
    name: 'Fiona',
    lessons: 'Patience is power. In a fast-paced world, the ability to wait calmly for the right moment yields better results than rushing. Patience allows ideas to mature, relationships to deepen, and success to come sustainably.',
    avatar: 'https://i.pravatar.cc/150?img=6'
  },
  {
    id: 7,
    name: 'George',
    lessons: 'Stay curious and explore. Curiosity drives innovation and personal fulfillment. Keep asking questions, venture into the unknown, and embrace new experiences to uncover hidden potentials and enrich your life.',
    avatar: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: 8,
    name: 'Hannah',
    lessons: 'Mistakes are stepping stones. Each error brings you closer to success by highlighting what doesn\'t work. Learn from them, adjust your approach, and use them as foundation for building greater achievements.',
    avatar: 'https://i.pravatar.cc/150?img=8'
  },
  {
    id: 9,
    name: 'Ian',
    lessons: 'Focus on what you can control. Worrying about external factors drains energy; instead, direct your efforts toward your actions, attitudes, and responses. This mindset brings peace and empowers you to create positive change.',
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    id: 10,
    name: 'Julia',
    lessons: 'Kindness is always remembered. Acts of compassion leave lasting impressions on others and often return to you in unexpected ways. In a world that can be harsh, choosing kindness fosters goodwill and strengthens communities.',
    avatar: 'https://i.pravatar.cc/150?img=10'
  },
  {
    id: 11,
    name: 'Kevin',
    lessons: 'Invest in learning. Dedicating time and resources to education pays the highest dividends in personal and professional growth. Skills and knowledge acquired today become the tools that shape a brighter tomorrow.',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  {
    id: 12,
    name: 'Lily',
    lessons: 'Balance work and life. Sustained success requires harmony between professional ambitions and personal well-being. Make time for rest, relationships, and hobbies to maintain energy, creativity, and long-term happiness.',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
];


const TopContributors = () => {

    return (
        <div className='bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30'>
            <div className=" p-8 rounded-xl max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl text-white font-bold mb-8 text-center">Top Contributors of the Week</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="card bg-white shadow-md hover:shadow-xl border border-gray-100 rounded-xl">
            <figure className="px-4 pt-4">
              <img 
                src={contributor.avatar} 
                alt={contributor.name} 
                className="rounded-full border-4 border-secondary w-24 h-24"/>
            </figure>
            <div className="card-body items-center text-center">
              <h3 className="card-title text-purple-800">{contributor.name}</h3>
              <p className="text-gray-600">{contributor.lessons}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default TopContributors;