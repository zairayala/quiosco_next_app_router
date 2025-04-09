import GoBackButton from '@/components/ui/GoBackButton'
import Heading from '@/components/ui/Heading'
import EditProductForm from '@/components/products/EditProductForm'
import ProductForm from '@/components/products/ProductForm'
import { prisma } from '@/src/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: { id },
    })
    if (!product) {
        notFound() // invocamos la plantilla de not-found
    }
    return product
}

// Tipar params como { id: string }
export default async function EditProductsPage({
    params,
}: {
    params: { id: string }
}) {
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
        notFound(); // En caso de que el id no sea un número válido
    }
    const product = await getProductById(id)

    return (
        <>
            <Heading>Editar producto: {product.name}</Heading>
            <GoBackButton />
            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    )
}
