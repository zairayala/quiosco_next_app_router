import Heading from "@/components/ui/Heading";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
  return await prisma.product.count()
}
async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const products = await prisma.product.findMany({
    take: pageSize, //toma 10
    skip, //ignora los primeros 30 y comienza en 31
    include: {
      category: true
    }
  })
  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>> //le decimos a ts que nos diga el type de lo que devuelve getproducts

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) { //recuperamos el valor del parametro que escribimos

  const page = +searchParams.page || 1 //recupera la pagiba y si es que no tenemos un numero entonces que sea por default 1
  const pageSize = 10

  if (page < 0) redirect('/admin/products')

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  //como son consultas independientes ejecutamos con await al mismo tiempo, en next
  //se debe hacer con Promise.all
  const totalPages = Math.ceil(totalProducts / pageSize) //redondea hacia el mayor numero
  if (page > totalPages) redirect('/admin/products')
  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center cursor-pointer font-bold"
        >Crear producto</Link>
        <ProductSearchForm />
      </div>
      <ProductTable
        products={products}
      />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  )
}
