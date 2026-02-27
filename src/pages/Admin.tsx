import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, LogOut, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import BlogEditor from "@/components/admin/BlogEditor";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  excerpt: string | null;
  featured_image: string | null;
};

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<string | null>(null); // post id or "new"
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, category, status, published_at, created_at, excerpt, featured_image")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading posts", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setFetching(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting post", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Post deleted" });
      fetchPosts();
    }
  };

  const handleTogglePublish = async (post: Post) => {
    const newStatus = post.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("blog_posts")
      .update({
        status: newStatus,
        published_at: newStatus === "published" ? new Date().toISOString() : null,
      })
      .eq("id", post.id);

    if (error) {
      toast({ title: "Error updating post", description: error.message, variant: "destructive" });
    } else {
      toast({ title: newStatus === "published" ? "Post published" : "Post moved to draft" });
      fetchPosts();
    }
  };

  if (loading || !user) return null;

  if (editingPost) {
    return (
      <BlogEditor
        postId={editingPost === "new" ? null : editingPost}
        onDone={() => { setEditingPost(null); fetchPosts(); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="section-container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="/" className="font-serif text-xl font-semibold text-foreground">raingoesaway</a>
            <span className="text-muted-foreground text-sm">/</span>
            <span className="text-sm font-sans tracking-widest uppercase text-muted-foreground">Blog Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 text-muted-foreground">
            <LogOut size={14} />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="section-container py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl font-light text-foreground">Blog Posts</h1>
            <p className="text-sm text-muted-foreground mt-1">{posts.length} post{posts.length !== 1 ? "s" : ""} total</p>
          </div>
          <Button onClick={() => setEditingPost("new")} className="gap-2">
            <Plus size={14} />
            New Post
          </Button>
        </div>

        <div className="silver-line mb-8" />

        {fetching ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="editorial-card animate-pulse h-20" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground mb-4">No posts yet.</p>
            <Button onClick={() => setEditingPost("new")} variant="outline" className="gap-2">
              <Plus size={14} />
              Create your first post
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="editorial-card flex items-center gap-4">
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-lg text-foreground truncate">{post.title}</h3>
                    <span className={`text-xs font-sans tracking-widest uppercase px-2 py-0.5 rounded-sm ${
                      post.status === "published"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  {post.category && (
                    <span className="text-xs text-muted-foreground font-sans tracking-widest uppercase">{post.category}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleTogglePublish(post)}
                    title={post.status === "published" ? "Move to draft" : "Publish"}
                  >
                    {post.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingPost(post.id)}
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(post.id)}
                    title="Delete"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
