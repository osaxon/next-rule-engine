import { Application, TRuleConfiguration } from "@/types";
import { ruleFactoryRegistry } from "./rule-factory";
import { IRule, ProductRuleResult, RuleResultSummary } from "./types";
import { ProductsWithCompany } from "../products/fetchProducts";

export class RuleEngine {
  ruleClasses: IRule[] = [];
  ruleResults: ProductRuleResult[] = [];
  resultSumary: RuleResultSummary | null = null;

  ResetResults() {
    this.ruleResults = [];
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
        this.ruleResults.push({
          company: rule.company,
          product,
          result,
          rule: rule.ruleName,
        });
        if (result.result === "PASS") passing++;
        else failing++;
      }
    }

    this.resultSumary = {
      total: this.ruleResults.length,
      passing,
      failing,
      skipped,
      data: this.ruleResults,
    };

    return this.resultSumary;
  }

  Summary() {
    return this.resultSumary;
  }

  ProductOutcomes(products: ProductsWithCompany) {
    return products.map((product) => {
      const ruleOutcomes = this.ruleResults
        .filter((result) => result.product === product.productName)
        .map((result) => ({
          ruleName: result.rule,
          input: result.result.inputValue,
          ruleConfig: result.result.ruleConfig.value,
          result: result.result.result,
        }));
      return {
        ...product,
        ruleOutcomes,
      };
    });
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
