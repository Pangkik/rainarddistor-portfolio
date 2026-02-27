import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";

type Props = {
  postId: string | null;
  onDone: () => void;
};

const BlogEditor = ({ postId, onDone }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(!!postId);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (error) {
      toast({ title: "Error loading post", description: error.message, variant: "destructive" });
    } else if (data) {
      setTitle(data.title);
      setSlug(data.slug);
      setContent(data.content || "");
      setExcerpt(data.excerpt || "");
      setCategory(data.category || "");
      setFeaturedImage(data.featured_image || null);
      setStatus(data.status as "draft" | "published");
    }
    setLoading(false);
  };

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!postId) setSlug(generateSlug(val));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please use an image under 5MB.", variant: "destructive" });
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user?.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setFeaturedImage(data.publicUrl);
      toast({ title: "Image uploaded!" });
    }
    setUploading(false);
  };

  const handleSave = async (publishNow?: boolean) => {
    if (!title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (!slug.trim()) {
      toast({ title: "Slug is required", variant: "destructive" });
      return;
    }

    setSaving(true);
    const finalStatus = publishNow ? "published" : status;
    const payload = {
      title,
      slug,
      content,
      excerpt,
      category,
      featured_image: featuredImage,
      status: finalStatus,
      published_at: finalStatus === "published" ? new Date().toISOString() : null,
    };

    let error;
    if (postId) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", postId));
    } else {
      ({ error } = await supabase.from("blog_posts").insert({ ...payload, author_id: user!.id }));
    }

    if (error) {
      toast({ title: "Error saving post", description: error.message, variant: "destructive" });
    } else {
      toast({ title: postId ? "Post updated" : "Post created" });
      onDone();
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" size={24} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="section-container flex items-center justify-between h-16">
          <button onClick={onDone} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} />
            <span className="text-sm font-sans">Back to posts</span>
          </button>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => handleSave(false)} disabled={saving}>
              Save Draft
            </Button>
            <Button size="sm" onClick={() => handleSave(true)} disabled={saving} className="gap-2">
              {saving && <Loader2 size={12} className="animate-spin" />}
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="section-container py-10 max-w-4xl">
        <div className="space-y-6">
          {/* Featured Image */}
          <div>
            <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-3">
              Featured Image
            </label>
            {featuredImage ? (
              <div className="relative inline-block">
                <img
                  src={featuredImage}
                  alt="Featured"
                  className="w-full max-w-md h-48 object-cover rounded-sm border border-border"
                />
                <button
                  onClick={() => setFeaturedImage(null)}
                  className="absolute top-2 right-2 bg-background/80 rounded-full p-1 hover:bg-background transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-3 border border-dashed border-border rounded-sm px-6 py-8 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all w-full max-w-md justify-center"
              >
                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                <span className="text-sm font-sans">{uploading ? "Uploading…" : "Upload image"}</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {featuredImage && (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-2 text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <Upload size={10} />
                Change image
              </button>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-2">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Your post title…"
              className="w-full bg-transparent border-none outline-none font-serif text-3xl md:text-4xl font-light text-foreground placeholder:text-muted-foreground/40 resize-none"
            />
          </div>

          <div className="silver-line" />

          {/* Meta row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-2">
                Slug
              </label>
              <Input
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                placeholder="post-slug"
                className="bg-secondary border-border font-mono text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-2">
                Category
              </label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. AI Policy"
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="w-full h-10 bg-secondary border border-border rounded-md px-3 text-sm text-foreground"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-2">
              Excerpt
            </label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary of the post…"
              className="bg-secondary border-border resize-none"
              rows={2}
            />
          </div>

          {/* Content */}
          <div>
            <label className="text-xs font-sans tracking-widest uppercase text-muted-foreground block mb-2">
              Content
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here…"
              className="bg-secondary border-border resize-none min-h-[400px] font-sans text-sm leading-relaxed"
              rows={20}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;
