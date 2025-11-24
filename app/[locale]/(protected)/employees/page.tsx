import { getEmployees } from "@/actions/get-employees";
import { getProducts } from "@/actions/get-products";
import Employees from "./components/Employees";

export default async function Page() {
  const { employees, totalPages } = await getEmployees({ page: 1, limit: 5 });
  const unassignedRes = await getProducts({
    filterAssigned: "unassigned",
  });

  const unassignedProducts = unassignedRes.products;

  return (
    <div className="flex-1">
      <Employees data={employees} pages={totalPages} unassignedProducts={unassignedProducts}/>
    </div>
  );
}