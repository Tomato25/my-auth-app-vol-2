'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateProductSchema = z.object({
             id: z
                .string(),
             name: z
                     .string()
                     .min(1, "Please enter the product name")
                     .max(64, "Maximum number of characters is 64"),
                  description: z
                     .string()
                     .min(1, "Please enter the description")
                     .max(1000, "Maximum number of characters is 1000"),
                 employeeId: z
                     .string()
                     .min(1, "Please choose the assigned employee")
                     .max(64, "Maksimalni broj znakova je 64"),
                 internalCode: z
                     .string()
                     .min(1, "Please enter the product code")
                     .max(12, "Maximum number of characters is 12")
                     .optional(),
                 serialNumber: z
                     .string()
                     .min(1, "Please enter the serial number")
                     .max(999999999999, "Maximum number of characters is 12"),
                 status: z
                     .enum(["Active", "Inactive"]),
})


export async function UpdateProduct(formData: z.infer<typeof updateProductSchema>) {
  const validated = updateProductSchema.parse(formData)

  await prisma.product.update({
    where: { id: validated.id },
    data: {
      name: validated.name,
      description: validated.description,
      serialNum: validated.serialNumber,
      internalCode: validated.internalCode,
      status: validated.status,
      employeeId: validated.employeeId
    },
  })

  revalidatePath('/inventar')

  return { success: true }
}