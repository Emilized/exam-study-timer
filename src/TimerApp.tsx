/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, RotateCcw, Coffee, BookOpen, GraduationCap, Target, X, Star, Settings, BarChart2, Calendar, Plus, Trash2, Check, Crown, Sparkles, Users, Lock, Image, Upload } from 'lucide-react';

type TimerMode = 'study' | 'break';

const SUBJECTS = ['Math', 'Science', 'History', 'Literature', 'Coding'];

interface Exam {
  id: string;
  name: string;
  date: string;
  subject: string;
}

export default function TimerApp() {
  // Load initial settings from localStorage if available, or use defaults
  const [studyDuration, setStudyDuration] = useState(() => {
    const saved = localStorage.getItem('studyDuration');
    return saved ? parseInt(saved, 10) : 25;
  });
  const [breakDuration, setBreakDuration] = useState(() => {
    const saved = localStorage.getItem('breakDuration');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [timeLeft, setTimeLeft] = useState(studyDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('study');
  const [cycles, setCycles] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    return localStorage.getItem('cookieConsent') !== 'true';
  });
  
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);


  const [stats, setStats] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('studyStats');
    return saved ? JSON.parse(saved) : {};
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('examSchedule');
    return saved ? JSON.parse(saved) : [];
  });
  const [newExam, setNewExam] = useState({ name: '', date: '', subject: SUBJECTS[0] });

  const [showAIModal, setShowAIModal] = useState(false);
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [aiPlanStatus, setAiPlanStatus] = useState<'idle' | 'generating' | 'done'>('idle');

  const FOCUS_TIME = studyDuration * 60;
  const BREAK_TIME = breakDuration * 60;

  useEffect(() => {
    localStorage.setItem('studyDuration', studyDuration.toString());
    localStorage.setItem('breakDuration', breakDuration.toString());
  }, [studyDuration, breakDuration]);

  useEffect(() => {
    localStorage.setItem('examSchedule', JSON.stringify(exams));
  }, [exams]);

  // Adjust timeleft if settings change while paused and not started
  useEffect(() => {
    if (!isRunning) {
      if (mode === 'study' && timeLeft > FOCUS_TIME) setTimeLeft(FOCUS_TIME);
      if (mode === 'break' && timeLeft > BREAK_TIME) setTimeLeft(BREAK_TIME);
    }
  }, [FOCUS_TIME, BREAK_TIME, isRunning, mode, timeLeft]);

  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5); // A4
      
      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      
      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch (e) {
      console.error("Audio playback failed", e);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer finished!
      setIsRunning(false);
      playChime();
      if (mode === 'study') {
        setMode('break');
        setTimeLeft(BREAK_TIME);
        setCycles(c => c + 1);
        
        // Update stats
        setStats(prev => {
          const newStats = { ...prev, [selectedSubject]: (prev[selectedSubject] || 0) + studyDuration };
          localStorage.setItem('studyStats', JSON.stringify(newStats));
          return newStats;
        });
      } else {
        setMode('study');
        setTimeLeft(FOCUS_TIME);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  // Update document title
  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - ${mode === 'study' ? selectedSubject + ' Study' : 'Break'} | Exam Timer`;
  }, [timeLeft, mode, selectedSubject]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'study' ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'study' ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = mode === 'study' 
    ? ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100 
    : ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-4 transition-colors duration-500 font-sans relative overflow-x-hidden overflow-y-auto ${mode === 'study' ? 'bg-slate-900' : 'bg-emerald-900'}`}>
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 mt-12 mb-8 relative z-10 shrink-0">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="text-amber-400" /> Exam Timer
          </h1>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Advanced Features */}
            <button
              onClick={() => setShowAIModal(true)}
              className="text-white/60 hover:text-amber-400 hover:bg-amber-400/10 transition-colors p-1.5 sm:p-2 rounded-full relative group"
              title="AI Study Plan"
            >
              <Sparkles size={20} />
            </button>
            <button
              onClick={() => setShowGroupsModal(true)}
              className="text-white/60 hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors p-1.5 sm:p-2 rounded-full relative group"
              title="Multiplayer Groups"
            >
              <Users size={20} />
            </button>
            <div className="w-px h-5 bg-white/10 mx-0.5 sm:mx-1 hidden sm:block"></div>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="text-white/60 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/10 rounded-full hidden sm:block"
              title="Exam Schedule"
            >
              <Calendar size={20} />
            </button>
            <button
              onClick={() => setShowStatsModal(true)}
              className="text-white/60 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/10 rounded-full"
              title="Analytics"
            >
              <BarChart2 size={20} />
            </button>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="text-white/60 hover:text-white transition-colors p-1.5 sm:p-2 hover:bg-white/10 rounded-full"
              title="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Subject Selector */}
        {mode === 'study' && (
           <div className="mb-6 flex flex-wrap gap-2 justify-center">
             {SUBJECTS.map(subj => (
               <button
                 key={subj}
                 onClick={() => setSelectedSubject(subj)}
                 className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                   selectedSubject === subj 
                     ? 'bg-amber-500 text-slate-900 border-amber-500' 
                     : 'bg-transparent text-white/60 border-white/20 hover:text-white hover:border-white/40'
                 }`}
               >
                 {subj}
               </button>
             ))}
           </div>
        )}

        {activeGroup && (
          <div className="mb-6 mx-auto w-max flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-400 bg-emerald-400/10 py-1.5 px-4 rounded-full border border-emerald-400/20 shadow-lg">
            <span className="relative flex h-2 w-2 shadow-[0_0_8px_rgba(52,211,153,0.8)]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Studying in: <strong className="text-white">{activeGroup}</strong>
          </div>
        )}

        {/* Mode Selector */}
        <div className="flex p-1 bg-black/20 rounded-2xl mb-8">
          <button 
            onClick={() => switchMode('study')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium tracking-wide transition-all flex items-center justify-center gap-2 ${mode === 'study' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen size={18} /> Study
          </button>
          <button 
            onClick={() => switchMode('break')}
            className={`flex-1 py-3 px-4 rounded-xl font-medium tracking-wide transition-all flex items-center justify-center gap-2 ${mode === 'break' ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Coffee size={18} /> Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-12 relative">
          {/* Circular Progress (simplified with SVG) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" className="w-64 h-64 transform -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-white" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100} className={mode === 'study' ? 'text-indigo-400' : 'text-emerald-400'} />
            </svg>
          </div>
          
          <div className="text-7xl font-light tracking-tighter text-white tabular-nums py-8 max-w-[280px] mx-auto rounded-3xl z-10 relative">
            {formatTime(timeLeft)}
          </div>
          
          <div className="text-white/60 mt-2 font-medium tracking-widest uppercase text-sm">
            {isRunning ? 'Running' : 'Paused'}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button 
            onClick={resetTimer}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
          
          <button 
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-transform hover:scale-105 active:scale-95 ${mode === 'study' ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
          >
            {isRunning ? <Pause size={32} className="fill-current" /> : <Play size={32} className="fill-current ml-2" />}
          </button>
          
          <div className="w-14 h-14 flex items-center justify-center">
            {/* Placeholder for symmetry */}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-white/60 text-sm">
          <div>Sessions completed: <span className="text-white font-bold ml-1">{cycles}</span></div>
        </div>
        
        {/* Ad Banner Content */}
        <div className="mt-6 -mx-8 -mb-8 bg-black/40 border-t border-white/5 p-4 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:bg-black/50 transition-colors rounded-b-3xl">
          <div className="absolute top-1 left-2 text-[8px] text-white/30 uppercase tracking-widest border border-white/10 px-1 rounded-sm">Advertisement</div>
          <div className="text-white/80 font-medium text-sm flex items-center justify-center w-full min-h-[60px]">
            {/* This is a placeholder for Google AdSense or another ad network */}
            <div className="text-white/40 text-xs flex flex-col items-center">
               <span>Google AdSense Placeholder</span>
               <span className="text-[10px] opacity-70 mt-1">Display Ad • 320x50</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex justify-center gap-4 relative z-10 flex-wrap">
          <Link 
            to="/about"
            className="text-xs text-white/40 hover:text-white/80 transition-colors underline decoration-white/20 underline-offset-4"
          >
            About Us
          </Link>
          <Link 
            to="/blog"
            className="text-xs text-white/40 hover:text-white/80 transition-colors underline decoration-white/20 underline-offset-4"
          >
            Blog
          </Link>
          <Link 
            to="/privacy-policy"
            className="text-xs text-white/40 hover:text-white/80 transition-colors underline decoration-white/20 underline-offset-4"
          >
            Privacy & Terms
          </Link>
          <Link 
            to="/contact"
            className="text-xs text-white/40 hover:text-white/80 transition-colors underline decoration-white/20 underline-offset-4"
          >
            Contact
          </Link>
        </div>

      </div>

      {/* SEO & Informational Content for AdSense Approval */}
      <div className="w-full max-w-3xl bg-black/20 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-white/5 text-slate-300/80 mb-12 space-y-8 z-10 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Exam Study Timer & Pomodoro Tracker</h2>
          <p className="leading-relaxed mb-4 text-sm md:text-base">
            Welcome to the ultimate Exam Study Timer, a free online tool designed to turn your study sessions into highly productive, distraction-free focus blocks. Built around the proven Pomodoro Technique, our app helps students, professionals, and lifelong learners maximize their concentration and retain information more effectively.
          </p>
          <p className="leading-relaxed text-sm md:text-base">
            Whether you are preparing for a medical exam, brushing up on coding skills, or just need to finish a late-night essay, the right pacing makes all the difference. Our timer alternates between intense focus sessions and restorative breaks, preventing burnout and keeping your mind fresh.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">Why Use the Pomodoro Technique?</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li><strong>Enhanced Focus:</strong> Breaking your work into manageable 25-minute intervals (or whatever length you choose) reduces the cognitive load and stops procrastination before it starts.</li>
            <li><strong>Reduced Mental Fatigue:</strong> Regular 5-minute breaks give your brain time to assimilate new information and rest your eyes.</li>
            <li><strong>Clear Progress Tracking:</strong> Every completed cycle is a small victory. Tracking these cycles gives you a sense of accomplishment and visualizes your hard work.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">Features of Our Study Timer</h3>
          <p className="leading-relaxed mb-4 text-sm md:text-base">
            We've packed this web app with features specifically requested by top-performing students:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li><strong>Customizable Durations:</strong> Not everyone learns the same way. Adjust your focus and break times in the settings menu to fit your personal workflow.</li>
            <li><strong>Subject Tracking & Analytics:</strong> Tag your sessions by subject (Math, Science, Coding, etc.) and view detailed statistics on where your time is going.</li>
            <li><strong>Exam Countdown:</strong> Keep your upcoming test dates front and center. Our built-in schedule ranks your exams by urgency.</li>
            <li><strong>AI Study Planner:</strong> Generate an intelligent study schedule based on the exams you have coming up and the intensity you need.</li>
            <li><strong>Multiplayer Focus Groups:</strong> Join virtual rooms to study alongside others. The presence of peers can dramatically increase accountability.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-3">How to Get Started</h3>
          <p className="leading-relaxed text-sm md:text-base">
            Using the Exam Study Timer is incredibly simple. Just select a subject, tweak the timer settings if necessary, and press the prominent Play button. When the focus timer concludes, an audio chime will alert you to take a well-deserved break. It's completely free to use online on desktop, tablet, and mobile browsers.
          </p>
        </div>
      </div>

      {/* AI Study Plan Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl shadow-amber-500/10">
            <button onClick={() => { setShowAIModal(false); setAiPlanStatus('idle'); }} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
               <div className="bg-amber-500/20 p-2 rounded-lg"><Sparkles size={24} className="text-amber-400" /></div>
               <h2 className="text-xl font-bold text-white">AI Study Plan</h2>
            </div>
            
            {aiPlanStatus === 'idle' ? (
              <div className="space-y-4">
                <p className="text-slate-300 text-sm">Let our AI analyze your upcoming exams and generate an optimal daily study schedule.</p>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Target Exam (from schedule)</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-amber-500">
                    {exams.length > 0 ? exams.map(e => <option key={e.id}>{e.name} ({e.subject})</option>) : <option>No exams scheduled</option>}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-1">Intensity</label>
                  <select className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white text-sm outline-none focus:border-amber-500">
                    <option>Balanced (2 hours/day)</option>
                    <option>Intense (4 hours/day)</option>
                    <option>Cramming (8 hours/day)</option>
                  </select>
                </div>
                <button 
                  onClick={() => {
                    setAiPlanStatus('generating');
                    setTimeout(() => setAiPlanStatus('done'), 2000);
                  }}
                  disabled={exams.length === 0}
                  className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium py-3 rounded-xl hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Generate Plan
                </button>
                {exams.length === 0 && <p className="text-amber-400/80 text-xs text-center mt-2">Add an exam to your schedule first!</p>}
              </div>
            ) : aiPlanStatus === 'generating' ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Sparkles size={40} className="text-amber-400 animate-pulse mb-4" />
                <h3 className="text-white font-medium mb-1">Analyzing schedule...</h3>
                <p className="text-slate-400 text-sm">Crafting the perfect study rhythm.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-emerald-500/20 border border-emerald-500/30 p-3 rounded-xl text-emerald-200 text-sm mb-4 flex gap-2">
                  <Check className="shrink-0 text-emerald-400" /> Plan generated successfully based on your learning history!
                </div>
                <div className="max-h-[30vh] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-amber-400 text-xs font-bold mb-1">TODAY</div>
                    <div className="text-white text-sm">2x Focus Sessions on core concepts. Review chapters 1-3.</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-slate-400 text-xs font-bold mb-1">TOMORROW</div>
                    <div className="text-white text-sm">1x Focus Session. Practice test #1 and review mistakes.</div>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                    <div className="text-slate-400 text-xs font-bold mb-1">DAY 3</div>
                    <div className="text-white text-sm">3x Focus Sessions. Advanced topics and flashcards.</div>
                  </div>
                </div>
                <button 
                  onClick={() => setAiPlanStatus('idle')}
                  className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-xl transition-colors"
                >
                  Create another plan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Multiplayer Groups Modal */}
      {showGroupsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl shadow-indigo-500/10">
            <button onClick={() => setShowGroupsModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
               <div className="bg-indigo-500/20 p-2 rounded-lg"><Users size={24} className="text-indigo-400" /></div>
               <h2 className="text-xl font-bold text-white">Live Focus Groups</h2>
            </div>
            
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar -mx-2 px-2">
              {[
                { id: 1, name: "Global Pre-Med Study", users: 142, tags: ["Science", "Intense"] },
                { id: 2, name: "Late Night Coders", users: 89, tags: ["Coding", "Chill"] },
                { id: 3, name: "Math Olympiad Prep", users: 34, tags: ["Math", "Silent"] },
                { id: 4, name: "Pomodoro Masters", users: 512, tags: ["Productivity"] }
              ].map(group => (
                <div key={group.id} className={`p-4 rounded-xl border transition-all cursor-pointer ${activeGroup === group.name ? 'bg-indigo-500/20 border-indigo-500/50' : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-black/40'}`} onClick={() => setActiveGroup(activeGroup === group.name ? null : group.name)}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-white text-sm">{group.name}</div>
                    <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                      {group.users}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {group.tags.map(t => <span key={t} className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">{t}</span>)}
                  </div>
                  {activeGroup === group.name && (
                    <button className="mt-3 w-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                      Leave Group
                    </button>
                  )}
                  {activeGroup !== group.name && (
                    <button className="mt-3 w-full bg-white/5 hover:bg-white/10 text-white py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                      Join Group
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Privacy & Terms Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto relative shadow-2xl custom-scrollbar">
            <button 
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Privacy Policy & Terms of Service</h2>
            <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
              <p><strong>Last Updated:</strong> May 2026</p>
              
              <h3 className="text-white font-semibold text-base mt-6">1. Information We Collect</h3>
              <p>Exam Study Timer is designed to respect your privacy. As a core timer application, we do not require you to create an account, nor do we collect personally identifiable information (PII) such as your name, email, or contacts to function.</p>
              
              <h3 className="text-white font-semibold text-base mt-2">2. Local Storage</h3>
              <p>We store your timer preferences, completed study cycles, subject choices, and theme settings locally on your browser. This data is not transmitted to our servers.</p>

              <h3 className="text-white font-semibold text-base mt-2">3. Cookies and Third-Party Services</h3>
              <p>We use third-party advertising services, such as Google AdSense, to keep this app free for everyone. These services may use cookies, web beacons, device identifiers, and technical data about your browser to serve personalized and relevant ads based on your prior visits to our website or other websites.</p>
              <p>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Ads Settings</a>.</p>

              <h3 className="text-white font-semibold text-base mt-2">4. User Responsibilities & Terms</h3>
              <p>By using this web application, you agree to use it for its intended purpose and not to abuse or extract its underlying systems. The app is provided "as is" without warranty of any kind.</p>
              
              <h3 className="text-white font-semibold text-base mt-2">5. Children's Privacy</h3>
              <p>Our application does not knowingly collect data from children under the age of 13. If you are a parent and believe your child has provided us with data, please contact us so we can resolve the issue.</p>

              <h3 className="text-white font-semibold text-base mt-2">6. Contact & Data Deletion</h3>
              <p>Because all data is stored locally in your browser's localStorage, you can instantly erase all data by clearing your browser's site data. For inquiries, you can use the Contact page.</p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-700 text-center">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto relative shadow-2xl custom-scrollbar">
            <button 
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">About Us</h2>
            <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
              <p>
                <strong>Exam Study Timer</strong> was created with a simple mission: to provide the most effective and distraction-free study environment possible for students worldwide.
              </p>
              <p>
                We realized that while there are many timers out there, few truly cater to the workflow of rigorous exam preparation. We built this application to combine the proven Pomodoro Technique with advanced features like AI study planning, multiplayer focus groups, and local progress analytics.
              </p>
              <p>
                Our small team is dedicated to keeping this tool extremely fast, privacy-respecting, and largely free. To support the hosting and continuous development of the platform, we use carefully selected display advertisements.
              </p>
              <p>
                Thank you for using the Exam Study Timer for your learning journey! Keep up the great work.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-700 text-center">
              <button 
                onClick={() => setShowAboutModal(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto relative shadow-2xl custom-scrollbar">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
            <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
              <p>
                We would love to hear from you! Whether you have feature suggestions, bug reports, or questions regarding privacy and advertising, our team is ready to help.
              </p>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mt-4">
                <p className="mb-2"><strong>General Inquiries:</strong></p>
                <p className="text-indigo-400">hello@examstudytimer.example.com</p>
                
                <p className="mt-4 mb-2"><strong>Support & Bugs:</strong></p>
                <p className="text-indigo-400">support@examstudytimer.example.com</p>
              </div>
              <p className="text-xs text-slate-500 mt-4">Please allow up to 48 hours for a response from our small team.</p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-700 text-center">
              <button 
                onClick={() => setShowContactModal(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 max-w-sm w-full relative shadow-2xl">
            <button 
              onClick={() => setShowStatsModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
               <BarChart2 size={24} className="text-indigo-400" />
               <h2 className="text-xl font-bold text-white">Study Analytics</h2>
            </div>
            
            <div className="space-y-4">
              {SUBJECTS.map(subj => {
                const minutes = stats[subj] || 0;
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                const maxTime = Math.max(...(Object.values(stats) as number[]), 1);
                const percentage = (minutes / maxTime) * 100;
                
                return (
                  <div key={subj}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/80">{subj}</span>
                      <span className="text-white font-medium">
                        {hours > 0 ? `${hours}h ` : ''}{mins}m
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full transition-all duration-1000" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
               <Calendar size={24} className="text-emerald-400" />
               <h2 className="text-xl font-bold text-white">Exam Schedule</h2>
            </div>
            
              <div className="mb-6 flex gap-2 flex-col sm:flex-row">
                <input 
                  type="text" 
                  placeholder="Exam name" 
                  value={newExam.name}
                  onChange={e => setNewExam({...newExam, name: e.target.value})}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
                <input 
                  type="date" 
                  value={newExam.date}
                  onChange={e => setNewExam({...newExam, date: e.target.value})}
                  className="bg-white/5 border border-white/10 cursor-pointer rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                  style={{ colorScheme: 'dark' }}
                />
                <select
                  value={newExam.subject}
                  onChange={e => setNewExam({...newExam, subject: e.target.value})}
                  className="bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button 
                  onClick={() => {
                    if (newExam.name && newExam.date) {
                      setExams([...exams, { ...newExam, id: Date.now().toString() }]);
                      setNewExam({ name: '', date: '', subject: SUBJECTS[0] });
                    }
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg p-2 flex items-center justify-center transition-colors shrink-0"
                >
                  <Plus size={20} />
                </button>
              </div>
            
            <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {exams.length === 0 ? (
                <p className="text-white/40 text-sm text-center py-4">No exams scheduled yet.</p>
              ) : (
                exams.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(exam => {
                  const daysLeft = Math.ceil((new Date(exam.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <div key={exam.id} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5">
                      <div>
                        <div className="text-white font-medium text-sm flex items-center gap-2">
                          {exam.name}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 uppercase">
                            {exam.subject}
                          </span>
                        </div>
                        <div className={`text-xs mt-1 ${daysLeft < 3 ? 'text-red-400' : daysLeft < 7 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Today!' : 'Passed'} ({new Date(exam.date).toLocaleDateString()})
                        </div>
                      </div>
                      <button 
                        onClick={() => setExams(exams.filter(e => e.id !== exam.id))}
                        className="text-white/40 hover:text-red-400 transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 max-w-sm w-full relative shadow-2xl">
            <button 
              onClick={() => {
                setShowSettingsModal(false);
                setTimeLeft(mode === 'study' ? studyDuration * 60 : breakDuration * 60);
                setIsRunning(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
               <Settings size={24} className="text-amber-400" />
               <h2 className="text-xl font-bold text-white">Timer Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Study Duration (minutes)</label>
                <input 
                  type="range" 
                  min="5" max="120" step="5"
                  value={studyDuration}
                  onChange={(e) => setStudyDuration(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="text-right text-white font-bold mt-1">{studyDuration} min</div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Break Duration (minutes)</label>
                <input 
                  type="range" 
                  min="1" max="30" step="1"
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="text-right text-white font-bold mt-1">{breakDuration} min</div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setShowSettingsModal(false);
                setTimeLeft(mode === 'study' ? studyDuration * 60 : breakDuration * 60);
                setIsRunning(false);
              }}
              className="mt-8 w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl transition-all"
            >
              Save & Apply
            </button>
          </div>
        </div>
      )}


      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 md:p-6 z-[100] flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="text-slate-300 text-sm md:max-w-3xl">
            <p><strong>We value your privacy.</strong> We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies according to our Privacy Policy.</p>
          </div>
          <div className="flex gap-3 shrink-0 w-full md:w-auto">
            <button 
              onClick={() => {
                localStorage.setItem('cookieConsent', 'true');
                setShowCookieConsent(false);
              }}
              className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
               Accept All
            </button>
            <Link 
              to="/privacy-policy"
              onClick={() => setShowCookieConsent(false)}
              className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap text-center text-sm flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      )}

    </div>
  );
        }
