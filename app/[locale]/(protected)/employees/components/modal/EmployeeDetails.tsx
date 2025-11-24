import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

import { EmployeeDetailsType } from "@/types/employeesDetails";
import { ProductType } from "@/types/product";
import AssignedProductsTable from "./AssignedProductsTable";
import UnassignedProductTable from "./UnassignedProductTable";
import { useTranslations } from "next-intl";

type EmployeeDetailsProps = {
  employee: EmployeeDetailsType;
  unassignedProducts: ProductType[];
};

export default function EmployeeDetails({
  employee,
  unassignedProducts,
}: EmployeeDetailsProps) {


  const t = useTranslations("employees")

  return (
    <div>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>{t("name")}</ItemTitle>
          <ItemDescription>{employee.name}</ItemDescription>
          <ItemTitle>{t("email")}</ItemTitle>
          <ItemDescription>{employee.email}</ItemDescription>
          <ItemTitle>{t("role")}</ItemTitle>
          <ItemDescription>{employee.role}</ItemDescription>
          <ItemTitle>{t("status")}</ItemTitle>
          <ItemDescription>{employee.status}</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" className="mt-5">
        <AssignedProductsTable employee={employee} />
      </Item>
      <Item variant="outline" className="mt-5">
        <UnassignedProductTable unassignedProducts={unassignedProducts} employee={employee} />
      </Item>
    </div>
  );
}
