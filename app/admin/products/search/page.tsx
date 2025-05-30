import Heading from "@/components/ui/Heading";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive' //filtra por minusculas
            }
        },
        include: {
            category: true
        }
    })
    return products
}
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ search: string }> }) {
    const products = await searchProducts((await searchParams).search)

    return (
        <>
            <Heading>Resultados de búsqueda {(await searchParams).search}</Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable products={products} />

            ) : <p className="text-center text-lg">No hay resultados</p>}
        </>
    )
}