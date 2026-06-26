import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

const posts = getAllPosts().slice(0, 3);

const formatDate = (iso: string) => {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(new Date(iso));
};

const BlogSection = () => (
  <section id="blog" className="py-24 md:py-32 bg-background">
    <div className="section-container">
      <div className="green-line mb-16" />
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="section-label mb-4">Blog</p>
          <h2 className="section-heading">
            LATEST <span className="green-gradient-text">THOUGHTS</span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="hidden md:inline-flex items-center gap-1 section-label text-primary hover:gap-2 transition-all"
        >
          All Posts <ArrowUpRight size={14} />
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-body text-sm">
          No posts published yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="glass-card p-6 group cursor-pointer flex flex-col"
            >
              {post.category && (
                <span className="section-label text-primary/60 mb-3">{post.category}</span>
              )}
              <h3 className="font-display text-lg font-bold uppercase text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight flex-1">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="section-label">{formatDate(post.date)}</span>
                <span className="inline-flex items-center gap-1 section-label text-primary group-hover:gap-2 transition-all">
                  Read <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 text-center md:hidden">
        <Link to="/blog" className="btn-outline">
          All Posts
        </Link>
      </div>
    </div>
  </section>
);

export default BlogSection;
