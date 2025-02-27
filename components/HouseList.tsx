"use client"

import Link from "next/link"
import Image from "next/image"
import { houses } from "@/data/houses"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import type { House } from "@/types"

const HouseList = () => {
  const t = useTranslations("house")
  const params = useParams()
  const locale = (params.locale as string) || "en"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {houses.map((house: House) => (
        <div key={house.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative w-full h-48">
            <Image
              src={house.images && house.images.length > 0 ? house.images[0] : "/placeholder.svg"}
              alt={house.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{house.name}</h2>
            <p className="text-gray-600 mb-2">
              {t("price")}: {house.price}
            </p>
            <p className="text-gray-600 mb-2">
              {t("address")}: {house.address}
            </p>
            <p className="text-gray-600 mb-4">
              {typeof house.description === "string"
                ? house.description
                : house.description[locale as keyof typeof house.description] || house.description.en}
            </p>
            <Link
              href={`/${locale}/house/${house.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {t("viewDetails")}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HouseList

