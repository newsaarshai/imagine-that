-- Add 4W and AI Teammate master templates to all existing users
-- Run this in the Supabase SQL Editor

DO $$
DECLARE
  u RECORD;
  v_4w_id uuid;
  v_4w_type_id uuid;
  v_ai_id uuid;
  v_ai_type_id uuid;
  v_max_sort int;
BEGIN
  FOR u IN SELECT DISTINCT user_id FROM public.templates LOOP

    -- Find the highest sort_order so new templates go at the end
    SELECT COALESCE(MAX(sort_order), -1) INTO v_max_sort
    FROM public.templates WHERE user_id = u.user_id;

    -- ── 4W master template ──────────────────────────────────
    INSERT INTO public.templates (user_id, name, sort_order)
    VALUES (u.user_id, '4W', v_max_sort + 1)
    RETURNING id INTO v_4w_id;

    INSERT INTO public.template_types (user_id, name, master_template_id)
    VALUES (u.user_id, '4W', v_4w_id)
    RETURNING id INTO v_4w_type_id;

    UPDATE public.templates SET type_id = v_4w_type_id WHERE id = v_4w_id;

    INSERT INTO public.snippets (template_id, category, label, text, active, sort_order) VALUES
    (v_4w_id, 'ROLE', 'Role', 'You are {persona}', true, 0),
    (v_4w_id, 'OBJECTIVE', 'Objective', 'Help me {outcome}', true, 1),
    (v_4w_id, 'CONTEXT PACKAGE', 'Context Package', E'Audience: {who}\nVoice and tone: {tone}\nLength target: {length}\nKey facts / data / links to use:\n1) ...\n2) ...\n3) ...\nConstraints / boundaries:\n...', true, 2),
    (v_4w_id, 'WORKFLOW', 'Workflow', E'Step 1) Gap check: list missing info and ask concise questions\nStep 2) Plan: outline structure and wait for approval\nStep 3) Draft: create v1\nStep 4) Review: ask for feedback\nStep 5) Revise: improve with feedback', true, 3),
    (v_4w_id, 'CONTEXT-HANDLING RULES', 'Context-Handling Rules', E'- If source text is long, summarize first and ask whether to keep it in context\n- If external knowledge is needed, list what is missing', true, 4),
    (v_4w_id, 'OUTPUT FORMAT', 'Output Format', E'Return in {markdown / bullets / plain text}\nReference facts by source number [1], [2], [3]', true, 5),
    (v_4w_id, 'FIRST ACTION', 'First Action', 'Start with Gap check', true, 6);

    -- ── AI Teammate master template ─────────────────────────
    INSERT INTO public.templates (user_id, name, sort_order)
    VALUES (u.user_id, 'AI Teammate', v_max_sort + 2)
    RETURNING id INTO v_ai_id;

    INSERT INTO public.template_types (user_id, name, master_template_id)
    VALUES (u.user_id, 'AI Teammate', v_ai_id)
    RETURNING id INTO v_ai_type_id;

    UPDATE public.templates SET type_id = v_ai_type_id WHERE id = v_ai_id;

    INSERT INTO public.snippets (template_id, category, label, text, active, sort_order) VALUES
    (v_ai_id, 'ROLE', 'Role', 'Act as my AI teammate.', true, 0),
    (v_ai_id, 'OBJECTIVE', 'Objective', '{what we''re trying to accomplish}', true, 1),
    (v_ai_id, 'WHY IT MATTERS', 'Why It Matters', '{business/user reason}', true, 2),
    (v_ai_id, 'LIMITS', 'Limits', '{what you can/can''t change}', true, 3),
    (v_ai_id, 'DEFINITION OF DONE', 'Definition of Done', '{clear quality bar}', true, 4),
    (v_ai_id, 'REQUIRED OUTPUTS', 'Required Outputs', '{final deliverables}', true, 5),
    (v_ai_id, 'INTERIM CHECKPOINT', 'Interim Checkpoint', '{what to show me before final}', true, 6),
    (v_ai_id, 'FINAL CHECKS', 'Final Checks', '{tests/criteria to verify before completion}', true, 7),
    (v_ai_id, 'ASK', 'Ask', 'If anything is underspecified, ask questions before starting.', true, 8);

  END LOOP;
END $$;
