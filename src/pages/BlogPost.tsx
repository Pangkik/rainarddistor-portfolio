import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const ogImage = post?.image
    ? `https://www.raingoesaway.com${post.image}`
    : "https://www.raingoesaway.com/og-image.png";

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-body text-sm">Post not found.</p>
      </div>
    );
  }

  const formattedDate = post.date
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.date))
    : "";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Rainard Distor</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.raingoesaway.com/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | Rainard Distor`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://www.raingoesaway.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: ogImage,
            datePublished: post.date,
            url: `https://www.raingoesaway.com/blog/${post.slug}`,
            mainEntityOfPage: `https://www.raingoesaway.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Rainard Distor",
              url: "https://www.raingoesaway.com/",
            },
            publisher: {
              "@type": "Person",
              name: "Rainard Distor",
              url: "https://www.raingoesaway.com/",
            },
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="pt-28 pb-24">
        <article className="max-w-3xl mx-auto px-6 md:px-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={12} />
            Blog
          </Link>

          {post.category && (
            <p className="text-xs font-sans tracking-widest uppercase text-primary/60 mb-4">
              {post.category}
            </p>
          )}

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {formattedDate && (
            <p className="text-sm font-sans text-muted-foreground mb-10">{formattedDate}</p>
          )}

          <div className="silver-line mb-10" />

          {post.image && (
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full rounded-xl mb-10"
              width={1200}
              height={630}
            />
          )}

          {post.excerpt && (
            <p className="font-serif text-xl text-foreground/80 leading-relaxed mb-10 italic">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose prose-invert max-w-none font-sans font-light text-foreground/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
