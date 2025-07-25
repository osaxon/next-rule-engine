import { Application } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function ApplicationSummaryCard({ app }: { app: Application }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Applicant</div>
            <div>
              {app.mainApplicant.name} ({app.mainApplicant.email})
            </div>
            <div>
              Credit Score:{" "}
              <span className="font-mono">
                {app.mainApplicant.creditReport.score}
              </span>
            </div>
          </div>
          <div>
            <div className="font-semibold">Vehicle</div>
            <div>
              {app.vehicle.make} {app.vehicle.model}
            </div>
            <div>
              Engine Size:{" "}
              <span className="font-mono">{app.vehicle.engineSize}</span>
            </div>
            <div>
              Value: <span className="font-mono">{app.vehicle.value}</span>
            </div>
          </div>
          <div>
            <div className="font-semibold">Loan Amount</div>
            <div className="font-mono">{app.loanAmount}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
