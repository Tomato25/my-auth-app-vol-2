'use server'

import { prisma } from '@/lib/prisma'
import { employeeSchema } from "@/types/add-employee-schema"
import { revalidatePath } from 'next/cache'
import z from "zod"

export async function addEmployeeAction( formData: unknown) {
    const parsed = employeeSchema.safeParse(formData)
    if (!parsed.success) {
        return {success:false, message: "Invalid data", errors: z.treeifyError(parsed.error)}
    }

    const data = parsed.data

    try {
        await prisma.employee.create({
            data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email:data.email,
            role: data.role,
            status: data.status,
            },
        })
        
        revalidatePath('/zaposlenici')
        return { success: true, message: "Novi zaposlenik dodan"}
        
    } catch (error: any) {
        console.error("Error adding employee:", error)
        return {success: false, message: "Dodavanje neuspjesno"}
    }
}
 
