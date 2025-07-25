import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCompanies } from "@/features/companies/fetchCompanies";
import { columns } from "@/features/products/columns";
import { fetchProducts } from "@/features/products/fetchProducts";
import { AppContainer } from "../../components/app-container";

export default async function CompaniesPage() {
  const companies = await fetchCompanies();
  const products = await fetchProducts();
  return (
    <AppContainer>
      <Card>
        <CardContent>
          {companies.map((comp) => (
            <p key={comp.id}>{comp.name}</p>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
      </Card>
    </AppContainer>
  );
}
