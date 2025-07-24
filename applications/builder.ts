import { Application, InputValueType, RuleInputKeys } from "@/types";
import { add } from "date-fns";

type ApplicationBuilderConfig = {
  [K in RuleInputKeys]: (_app: Application, _value: InputValueType<K>) => void;
};

export class ApplicationBuilder {
  private app;

  constructor(base?: Partial<Application>) {
    this.app = {
      mainApplicant: {
        name: "Test User",
        email: "test@example.com",
        creditReport: { score: 0 },
      },
      loanAmount: 10000,
      vehicle: {
        make: "Test",
        model: "Test",
        vrm: "TEST123",
        registrationDate: new Date().toISOString(),
        value: 10000,
        engineSize: 1.2,
      },
      ...base,
    } as Application;
    return this;
  }

  static config: ApplicationBuilderConfig = {
    "min-score": (app, value) => {
      app.mainApplicant.creditReport.score = value;
    },
    "max-engine-size": (app, val) => {
      app.vehicle.engineSize = val;
    },
  };

  setValue<K extends RuleInputKeys>(name: K, value: InputValueType<K>) {
    const setter = ApplicationBuilder.config[name];
    if (setter) setter(this.app, value);
  }

  withCreditScore(score?: number) {
    const randomScore = Math.floor(Math.random() * 1000);
    this.app.mainApplicant.creditReport.score =
      typeof score === "number" ? score : randomScore;
    return this;
  }

  withEngineSize(value?: number) {
    const minEngineSize = 500;
    const maxEngineSize = 5000;
    const steps = Math.floor((maxEngineSize - minEngineSize) / 50) + 1;
    const randomEngineSize =
      minEngineSize + Math.floor(Math.random() * steps) * 50;
    this.app.vehicle.engineSize =
      typeof value === "number" ? value : randomEngineSize;
    return this;
  }

  build() {
    return this.app;
  }
}
