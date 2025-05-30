import { completeOrder } from "@/actions/complete-order-action"
import { formatCurrency } from "@/src/utils"
import { OrderWithProducts } from "@/src/types"

type OrderCardProps = {
    order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-[#f1ebe6] shadow-md px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-stone-700'>Cliente: {order.name}</p>
            <p className='text-lg font-medium text-stone-700'>Productos Ordenados:</p>
            <dl className="mt-6 space-y-4">
                {order.orderProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-2 border-t border-stone-300 pt-4">
                        <dt className="flex items-center text-sm text-stone-600">
                            <span className="font-bold bg-stone-200 px-2 py-1 rounded-md text-stone-700">
                                ({product.quantity})
                            </span>
                        </dt>
                        <dd className="text-sm font-medium text-stone-700 ml-2">{product.product.name}</dd>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-stone-600 pt-4 bg-stone-50 px-4 py-3 rounded-md">
                    <dt className="text-base font-bold text-stone-700">Total a Pagar: </dt>
                    <dd className="text-lg font-bold text-stone-600">{formatCurrency(order.total)}</dd>
                </div>
            </dl>
            <form action={completeOrder}>
                <input type="hidden" value={order.id} name="order_id" />
                <input
                    type="submit"
                    className="bg-[#5c4a38] hover:bg-[#5c4a38]/90 transition-colors rounded-md text-white w-full mt-5 p-3 uppercase font-semibold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}
