'use client'

import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { employeeSchema } from "@/types/add-employee-schema"
import { SelectGroup } from "@radix-ui/react-select"
import { addEmployeeAction } from "@/actions/add-employee"
import { useTransition } from "react"
import { toast } from "sonner"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export const AddForm = ({ onSuccess }: { onSuccess: () => void }) => {

      const [isPending, startTransition] = useTransition()
      const t = useTranslations("employees");
      

    const form = useForm<z.infer<typeof employeeSchema>>({
        resolver:zodResolver(employeeSchema),
        mode:"onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            role: undefined,
            status:"Active"
        }
    })

    function onSubmit(data: z.infer<typeof employeeSchema>) {
        startTransition(async () => {
      const result = await addEmployeeAction(data)
      if (result.success) {
        toast.success(result.message)
        form.reset()
        onSuccess()
      } else {
        toast.error(result.message)
      }
    })
    }

    const roles = [
        {label: "Manager", value: "Manager"},
        {label: "Developer", value: "Developer"},
        {label: "Tester", value: "Tester"},
    ]

    const status = [
        {label: t("active"), value: "Active"},
        {label: t("inactive"), value: "Inactive"},
        
    ]

  return (
    <div>
        <form onSubmit={form.handleSubmit(onSubmit)} id="add-form">
            <FieldGroup>
                <Controller
                 name="firstName"
                 control={form.control}
                 render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-name">
                            {t("firstName")}
                        </FieldLabel>
                        <Input 
                        {...field}
                        id="form-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ivo"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                 )} 
                />
                <Controller
                 name="lastName"
                 control={form.control}
                 render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-lastName">
                            {t("lastName")}
                        </FieldLabel>
                        <Input 
                        {...field}
                        id="form-lastName"
                        aria-invalid={fieldState.invalid}
                        placeholder="Ivić"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                 )} 
                />
                <Controller
                 name="email"
                 control={form.control}
                 render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-email">
                            {t("email")}
                        </FieldLabel>
                        <Input 
                        {...field}
                        id="form-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="ivo@mail.com"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                 )} 
                />
                <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    >
                    <FieldContent>
                        <FieldLabel htmlFor="form-select-role">
                        {t("role")}
                        </FieldLabel>
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldContent>
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                        id="form-select-role"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[180px]"
                        >
                        <SelectValue placeholder={t("select")} />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            <SelectGroup>
                        {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                            {role.label}
                            </SelectItem>
                        ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    </Field>
                )}
            />
            <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    >
                    <FieldContent>
                        <FieldLabel htmlFor="form-select-status">
                        {t("status")}
                        </FieldLabel>
                        {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                        )}
                    </FieldContent>
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                        id="form-select-status"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[180px]"
                        >
                        <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            <SelectGroup>
                        {status.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                            {status.label}
                            </SelectItem>
                        ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    </Field>
                )}
                />
            </FieldGroup>
        </form>
         <Field orientation="horizontal" className="w-full">
          <Button type="submit" form="add-form" className="w-full mt-6">
            {t("submit")}
          </Button>
        </Field>
    </div>
  )
}
