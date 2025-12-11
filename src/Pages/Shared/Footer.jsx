import React from 'react';
import Img from '../../assets/Gemini_Generated_Image_uaqoicuaqoicuaqo.png'

const Footer = () => {
    return (
        <div className='bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30'>
            <footer className="px-4 py-12 md:px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 mb-12">

                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={Img} alt="Digital Life Lessons Logo" className="w-12 h-12 rounded-lg" />
                            <div>
                                <h2 className="text-xl lg:text-2xl font-bold">Digital Life Lessons</h2>
                                <p className="text-xs lg:text-sm opacity-80">Learn, Grow, Excel</p>
                            </div>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Empowering learners with quality education and practical skills for life success.
                        </p>
                    </div>

                    <div>
                        <h6 className="font-semibold text-lg mb-4">Quick Links</h6>
                        <nav className="flex flex-col gap-3">
                            <a href="/" className="link link-hover text-white hover:opacity-80 text-sm">Home</a>
                            <a href="/publicLessons" className="link link-hover text-white hover:opacity-80 text-sm">Lessons</a>
                            <a href="/pricing" className="link link-hover text-white hover:opacity-80 text-sm">Pricing</a>
                            <a href="/dashboard" className="link link-hover text-white hover:opacity-80 text-sm">Dashboard</a>
                        </nav>
                    </div>

                    <div>
                        <h6 className="font-semibold text-lg mb-4">Legal</h6>
                        <nav className="flex flex-col gap-3">
                            <a href="#" className="link link-hover text-white hover:opacity-80 text-sm">Terms of Service</a>
                            <a href="#" className="link link-hover text-white hover:opacity-80 text-sm">Privacy Policy</a>
                            <a href="#" className="link link-hover text-white hover:opacity-80 text-sm">Cookie Policy</a>
                            <a href="#" className="link link-hover text-white hover:opacity-80 text-sm">Contact Us</a>
                        </nav>
                    </div>

                    <div>
                        <h6 className="font-semibold text-lg mb-4">Get in Touch</h6>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <a href="mailto:info@digitallifelessons.com" className="hover:opacity-80 text-sm">info@digitallifelessons.com</a>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.482 1.35 1.612 2.954 3.278 4.62 1.666 1.666 3.27 2.796 4.62 3.278l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <a href="tel:+1234567890" className="hover:opacity-80 text-sm">+1 (234) 567-890</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white border-opacity-30 py-8"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center md:justify-start gap-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity duration-300" title="Facebook">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                            </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity duration-300" title="LinkedIn">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.047-8.789 0-9.707h3.554v1.374c.43-.665 1.198-1.61 2.913-1.61 2.122 0 3.713 1.388 3.713 4.373v5.57zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.769-1.71 1.956-1.71 1.187 0 1.915.754 1.948 1.71 0 .951-.761 1.71-1.989 1.71zm1.581 11.597H3.635V9.236h3.283v11.216zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity duration-300" title="Instagram">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.756 0 8.335.012 7.052.07 2.695.272.273 2.69.07 7.052.012 8.335 0 8.756 0 12s.012 3.665.07 4.948c.202 4.358 2.623 6.78 6.985 6.982 1.283.058 1.704.07 4.949.07 3.245 0 3.665-.012 4.949-.07 4.351-.202 6.782-2.609 6.979-6.982.058-1.283.07-1.704.07-4.949 0-3.244-.011-3.665-.069-4.949-.196-4.357-2.608-6.78-6.979-6.982C15.668.012 15.247 0 12 0z"></path>
                                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z"></path>
                            </svg>
                        </a>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm opacity-90">
                            © 2025 Digital Life Lessons. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;