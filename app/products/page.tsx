import { AppContainer } from "@/components/app-container";
import { ApplicationSummaryCard } from "@/components/application-summary-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationBuilder } from "@/features/applications/builder";
import { fetchProductsWithRuleOutcomes } from "@/features/products/fetchProducts";
import { cn } from "@/lib/utils";

export default async function ProductsPage() {
  const appBuilder = new ApplicationBuilder();
  appBuilder.withCreditScore().withEngineSize();
  const app = appBuilder.build();
  if (!app) return null;

  const productRuleOutcomes = await fetchProductsWithRuleOutcomes(app);

  if (!productRuleOutcomes) return <div>No data</div>;

  return (
    <AppContainer>
      <ApplicationSummaryCard app={app} />
      <div className="space-y-3">
        <h2 className="font-bold text-2xl">Products</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {productRuleOutcomes.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>
                  {product.productName}
                  <span className="ml-2 text-muted-foreground text-sm">
                    ({product.company.name})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {product.ruleOutcomes.length === 0 ? (
                  <div className="text-muted-foreground text-sm">
                    No rules applied
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p>Rule outcomes:</p>
                    {product.ruleOutcomes.map((outcome, i) => {
                      const pass = outcome.result === "PASS";
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <Badge
                            variant={
                              outcome.result === "PASS"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {outcome.ruleName}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Input:{" "}
                            <span
                              className={cn(
                                "font-mono",
                                pass ? "text-green-500" : "text-destructive"
                              )}
                            >
                              {String(outcome.input)}
                            </span>
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Config:{" "}
                            <span className="font-mono">
                              {String(outcome.ruleConfig)}
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppContainer>
  );
}
