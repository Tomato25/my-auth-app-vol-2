import { ColumnDef } from "@tanstack/react-table";
import { ActionColumn } from "./actionColumn";
import { EmployeeDetailsType } from "@/types/employeesDetails";
import { ModalType } from "@/app/[locale]/enums";

export const columns = (
  openModal: (type: ModalType, employee?: EmployeeDetailsType) => void,
  refreshData: () => void
): ColumnDef<EmployeeDetailsType>[] => [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "numOfProducts", header: "Number of Products" },
  { accessorKey: "status", header: "Status" },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        employee={row.original}
        openModal={openModal}
        refreshData={refreshData}
      />
    ),
  },
];