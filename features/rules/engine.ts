"server only";
import { Application, TRuleConfiguration } from "@/types";
import { RuleFactoryClass } from "./rule-factory";
import { IRule, ProductRuleResult, RuleResultSummary } from "./types";
import { ProductsWithCompany } from "../products/fetchProducts";

export class RuleEngine {
  ruleClasses: IRule[] = [];
  ruleResults: ProductRuleResult[] = [];
  resultSumary: RuleResultSummary | null = null;

  ResetResults() {
    this.ruleResults = [];
  }

  InitRules(rules: TRuleConfiguration | TRuleConfiguration[]) {
    const ruleClasses: IRule[] = [];

    if (Array.isArray(rules)) {
      for (const rule of rules) {
        const factoryClass = new RuleFactoryClass(rule);

        const ruleClass = factoryClass.InitRule();

        if (!ruleClass) continue;

        ruleClasses.push(ruleClass);
      }
    } else {
      const factoryClass = new RuleFactoryClass(rules);

      const ruleClass = factoryClass.InitRule();

      if (!ruleClass)
        throw new Error("invalid rule - failed to init rule class");

      ruleClasses.push(ruleClass);
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
    console.log(this.ruleResults);
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
    const ruleFactory = new RuleFactoryClass(ruleConfig);

    const rule = ruleFactory.InitRule();
    if (!rule) {
      throw new Error(`No factory found for rule: ${ruleConfig.ruleName}`);
    }

    return await rule.run(application);
  }
}
