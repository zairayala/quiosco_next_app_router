import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center mt-5">
        <div className="relative w-80 h-50">
            <Image
                fill
                alt="Logotipo Fresh Coffee"
                src='/logo.jpg'
             />
        </div>
    </div>
  )
}
