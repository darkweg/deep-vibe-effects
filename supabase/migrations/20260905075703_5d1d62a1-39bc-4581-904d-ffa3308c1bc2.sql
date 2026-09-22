CREATE TABLE public.articles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titre text NOT NULL,
  categorie text NOT NULL DEFAULT 'Annonce',
  date_publication date NOT NULL DEFAULT current_date,
  cover_url text,
  resume text NOT NULL DEFAULT '',
  contenu text NOT NULL DEFAULT '',
  linkedin text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles TO authenticated;
GRANT ALL ON public.articles TO service_role;

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "articles_read_all" ON public.articles FOR SELECT USING (true);
DROP POLICY IF EXISTS "articles_insert_own" ON public.articles;

CREATE POLICY "articles_insert_comm_only" ON public.articles
FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = author_id 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'communication'::app_role
  )
);
CREATE POLICY "articles_update_own" ON public.articles FOR UPDATE TO authenticated USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
CREATE POLICY "articles_delete_own" ON public.articles FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE TRIGGER set_articles_updated_at BEFORE UPDATE ON public.articles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
