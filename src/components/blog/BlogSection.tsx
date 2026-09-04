import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import {
  Hash,
  Heart,
  Images,
  Linkedin,
  Loader2,
  MessageCircle,
  PenLine,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Reveal } from "@/components/site/Reveal";
import { feedPhotos, hashString } from "@/lib/actu-media";

type Post = {
  id: string;
  author_id: string;
  titre: string;
  chapeau: string;
  contenu: string;
  categorie: string;
  created_at: string;
};

type Comment = { id: string; post_id: string; author_id: string; contenu: string; created_at: string };

const CATEGORIES = ["Général", "Réseaux", "Vie du club", "Tutoriel", "Retour d'expérience"];

const CATEGORY_TAGS: Record<string, string[]> = {
  "Général": ["#GTEL", "#ENSPY"],
  "Réseaux": ["#Réseaux", "#FibreOptique"],
  "Vie du club": ["#VieDuClub", "#GTEL"],
  "Tutoriel": ["#Tutoriel", "#TravauxPratiques"],
  "Retour d'expérience": ["#RetourDExpérience", "#Terrain"],
};

const LINKEDIN_CLUB = "https://www.linkedin.com/company/club-gtel-enspy/";

const postSchema = z.object({
  contenu: z.string().trim().min(20, "La légende doit faire au moins 20 caractères").max(2000),
});

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

/** Keep the feed light: show the first two sentences of the caption. */
function caption(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const sentences = clean.match(/[^.!?]+[.!?]?/g) ?? [clean];
  const short = sentences.slice(0, 2).join(" ").trim();
  return { short, hasMore: short.length < clean.length, full: clean };
}

