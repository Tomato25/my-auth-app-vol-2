'use server'

import { prisma } from '@/lib/prisma'

export async function toggleProductStatus(id: string) {
    try{
        const product = await prisma.product.findUnique({
            where: {id},
            select: {status:true}
        })

        if (!product) {
            return { success: false, error: 'Product not found' }
        }

    const newStatus = product.status === 'Active' ? 'Inactive' : 'Active'
    
    await prisma.product.update({
        where: {id},
        data: {status: newStatus}
    })

    return { success: true, newStatus }
  } catch (error) {
    console.error('Error toggling product status:', error)
    return { success: false, error: 'Failed to toggle product status' }
  }
  
}
