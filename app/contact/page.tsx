'use client';

import React, { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Clock, Send, User, MessageCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investmentSize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFeedbackMessage(result.message || 'Your message has been sent successfully!');
        setFormData({ name: '', email: '', company: '', investmentSize: '', message: '' });
      } else {
        setFeedbackMessage(result.error || 'Failed to send your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setFeedbackMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="public" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-dark to-navy-medium text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-montserrat font-bold text-5xl mb-6">
              Contact <span className="text-gold">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Connect with our investment professionals to discuss your portfolio objectives and explore our institutional-grade investment solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="w-8 h-8 text-gold" />
                <h2 className="font-montserrat font-bold text-2xl text-navy-dark">Get in Touch</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                      placeholder="Alexander"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                      placeholder="alex@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                    placeholder="ABC Investment Group"
                  />
                </div>

                <div>
                  <label htmlFor="investmentSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Size Range
                  </label>
                  <select
                    id="investmentSize"
                    name="investmentSize"
                    value={formData.investmentSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                  >
                    <option value="">Select range</option>
                    <option value="10-50">$10-50</option>
                    <option value="50-100">$50-100</option>
                    <option value="100-250">$100-250</option>
                    <option value="250+">$250+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition-colors resize-none"
                    placeholder="Please tell us about your investment objectives and how we can assist you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-navy-dark font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {feedbackMessage && (
                <p className="mt-4 text-center text-sm text-gray-700">{feedbackMessage}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Information */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="font-montserrat font-bold text-2xl text-navy-dark mb-6">Office Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-navy-dark mb-1">Headquarters</h4>
                      <p className="text-gray-700">
                        Welford Capital Management<br />
                        Vadapalani,Chennai<br />
                        Chennai
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-navy-dark mb-1">Phone</h4>
                      <p className="text-gray-700">+91  6385362719</p>
                      <p className="text-gray-600 text-sm">Monday - Friday, 8:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-navy-dark mb-1">Email</h4>
                      <p className="text-gray-700">welfordlc@gmail.com</p>
                      <p className="text-gray-600 text-sm">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-navy-dark mb-1">Business Hours</h4>
                      <div className="text-gray-700 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
                        <p>Saturday: 9:00 AM - 1:00 PM EST</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="bg-navy-dark text-white rounded-2xl p-8">
                <h3 className="font-montserrat font-bold text-2xl mb-6">Quick Contact</h3>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gold" />
                      <div>
                        <h4 className="font-semibold">New Investor Inquiries</h4>
                        <p className="text-gray-300 text-sm">welfordlc@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gold" />
                      <div>
                        <h4 className="font-semibold">Schedule a Consultation</h4>
                        <p className="text-gray-300 text-sm">Call +91 9488667964</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;