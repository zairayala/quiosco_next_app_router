import { formatCurrency } from '@/src/utils'
import { useStore } from '@/src/lib/store'
import { OrderItem } from '@/src/types'
import { MinusIcon, PlusIcon, XCircleIcon } from '@heroicons/react/16/solid'
import { useMemo } from 'react'
type ProductDetailsProps = {
  item: OrderItem
}

const MAX_ITEMS = 5
const MIN_ITEMS = 1

export default function ProductDetails({ item }: ProductDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity)
  const decreaseQuantity = useStore((state) => state.decreaseQuantity)
  const removeItem = useStore((state) => state.removeItem)
  const disableDecreaseButton = useMemo(() => item.quantity === MIN_ITEMS, [item]) //devuelve un booleano si item.quantity es uno (observa al item)
  const disableIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS, [item]) //devuelve un booleano si item.quantity es uno (observa al item)

  return (
<div className="shadow space-y-1 p-4 bg-[#f7f7f2] border-t border-[#d6d6c2] rounded-md">
  <div className="space-y-4">
    <div className="flex justify-between items-start">
      <p className="text-xl font-semibold text-[#5c4a38]">{item.name}</p>

      <button
        type="button"
        onClick={() => removeItem(item.id)}
        className="hover:bg-red-50 p-1 rounded-full transition-colors"
      >
        <XCircleIcon className="text-red-600 hover:text-red-700 h-8 w-8" />
      </button>
    </div>
    
    <p className="text-2xl text-[#5c4a38] font-bold">
      {formatCurrency(item.price)}
    </p>
    
    <div className="flex gap-5 px-10 py-2 bg-[#ececdd] w-fit rounded-lg border border-[#d6d6c2]">
      <button
        type="button"
        onClick={() => decreaseQuantity(item.id)}
        disabled={disableDecreaseButton}
        className="disabled:opacity-20 hover:bg-[#d6d6c2] p-1 rounded transition-colors"
      >
        <MinusIcon className="h-6 w-6 text-[#5c4a38]" />
      </button>

      <p className="text-lg font-bold text-[#5c4a38]">
        {item.quantity}
      </p>

      <button
        type="button"
        onClick={() => increaseQuantity(item.id)}
        disabled={disableIncreaseButton}
        className="disabled:opacity-20 hover:bg-[#d6d6c2] p-1 rounded transition-colors"
      >
        <PlusIcon className="h-6 w-6 text-[#5c4a38]" />
      </button>
    </div>
    
    <p className="text-xl font-bold text-[#5c4a38]">
      Subtotal: {''}
      <span className="font-normal text-[#8a7968]">
        {formatCurrency(item.subtotal)}
      </span>
    </p>
  </div>
</div>

  )
}
