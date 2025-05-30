"use client"
import { useStore } from "@/src/lib/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
    product: Product
}
export default function AddProductButton({product} : AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)
    return (
        <button
            type='button'
            className='bg-[#5c4a38] hover:bg-[#5c4a38]/90 text-white w-full mt-2 p-3 uppercase font-semibold cursor-pointer rounded-md transition-colors'
            onClick={() => addToOrder(product)}
        >
            Agregar
        </button>
    )
}
