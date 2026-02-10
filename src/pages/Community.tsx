import { useState } from "react";
import { Heart, MessageCircle, Plus, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import imgPullups from "@/assets/workout-pullups.jpg";
import imgHandstand from "@/assets/workout-handstand.jpg";

const tags = ["All", "Beginners", "Form Check", "Progress", "Tips", "Questions"];

const posts = [
  {
    id: "1",
    user: { name: "Alex Rivera", avatar: "🏋️", level: "Advanced" },
    tag: "Progress",
    content: "Finally hit my first strict muscle-up today! 6 months of consistent training. The key was developing the false grip and training high pull-ups. Don't give up! 💪",
    image: imgPullups,
    likes: 47,
    comments: 12,
    time: "2h ago",
  },
  {
    id: "2",
    user: { name: "Jordan Lee", avatar: "🤸", level: "Intermediate" },
    tag: "Form Check",
    content: "Working on my handstand alignment. Any tips for fixing the banana back? I've been doing chest-to-wall holds but still arching.",
    image: imgHandstand,
    likes: 23,
    comments: 8,
    time: "5h ago",
  },
  {
    id: "3",
    user: { name: "Sam Chen", avatar: "💪", level: "Beginner" },
    tag: "Beginners",
    content: "Day 30 of my calisthenics journey! Can now do 15 push-ups and 3 Australian rows. Progress is slow but consistent. Any recommendations for what to focus on next?",
    image: null,
    likes: 89,
    comments: 24,
    time: "8h ago",
  },
  {
    id: "4",
    user: { name: "Maya Santos", avatar: "🔥", level: "Expert" },
    tag: "Tips",
    content: "Pro tip: Your wrist conditioning routine is just as important as your strength training. Spend 5 minutes daily doing wrist circles, flexor stretches, and supported wrist push-ups.",
    image: null,
    likes: 156,
    comments: 31,
    time: "12h ago",
  },
];

export default function Community() {
  const [activeTag, setActiveTag] = useState("All");

  const filtered = activeTag === "All" ? posts : posts.filter((p) => p.tag === activeTag);

  return (
    <div className="pt-6 safe-top">
      <div className="px-5 flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Community</h1>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <Plus className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-4 px-5 overflow-x-auto no-scrollbar">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
              activeTag === tag ? "bg-primary text-primary-foreground" : "bg-card card-shadow text-muted-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="mt-4 space-y-4 px-5">
        {filtered.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-card card-shadow overflow-hidden"
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-lg">
                    {post.user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{post.user.name}</p>
                    <p className="text-[10px] text-muted-foreground">{post.user.level} · {post.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{post.tag}</span>
                  <button><MoreHorizontal className="w-4 h-4 text-muted-foreground" /></button>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm mt-3 leading-relaxed">{post.content}</p>
            </div>

            {/* Image */}
            {post.image && (
              <img src={post.image} alt="" className="w-full h-48 object-cover" />
            )}

            {/* Actions */}
            <div className="p-4 pt-3 flex items-center gap-6 border-t border-border/50">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-4 h-4" /> {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4" /> {post.comments}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
