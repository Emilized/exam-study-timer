import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" />
          Back to Timer
        </Link>
        
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Study Tips & Insights</h1>
          <p className="text-slate-400 text-lg">Master your focus and conquer your exams with our expert guides.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {blogPosts.map((post) => {
            const Icon = post.icon;
            const colorMap: Record<string, { bg: string, text: string, border: string }> = {
              indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
              emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
              amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
              blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
              rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
              teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
              purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
              pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
            };
            const styles = colorMap[post.color] || colorMap.indigo;

            return (
              <Link 
                key={post.slug} 
                to={`/blog/${post.slug}`}
                className="group flex flex-col bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-700/50 hover:border-slate-500 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`mb-6 p-3 rounded-xl border self-start ${styles.bg} ${styles.border}`}>
                  <Icon className={`w-6 h-6 ${styles.text}`} />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-6 font-medium text-sm text-indigo-400 group-hover:text-indigo-300 flex items-center transition-colors">
                  Read Article →
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
