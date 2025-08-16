'use client';

import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Award, Users, TrendingUp, Shield, Globe, Target } from 'lucide-react';

const AboutPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Viyas",
      role: "Founder & CEO",
      experience: "3+ years",
      specialization: "Alternative Investments, Risk Management",
    },
    {
      name: "Kowshik",
      role: " Co-Founder & Head of Portfolio Management",
      experience: "2 years",
      specialization: "Quarterly Theory,Portfolio Managing",
    },
    {
      name: "Aathish",
      role: "Co-Founder & Chief Technical Officer",
      experience: "5+ years",
      specialization: " Technical Aspects, Engineering",
    },
    {
      name: "Yuvaraj",
      role: "Market Analyst & Fund Manger",
      experience: "3+ years",
      specialization: "Risk Management, Market Analysis",
    },
    {
      name: "Jeevan",
      role: "Market Analyst & Fund Manger",
      experience: "3+ years",
      specialization: "Risk Management, Market Analysis",
    },
    {
      name: "Nithish",
      role: "Financial And Legal Advisor",
      experience: "2+ years",
      specialization: "Risk Management, Financial Compliance",
    }
  ];

  const achievements = [
    {
      icon: TrendingUp,
      title: "Performance Excellence",
      description: "Top quartile performance across all investment strategies for 5 consecutive years"
    },
    {
      icon: Globe,
      title: "Global Presence",
      description: "Investment opportunities across developed and emerging markets worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="public" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-dark to-navy-medium text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-montserrat font-bold text-5xl mb-6">
              About <span className="text-gold">WelfordLc.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Excellence in alternative investment management. We deliver sophisticated institutional-grade strategies to qualified investors.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-4xl text-navy-dark mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2025 by a team of ICT strategy-based traders, Welford Lane Capital began with modest capital and a bold vision—to prove that disciplined trading and market precision can turn small investments into significant returns. What started as a lean trading group has rapidly grown into a rising investment firm, offering structured money pools and tailored strategies for investors.

Our strength lies in applying ICT methodologies with strict discipline, innovative analytics, and smart risk management. By blending technical precision with consistency and transparency, we are committed to delivering strong returns and building lasting trust with our investors.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our success is built on rigorous research, disciplined risk management, and an unwavering commitment to 
                delivering superior risk-adjusted returns across market cycles.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="font-montserrat font-bold text-2xl text-navy-dark mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">$2.8B</div>
                  <div className="text-sm text-gray-600">Assets Under Management</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">15</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">1,247</div>
                  <div className="text-sm text-gray-600">Active Investors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold mb-2">24.7%</div>
                  <div className="text-sm text-gray-600">5-Year CAGR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-navy-dark text-white rounded-2xl p-8">
              <Target className="w-12 h-12 text-gold mb-6" />
              <h3 className="font-montserrat font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To provide sophisticated investors with access to institutional-quality alternative investment strategies 
                that deliver superior risk-adjusted returns while preserving capital through disciplined risk management.
              </p>
            </div>
            <div className="bg-white border border-gold rounded-2xl p-8">
              <Globe className="w-12 h-12 text-gold mb-6" />
              <h3 className="font-montserrat font-bold text-2xl mb-4 text-navy-dark">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the premier alternative investment manager globally, recognized for our innovative strategies, 
                exceptional performance, and unwavering commitment to our investors' long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-4xl text-navy-dark mb-4">
              Industry Recognition
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by industry peers and regulatory bodies alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-200">
                <div className="bg-gold rounded-full p-3">
                  <achievement.icon className="w-6 h-6 text-navy-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-xl text-navy-dark mb-2">{achievement.title}</h4>
                  <p className="text-gray-700">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-4xl text-navy-dark mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Meet the experienced professionals who guide our investment strategies and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
              
                <div className="p-6">
                  <h3 className="font-montserrat font-bold text-xl text-navy-dark mb-1">{member.name}</h3>
                  <p className="text-gold font-medium mb-2">{member.role}</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Experience:</span> {member.experience}</p>
                    <p><span className="font-medium">Education:</span> {member.education}</p>
                    <p><span className="font-medium">Specialty:</span> {member.specialization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer */}
      <section className="py-16 bg-navy-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-gold mx-auto mb-4" />
            <h2 className="font-montserrat font-bold text-3xl mb-4">Compliance & Disclosure</h2>
          </div>
          
          <div className="prose prose-lg prose-invert max-w-4xl mx-auto text-gray-300">
            <p className="mb-4">
              <strong>Important Disclosures:</strong>Welford LC is not yet registered as an investment advisor or financial entity. All activities are conducted privately within a closed circle of investors. Past performance does not guarantee future results. All investments involve risk, including potential loss of principal.
            </p>
            <p className="mb-4">
              The strategies and objectives discussed herein are subject to change. This presentation is for informational purposes only and does not constitute investment advice, a public offering, or a solicitation to sell securities.
            </p>
            <p className="mb-4">
              Participation is strictly limited to our private circle, and investments may be subject to lock-up periods, redemption restrictions, and other conditions.
            </p>
            <p>
              For further details, please contact our team directly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;