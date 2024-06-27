"use client";

import { CollectionColumns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CollectionsPage = () => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const router = useRouter();

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/collections");

      const data = res.data;
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[collections_GET]", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button
          onClick={() => router.push("/collections/new")}
          className="bg-blue-1 text-white"
        >
          <Plus className="s-4" /> Create Collection
        </Button>
      </div>
      <Separator className="my-4 bg-grey-1" />
      <DataTable
        columns={CollectionColumns}
        data={collections}
        searchKey="title"
      />
    </div>
  );
};

export default CollectionsPage;
