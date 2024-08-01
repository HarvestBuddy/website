"use client"
import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { useEffect, useState } from "react";

interface HomeProps {
  searchParams: { page: string };
}

export default function Home({ searchParams: { page = "1" } }: HomeProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;
  const heroItemCount = 1;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [products, setProducts] = useState<any[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/products/getProducts`);
        const data = await response.json();
        if (!data.success) {
          throw new Error("Error fetching products");
        }
        setProducts(data.products);
        setTotalItemCount(data.products.length);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [BASE_URL]);

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  const displayProducts = currentPage === 1 ? products.slice(0) : products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div className="overflow-hidden bg-transparent">
        <Hero />
      </div>
      <div className="p-4 max-w-7xl m-auto min-w-[300px] flex flex-col items-center">
        <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {displayProducts.map((product: any) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>

        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
