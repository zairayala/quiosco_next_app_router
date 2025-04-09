import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <div className="md:flex">
                <OrderSidebar />
                <main className="md:flex-1 md:h-screen md:overlow-y-scroll p-5">
                    {children} {/**Se renderizan todos los hijos como page(pagina de inicio) */}
                </main>
                <OrderSummary />
            </div>
            <ToastNotification />
        </>
    )
}
