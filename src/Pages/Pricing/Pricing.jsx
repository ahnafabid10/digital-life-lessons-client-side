import React from 'react';

const Pricing = () => {

    const pricingPlans = [
    {
        id: 1,
        name: 'Basic',
        price: '$9.99',
        period: '/month',
        description: 'Perfect for beginners',
        features: [
            'Access to 10 lessons',
            'Basic learning materials',
            'Email support',
            'Mobile app access',
            'Community forum access',
            'Progress tracking dashboard',
            'Weekly learning reminders',
            'Beginner-friendly quizzes',
        ],
        highlighted: false,
    },
    {
        id: 2,
        name: 'Premium',
        price: '$29.99',
        period: '/month',
        description: 'For serious learners',
        features: [
            'Unlimited lessons',
            'Premium learning materials',
            'Priority support',
            'Mobile app access',
            'Downloadable resources',
            'Certificate of completion',
            'Offline mode support',
            'Advanced progress insights',
        ],
        highlighted: true,
    },
    {
        id: 3,
        name: 'Premium+',
        price: '$99.99',
        period: '/month',
        description: 'For organizations',
        features: [
            'Everything in Professional',
            'Team collaboration tools',
            'Custom learning paths',
            'Advanced analytics',
            'Dedicated account manager',
            'API access',
            'Bulk user management',
            'Onboarding & training sessions',
        ],
        highlighted: false,
    },
];


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        Choose the Perfect <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Plan</span> for You
                    </h1>
                    <p className="text-xl text-gray-600">
                        Choose the perfect plan for your learning journey
                    </p>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`card transform transition-all duration-300 hover:shadow-2xl ${plan.highlighted
                                    ? 'md:scale-105 bg-gradient-to-br from-primary to-secondary text-white shadow-2xl'
                                    : 'bg-white hover:shadow-xl'
                                }`}
                        >
                            <div className="card-body">
                                {plan.highlighted && (
                                    <div className="badge badge-ghost mb-4 self-start text-primary bg-white">
                                        MOST POPULAR
                                    </div>
                                )}

                                <h2 className="card-title text-3xl mb-2">{plan.name}</h2>
                                <p className={`mb-4 ${plan.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                                    {plan.description}
                                </p>

                                <div className="my-6">
                                    <span className="text-5xl font-bold">{plan.price}</span>
                                    <span className={plan.highlighted ? 'text-white/80' : 'text-gray-600'}>
                                        {plan.period}
                                    </span>
                                </div>

                                <div className="divider my-4"></div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg
                                                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-white' : 'text-primary'
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="card-actions">
                                    <button
                                        className={`btn w-full font-semibold transition-all duration-300 ${plan.highlighted
                                                ? 'btn-ghost text-white border-white hover:bg-white hover:text-primary'
                                                : 'btn-primary text-white'
                                            }`}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" defaultChecked />
  <div className="collapse-title font-semibold">Can I switch plans anytime?</div>
  <div className="collapse-content text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle.</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">Is there a free trial?</div>
  <div className="collapse-content text-sm">Yes, we offer a 7-day free trial for all plans. No credit card required to get started.</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">What payment methods do you accept?</div>
  <div className="collapse-content text-sm">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</div>
</div>
<div className="collapse collapse-plus bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-3" />
  <div className="collapse-title font-semibold">Do you offer refunds?</div>
  <div className="collapse-content text-sm">Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our service.</div>
</div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Pricing;