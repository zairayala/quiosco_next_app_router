"use client"
import { useStore } from '@/src/lib/store'
import React, { useMemo } from 'react'
import ProductDetails from './ProductDetails'
import { formatCurrency } from '@/src/utils'
import { createOrder } from '@/actions/create-order-action'
import { OrderSchema } from '@/src/schema'
import { toast } from 'react-toastify'

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    const result = OrderSchema.safeParse(data) //validacion del cliente
    if (!result.success) {
      result.error.issues.forEach((issue) => { //accedemos al error de zod
        toast.error(issue.message)
      })
      return
    }
    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((issue) => { //accedemos al error de zod
        toast.error(issue.message)
      })

    }
    toast.success('Pedido realizado correctamente')
    clearOrder()
  }
  
  return (
    <aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-white shadow-xs'>
      <h1 className='text-2xl text-start font-bold'>Mi pedido</h1>
      {order.length === 0 ? <p className='text-start my-10'>El pedido esta vacio</p> : (
        <div className='mt-5'>
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}
          <p className='text-2xl mt-20 text-center'>
            Total a pagar: {''}
            <span className='font-bold'>{formatCurrency(total)}</span>
          </p>
          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >
            <input
              type="text"
              placeholder='Tu nombre'
              className='bg-white border border-gray-100 p-2 w-full'
              name='name'
            />
            <input
              type="submit"
              className='py-2 rounded uppercase text-white bg-orange-950 w-full text-center cursor-pointer font-bold'
              value='Confirmar pedido'
            />
          </form>
        </div>
      )}
    </aside>
  )
}
