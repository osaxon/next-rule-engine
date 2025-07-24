import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductRuleResult } from "@/features/rules/types";
import { Badge } from "./ui/badge";

type RuleResultsSummaryProps = {
  results: {
    total: number;
    passing: number;
    failing: number;
    skipped: number;
    data: ProductRuleResult[];
  };
};

export function RuleResultsSummary({ results }: RuleResultsSummaryProps) {
  return (
    <div className="space-y-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Rule Run Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          <div>
            <div className="text-2xl font-bold">{results.total}</div>
            <div className="text-muted-foreground text-xs">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {results.passing}
            </div>
            <div className="text-muted-foreground text-xs">Passing</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-destructive">
              {results.failing}
            </div>
            <div className="text-muted-foreground text-xs">Failing</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-400">
              {results.skipped}
            </div>
            <div className="text-muted-foreground text-xs">Skipped</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Rule Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Input Value</TableHead>
                <TableHead>Rule Params</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.data.map((result, i) => (
                <TableRow key={`${result.product}-${result.company}-${i}`}>
                  <TableCell>{result.rule}</TableCell>
                  <TableCell>{result.company}</TableCell>
                  <TableCell className="font-medium">
                    {result.product}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        result.result.result === "PASS"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {result.result.result}
                    </Badge>
                  </TableCell>
                  <TableCell>{result.result.inputValue}</TableCell>
                  <TableCell>
                    <pre>
                      {JSON.stringify(result.result.ruleConfig, null, 2)}
                    </pre>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
