import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUpRight } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  published_at: string | null;
};

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, category, featured_image, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(new Date(iso));
  };

  return (
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
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse h-48" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body text-sm">
            No posts published yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="glass-card p-6 group cursor-pointer flex flex-col"
                onClick={() => (window.location.href = `/blog/${post.slug}`)}
              >
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-36 object-cover rounded-lg mb-4"
                  />
                )}
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
                  <span className="section-label">{formatDate(post.published_at)}</span>
                  <span className="inline-flex items-center gap-1 section-label text-primary group-hover:gap-2 transition-all">
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
