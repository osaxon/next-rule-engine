import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { TAddRuleForm } from "./types";

export default function ConfirmComponent() {
  const form = useFormContext<TAddRuleForm>();

  const formValues = form.getValues();
  const { ruleName, ruleConfig, enabled, company, products, documentation } =
    formValues;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Adding rule: {ruleName}</h2>
        <p className="text-muted-foreground">
          Review your rule configuration before saving
        </p>
      </div>

      <div className="grid gap-4">
        {/* Rule Details */}
        <Card>
          <CardHeader>
            <CardTitle>Rule Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Rule Name:</span>
              <span>{ruleName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Company:</span>
              <span>{company || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <Badge variant={enabled ? "default" : "secondary"}>
                {enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Input Values */}
        {ruleConfig && ruleConfig.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Input Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ruleConfig.map((input, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{input.name}:</span>
                  <span>{String(input.value)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Products */}
        {products && products.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {products.map((product, index) => (
                  <Badge key={index} variant="outline">
                    {product.productName}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documentation */}
        {documentation && (
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {documentation}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Raw Form Data (for debugging) */}
        <Card>
          <CardHeader>
            <CardTitle>Raw Form Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded overflow-auto">
              {JSON.stringify(formValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
