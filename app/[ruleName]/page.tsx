import { TryRule } from "@/components/try-rule-form/try-rule-form";
import { Rules } from "@/rules/types";

export default async function RulePage({
  params,
}: {
  params: Promise<{ ruleName: Rules }>;
}) {
  const { ruleName } = await params;

  return (
    <div className="p-8">
      <TryRule ruleName={ruleName} />
    </div>
  );
}
