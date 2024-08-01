import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Add Product",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);
  if (!name || !description || !imageUrl || isNaN(price)) {
    throw new Error("Missing required fields");
  }
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect("/");
}

export default function AddProductPage() {
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">Add product</h1>
      <form action={addProduct}>
        <input
          required
          type="text"
          className="mb-3 input input-bordered w-full "
          name="name"
          placeholder="Name"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        />
        <input
          required
          type="url"
          className="mb-3 input input-bordered w-full "
          name="imageUrl"
          placeholder="Image URL"
        />
        <input
          required
          type="number"
          className="mb-3 input input-bordered w-full "
          name="price"
          placeholder="Price"
        />
        <FormSubmitButton type="submit" className="btn btn-primary btn-block">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
