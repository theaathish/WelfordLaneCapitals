import React from 'react';

const SEOFAQSection: React.FC = () => {
  const faqData = [
    {
      question: "What are the benefits of high-risk investment plans at Welford Lane Capitals?",
      answer: "Our high-risk investment plans target 8% fixed monthly returns for 6 months, utilizing advanced ICT trading strategies. These plans are ideal for aggressive investors seeking higher rewards and are particularly popular among UK-based traders looking for quick growth through hedge fund alternatives."
    },
    {
      question: "How do Welford Lane Capitals' private investment pools work?",
      answer: "Our private investment pools offer fixed monthly returns through structured portfolios: High-Risk (8% monthly), Mid-Risk (4-5% monthly), and Low-Risk (2-3% monthly). Each pool leverages ICT trading strategies and is optimized for geographic diversity across UK, India, and global markets."
    },
    {
      question: "What is the minimum investment for Welford Lane Capitals funds?",
      answer: "The minimum investment starts at just $50, making our elite alternative investment strategies accessible to qualified investors worldwide. This low barrier allows investors from London to Mumbai to access institutional-grade investment opportunities."
    },
    {
      question: "Are Welford Lane Capitals investment pools available globally?",
      answer: "Yes, our private investment pools are available to investors in the UK, India, and globally. We operate as a closed-circle fund with plans for full regulatory registration to expand our reach in key markets including London, Mumbai, and New York."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="sr-only">
        <h2>Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div key={index}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default SEOFAQSection;
