import { Application, InputValueType, RuleInputKeys } from "@/types";
import { add } from "date-fns";

type ApplicationBuilderConfig = {
  [K in RuleInputKeys]: (app: Application, value: InputValueType<K>) => void;
};

export class ApplicationBuilder {
  private app;

  constructor(base?: Partial<Application>) {
    this.app = {
      mainApplicant: {
        name: "Test User",
        email: "test@example.com",
        creditReport: { score: 700 },
      },
      loanAmount: 10000,
      vehicle: {
        make: "Test",
        model: "Test",
        vrm: "TEST123",
        registrationDate: new Date().toISOString(),
        value: 10000,
      },
      ...base,
    };
  }

  static config: ApplicationBuilderConfig = {
    "min-score": (app, value) => {
      app.mainApplicant.creditReport.score = value;
    },
    "max-age": (app, val) => {
      const date = new Date();

      app.vehicle.registrationDate = add(date, { months: -val }).toISOString();
    },
  };

  setValue<K extends RuleInputKeys>(name: K, value: InputValueType<K>) {
    const setter = ApplicationBuilder.config[name];
    if (setter) setter(this.app, value);
  }

  build() {
    return this.app;
  }
}
