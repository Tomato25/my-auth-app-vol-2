'use client'

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ProductType } from '@/types/product'
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { EmployeeDetailsType } from "@/types/employeesDetails"
import { assignProducts } from "@/actions/assignProduct"
import { useTranslations } from "next-intl"

type UnassignedProductTableProps = {
  unassignedProducts: ProductType[]
  employee: EmployeeDetailsType
}

export default function UnassignedProductTable({ unassignedProducts, employee }: UnassignedProductTableProps) {
  const [selected, setSelected] = useState<string[]>([])

  const t = useTranslations("productTable")

  const toggleSelect = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selected.length === unassignedProducts.length) {
      setSelected([])
    } else {
      setSelected(unassignedProducts.map(p => p.id))
    }
  }

  const performAction = async () => { 
    const res = await assignProducts({
      employeeId: employee.id,
      productIds: selected
    })

    if (res.success) {
      toast.success(`Assigned ${selected.length} products to employee`, {
        description: employee.name
      })
      setSelected([])
    } else {
      toast.error("Error", { description: res.error })
    }
  }

  return (
    <div>
      {unassignedProducts.length === 0 ? (
        <p>{t("noProducts")}</p>
      ) : (
        <Table>
          <TableCaption>{t("unassignedProducts")}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selected.length === unassignedProducts.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="w-[150px]">{t("productName")}</TableHead>
              <TableHead>{t("description")}</TableHead>
              <TableHead>{t("serialNumber")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("internalCode")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {unassignedProducts.map(product => (
              <TableRow key={product.id} className="hover:bg-muted">
                <TableCell>
                  <Checkbox
                    checked={selected.includes(product.id)}
                    onCheckedChange={() => toggleSelect(product.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.serialNum}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>{product.internalCode || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>      
        </Table>      
      )}

      <Button
        className="m-3"
        onClick={performAction}
        disabled={selected.length === 0}
      >
      {t("assignProduct")} ({selected.length})
      </Button>
    </div>
  )
}
