'use server'

import { prisma } from '@/lib/prisma'
import { productSchema } from '@/types/add-poduct-schema'
import { revalidatePath } from 'next/cache'
import z, { success } from "zod"

export async function addProductAction( formData: unknown) {
    const parsed = productSchema.safeParse(formData)
    if (!parsed.success) {
        return {success:false, message: "Invalid data", errors: z.treeifyError(parsed.error)}
    }

    const data = parsed.data
    const employeeId =
    data.employeeId && data.employeeId.trim() !== "" ? data.employeeId : null;
    

    try {
        await prisma.product.create({
            data: {
            name: data.name,
            description: data.description,
            employeeId: employeeId,
            internalCode: data.internalCode,
            serialNum: data.serialNumber,
            status: data.status,
            },
        })
        
        revalidatePath('/inventar')

        return { success: true, message: "Nova stavka dodana"}
    } catch (error: any) {
        console.error("Error adding product:", error)
        return {success: false, message: "Dodavanje neuspjesno"}
    }
}
 
