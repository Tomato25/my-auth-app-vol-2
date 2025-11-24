'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type AssignProductsInput = {
  employeeId: string
  productIds: string[]
}

export async function assignProducts({ employeeId, productIds }: AssignProductsInput) {
  try {
    await prisma.product.updateMany({
      where: {
        id: { in: productIds },
      },
      data: {
        employeeId,
      },
    })

    revalidatePath("/zaposlenici")

    return { success: true }
  } catch (error) {
    console.error("Error assigning products:", error)
    return { success: false, error: "Failed to assign products" }
  }
}