import Footer from "./Components/Footer"
import Header from "./Components/Header"
import { useRouter } from 'next/router';
import { format } from "date-fns";
import InfoCard from "./Components/InfoCard";
import Map from "./Components/Map";

export async function getServerSideProps() {
    const searchResults = await fetch("https://links.papareact.com/isz")
                                .then(res => res.json());

    return {
        props: {
            searchResults
        }
    }
}

function Search({searchResults}) {

    const router = useRouter();
    const {location, startDate, endDate, noOfGuests} = router.query;
    const formatedStartDate = format(new Date(startDate), "dd MMM yy");
    const formatedEndDate = format(new Date(endDate), "dd MMM yy");
    
    const range = `${formatedStartDate}-${formatedEndDate}`

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

            <menu className="flex flex-col md:flex-row">
                <section className="flex-grow pt-14 px-6">
                    <p className="text-xs"> 300+ Stays -- {range} -- {noOfGuests} guests </p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location} </h1>

                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-500 whitespace-nowrap">
                        <p className="button"> Cancellation Flexibility</p>
                        <p className="button"> Type of Place </p>
                        <p className="button"> Price </p>
                        <p className="button"> Rooms and Beds </p>
                        <p className="button"> More filters </p>
                    </div>

                    <div className="flex flex-col">
                        {
                            searchResults?.map( ({img, location, title, description,
                            star, price, total}) => (
                                <InfoCard
                                    key={img} 
                                    img={img}
                                    location={location}
                                    title={title}
                                    description={description}
                                    star={star}
                                    price={price}
                                    total={total}
                                />
                            ))
                        }
                    </div>
                </section>

                <section className="min-w-[600px]">
                    <Map searchResults={searchResults} />
                </section>
                
            </menu>

            <Footer />
        </div>
    )
}

export default Search