import GoBackButton from '@/components/ui/GoBackButton';
import Heading from '@/components/ui/Heading';
import EditProductForm from '@/components/products/EditProductForm';
import ProductForm from '@/components/products/ProductForm';
import { prisma } from '@/src/lib/prisma';
import { notFound } from 'next/navigation';
import React from 'react';

// Función para obtener un producto por su ID
async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound(); // Redirige a la página de no encontrado si no existe el producto
  }
  return product;
}

// Definimos la generación de metadata para la página

export default async function EditProductsPage({ params }: {params: { id: string }}) {
  // Esperamos que los parámetros estén resueltos y procesados
  const id = +params.id;  // Aquí esperamos que `params` sea una promesa que se resuelve en `{ id: string }`

  // Convierte el ID a número y consulta el producto
  const product = await getProductById(id); // +id convierte el string a número

  return (
    <>
      <Heading>Editar producto: {product.name}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
