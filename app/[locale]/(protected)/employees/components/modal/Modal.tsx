import EditEmployeeForm from './EditEmployee';
import { AddForm } from './AddForm';
import EmployeeDetails from './EmployeeDetails';
import { EmployeeDetailsType } from '@/types/employeesDetails';
import { ModalType } from '@/app/[locale]/enums';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/types/product';
import { useTranslations } from 'next-intl';

interface ModalProps {
    isOpen: boolean;
    variant: ModalType;
    employee?: EmployeeDetailsType | null;
    onClose: () => void;
    unassignedProducts: ProductType[]
    
}

export default function Modal({isOpen, onClose, variant, employee, unassignedProducts}: ModalProps) {
if (!isOpen) return null;

const t = useTranslations("buttons");



    const renderContent = () => {
        switch(variant) {
            case ModalType.ADD_EMPLOYEE:
                return (
                <div>
                    <AddForm onSuccess={onClose}/>
                </div>
                )
            case ModalType.EDIT_EMPLOYEE:
                if (!employee) return <p>No employee selected</p>
                return (
                <div>
                    <EditEmployeeForm employee={employee} onSuccess={onClose}/>
                </div>
                )
            case ModalType.DETAILS_EMPLOYEE:
                 if (!employee) return <p>No employee selected</p>
                return (
                <div>
                    <EmployeeDetails employee={employee} unassignedProducts={unassignedProducts}/>
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
        <Button onClick={onClose} variant="outline" className="w-full mt-4">{t("close")}</Button>
    </div>
    </div>
    
  )
}