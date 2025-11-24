'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateEmployeeSchema = z.object({
             id: z
                .string(),
             firstName: z
                .string()
                .min(1, "Molimo unesite ime")
                .max(64, "Maksimalni broj znakova je 64"),
             lastName: z
                .string()
                .min(1, "Molimo unesite prezime")
                .max(64, "Maksimalni broj znakova je 64"),
            role: z
                .literal(["Manager", "Developer", "Tester"]),
            status: z
                .literal(["Active", "Inactive"]),
})


export async function updateEmployee(formData: z.infer<typeof updateEmployeeSchema>) {
  const validated = updateEmployeeSchema.parse(formData)

  await prisma.employee.update({
    where: { id: validated.id },
    data: {
      firstName: validated.firstName,
      lastName: validated.lastName,
      role: validated.role,
      status: validated.status,
    },
  })

  revalidatePath('/zaposlenici')

  return { success: true }
}