import { prisma } from '@/src/lib/prisma' 
import React from 'react'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

async function getCategories(){
  return await prisma.category.findMany() //me trae todas las categorias
}

export default async function OrderSidebar() {
  const categories = await getCategories()
  return (
    <aside className='md:w-75 md:h-screen bg-[#f1ebe6]'>
      <Logo />
        <nav className='mt-10'>
          {categories.map(category => (
            <CategoryIcon key={category.id} category={category}/>
          ))}
        </nav>
    </aside>
  )
}
