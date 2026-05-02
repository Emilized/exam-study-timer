import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Smartphone } from 'lucide-react';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Timer
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Study Tips & Insights</h1>
          <p className="text-slate-400 text-lg">Master your focus and conquer your exams with our expert guides.</p>
        </div>
        
        <div className="space-y-12">
          
          {/* Article 1 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-500/20 p-3 rounded-xl border border-indigo-500/30">
                <Clock className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Why the 25-Minute Rule Works Wonders</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                Have you ever sat down intending to study for three hours, only to find yourself scrolling through your phone 45 minutes in, feeling completely exhausted? You're not alone. The human brain was simply not designed to focus intensely on complex tasks for unlimited, unbroken stretches of time. This is where the magic of the 25-minute focus session comes into play.
              </p>
              <p>
                The Pomodoro Technique, developed by Francesco Cirillo in the late 1980s, advocates for breaking work down into intervals, traditionally 25 minutes long, separated by short breaks. The ingenuity of the "25-minute rule" lies in its psychological effect. Initially, it forces a sense of urgency. Knowing you only have 25 minutes to complete a specific task minimizes the likelihood of succumbing to distractions. You think, "I can answer these text messages immediately after this timer goes off."
              </p>
              <p>
                Furthermore, working in these focused sprints aligns beautifully with your brain's natural attention span. This period of intense concentration prevents the cognitive exhaustion that accompanies marathon study sessions. When the chime rings, that mandatory 5-minute break acts as a mental reset. You step away from your desk, stretch, grab some water, and allow the information you just absorbed to settle.
              </p>
              <p>
                It essentially hacks your reward system. Completing a 25-minute session provides a minor boost of dopamine—a "win"—which propels you into the next cycle. You go from feeling overwhelmed by a colossal chapter to tackling it one manageable block at a time. So next time you feel intimidated by your syllabus, just tell yourself: "I'll just do 25 minutes."
              </p>
            </div>
          </article>

          {/* Article 2 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30">
                <Smartphone className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">5 Tested Ways to Beat Exam Stress and Phone Distractions</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                The modern student has a significantly harder time studying than previous generations, primarily due to the potent distraction machines located in our pockets. Exam stress combined with constant notifications is a recipe for anxiety and poor academic performance. If you want to elevate your grades, managing your digital environment is no longer optional; it's a prerequisite.
              </p>
              <p><strong>1. Put the Phone in Another Room:</strong> "Out of sight, out of mind" is a powerful psychological tool. If your phone is on your desk, even face down, it consumes a portion of your active cognitive bandwidth. Put it in another room while the study timer is running. You can check it during your breaks.</p>
              <p><strong>2. Prepare Your Environment First:</strong> Before you hit "Start" on your timer, ensure you have everything you need. Water, snacks, highlighters, and textbooks should all be within arm's reach. Every time you get up to fetch something, you fracture your concentration.</p>
              <p><strong>3. Use a Dedicated Focus App:</strong> Utilizing an online study timer gives your session structure. Browsing randomly feels bad; having a clock ticking down on your monitor gives your work a clear boundary and objective.</p>
              <p><strong>4. Active Recall over Passive Reading:</strong> Re-reading highlighted notes gives you the illusion of competence. To actually learn and reduce exam panic, utilize active recall. Close the book, write down everything you remember, and then check where you failed. This method is incredibly taxing but highly effective.</p>
              <p><strong>5. Prioritize Sleep Above All Else:</strong> Pulling all-nighters is a massive net negative for exam performance. Your brain consolidates the memories and facts you learned that day while you sleep. By cutting sleep, you destroy the very foundation of learning.</p>
            </div>
          </article>
          
          {/* Article 3 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/30">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">How to Optimize Your Night Study Sessions</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                While morning study sessions are heavily praised, the reality is that many students—especially those balancing jobs, rigorous course loads, or other commitments—rely on the quiet stillness of the night to get their deep work done. Night owls can be incredibly productive, but they must take specific precautions to ensure their late-night grind doesn't derail their following days.
              </p>
              <p>
                The first enemy of the night study is lighting. Blasting your eyes with cold blue light from overhead lamps and monitors suppresses melatonin production, making it enormously difficult to fall asleep once your study session concludes. To counter this, switch to warm, dim lighting. Use software like f.lux or Night Light on your devices, and consider investing in a warm desk lamp. Limit your ambient light to just the area you are working on.
              </p>
              <p>
                Next is the caffeine trap. It's tempting to brew a dark roast coffee or crack a popular energy drink at 10 PM. However, caffeine has a half-life of roughly 5 to 6 hours. This means that half of that caffeine will still be coursing through your system at 4 AM, destroying your deep sleep architecture. Switch to decaf, herbal teas (like chamomile or peppermint), or ice-cold water. Cold water is surprisingly effective at boosting alertness without the chemical hangover.
              </p>
              <p>
                Finally, set a definitive cut-off time. Do not study until you pass out on your keyboard. Your brain has a point of diminishing returns where no new information is absorbed. Choose a hard stopping point—perhaps 1:00 AM—and stick to it. Use the last 15 minutes of your session to organize your notes for the next day, signaling to your brain that it is time to unwind and transition to sleep. 
              </p>
            </div>
          </article>

        </div>
      </div>
    </div>
  );
}
