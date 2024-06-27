"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const CustomerColumns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
