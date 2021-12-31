import Image from "next/image";
import {GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, UsersIcon} from "@heroicons/react/solid"
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';


export default function Header({placeholder}) {

    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);

    const router = useRouter();

    const search = () => {
        router.push( {
            pathname: "/search",
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                noOfGuests
            }
        });
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection"
    }

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate),
        setEndDate(ranges.selection.endDate)
    }

    const resetInput = () => {
        setSearchInput("");
    }

    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
            {/* left part */}
            <div onClick={() => router.push("/")} className="relative flex item-center h-10 cursor-pointer my-auto">
                <Image src="https://links.papareact.com/qd3" layout="fill" 
                       objectFit="contain"
                       objectPosition="left"
                />
            </div>

            {/* middle part */}
            <div className="flex rounded-full border-2 py-2 items-center">
                <input className="outline-none bg-transparent pl-5 flex-grow text-sm text-gray-600" type="text" placeholder={placeholder || 'Start your Search...'}
                    value={searchInput} onChange={ (e) => setSearchInput(e.target.value)} />
                <SearchIcon className="hidden lg:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
            </div>

            {/* Right part */}
            <div className="flex items-center justify-end space-x-6 text-gray-500">
                <p className="hidden lg:inline cursor-pointer">Become a host</p>
                <GlobeAltIcon className="h-6 cursor-pointer"/>

                <div className="flex border-2 rounded-full p-2">
                    <MenuIcon className="h-6 cursor-pointer" />
                    <UserCircleIcon className="h-6 cursor-pointer" />
                </div>
            </div>

            { searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    minDate={new Date()}
                    rangeColors={["#FD5B61"]} />
                
                    <div className="flex items-center border-b mb-4">
                        <h2 className="flex-grow font-semibold text-2xl"> Number of Guests</h2>
                        <UsersIcon className="h-5" />
                        <input type="number" 
                            value={noOfGuests}
                            min={1}
                            onChange={ (e) => setNoOfGuests(e.target.value)}
                            className="w-12 pl-2 outline-none text-lg text-red-400" />
                    </div>

                    <div className="flex">
                        <button onClick={resetInput} className="flex-grow cursor-pointer text-gray-600"> Cancel </button>
                        <button onClick={search} className="flex-grow cursor-pointer text-red-400"> Search</button>
                    </div>
                </div> 
            )}
        </header>
    )
}
