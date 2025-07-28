import { AppContainer } from "@/components/app-container";
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

  const results = await engine.InitRules(rules).RunRules(app);

  return (
    <AppContainer>
      <RuleResultsSummary results={results} />
    </AppContainer>
  );
}
