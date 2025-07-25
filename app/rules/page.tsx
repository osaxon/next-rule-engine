import { AppContainer } from "@/components/app-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRuleDefinitions } from "@/features/rules/fetchRules";
import { DataTable } from "../../components/data-table";
import { columns } from "../../features/rules/columns";

export default async function AllRulesPage() {
  const ruleDefs = await fetchRuleDefinitions();

  if (!ruleDefs) return null;

  return (
    <AppContainer>
      <Card>
        <CardHeader>
          <CardTitle>Rule Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={ruleDefs} />
        </CardContent>
      </Card>
    </AppContainer>
  );
}
