import { useFormContext } from "react-hook-form";
import { MultiSelect } from "../multi-select";
import { TAddRuleForm } from "./types";

const productsList = [
  { value: "Tier 1", label: "Tier 1" },
  { value: "Tier 2", label: "Tier 2" },
  { value: "Tier 3", label: "Tier 3" },
  { value: "Tier 4", label: "Tier 4" },
  { value: "Tier 5", label: "Tier 5" },
];

export default function ProductsForm() {
  const form = useFormContext<TAddRuleForm>();

  const company = form.getValues("company");
  const products = form.watch("products");

  const handleChange = (value: string[]) => {
    const products = value.map((val) => ({ company, productName: val }));
    form.setValue("products", products);
  };

  return (
    <div className="space-y-4">
      <MultiSelect
        options={productsList}
        onValueChange={handleChange}
        defaultValue={products.map((p) => p.productName)}
        placeholder="Select products"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
    </div>
  );
}
