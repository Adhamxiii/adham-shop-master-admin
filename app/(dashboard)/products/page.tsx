"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { ProductColumns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products");

      const data = res.data;
      setProducts(data);
      setLoading(false);
      console.log(data)
    } catch (error) {
      console.log("[products_GET]", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button
          onClick={() => router.push("/products/new")}
          className="bg-blue-1 text-white"
        >
          <Plus className="s-4" /> Create Product
        </Button>
      </div>
      <Separator className="my-4 bg-grey-1" />
      <DataTable columns={ProductColumns} data={products} searchKey="title" />
    </div>
  );
};

export default ProductsPage;
