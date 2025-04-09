"use client"

import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload({ image }: { image: string | undefined }) {
    const [imageUrl, setImageUrl] = useState('')
    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
        // @ts-expect-error: Se espera que result.info pueda ser undefined, por lo que usamos el operador ?. para manejar este caso.
        setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset="ZairaAyala"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imagen producto</label>
                        <div className="relative cursor-pointer hover:opacity-70 transition 
                    p-10 border-neutral-300 flex flex-col justify-center items-center 
                    gap-4 text-neutral-600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Agregar imagen</p>
                            {imageUrl && (
                                <div
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Imagen de producto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {image && !imageUrl && ( //tiene que haber una imagen pero no una imagen actual
                        <div className="space-y-2 ">
                            <label>Imagen actual</label>
                            <div className="relative w-64 h-64">
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen producto"
                                    style={{objectFit: 'contain'}}
                                />
                            </div>
                        </div>
                    )}
                    <input
                        type="hidden"
                        name="image"
                        defaultValue={imageUrl ? imageUrl : image}  //priorizamos las imagenes actuales
                    />
                </>
            )}
        </CldUploadWidget>
    )
}

