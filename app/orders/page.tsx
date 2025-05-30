"use client" //porque swr solo funciona en el cliente
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function OrdersPage() {
    const url = '/orders/api'
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 10000,
        revalidateOnFocus: false
    })
    if (isLoading) return <p>Cargando...</p>
    if (data) return (
        <>
            <div className="bg-[#f1ebe6] h-screen p-10">
                <h1 className="text-center text-6xl font-bold">Ordenes listas</h1>
                <Logo />
                {data.length ? (
                    <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10">
                        {data.map(order => (
                            <LatestOrderItem key={order.id} order={order} />
                        ))}
                    </div>
                ) : <p className="text-center my-10">No hay ordenes listas</p>}

            </div>
        </>
    )
}
