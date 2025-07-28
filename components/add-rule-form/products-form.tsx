import { ProductsWithCompany } from "@/features/products/fetchProducts";
import { useFormContext } from "react-hook-form";
import { MultiSelect } from "../multi-select";
import { TAddRuleForm } from "./types";

export default function ProductsForm({
  products,
}: {
  products: ProductsWithCompany;
}) {
  const form = useFormContext<TAddRuleForm>();

  const company = form.getValues("company");
  const selectedProducts = form.watch("products");

  const filteredProducts = products
    .filter((p) => p.company.name === company)
    .map((product) => ({
      value: product.productName,
      label: product.productName,
    }));

  const handleChange = (value: string[]) => {
    const products = value.map((val) => ({ company, productName: val }));
    form.setValue("products", products);
  };

  return (
    <div className="space-y-4">
      <MultiSelect
        options={filteredProducts}
        onValueChange={handleChange}
        defaultValue={selectedProducts.map((p) => p.productName)}
        placeholder="Select products"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
    </div>
  );
}
