import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="w-full max-w-3xl">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Timer
        </Link>
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">About Us</h1>
          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              Welcome to the <strong>Exam Study Timer</strong>, an advanced productivity tool built specifically to help you succeed in your study endeavors and maintain razor-sharp focus during your most demanding tasks.
            </p>
            <p>
              We realized that while there are many generic timers and clocks on the internet, very few understand the rigorous demands of students preparing for exams, or professionals executing deep work. Our mission with Exam Study Timer is simple: to stop procrastination, reduce mental fatigue, and provide a distraction-free, reliable tool that is accessible to anyone, anywhere in the world.
            </p>
            <p>
              By leveraging the principles of the Pomodoro Technique—alternating focused work sessions with short restorative breaks—we enable you to accomplish more in less time, without burning out.
            </p>
            
            <div className="bg-slate-700/50 rounded-xl p-6 border border-indigo-500/30">
              <p className="mb-4">
                <strong>Focus Timer is also available as a premium app on the Amazon Appstore</strong> with additional features, offline mode, and no ads.
              </p>
              <a 
                href="https://www.amazon.com/gp/product/B0GX2WTWFJ?ref=web" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Download size={18} className="mr-2" />
                Get Premium on Amazon
              </a>
            </div>

            <p>
              <strong>Built by Cognito Code in Cebu City, PH.</strong> We are a passionate team dedicated to crafting free, high-quality, and reliable software tools for learners and creative minds. Thank you for making us a part of your daily study routine!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
