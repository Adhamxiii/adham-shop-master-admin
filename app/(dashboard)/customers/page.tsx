import { DataTable } from "@/components/custom ui/DataTable";
import { CustomerColumns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";
import React from "react";

const CustomersPage = async () => {
  await connectToDB();

  const customers = await Customer.find().sort({ createdAt: "desc" });

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="my-5 bg-grey-1" />
      <DataTable<CustomerType, any>
        data={customers}
        columns={CustomerColumns}
        searchKey="name"
      />
    </div>
  );
};

export default CustomersPage;
