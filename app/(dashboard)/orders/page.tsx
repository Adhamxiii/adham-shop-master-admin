"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import { OrderColumns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      const data = res.data;
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log("orders_GET", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="my-5 bg-grey-1" />

      <DataTable data={orders} columns={OrderColumns} keyField="_id" />
    </div>
  );
};

export default OrdersPage;
