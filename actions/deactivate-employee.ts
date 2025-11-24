'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleEmployeeStatus(id: string) {
    try{
        const employee = await prisma.employee.findUnique({
            where: {id},
            select: {status:true}
        })

        if (!employee) {
            return { success: false, error: 'Employee not found' }
        }

    const newStatus = employee.status === 'Active' ? 'Inactive' : 'Active'
    
    await prisma.employee.update({
        where: {id},
        data: {status: newStatus}
    })

    revalidatePath("/zaposlenici")

    return { success: true, newStatus }
  } catch (error) {
    console.error('Error toggling employee status:', error)
    return { success: false, error: 'Failed to toggle employee status' }
  }
  
}
