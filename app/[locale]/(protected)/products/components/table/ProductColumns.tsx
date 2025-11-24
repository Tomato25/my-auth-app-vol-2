'use client'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react"
import { ModalType } from "@/app/[locale]/enums"
import { ProductType } from "@/types/product"
import { toggleProductStatus } from "@/actions/deactivate-product"
import { ConfirmationDialog } from "@/components/ConfirmationDialog"


export const columns= (openModal: (type: ModalType, product?: ProductType) => void, refreshData: () => void ): ColumnDef<ProductType>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "serialNum",
    header: "Serial Number",
  },
  {
    accessorKey: "internalCode",
    header: "Internal code",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {id: "actions",
   cell: ({row}) => {
    const product = row.original
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleConfirmation = async () => {
        
                const res = await toggleProductStatus(product?.id)
                if (res.success) {
                  toast.info(`Employee ${res.newStatus === 'Active' ? 'activated' : 'deactivated'}`, 
                    {
                    description: `${product?.name} is now ${res.newStatus}.`,
                  })
                  refreshData()
                } else {
                  toast.error("Error", {
                    description: res.error,
                  })
                }
              }
 
     return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openModal(ModalType.DETAILS_PRODUCT, product)}>
               Vidi detalje
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openModal(ModalType.EDIT_PRODUCT, product)}>Uredi</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDialogOpen(true)}>
              {product.status === 'Active' ? 'Deaktiviraj' : 'Aktiviraj'} </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ConfirmationDialog
                    isOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onConfirm={handleConfirmation}
                    title={`${product.status === "Active" ? "Deactivate" : "Activate"} product`}
                    description={`Are you sure you want to ${product.status === "Active" ? "deactivate" : "activate"} ${product.name}?`}
                    confirmText="Yes"
                    cancelText="No"
                  />
          </>
    )
   }
  }
]