import { fetchApplication } from "@/applications";
import { RuleEngine } from "@/rules/engine";
import { fetchRules } from "@/rules/fetchRules";

const engine = new RuleEngine();

export default async function Home() {
  const rules = await fetchRules();
  const application = await fetchApplication("id");

  if (!rules || !application) return null;

  const results = await engine.SetupRules(rules).RunRules(application);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(results, null, 2)}</code>
      </pre>
    </div>
  );
}
