import { formatCurrency, getImagePath } from '@/src/utils'
import { Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import AddProductButton from './AddProductButton'
type ProductCardProps = {
    product: Product
}
export default function ProductCard({ product }: ProductCardProps) {
    const imagePath = getImagePath(product.image)
    return (
        <div className='border-b-gray-500 bg-white rounded-xl shadow-xs'>
            <div className='relative w-full h-[250px]'>
                <Image
                    fill
                    src={imagePath}
                    alt={`Imagen platillo ${product.name}`}
                    className='object-cover rounded-t-xl'
                />

            </div>
            <div className='p-5'>
                <h3 className='text-xl font-semibold'>{product.name}</h3>
                <p className='mt-2 font-bold text-2xl text-[#5c4a38]'>
                    {formatCurrency(product.price)}
                </p>
                <AddProductButton
                    product={product}
                />
            </div>
        </div>
    )
}