function tagsFor(post: Post, niveau: string | null | undefined) {
  const inline = (post.contenu.match(/#[\p{L}\p{N}_]+/gu) ?? []).slice(0, 3);
  const base = CATEGORY_TAGS[post.categorie] ?? ["#GTEL"];
  const extras = niveau ? [`#${niveau}`] : [];
  return Array.from(new Set([...inline, ...base, ...extras])).slice(0, 4);
}

function useDirectory() {
  return useQuery({
    queryKey: ["profiles-directory"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id, display_name, niveau");
      if (error) throw error;
      const map = new Map<string, { display_name: string; niveau: string | null }>();
      for (const p of data ?? []) map.set(p.id, { display_name: p.display_name, niveau: p.niveau });
      return map;
    },
  });
}

export function BlogSection() {
  const { user, profile } = useAuth();
  const qc = useQueryClient();
  const [composerOpen, setComposerOpen] = useState(false);
  const [tagFiltre, setTagFiltre] = useState<string | null>(null);

  const { data: directory } = useDirectory();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, author_id, titre, chapeau, contenu, categorie, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Post[];
    },
  });

  const { data: likes } = useQuery({
    queryKey: ["blog-likes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_likes").select("post_id, user_id");
      if (error) throw error;
      return data ?? [];
    },
  });

  const createPost = useMutation({
    mutationFn: async (input: { contenu: string; categorie: string }) => {
      if (!user) throw new Error("Connexion requise");
      const titre = input.contenu.replace(/\s+/g, " ").trim().slice(0, 110);
      const { error } = await supabase
        .from("blog_posts")
        .insert({ ...input, titre, chapeau: "", author_id: user.id });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Publication ajoutée au fil");
      setComposerOpen(false);
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deletePost = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Publication supprimée");
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });

  const toggleLike = useMutation({
    mutationFn: async ({ postId, liked }: { postId: string; liked: boolean }) => {
      if (!user) throw new Error("Connectez-vous pour aimer une publication");
      if (liked) {
        const { error } = await supabase.from("blog_likes").delete().eq("post_id", postId).eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_likes").insert({ post_id: postId, user_id: user.id });
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog-likes"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const withTags = useMemo(
    () =>
      (posts ?? []).map((p) => ({
        post: p,
        tags: tagsFor(p, directory?.get(p.author_id)?.niveau),
      })),
    [posts, directory],
  );

  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const { tags } of withTags) for (const t of tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([t]) => t);
  }, [withTags]);

  const liste = tagFiltre ? withTags.filter((p) => p.tags.includes(tagFiltre)) : withTags;

  return (
    <section id="blog" className="relative overflow-hidden border-t border-border/60 bg-ink py-14 sm:py-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-cobalt/30 blur-[140px]" />

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Le fil du club</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl sm:text-4xl leading-[1.05] md:text-6xl">
                Le <span className="text-gradient-blue">micro-feed</span> GTEL
              </h2>
              <p className="mt-5 max-w-xl text-mist">
                Photos de TP, moments du club et notes de terrain, publiés en quelques lignes par les membres.
                Tout le monde peut lire et réagir en commentaire.
              </p>
            </div>

            {user ? (
              <button
                type="button"
                onClick={() => setComposerOpen((v) => !v)}
                className="btn-glow inline-flex items-center gap-2 px-6 py-3.5"
              >
                <PenLine className="h-4 w-4" />
                {composerOpen ? "Fermer" : "Publier dans le fil"}
              </button>
            ) : (
              <Link to="/auth" className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5">
                Se connecter pour publier
              </Link>
            )}
          </div>
        </Reveal>

        <AnimatePresence>
          {composerOpen && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <Composer
                pending={createPost.isPending}
                onSubmit={(v) => createPost.mutate(v)}
                authorName={profile?.display_name ?? "Membre GTEL"}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {allTags.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {tagFiltre && (
                <button
                  type="button"
                  onClick={() => setTagFiltre(null)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel hover:text-chalk"
                >
                  <X className="h-3 w-3" />
                  Tout
                </button>
              )}
              {allTags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTagFiltre(tagFiltre === t ? null : t)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-[0.62rem] tracking-[0.1em] transition-all duration-500 ${
                    tagFiltre === t
                      ? "border border-azure bg-azure/15 text-cyan"
                      : "border border-border text-steel hover:border-azure/60 hover:text-chalk"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {isLoading && (
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel">Chargement du fil…</p>
          )}
          {!isLoading && liste.length === 0 && (
            <div className="panel p-10 text-center lg:col-span-2">
              <p className="font-display text-2xl text-chalk">Le fil est encore vide</p>
              <p className="mt-2 text-sm text-mist">
                Soyez le premier membre à partager une photo de TP, un projet ou un moment du club.
              </p>
            </div>
          )}
          {liste.map(({ post, tags }, i) => (
            <Reveal key={post.id} delay={0.05 * i}>
              <FeedCard
                post={post}
                tags={tags}
                author={directory?.get(post.author_id)}
                likes={(likes ?? []).filter((l) => l.post_id === post.id)}
                currentUserId={user?.id ?? null}
                onToggleLike={(liked) => toggleLike.mutate({ postId: post.id, liked })}
                onDelete={() => deletePost.mutate(post.id)}
                onTag={(t) => setTagFiltre(t)}
                directory={directory}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Composer({
  onSubmit,
  pending,
  authorName,
}: {
  onSubmit: (v: { contenu: string; categorie: string }) => void;
  pending: boolean;
  authorName: string;
}) {
  const [contenu, setContenu] = useState("");
  const [categorie, setCategorie] = useState(CATEGORIES[0]!);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const parsed = postSchema.safeParse({ contenu });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
          return;
        }
        onSubmit({ contenu: parsed.data.contenu, categorie });
        setContenu("");
      }}
      className="panel mt-8 space-y-4 p-6 md:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-cyan font-mono text-[0.7rem] text-primary-foreground">
          {initials(authorName)}
        </span>
        <p className="eyebrow">{authorName} · nouvelle publication</p>
      </div>
      <textarea
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        placeholder="Quoi de neuf ? Deux phrases suffisent — ajoutez vos #hashtags."
        rows={4}
        className="field resize-y"
        maxLength={2000}
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategorie(c)}
              className={`rounded-full px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] transition-colors duration-500 ${
                categorie === c ? "border border-azure bg-azure/15 text-cyan" : "border border-border text-steel"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button type="submit" disabled={pending} className="btn-glow inline-flex items-center gap-2 px-6 py-3">
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Publier
        </button>
      </div>
    </form>
  );
}

function PhotoGrid({ photos, alt }: { photos: string[]; alt: string }) {
  const [zoom, setZoom] = useState<string | null>(null);
  const layout =
    photos.length === 1
      ? "grid-cols-1"
      : photos.length === 3
        ? "grid-cols-2 [&>*:first-child]:row-span-2"
        : "grid-cols-2";

  return (
    <>
      <div className={`mt-4 grid gap-1.5 overflow-hidden rounded-xl ${layout}`}>
        {photos.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setZoom(src)}
            className="group/photo relative overflow-hidden"
          >
            <img
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover transition-transform duration-700 group-hover/photo:scale-105 ${
                photos.length === 1 ? "aspect-[16/10]" : "aspect-square"
              }`}
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-foreground/90 p-6 backdrop-blur-xl"
            onClick={() => setZoom(null)}
          >
            <img src={zoom} alt={alt} className="max-h-[80vh] w-auto max-w-5xl object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FeedCard({
  post,
  tags,
  author,
  likes,
  currentUserId,
  onToggleLike,
  onDelete,
  onTag,
  directory,
}: {
  post: Post;
  tags: string[];
  author: { display_name: string; niveau: string | null } | undefined;
  likes: { post_id: string; user_id: string }[];
  currentUserId: string | null;
  onToggleLike: (liked: boolean) => void;
  onDelete: () => void;
  onTag: (tag: string) => void;
  directory: Map<string, { display_name: string; niveau: string | null }> | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const liked = !!currentUserId && likes.some((l) => l.user_id === currentUserId);
  const name = author?.display_name ?? "Membre GTEL";
  const { short, hasMore, full } = caption(post.contenu);
  const photos = feedPhotos(post.id, 1 + (hashString(post.id) % 4));

  return (
    <article className="panel group relative flex h-full flex-col p-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 sm:p-7">
      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-cobalt via-azure to-cyan transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

      {/* Author header */}
      <header className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cobalt to-cyan font-mono text-[0.7rem] text-primary-foreground">
          {initials(name)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-chalk">{name}</span>
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel">
            {author?.niveau ? `${author.niveau} · ` : ""}
            {new Date(post.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
          </span>
        </span>
        <span className="chip ml-auto">{post.categorie}</span>
      </header>

      {/* Caption */}
      <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-foreground/90">
        {expanded ? full : short}
        {hasMore && !expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="ml-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary"
          >
            …voir plus
          </button>
        )}
      </p>

      {/* Photos */}
      <PhotoGrid photos={photos} alt={post.titre} />

      {/* Hashtags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => onTag(t)}
            className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.08em] text-steel transition-colors duration-500 hover:border-azure/60 hover:text-cyan"
          >
            <Hash className="h-2.5 w-2.5" />
            {t.replace(/^#/, "")}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border/60 pt-4">
        <button
          type="button"
          onClick={() => onToggleLike(liked)}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-all duration-500 ${
            liked ? "border-cyan/60 bg-cyan/10 text-cyan" : "border-border text-steel hover:text-chalk"
          }`}
        >
          <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} />
          {likes.length}
        </button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-steel transition-colors duration-500 hover:text-chalk"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          Commenter
        </button>

        <a
          href={LINKEDIN_CLUB}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 rounded-full border border-azure/50 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-primary transition-colors duration-500 hover:bg-azure/10"
        >
          <Linkedin className="h-3.5 w-3.5" />
          Consulter sur LinkedIn
        </a>

        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
          <Images className="h-3.5 w-3.5" />
          {photos.length}
        </span>

        {currentUserId === post.author_id && (
          <button
            type="button"
            onClick={onDelete}
            aria-label="Supprimer la publication"
            className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-steel transition-colors duration-500 hover:border-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Comments drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <CommentThread postId={post.id} currentUserId={currentUserId} directory={directory} />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function CommentThread({
  postId,
  currentUserId,
  directory,
}: {
  postId: string;
  currentUserId: string | null;
  directory: Map<string, { display_name: string; niveau: string | null }> | undefined;
}) {
  const qc = useQueryClient();
  const [texte, setTexte] = useState("");

  const { data: comments } = useQuery({
    queryKey: ["blog-comments", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_comments")
        .select("id, post_id, author_id, contenu, created_at")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Comment[];
    },
  });

  const addComment = useMutation({
    mutationFn: async (contenu: string) => {
      if (!currentUserId) throw new Error("Connectez-vous pour commenter");
      const { error } = await supabase.from("blog_comments").insert({
        post_id: postId,
        author_id: currentUserId,
        contenu,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setTexte("");
      qc.invalidateQueries({ queryKey: ["blog-comments", postId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeComment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog-comments", postId] }),
  });

  return (
    <div className="mt-5 space-y-4 border-t border-border/60 pt-5">
      {(comments ?? []).length === 0 && (
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-steel">
          Aucun commentaire — lancez la discussion.
        </p>
      )}

      {(comments ?? []).map((c) => {
        const name = directory?.get(c.author_id)?.display_name ?? "Membre GTEL";
        return (
          <div key={c.id} className="flex gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-azure/40 font-mono text-[0.6rem] text-cyan">
              {initials(name)}
            </span>
            <div className="flex-1 rounded-xl bg-surface/60 px-4 py-3">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-steel">
                {name} · {new Date(c.created_at).toLocaleDateString("fr-FR")}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-chalk">{c.contenu}</p>
            </div>
            {currentUserId === c.author_id && (
              <button
                type="button"
                aria-label="Supprimer le commentaire"
                onClick={() => removeComment.mutate(c.id)}
                className="text-steel transition-colors hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        );
      })}

      {currentUserId ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const v = texte.trim();
            if (v.length < 2 || v.length > 800) {
              toast.error("Le commentaire doit faire entre 2 et 800 caractères.");
              return;
            }
            addComment.mutate(v);
          }}
          className="flex gap-2"
        >
          <input
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            placeholder="Répondre rapidement…"
            maxLength={800}
            className="field"
          />
          <button type="submit" className="btn-ghost px-4" aria-label="Envoyer">
            <Send className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <Link to="/auth" className="btn-ghost inline-flex px-4 py-2">
          Se connecter pour commenter
        </Link>
      )}
    </div>
  );
}
