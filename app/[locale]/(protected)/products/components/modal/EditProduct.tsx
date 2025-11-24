'use client'

import { UpdateProduct } from "@/actions/update-product"
import { editProductSchema } from "@/types/edit-product-schema"
import { ProductType } from "@/types/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { SelectGroup } from "@radix-ui/react-select"

import z from "zod"
import { Button } from "@/components/ui/button"
import { FormEmployee } from "@/types/employeesDetails"

interface EditProductProps {
    product: ProductType,
    onSuccess: () => void
    employees: FormEmployee[];
    
}

type UpdateProductFormValues = z.infer<typeof editProductSchema>

export default function EditProductForm({product, employees, onSuccess}: EditProductProps) {
      const [loading, setLoading] = useState(false)

      const defaultValues: UpdateProductFormValues = {
            id: product.id,
            name: product.name,
            description: product.description,
            serialNumber: product.serialNum,
            internalCode: product.internalCode,
            status: product.status as "Active" | "Inactive",
            employeeId: product.employeeId ,
      }

      const form = useForm<UpdateProductFormValues>({
        resolver: zodResolver(editProductSchema),
        defaultValues
      })

      async function onSubmit(values: UpdateProductFormValues) {
        setLoading(true)
        const res = await UpdateProduct(values)
        setLoading(false)

        if (res.success){
            onSuccess()
        }
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
          <Button type="submit" form="add-form" className="w-full mt-6" disabled={loading || !form.formState.isDirty}>
            Submit
          </Button>
        </Field>
    </div>
      ) 
}