"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
    link: {
        url: string;
        text: string;
        blank: boolean;    
    }
}
export default function AdminRoute({link} : AdminRouteProps) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(link.url) //vemos si estamos en una pagina 
  return (
    <Link 
        className={`${isActive ? 'bg-[#c5c5a3]' : ''}  font-bold text-lg text-[#5c4a38] border-t border-gray-200 p-3 last-of-type:border-b`}
        href={link.url}
        target={link.blank ? '_blank' : ''}
    >
    {link.text}
    </Link>  
  )
}
