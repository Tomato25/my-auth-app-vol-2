'use server'

import { prisma } from '@/lib/prisma'

type getEmployeesProps = {
    page?: number; 
    limit?: number, 
    filterName?: string 
}

export async function getEmployees({ page = 1, limit = 5, filterName } : getEmployeesProps) {

    const pageNum = page < 1 ? 1 : page

     const where: any = {};

     if (filterName) {
     where.OR = [
    { firstName: { contains: filterName, mode: "insensitive" } },
    { lastName:  { contains: filterName, mode: "insensitive" } }
  ];
}

    const employees = await prisma.employee.findMany({
            where,
            skip: (pageNum - 1) * limit,
            take: limit,
            include: {products: true},
            orderBy: {updatedAt: "desc"}
    })

    const totalEmployees = await prisma.employee.count({where})
    const totalPages = Math.ceil(totalEmployees / limit)
    return {totalPages, employees}

}