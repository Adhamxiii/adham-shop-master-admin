"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CollectionIdPage = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  useEffect(() => {
    const getCollectionDetails = async () => {
      try {
        const res = await axios.get(`/api/collections/${params.collectionId}`);

        setCollectionDetails(res.data);
        setLoading(false);
      } catch (error) {
        console.log("[collection_GET]", error);
      }
    };

    getCollectionDetails();
  }, [params.collectionId]);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm collection={collectionDetails} />
  );
};

export default CollectionIdPage;
