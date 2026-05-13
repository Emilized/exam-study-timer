import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Smartphone, Brain, Coffee, Activity, Monitor, Lightbulb } from 'lucide-react';

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
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
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

          {/* Article 4 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Science of Spaced Repetition: Defeating the Forgetting Curve</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                Have you ever crammed for an exam, passed it, and then completely forgotten the material two weeks later? This phenomenon is a well-documented psychological concept known as the Ebbinghaus Forgetting Curve. It illustrates the rapid rate at which humans lose memory of learned information unless that information is deliberately reviewed. If you want to retain knowledge long-term—for finals, board exams, or your career—cramming is your worst enemy.
              </p>
              <p>
                The antidote to this rapid memory decay is Spaced Repetition. Instead of studying a topic for five hours in one day, you study it for one hour a day over five days, gradually increasing the intervals between review sessions. For instance, you might learn a concept on Monday, review it on Tuesday, then again on Friday, and once more two weeks later.
              </p>
              <p>
                This technique works because it forces your brain to retrieve information just as it is about to forget it. Every time you actively recall the data, the neural pathway associated with that memory becomes stronger and more durable. It signals to your brain, "This information is important; keep it accessible."
              </p>
              <p>
                To implement spaced repetition, you can use physical flashcards structured in a Leitner box system, or leverage digital tools and apps like Anki or Quizlet. By combining study timers with a strict spaced repetition schedule, you effectively bypass rote memorization and build genuine, long-lasting comprehension.
              </p>
            </div>
          </article>

          {/* Article 5 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rose-500/20 p-3 rounded-xl border border-rose-500/30">
                <Coffee className="w-6 h-6 text-rose-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Fueling Your Focus: Nutrition Tips for Peak Cognitive Performance</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                We often treat our brains as separate from our bodies, assuming that willpower alone can push us through a grinding study session. However, the brain is an energy-intensive organ, consuming roughly 20% of the body's daily caloric intake. The quality of fuel you provide directly dictates the quality of focus it will produce. 
              </p>
              <p>
                When a difficult deadline looms, students often reach for fast food, sugary energy drinks, and highly processed snacks. While these deliver a rapid spike in blood glucose, the inevitable crash leaves you feeling lethargic, irritable, and incapable of absorbing complex information. 
              </p>
              <p>
                Instead of simple sugars, prioritize complex carbohydrates, lean proteins, and healthy fats. Foods rich in Omega-3 fatty acids, such as walnuts, chia seeds, and salmon, have been scientifically linked to improved memory and cognitive function. Antioxidant-rich berries, such as blueberries, protect the brain from oxidative stress and can enhance communication between brain cells.
              </p>
              <p>
                Equally important is hydration. Mild dehydration—as little as a 2% loss of water volume—has been shown to impair attention, psychomotor skills, and immediate memory skills. Keep a large bottle of water on your desk and sip it consistently. Treat your study prep like athletic prep; give your body the premium nutrients it requires to perform at the highest level.
              </p>
            </div>
          </article>

          {/* Article 6 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-teal-500/20 p-3 rounded-xl border border-teal-500/30">
                <Activity className="w-6 h-6 text-teal-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Recognizing and Preventing Academic Burnout</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                There is a pervasive hustle culture in modern academia that glorifies exhaustion. "Sleep is for the weak" and "Grind until you drop" are toxic mindsets that ultimately lead to a severe psychological condition: burnout. Academic burnout isn't simply being tired after a long day; it is a state of chronic physical and emotional exhaustion accompanied by cynicism and a profound sense of reduced accomplishment.
              </p>
              <p>
                The warning signs are subtle. You might begin to procrastinate severely, feel an overwhelming sense of apathy toward subjects you once enjoyed, or experience physical symptoms like tension headaches and chronic insomnia. You stare at your textbooks, but the words refuse to compute.
              </p>
              <p>
                Preventing burnout requires extreme boundary management. Studying cannot encompass 100% of your waking life. You must aggressively schedule downtime just as you schedule your exam prep. Hobbies, socializing, exercising, and meaningless relaxation are not wastes of time; they are the necessary recovery periods that allow your brain to heal and process information.
              </p>
              <p>
                If you sense burnout approaching, dialing back is not a sign of weakness. Implement rigid cut-off times for your work, utilize regular timed study breaks, and do not hesitate to reach out to campus counseling services. It's infinitely better to step back, recover, and take an exam with a clear head than to push through to a total breakdown.
              </p>
            </div>
          </article>

          {/* Article 7 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/30">
                <Monitor className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Designing the Ultimate High-Focus Study Space</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                Where you study profoundly impacts how you study. Trying to solve complex calculus equations on your bed, surrounded by laundry, with the television playing in the background is fighting an uphill battle against your own biology. Your brain builds associations with locations; your bed is associated with sleep, the living room with entertainment, and your desk should be exclusively associated with work.
              </p>
              <p>
                The golden rule of study space design is minimalist intention. Clear your desk of clutter. A cluttered visual field acts as a constant drain on your attention span, as your brain subconsciously processes the messy periphery. Keep only what you immediately require: your laptop, the specific textbook you are using, a notepad, and a glass of water.
              </p>
              <p>
                Ergonomics are crucial for prolonged focus. If you are hunched over a tiny laptop screen, neck pain will quickly override your concentration. Prop your screen up to eye level, invest in a chair with proper lumbar support, and keep your feet flat on the floor. Physical comfort removes friction from the studying equation.
              </p>
              <p>
                Finally, auditory control is everything. If you are trapped in a noisy dorm or a loud café, noise-canceling headphones are unparalleled tools. Utilize white noise, rain sounds, or lyric-free instrumental music like lo-fi hip hop to build a "wall of sound" that isolates you from your environment. 
              </p>
            </div>
          </article>

          {/* Article 8 */}
          <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-pink-500/20 p-3 rounded-xl border border-pink-500/30">
                <Lightbulb className="w-6 h-6 text-pink-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Feynman Technique: Learn Anything Faster</h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>
                You read the textbook chapter twice, highlighted the key phrases, and felt completely confident. But when the test arrives, your mind goes blank. This incredibly common experience stems from mistaking "recognition" for "understanding." To truly master a difficult academic concept, few tools are as powerful as the Feynman Technique, named after the Nobel Prize-winning physicist Richard Feynman.
              </p>
              <p>
                The premise of the Feynman Technique is simple: test your knowledge by trying to explain the concept in plain, simple terms, as if you were teaching it to a sixth-grader. It strips away academic jargon and complex vocabulary, forcing you to rely on core understanding.
              </p>
              <p>
                First, take a blank piece of paper and write the name of the concept at the top. Next, explain the idea out loud or write it down as simply as possible. Do not use the textbook's definitions. Use analogies and everyday examples. 
              </p>
              <p>
                Inevitably, you will get stuck or realize a piece of your explanation falls apart. This is the magic of the technique: it instantly highlights your blind spots. Once you locate the gap in your knowledge, return to your source material, re-learn that specific missing piece, and incorporate it into your simple explanation. By simplifying the complex, you cement the knowledge permanently into your foundation.
              </p>
            </div>
          </article>

        </div>
      </div>
    </div>
  );
}
