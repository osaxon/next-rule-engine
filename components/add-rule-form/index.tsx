"use client";
import { defineStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProductsWithCompany } from "@/features/products/fetchProducts";
import { TRuleNames } from "@/features/rules/types";
import { getSafeRuleInputTypes } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import ConfirmComponent from "./confirm-component";
import ProductsForm from "./products-form";
import RuleConfigForm from "./rule-config-form";
import { TAddRuleForm, addRuleFormSchema } from "./types";

const { Stepper, useStepper } = defineStepper(
  {
    id: "rule-input-config",
    title: "Rule config",
    schema: addRuleFormSchema,
    Component: ({ ruleName }: { ruleName: TRuleNames }) => (
      <RuleConfigForm ruleName={ruleName} />
    ),
  },
  {
    id: "product-relations",
    title: "Product relations",
    schema: addRuleFormSchema,
    Component: ({ products }: { products: ProductsWithCompany }) => (
      <ProductsForm products={products} />
    ),
  },
  {
    id: "confirm",
    title: "Confirm",
    schema: z.object({}),
    Component: () => <ConfirmComponent />,
  }
);

export function AddRule({
  ruleName,
  insertRule,
  products,
}: {
  ruleName: TRuleNames;
  insertRule: (_values: TAddRuleForm) => Promise<void>;
  products: ProductsWithCompany;
}) {
  const form = useForm<TAddRuleForm>({
    mode: "onTouched",
    resolver: zodResolver(addRuleFormSchema),
    defaultValues: {
      ruleConfig: getSafeRuleInputTypes(ruleName),
      key: `.${ruleName}`,
      products: [],
      enabled: true,
      documentation: "",
    },
  });

  return (
    <Stepper.Provider variant="vertical" tracking>
      <FormProvider {...form}>
        <AddRuleForm
          ruleName={ruleName}
          insertRule={insertRule}
          products={products}
        />
      </FormProvider>
    </Stepper.Provider>
  );
}

const AddRuleForm = ({
  ruleName,
  insertRule,
  products,
}: {
  ruleName: TRuleNames;
  insertRule: (_values: TAddRuleForm) => Promise<void>;
  products: ProductsWithCompany;
}) => {
  const methods = useStepper();
  const form = useFormContext<TAddRuleForm>();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: TAddRuleForm) => {
    console.log(values);
    startTransition(async () => {
      await insertRule(values);
      form.reset();
      router.push("/products");
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
                    products={products}
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
            <Button type="button" onClick={form.handleSubmit(onSubmit)}>
              {false ? "Loading" : "Submit"}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                methods.beforeNext(async () => {
                  try {
                    const valid = await form.trigger();
                    console.log(valid, "<--- form valid");
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
