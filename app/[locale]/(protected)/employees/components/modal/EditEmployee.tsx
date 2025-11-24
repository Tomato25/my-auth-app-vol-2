'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { updateEmployee } from '@/actions/update-employee'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Field, FieldGroup, FieldLabel, FieldError, FieldContent } from '@/components/ui/field'
import { EmployeeDetailsType } from '@/types/employeesDetails'


const editEmployeeSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  role: z.enum(["Manager", "Developer", "Tester"]),
  status: z.enum(["Active", "Inactive"]),
})

type EditEmployeeFormValues = z.infer<typeof editEmployeeSchema>

type EmployeeDetailsProps = {
  employee: EmployeeDetailsType
  onSuccess: () => void 
}

export default function EditEmployeeForm({ employee, onSuccess }: EmployeeDetailsProps) {
  const [loading, setLoading] = useState(false)

  const defaultValues: EditEmployeeFormValues = {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.role as "Manager" | "Developer" | "Tester",
    status: employee.status as "Active" | "Inactive",
  }

  const form = useForm<EditEmployeeFormValues>({
    resolver: zodResolver(editEmployeeSchema),
    defaultValues,
  })

  async function onSubmit(values: EditEmployeeFormValues) {
    setLoading(true)
    const res = await updateEmployee(values)
    setLoading(false)

    if (res.success) {
      onSuccess()
    }
  }

    const roles = [
        {label: "Manager", value: "Manager"},
        {label: "Developer", value: "Developer"},
        {label: "Tester", value: "Tester"},
    ]

    const status = [
        {label: "Aktivan", value: "Active"},
        {label: "Neaktivan", value: "Inactive"},
        
    ]

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} id="edit-form">
        <FieldGroup>
          {/* First Name */}
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-firstName">First Name</FieldLabel>
                <Input
                  {...field}
                  id="edit-firstName"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter first name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-lastName">Last Name</FieldLabel>
                <Input
                  {...field}
                  id="edit-lastName"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter last name"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="edit-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="edit-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="user@mail.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Role Select */}
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="edit-role">Role</FieldLabel>
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
                    id="edit-role"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[180px]"
                  >
                    <SelectValue placeholder="Select role" />
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

          {/* Status Select */}
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="responsive" data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="edit-status">Status</FieldLabel>
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
                    id="edit-status"
                    aria-invalid={fieldState.invalid}
                    className="min-w-[180px]"
                  >
                    <SelectValue placeholder="Select status" />
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
        <Button type="submit" form="edit-form" className="w-full mt-6" disabled={loading || !form.formState.isDirty}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Field>
    </div>
  )
}
