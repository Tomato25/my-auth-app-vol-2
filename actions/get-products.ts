'use server'

import { prisma } from '@/lib/prisma'

type getProductsProps = {
  page?: number
  limit?: number
  filterName?: string
  filterAssigned?: "all" | "assigned" | "unassigned"
}

export async function getProducts({
  page = 1, 
  limit = 5, 
  filterName,
  filterAssigned = "all"
}: getProductsProps) {

  const pageNum = page < 1 ? 1 : page
  const where: any = {}

  //  Name or Serial search filter
  if (filterName) {
    where.OR = [
      { name: { contains: filterName, mode: "insensitive" } },
      { serialNum: { contains: filterName, mode: "insensitive" } },
    ]
  }

  //  Assigned / Unassigned filter
  if (filterAssigned === "assigned") {
    where.employeeId = { not: null }
  }

  if (filterAssigned === "unassigned") {
    where.employeeId = null
  }

  const products = await prisma.product.findMany({
    where,
    skip: (pageNum - 1) * limit,
    take: limit,
    orderBy: { updatedAt: "desc" }
  })

  const employees = await prisma.employee.findMany({
    select: { id: true, firstName: true, lastName: true }
  })

  const totalProducts = await prisma.product.count({ where })
  const totalPages = Math.ceil(totalProducts / limit)

  return { totalPages, products, employees }
}