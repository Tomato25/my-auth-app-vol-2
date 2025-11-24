import * as z from "zod"

export const employeeSchema = z.object({
    firstName: z
        .string()
        .min(1, "Molimo unesite ime")
        .max(64, "Maksimalni broj znakova je 64"),
     lastName: z
        .string()
        .min(1, "Molimo unesite prezime")
        .max(64, "Maksimalni broj znakova je 64"),
    email: z
        .email()
        .min(1, "Molimo unesite email")
        .max(64, "Maksimalni broj znakova je 64"),
    role: z
        .literal(["Manager", "Developer", "Tester"]),
    status: z
        .literal(["Active", "Inactive"]),
})