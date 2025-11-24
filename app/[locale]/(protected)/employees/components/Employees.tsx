'use client'

import  { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { columns } from '../table/columns'
import { DataTable } from '../table/data-table'
import { EmployeeDetailsType } from '@/types/employeesDetails'
import { getEmployees } from '@/actions/get-employees'
import { Input } from "@/components/ui/input"
import { useDebounce } from "@uidotdev/usehooks";
import { useTranslations } from 'next-intl'
import { ProductType } from '@/types/product'
import { ModalType } from '@/app/[locale]/enums'
import Modal from './modal/Modal'
import PaginationComponent from '@/components/paginationComponent'



type EmployeesProps = {
  data: EmployeeDetailsType[]
  pages: number
  unassignedProducts: ProductType[]
}

export function Employees({data, pages, unassignedProducts}: EmployeesProps)  {

const [modalOpen, setModalOpen] = useState(false);
const [modalType, setModalType] = useState<ModalType>(ModalType.ADD_EMPLOYEE);
const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetailsType | null>(null)
const [filterName, setFilterName] = useState("")
const debouncedFilterName = useDebounce(filterName, 300);
const [employees, setEmployees] = useState(data)
const [totalPages, setTotalPages] = useState(pages)
const [currentPage, setCurrentPage] = useState(1)

  const t = useTranslations("employees");


  const fetchEmployees = async (page: number) => {
    const res = await getEmployees({
      page,
      limit: 5,
      filterName: debouncedFilterName,
    })

    setEmployees(res.employees)
    setTotalPages(res.totalPages)
    setCurrentPage(page)
  }

  // refetch when filter changes
  useEffect(() => {
    fetchEmployees(1)
  }, [debouncedFilterName])

const openModal = (type: ModalType, employee?: EmployeeDetailsType) => {
    setModalType(type);
    setSelectedEmployee(employee ?? null);   
    setModalOpen(true);
     };

const refreshData = () => 
  fetchEmployees(currentPage); 

  
  const enhancedColumns = columns(openModal, refreshData)

  const tableData = employees.map(employee => ({
        id: employee.id,
        firstName:employee.firstName,
        lastName:employee.lastName,
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        role: employee.role as 'Manager' | 'Developer' | 'Tester',
        numOfProducts: employee.products.length,
        status: employee.status as 'Active' | 'Inactive',
        products: employee.products
    }))

  return (
    <div className='m-6'>
        <Input className='w-2xs py-4 my-4' placeholder={t("filterName")} onChange={(e) => setFilterName(e.target.value)}/>
        <DataTable columns={enhancedColumns} data={tableData} pages={pages}/>
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => fetchEmployees(page)} />
        <Button onClick={() => openModal(ModalType.ADD_EMPLOYEE)}>{t("addNew")}</Button>
        <Modal isOpen={modalOpen} onClose={() => {setModalOpen(false), refreshData()}} variant={modalType} employee={selectedEmployee} unassignedProducts={unassignedProducts}/>
    </div>
    
    )
}

export default Employees