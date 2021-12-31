import { HeartIcon, StarIcon } from "@heroicons/react/outline"
import Image from "next/image"

function InfoCard({img, location, title, description, star, price, total}) {
    return (
        <div className="flex py-7 px-2 border-b cursor-pointer hover:shadow-lg hover:opacity-80 first:border-t">
            <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                <Image src={img} layout="fill" objectFit="cover" />
            </div>

            <div className="flex flex-col flex-grow pl-5">
                <div className="flex justify-between">
                    <p>{location}</p>
                    <HeartIcon className=" cursor-pointer h-7" />
                </div>

                <h4 className="text-xl">{title}</h4>

                <div className="border-b w-10 pt-2" />

                <p className="text-gray-500 pt-2 text-sm flex-grow">{description}</p>

                <div className="flex justify-between pt-5">
                    <p className="flex items-center">
                        <StarIcon className="h-5 text-red-500"/>
                        {star}
                    </p>

                    <div>
                        <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
                        <p className="text-right font-extralight">{total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
