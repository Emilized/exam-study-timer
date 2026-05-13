import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="w-full max-w-3xl">
        <Link to="/blog" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} className="mr-2" />
          Back to all articles
        </Link>
        
        <article className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700">
          <div className="flex items-center gap-4 mb-8">
            <div className={`p-4 rounded-2xl border shrink-0 ${styles.bg} ${styles.border}`}>
              <Icon className={`w-8 h-8 ${styles.text}`} />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
          
          <div className="space-y-6 text-slate-300 leading-relaxed text-left text-lg article-content">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}
