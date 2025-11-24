
export type ProductType = {
  id: string
  name: string
  description: string
  employeeId?: string | null
  internalCode?: string | null
  serialNum: string
  status: 'Active' | 'Inactive' 
}