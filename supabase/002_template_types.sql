-- Template Types migration
-- Run this in the Supabase SQL Editor AFTER running 001_prompt_composer.sql

-- 1. Change snippets.category from enum to plain text (needed for custom category names)
ALTER TABLE public.snippets ALTER COLUMN category DROP DEFAULT;
ALTER TABLE public.snippets ALTER COLUMN category TYPE text;
DROP TYPE IF EXISTS public.snippet_category;

-- 2. Create template_types table
CREATE TABLE public.template_types (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name                text NOT NULL,
  master_template_id  uuid NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
  created_at          timestamptz DEFAULT now()
);

CREATE INDEX idx_template_types_user ON public.template_types(user_id);

-- 3. RLS for template_types
ALTER TABLE public.template_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own types"
  ON public.template_types FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own types"
  ON public.template_types FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own types"
  ON public.template_types FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own types"
  ON public.template_types FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Add type_id column to templates (nullable = untyped/Blank)
ALTER TABLE public.templates
  ADD COLUMN type_id uuid REFERENCES public.template_types(id) ON DELETE SET NULL;

-- 5. Seed "Screenery Renders" master templates for existing users
-- This creates the master template, populates it with snippets, creates the type, and links existing templates.

DO $$
DECLARE
  u RECORD;
  v_master_id uuid;
  v_type_id uuid;
BEGIN
  -- Loop over each user who has templates
  FOR u IN SELECT DISTINCT user_id FROM public.templates LOOP

    -- Create the master template
    INSERT INTO public.templates (user_id, name, sort_order)
    VALUES (u.user_id, 'Screenery Renders', 100)
    RETURNING id INTO v_master_id;

    -- Create the type
    INSERT INTO public.template_types (user_id, name, master_template_id)
    VALUES (u.user_id, 'Screenery Renders', v_master_id)
    RETURNING id INTO v_type_id;

    -- Link the master template to its own type
    UPDATE public.templates SET type_id = v_type_id WHERE id = v_master_id;

    -- Insert the 8 PET-felt snippets into the master template
    INSERT INTO public.snippets (template_id, category, label, text, active, sort_order) VALUES
    (v_master_id, 'Product', 'Product Description', 'A product photograph of a decorative panel set made from PET-felt material. The product consists of {panelCount} interlocking panels that stand upright on a surface, forming a {shape} panoramic city-skyline silhouette.', true, 0),
    (v_master_id, 'Material', 'Material & Texture', 'The panels are made of PET-felt — a thick, soft, matte textile with a fine fibrous surface texture similar to craft felt. The felt color is {feltColor}. The material has visible micro-fiber texture and soft rounded edges where cut.', true, 1),
    (v_master_id, 'Structure', 'Two-Layer Construction', 'Each panel is constructed from two layers of PET-felt. The front layer features detailed illustrations painted or printed directly onto the felt surface. The back layer is a solid-colored felt backing that is slightly larger than the front, creating a {borderWidth} border/frame effect around each panel.', true, 2),
    (v_master_id, 'Theme', 'Theme & Motif', 'The panels depict a {themeName} scene with {themeDetails}. The design tells a visual story across the connected panels.', true, 3),
    (v_master_id, 'Illustration', 'Illustration Style', 'The illustrations on the front layer are rendered in a {illustrationStyle} style with {colorPalette} colors. The artwork has fine detail and a hand-crafted, artisanal quality.', true, 4),
    (v_master_id, 'Photography', 'Shot & Lighting', 'Professional product photograph, shot straight-on at eye level against a clean {bgColor} background. Soft, even studio lighting with gentle shadows underneath and behind the panels. Sharp focus throughout.', true, 5),
    (v_master_id, 'Reference', 'Reference Image', 'Use the uploaded reference image ({refImageFile}) as a guide for the overall product form, panel arrangement, and construction style. Match the same type of felt material, two-layer construction, and illustration-on-felt aesthetic.', false, 6),
    (v_master_id, 'Constraints', 'Constraints', 'Do not add any people, hands, or props. Do not add text or labels unless specified. Keep the background clean. The felt must read as soft textile, not paper or cardboard.', false, 7);

    -- Link all existing templates for this user to the Screenery Renders type
    UPDATE public.templates
    SET type_id = v_type_id
    WHERE user_id = u.user_id AND id != v_master_id;

  END LOOP;
END $$;
