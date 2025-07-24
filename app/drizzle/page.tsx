import { fetchRuleInstances } from "@/rules/fetchRules";

export default async function DrizzlePage() {
  const rules = await fetchRuleInstances();

  return (
    <pre>
      <code>{JSON.stringify(rules, null, 2)}</code>
    </pre>
  );
}
