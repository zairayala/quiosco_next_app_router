"use client"
import { Category } from "@prisma/client"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({ category }: CategoryIconProps) {
    const params = useParams<{category : string}>() //ponemos que params es un objeto con category string
    return (
        <div
            className={`${category.slug === params.category ? 'bg-[#c5c5a3]' : ''} text-[#5c4a38] flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        >
            <div className="w-10 h-10 relative">
                <Image
                    fill
                    src={`/icon_${category.slug}.svg`}
                    alt="Imagen categoria"
                />
            </div>
            <Link
                className="text-xl font-semibold"
                href={`/order/${category.slug}`}
            >{category.name}</Link>

        </div>
    )
}
