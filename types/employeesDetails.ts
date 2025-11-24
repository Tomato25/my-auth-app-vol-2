import { ProductType } from "./product"

export type EmployeeDetailsType = {
  id: string
  firstName: string
  lastName: string
  name?: string
  email: string
  role: 'Manager' | 'Developer' | 'Tester' 
  status: 'Active' | 'Inactive'
  products: ProductType[]
}

export type FormEmployee = Pick<EmployeeDetailsType, "id" | "firstName" | "lastName">


