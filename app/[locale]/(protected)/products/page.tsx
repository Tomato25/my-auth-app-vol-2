import { getProducts } from "@/actions/get-products"
import Products from "./components/Products"

export default async function Page() {

  const { products, totalPages, employees } = await getProducts({ page: 1, limit: 5 })

  return (
    <div className="flex-1">
      <Products data={products} pages={totalPages} employees={employees}/>
    </div>
  )
}