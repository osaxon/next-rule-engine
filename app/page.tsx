import { RuleResultsSummary } from "@/components/rule-result-summary";
import { ApplicationBuilder } from "@/features/applications/builder";
import { RuleEngine } from "@/features/rules/engine";
import { fetchRuleInstances } from "@/features/rules/fetchRules";

const engine = new RuleEngine();

export default async function Home() {
  const rules = await fetchRuleInstances();
  const appBuilder = new ApplicationBuilder();

  appBuilder.withCreditScore().withEngineSize();

  const app = appBuilder.build();

  if (!rules || !app) return null;

  const results = await engine.SetupRules(rules).RunRules(app);

  return (
    <div className="p-8 ">
      <RuleResultsSummary results={results} />
    </div>
  );
}
