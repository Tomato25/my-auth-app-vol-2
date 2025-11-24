"use client"

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export function ProductAssignmentFilter({
  value,
  onChange
}: {
  value: string
  onChange: (val: "all" | "assigned" | "unassigned") => void
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by assignment" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="assigned">Assigned</SelectItem>
        <SelectItem value="unassigned">Unassigned</SelectItem>
      </SelectContent>
    </Select>
  )
}