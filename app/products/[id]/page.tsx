import PriceTag from "@/components/PriceTag";
// import { prisma } from "@/lib/db/prisma";
// import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
// import AddToCartButton from "./AddtoCartButton";
// import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${BASE_URL}/products/getProduct/${id}`).then(
    (res) => res.json()
  );
  const product = response.productDetails;
  if (!product) notFound();
  return product;
});

// export async function generateMetadata({
//   params: { id },
// }: ProductPageProps): Promise<Metadata> {
//   const product = await getProduct(id);

//   return {
//     title: product.name + " - ecommerce",
//     description: product.description,
//     openGraph: {
//       images: [{ url: product.imageUrl }],
//     },
//   };
// }

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col justify-center items-center pt-4 pb-4">
      <div className="flex flex-col flex-1 items-center justify-center shadow-xl p-10 rounded-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg"
            priority
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <PriceTag price={product.price} className="mt-4" />
          <p className="py-6">{product.description}</p>
          {/* <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
          />{" "} */}
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
