"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="bg-[#5c4a38] text-white rounded-md hover:bg-[#5c4a38]/90 transition-colors w-full lg:w-auto text-xl px-10 py-3 text-center cursor-pointer font-bold"
    >Volver</button>

  )
}
