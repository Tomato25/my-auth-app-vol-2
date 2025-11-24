import * as z from "zod"

export const productSchema = z.object({
    name: z
        .string()
        .min(1, "Please enter the product name")
        .max(64, "Maximum number of characters is 64"),
     description: z
        .string()
        .min(1, "Please enter the description")
        .max(1000, "Maximum number of characters is 1000"),
    employeeId: z
        .string()
        .optional(),
    internalCode: z
        .string()
        .min(1, "Please enter the product code")
        .max(12, "Maximum number of characters is 12"),
    serialNumber: z
        .string()
        .min(1, "Please enter the serial number")
        .max(999999999999, "Maximum number of characters is 12"),
    status: z
        .enum(["Active", "Inactive"]),
})