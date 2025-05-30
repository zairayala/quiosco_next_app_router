import ToastNotification from "@/components/ui/ToastNotification";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:flex">
                <aside className="md:w-72 md:h-screen bg-[#f1ebe6]">
                    <AdminSidebar />
                </aside>
                <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-[#fcf8f4] p-5">
                    {children} 
                </main>
            </div>

            <ToastNotification />
        </>
    )
}
