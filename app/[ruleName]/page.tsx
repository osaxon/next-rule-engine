import { TryRule } from "@/components/try-rule-form/try-rule-form";
import { fetchRules } from "@/rules/fetchRules";
import { Rules } from "@/rules/types";

export default async function RulePage({
  params,
}: {
  params: Promise<{ ruleName: Rules }>;
}) {
  const { ruleName } = await params;
  const rules = await fetchRules();

  const rule = rules?.find((r) => r.ruleName === ruleName);

  if (!rule) {
    return <p>Rule not found: {ruleName}</p>;
  }

  return (
    <div className="p-8">
      <TryRule rule={rule} />
    </div>
  );
}
