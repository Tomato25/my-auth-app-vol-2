import React, { useTransition } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeeDetailsType } from '@/types/employeesDetails';
import { useTranslations } from 'next-intl';

type AssignedProductsTableProps = {
    employee: EmployeeDetailsType
}

export default function AssignedProductsTable({employee}: AssignedProductsTableProps) {

const t = useTranslations("productTable")

  return (
    <div>
        {employee.products.length === 0 ? (
          <p>{t("noAssignedProducts")} {employee.name}</p>
        ) : (
          <Table>
            <TableCaption>{t("assignedProducts")} {employee.name}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">{t("productName")}</TableHead>
                <TableHead>{t("description")}</TableHead>
                <TableHead>{t("serialNumber")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("internalCode")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employee.products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted">
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
    </div>
  )
}