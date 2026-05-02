import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="w-full max-w-3xl">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Timer
        </Link>
        
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          <p className="text-slate-400 mb-8">Last Updated: May 2026</p>
          
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              At <strong>Exam Study Timer</strong>, accessible from our web application, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Exam Study Timer and how we use it.
            </p>
            
            <h2 className="text-xl font-bold text-white pt-4">1. Local Storage Data</h2>
            <p>
              As a core timer application, we evaluate user privacy favorably. We do <strong>not</strong> require you to create an account, nor do we collect personally identifiable information (PII) such as your name, email address, or phone number to function.
            </p>
            <p>
              Your timer preferences, completed study cycles, subject choices, theme configurations, and custom tasks are stored entirely locally on your browser using Web Storage API (localStorage). This data is never transmitted to or processed by our servers. Because of this, you maintain complete ownership over your activity data. If you clear your browser data or cache, your custom settings will be deleted.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">2. Log Files & Analytics</h2>
            <p>
              Exam Study Timer follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">3. Third-Party Services and Advertising (Google AdSense)</h2>
            <p>
              To maintain the cost of supporting our platform and keeping the timer free for everyone, we use third-party advertising services, such as <strong>Google AdSense</strong>. 
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites.</li>
              <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
              <li>You may opt out of personalized advertising by visiting Google's <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">Ads Settings</a>.</li>
            </ul>

            <h2 className="text-xl font-bold text-white pt-4">4. Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Exam Study Timer does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>

            <h2 className="text-xl font-bold text-white pt-4">5. Contact Information</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>admin@promptvaultusa.shop</strong> or via our Contact Page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
