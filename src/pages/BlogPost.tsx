import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  category: string | null;
  featured_image: string | null;
  published_at: string | null;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, content, excerpt, category, featured_image, published_at")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        navigate("/", { replace: true });
      } else {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  const formattedDate = post.published_at
    ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(new Date(post.published_at))
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-24">
        <article className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Back link */}
          <a
            href="/#blog"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={12} />
            Blog
          </a>

          {post.category && (
            <p className="text-xs font-sans tracking-widest uppercase text-primary/60 mb-4">{post.category}</p>
          )}

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {formattedDate && (
            <p className="text-sm font-sans text-muted-foreground mb-10">{formattedDate}</p>
          )}

          {post.featured_image && (
            <div className="mb-12">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full rounded-sm object-cover max-h-[480px]"
              />
            </div>
          )}

          <div className="silver-line mb-10" />

          {post.excerpt && (
            <p className="font-serif text-xl text-foreground/80 leading-relaxed mb-10 italic">
              {post.excerpt}
            </p>
          )}

          {post.content && (
            <div className="prose prose-invert max-w-none font-sans font-light text-foreground/80 leading-relaxed space-y-4">
              {post.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
