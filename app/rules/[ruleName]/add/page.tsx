import { insertRule } from "@/app/actions/insertRule";
import { AddRule } from "@/components/add-rule-form";
import { Rules } from "@/features/rules/types";

export default async function AddRulePage({
  params,
}: {
  params: Promise<{ ruleName: string }>;
}) {
  const { ruleName } = (await params) as { ruleName: Rules };

  return (
    <div className="p-8">
      <AddRule ruleName={ruleName} insertRule={insertRule} />
    </div>
  );
}
