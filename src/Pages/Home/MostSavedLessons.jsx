import React from 'react';
import { FaBookmark } from 'react-icons/fa';

const MostSavedLessons = () => {

      const lessons = [
    {
      id: 1,
      title: "Consistency Beats Motivation",
      description:
        "Small actions done daily create bigger results than short bursts of motivation.",
      category: "Mindset",
      saved: 420,
    },
    {
      id: 2,
      title: "Failure Is Feedback",
      description:
        "Every mistake teaches you what doesn’t work and how to improve.",
      category: "Growth",
      saved: 385,
    },
    {
      id: 3,
      title: "Protect Your Time",
      description:
        "Time is limited—spend it on things that truly matter.",
      category: "Productivity",
      saved: 340,
    },
    {
      id: 4,
      title: "Discipline Creates Freedom",
      description:
        "The more disciplined you are, the more control you gain over life.",
      category: "Discipline",
      saved: 310,
    },
    {
      id: 5,
      title: "Learn Before You Earn",
      description:
        "Skills compound over time and open doors money cannot.",
      category: "Learning",
      saved: 295,
    },
    {
      id: 6,
      title: "Your Environment Shapes You",
      description:
        "Surround yourself with people and habits that push you forward.",
      category: "Lifestyle",
      saved: 270,
    },
    {
      id: 7,
      title: "Focus Beats Multitasking",
      description:
        "Deep focus on one task produces better results than doing many poorly.",
      category: "Focus",
      saved: 255,
    },
    {
      id: 8,
      title: "Health Is the Real Wealth",
      description:
        "Without physical and mental health, success loses its meaning.",
      category: "Wellness",
      saved: 240,
    },
    {
      id: 9,
      title: "Delayed Gratification Wins",
      description:
        "Choosing long-term benefits over short-term pleasure builds success.",
      category: "Success",
      saved: 225,
    },
  ];

    return (
        <div>
            <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
<h2 className="text-3xl md:text-4xl font-bold text-primary">Most Saved Life Lessons</h2>
<p className="mt-3 text-base-content/70">Life lessons our community saves the most</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{lessons.map((lesson) => (
    <div key={lesson.id} className="card bg-base-200 shadow-md hover:shadow-xl transition">
              <div className="card-body">
                
                <div className="flex justify-between items-start">
     <h3 className="card-title text-lg">{lesson.title}</h3>

    <div className="flex items-center gap-1 text-secondary"><FaBookmark />
          <span className="text-sm font-semibold">{lesson.saved}</span>
              </div>
                </div>

        <p className="text-sm text-base-content/80 mt-2 line-clamp-3">{lesson.description}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="badge badge-outline badge-primary">{lesson.category}</span>
            </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {lessons.length === 0 && (
          <p className="text-center mt-10 text-base-content/60">
            No lessons found yet 🌱
          </p>
        )}
      </div>
    </section>
        </div>
    );
};

export default MostSavedLessons;