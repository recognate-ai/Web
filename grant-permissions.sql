-- Grant permissions to the anon and authenticated roles so they can access the table
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_projects TO service_role;

-- Grant usage on the primary key sequence just in case
GRANT USAGE, SELECT ON SEQUENCE public.academic_projects_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.academic_projects_id_seq TO authenticated;
