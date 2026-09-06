import { supabase } from "@/integrations/supabase/client";

export type DbArticle = {
  id: string;
  author_id: string;
  titre: string;
  categorie: string;
  date_publication: string;
  cover_url: string | null;
  resume: string;
  contenu: string;
  linkedin: string | null;
  created_at: string;
};

export const CATEGORIES = ["Formation", "Vie du Club", "Annonce", "Événement"] as const;

export const articlesQueryOptions = {
  queryKey: ["articles"] as const,
  queryFn: async (): Promise<DbArticle[]> => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as DbArticle[];
  },
};

export const articleQueryOptions = (id: string) => ({
  queryKey: ["article", id] as const,
  queryFn: async (): Promise<DbArticle | null> => {
    const { data, error } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
    if (error) throw error;
    return (data as DbArticle) ?? null;
  },
});

/** Formate "2026-09-05" en "5 septembre 2026". */
export function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}
