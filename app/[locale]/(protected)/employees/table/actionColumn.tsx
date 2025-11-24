"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { toggleEmployeeStatus } from "@/actions/deactivate-employee";
import { ModalType } from "@/app/[locale]/enums";
import { EmployeeDetailsType } from "@/types/employeesDetails";
import { useTranslations } from "next-intl";

type ActionColumnProps = {
  employee: EmployeeDetailsType;
  openModal: (type: ModalType, employee?: EmployeeDetailsType) => void;
  refreshData: () => void;
};

export function ActionColumn({ employee, openModal, refreshData }: ActionColumnProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const t = useTranslations("table"); // adjust namespace to match your i18n

  const handleConfirmation = async () => {
    const res = await toggleEmployeeStatus(employee.id);
    if (res.success) {
      toast.info(
        `${employee.firstName} is now ${res.newStatus}`,
        { description: `${employee.firstName} is now ${res.newStatus}.` }
      );
      refreshData();
    } else {
      toast.error(t("error") || "Error", {
        description: res.error,
      });
    }
  };

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
          <DropdownMenuItem onClick={() => openModal(ModalType.DETAILS_EMPLOYEE, employee)}>
            {t("details")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openModal(ModalType.EDIT_EMPLOYEE, employee)}>
            {t("edit")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            {employee.status === "Active" ? t("deactivate") : t("activate")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmationDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmation}
        title={`${employee.status === "Active" ? t("deactivate") : t("activate")}`}
        description={`Confirm`}
        confirmText={t("yes")}
        cancelText={t("no")}
      />
    </>
  );
}