import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Message sent! We will get back to you shortly.');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="w-full max-w-3xl">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Timer
        </Link>
        
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                Have questions, feature requests, or just want to say hello? We'd love to hear from you. The Exam Study Timer team is always looking for ways to improve your productivity experience.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-slate-300">
                  <Mail className="w-5 h-5 mr-3 text-indigo-400" />
                  <a href="mailto:admin@promptvaultusa.shop" className="hover:text-indigo-300 transition-colors">
                    admin@promptvaultusa.shop
                  </a>
                </div>
                <div className="flex items-center text-slate-300">
                  <MapPin className="w-5 h-5 mr-3 text-emerald-400" />
                  <span>Cognito Code, Cebu City, PH</span>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                  <input type="text" id="name" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Your Email</label>
                  <input type="email" id="email" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                  <textarea id="message" required rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-colors">
                  Send Message
                </button>
                {formStatus && (
                  <p className="text-emerald-400 text-sm mt-3 text-center">{formStatus}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
