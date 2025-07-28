"use client";
import { runRuleAction } from "@/app/actions/runRule";
import { defineStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ApplicationBuilder } from "@/features/applications/builder";
import { RuleConfigBuilder } from "@/features/rules/rule-config-builder";
import { RuleResult, TRuleNames } from "@/features/rules/types";
import { getSafeRuleInputTypes } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { InputValuesForm } from "./input-values-form";
import { RuleResultComponent } from "./result-component";
import RuleConfigForm from "./rule-config-form";
import { tryRuleFormSchema, type TryRuleForm } from "./types";

const { Stepper, useStepper } = defineStepper(
  {
    id: "rule-input-config",
    title: "Rule config",
    schema: tryRuleFormSchema,
    Component: ({ ruleName }: { ruleName: TRuleNames }) => (
      <RuleConfigForm ruleName={ruleName} />
    ),
  },
  {
    id: "rule-input-values",
    title: "Input values",
    schema: tryRuleFormSchema,
    Component: ({ ruleName }: { ruleName: TRuleNames }) => (
      <InputValuesForm ruleName={ruleName} />
    ),
  },
  {
    id: "result",
    title: "Result",
    schema: z.object({}),
    Component: ({
      result,
      isPending,
    }: {
      result?: RuleResult;
      isPending: boolean;
    }) => <RuleResultComponent result={result} isPending={isPending} />,
  }
);

export function TryRule({ ruleName }: { ruleName: TRuleNames }) {
  const safeDefaults = getSafeRuleInputTypes(ruleName);

  const form = useForm<TryRuleForm>({
    mode: "onTouched",
    resolver: zodResolver(tryRuleFormSchema),
    defaultValues: {
      ruleConfig: safeDefaults,
      inputValues: safeDefaults,
    },
  });

  return (
    <Stepper.Provider variant="vertical" tracking>
      <FormProvider {...form}>
        <TryRuleForm ruleName={ruleName} />
      </FormProvider>
    </Stepper.Provider>
  );
}

const TryRuleForm = ({ ruleName }: { ruleName: TRuleNames }) => {
  const methods = useStepper();
  const form = useFormContext<TryRuleForm>();
  const [isPending, startTransition] = useTransition();

  const [result, setResult] = useState<RuleResult>();

  const onSubmit = async (values: TryRuleForm) => {
    const appBuilder = new ApplicationBuilder();

    const ruleConfigBuilder = new RuleConfigBuilder();

    const ruleConfig = ruleConfigBuilder
      .setRule(ruleName)
      .setInputValues(values.ruleConfig)
      .build();

    values.inputValues.forEach((input) => {
      return appBuilder.setValue(input.name, input.value);
    });
    const app = appBuilder.build();

    startTransition(async () => {
      const result = await runRuleAction(ruleConfig, app);
      setResult(result);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-sm">
        <Stepper.Navigation>
          {methods.all.map((step) => (
            <Stepper.Step
              key={step.id}
              of={step.id}
              type={step.id === methods.current.id ? "submit" : "button"}
              onClick={async () => {
                const valid = await form.trigger();
                if (!valid) return;
                methods.goTo(step.id);
              }}
            >
              <Stepper.Title>{step.title}</Stepper.Title>
              {methods.when(step.id, () => (
                <Stepper.Panel>
                  <methods.current.Component
                    ruleName={ruleName}
                    result={result}
                    isPending={isPending}
                  />
                </Stepper.Panel>
              ))}
            </Stepper.Step>
          ))}
        </Stepper.Navigation>
        <Stepper.Controls>
          {!methods.isLast && (
            <Button
              variant="secondary"
              onClick={methods.prev}
              disabled={methods.isFirst}
            >
              Previous
            </Button>
          )}
          {methods.isLast ? (
            <Button type="submit">{isPending ? "Loading" : "Submit"}</Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                methods.beforeNext(async () => {
                  try {
                    const valid = await form.trigger();
                    if (!valid) return false;
                    return true;
                  } catch (error) {
                    console.error(error);
                    return false;
                  }
                });
              }}
            >
              Next
            </Button>
          )}
        </Stepper.Controls>
      </form>
    </Form>
  );
};
