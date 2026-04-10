import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How do I request an emergency ambulance?",
      answer: "You can click the 'Request Now' button on the dashboard or go to the 'Find Hospital' page to select a destination first. Our system will match you with the nearest available driver instantly."
    },
    {
      question: "How is the ambulance fare calculated?",
      answer: "Fares are calculated based on a base price (determined by the ambulance type: AC, Non-AC, or ICU) plus a per-kilometer charge from your location to the selected hospital."
    },
    {
      question: "Can I track the ambulance in real-time?",
      answer: "Yes! Once a driver accepts your request, a live tracking card will appear on your dashboard. You can also click 'Track Ambulance' in the quick actions menu to see the live map."
    },
    {
      question: "What types of ambulances are available?",
      answer: "We offer four categories: Standard (Non-AC), Premium (AC), ICU/Life Support, and Freezer ambulances for deceased transport."
    },
    {
      question: "How do I pay for the ride?",
      answer: "Currently, we support cash payments directly to the driver upon arrival at the hospital, as well as digital payments via bKash or Nagad through our mobile app."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-20 px-4 md:px-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl mb-4">
            <HelpCircle size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-slate-500">
            Everything you need to know about our emergency ambulance service.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-3xl transition-all duration-300 ${
                openIndex === index ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-white'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-blue-700' : 'text-slate-800'}`}>
                  {item.question}
                </span>
                <div className={`p-2 rounded-xl transition-colors ${openIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-center text-white shadow-xl shadow-slate-200">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-slate-400 text-sm mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;