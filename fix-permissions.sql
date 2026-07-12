-- 1. Ensure RLS is enabled
ALTER TABLE public.academic_projects ENABLE ROW LEVEL SECURITY;

-- 2. Allow ANYONE to read the projects (so your frontend can fetch them)
CREATE POLICY "Enable public read access" 
ON public.academic_projects 
FOR SELECT 
USING (true);

-- 3. Allow ANYONE to insert projects (so your seed script can push them)
CREATE POLICY "Enable public insert access" 
ON public.academic_projects 
FOR INSERT 
WITH CHECK (true);
