import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

const posts = getAllPosts();

const formatDate = (iso: string) => {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
};

const Blog = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Blog | Rainard Distor</title>
      <meta
        name="description"
        content="Writing on AI governance and digital policy in Southeast Asia, with a focus on who gets left out of the conversation."
      />
      <link rel="canonical" href="https://raingoesaway.com/blog" />
      <meta property="og:title" content="Blog | Rainard Distor" />
      <meta
        property="og:description"
        content="Writing on AI governance and digital policy in Southeast Asia."
      />
      <meta property="og:url" content="https://raingoesaway.com/blog" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://raingoesaway.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://raingoesaway.com/og-image.png" />
    </Helmet>

    <Navbar />

    <main className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft size={12} />
          Home
        </Link>

        <div className="green-line mb-12" />

        <p className="section-label mb-4">Blog</p>
        <h1 className="section-heading mb-4">
          LATEST <span className="green-gradient-text">THOUGHTS</span>
        </h1>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-16 max-w-lg">
          Writing on AI governance and digital policy in Southeast Asia, with a focus on who gets
          left out of the conversation.
        </p>

        {posts.length === 0 ? (
          <p className="text-sm font-body text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="space-y-0">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="glass-card p-6 group cursor-pointer block"
                style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.06)" }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                  <div className="md:w-44 shrink-0">
                    {post.category && (
                      <span className="section-label text-primary/60">{post.category}</span>
                    )}
                    <p className="section-label mt-1">{formatDate(post.date)}</p>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-lg font-bold uppercase text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm font-body text-muted-foreground leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 section-label text-primary group-hover:gap-2 transition-all">
                      Read <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>

    <Footer />
  </div>
);

export default Blog;
