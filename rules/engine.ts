import { Application, TRuleConfiguration } from "@/types";
import { ruleFactoryRegistry } from "./rule-factory";
import { IRule, ProductRuleResult } from "./types";

export class RuleEngine {
  ruleClasses: IRule[] = [];
  productRuleResult: ProductRuleResult[] = [];

  ResetResults() {
    this.productRuleResult = [];
  }

  SetupRules(rules: TRuleConfiguration | TRuleConfiguration[]) {
    let ruleClasses: IRule[] = [];
    if (Array.isArray(rules)) {
      ruleClasses = rules.map((r) => {
        const RuleFactory = ruleFactoryRegistry[r.ruleName];
        return RuleFactory(r);
      });
    } else {
      const RuleClass = ruleFactoryRegistry[rules.ruleName];
      ruleClasses = [RuleClass(rules)];
    }

    this.ruleClasses = ruleClasses;
    return this;
  }

  async RunRules(application: Application) {
    this.ResetResults();

    let skipped = 0;
    let passing = 0;
    let failing = 0;

    for (const rule of this.ruleClasses) {
      if (!rule.shouldRun(application)) {
        skipped++;
        continue;
      }

      const result = await rule.run(application);

      for (const product of rule.products) {
        this.productRuleResult.push({
          product,
          company: rule.company,
          rule: rule.ruleName,
          result: result ? "PASS" : "FAIL",
        });
        if (result) passing++;
        else failing++;
      }
    }

    return {
      total: this.productRuleResult.length,
      passing,
      failing,
      skipped,
      data: this.productRuleResult,
    };
  }

  async RunRule(ruleConfig: TRuleConfiguration, application: Application) {
    const ruleFactory = ruleFactoryRegistry[ruleConfig.ruleName];
    if (!ruleFactory) {
      throw new Error(`No factory found for rule: ${ruleConfig.ruleName}`);
    }

    const rule = ruleFactory(ruleConfig);

    return await rule.run(application);
  }
}
