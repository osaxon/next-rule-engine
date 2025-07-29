import { AppContainer } from "@/components/app-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <CardDescription>
            Select a rule to add an instance to a company and products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={ruleDefs} />
        </CardContent>
      </Card>
    </AppContainer>
  );
}
