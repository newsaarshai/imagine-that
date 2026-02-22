import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  loadUserData,
  seedDefaultTemplates,
} from "@/lib/prompt-composer/actions";
import { PromptComposer } from "@/components/prompt-composer/prompt-composer";

export const metadata = {
  title: "Prompt Composer — imaginethat",
  description:
    "Build modular prompts by toggling and editing reusable snippets.",
};

export default async function PromptComposerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  let data = await loadUserData(supabase, user.id);

  if (data.templates.length === 0) {
    const seeded = await seedDefaultTemplates(supabase, user.id);
    data = {
      templates: seeded.templates,
      placeholderValues: [],
      templateTypes: seeded.templateTypes,
    };
  }

  return (
    <div className="prompt-composer pt-16">
      <PromptComposer
        initialTemplates={data.templates}
        initialPlaceholderValues={data.placeholderValues}
        initialTemplateTypes={data.templateTypes}
        userId={user.id}
      />
    </div>
  );
}
