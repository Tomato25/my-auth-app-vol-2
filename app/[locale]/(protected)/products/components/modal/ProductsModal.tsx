
import { ProductType } from '@/types/product';
import ProductDetails from './ProductDetails';
import { AddProductForm } from './AddProductForm';
import { FormEmployee } from '@/types/employeesDetails';
import EditProductForm from './EditProduct';
import { ModalType } from '@/app/[locale]/enums';
import { Button } from '@/components/ui/button';

type ModalProps = {
    isOpen: boolean;
    variant: ModalType;
    product?: ProductType | null;
    employees: FormEmployee[];
    onClose: () => void;
}

export default function Modal({isOpen, onClose, variant, product, employees}: ModalProps) {
if (!isOpen) return null;


    const renderContent = () => {
        switch(variant) {
            case ModalType.ADD_PRODUCT:
                return (
                <div>
                    <AddProductForm employees={employees || []} onSuccess={onClose} />
                </div>
                )
            case ModalType.EDIT_PRODUCT:
                if (!product) return <p>No product selected</p>
                return (
                <div>
                    <EditProductForm product={product} employees={employees || []} onSuccess={onClose}/>
                </div>
                )
            case ModalType.DETAILS_PRODUCT:
                 if (!product) return <p>No product selected</p>
                return (
                <div>
                    <ProductDetails product={product} employee={employees}/>
                </div>
                )
            default:
                return null;
        }
    }

  return (
     <div className='fixed inset-0 bg-black/50 flex justify-center items-center max-h-screen'>
      <div className='bg-white p-5 min-w-2xl rounded-lg '>
        {renderContent()}
        <Button onClick={onClose} variant="outline" className="w-full mt-4">Close</Button>
    </div>
    </div>
    
  )
}