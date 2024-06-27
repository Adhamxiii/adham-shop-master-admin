"use client";

import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductIdPage = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null,
  );

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get(`/api/products/${params.productId}`);

        setProductDetails(res.data);
        setLoading(false);
      } catch (error) {
        console.log("[getProductDetails]", error);
      }
    };

    getProductDetails();
  }, [params.productId]);

  return loading ? <Loader /> : <ProductForm product={productDetails} />;
};

export default ProductIdPage;
