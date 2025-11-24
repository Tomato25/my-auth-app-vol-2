import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FormEmployee } from "@/types/employeesDetails"
import { ProductType } from "@/types/product"

interface ProductDetailsProps {
  product: ProductType
  employee: FormEmployee[]
}

export default function ProductDetails({ product, employee }: ProductDetailsProps) {

  const assignedEmployee = employee.find(emp => emp.id === product.employeeId)


  return (
    <div>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Name</ItemTitle>
          <ItemDescription>
            {product.name}
          </ItemDescription>
          <ItemTitle>Description</ItemTitle>
          <ItemDescription>
            {product.description}
          </ItemDescription>
          <ItemTitle>Role</ItemTitle>
          <ItemDescription>
            {product.status}
          </ItemDescription>
          <ItemTitle>Status</ItemTitle>
          <ItemDescription>
            {product.status}
          </ItemDescription>
          <ItemTitle>Employee assigned</ItemTitle>
          <ItemDescription>
            {assignedEmployee ? `${assignedEmployee.firstName} ${assignedEmployee.lastName}` : "Not assigned"}
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}