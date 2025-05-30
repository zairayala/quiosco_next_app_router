import Link from "next/link";

type ProductsPaginationProps = {
  page: number
  totalPages: number
}
export default function ProductsPagination({ page, totalPages }: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1) //hacemos un array con los numeros de las paginas
  console.log(pages)

  return (
<nav className="flex justify-center py-10">
  {page > 1 && (
    <Link
      href={`/admin/products?page=${page - 1}`}
      className="bg-[#ececdd] hover:bg-[#d6d6c2] px-4 py-2 text-sm text-[#5c4a38] 
                border border-[#d6d6c2] rounded-l-md transition-colors duration-200 
                focus:z-20 focus:outline-none focus:ring-2 focus:ring-[#8a7968]"
    >
      &laquo;
    </Link>
  )}
  
  {pages.map(currentPage => (
    <Link
      key={currentPage}
      href={`/admin/products?page=${currentPage}`}
      className={`${
        page === currentPage 
          ? 'bg-[#8a7968] text-white font-bold' 
          : 'bg-[#ececdd] hover:bg-[#d6d6c2] text-[#5c4a38]'
      } px-4 py-2 text-sm border-t border-b border-[#d6d6c2] 
         transition-colors duration-200 focus:z-20 focus:outline-none 
         focus:ring-2 focus:ring-[#8a7968] ${
           currentPage === pages[0] && page > 1 ? '' : 
           currentPage === pages[0] ? 'rounded-l-md border-l' : ''
         } ${
           currentPage === pages[pages.length - 1] && page < totalPages ? '' :
           currentPage === pages[pages.length - 1] ? 'rounded-r-md border-r' : ''
         }`}
    >
      {currentPage}
    </Link>
  ))}

  {page < totalPages && (
    <Link
      href={`/admin/products?page=${page + 1}`}
      className="bg-[#ececdd] hover:bg-[#d6d6c2] px-4 py-2 text-sm text-[#5c4a38] 
                border border-[#d6d6c2] rounded-r-md transition-colors duration-200 
                focus:z-20 focus:outline-none focus:ring-2 focus:ring-[#8a7968]"
    >
      &raquo;
    </Link>
  )}
</nav>
  )
}
