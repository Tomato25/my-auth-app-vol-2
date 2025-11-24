'use client'

import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { SelectGroup } from "@radix-ui/react-select"
import { useTransition } from "react"
import { toast } from "sonner"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { productSchema } from "@/types/add-poduct-schema"
import { addProductAction } from "@/actions/add-product"
import { Textarea } from "@/components/ui/textarea"
import { FormEmployee } from "@/types/employeesDetails"

type AddProductFormProps = {
    onSuccess: () => void;
    employees: FormEmployee[];
}


export const AddProductForm = ({onSuccess, employees}: AddProductFormProps) => {

      const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof productSchema>>({
        resolver:zodResolver(productSchema),
        mode:"onChange",
        defaultValues: {
            name: "",
            description: "",
            serialNumber: "",
            internalCode: "",
            status:"Active",
            employeeId: "",
        }
    })

    function onSubmit(data: z.infer<typeof productSchema>) {
        startTransition(async () => {
      const result = await addProductAction(data)
      if (result.success) {
        toast.success(result.message)
        form.reset()
        onSuccess()
      } else {
        toast.error(result.message)
      }
    })
    }

    const status = [
        {label: "Aktivan", value: "Active"},
        {label: "Neaktivan", value: "Inactive"},
        
    ]

  return (
    <div>
        <form onSubmit={form.handleSubmit(onSubmit)} id="add-form">
            <FieldGroup>
                <Controller
                 name="name"
                 control={form.control}
                 render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-productName">
                            Product name
                        </FieldLabel>
                        <Input 
                        {...field}
                        id="form-productName"
                        aria-invalid={fieldState.invalid}
                        placeholder="Product name"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                 )} 
                />
                <Controller
                 name="description"
                 control={form.control}
                 render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-description">
                            Product Description
                        </FieldLabel>
                        <Textarea 
                        {...field}
                        id="form-description"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter the product description"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                 )} 
                />
                <Controller
                 name="internalCode"
                 control={form.control}
                 render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-internalCode">
                            Internal code
                        </FieldLabel>
                        <Input 
                        {...field}
                        id="form-internalCode"
                        aria-invalid={fieldState.invalid}
                        placeholder="DSN7593S"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                 )} 
                />
                <Controller
                 name="serialNumber"
                 control={form.control}
                 render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-serialNumber">
                            Serial Number
                        </FieldLabel>
                        <Input 
                        {...field}
                        type="number"
                        id="form-serialNumber"
                        aria-invalid={fieldState.invalid}
                        placeholder="967232"
                        
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
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
                        Status
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
                <Controller
            name="employeeId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-employeeId">Assigned Employee</FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="form-employeeId">
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
            </FieldGroup>
        </form>
         <Field orientation="horizontal" className="w-full">
          <Button type="submit" form="add-form" className="w-full mt-6">
            Submit
          </Button>
        </Field>
    </div>
  )
}
