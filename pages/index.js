import Head from 'next/head'
import Banner from '../Components/Banner'
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import LargeCard from '../Components/LargeCard';
import MediumCard from '../Components/MediumCard';
import SmallCard from '../Components/SmallCard';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function Home({exploreData, cardData}) {
  return (
    <div>
      <Head>
        <title> Airbnb </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <menu className='max-w-7xl m-auto px-8 sm:px-16'>
        <section className='pt-6'>
          <h2 className=' text-4xl pb-6 font-semibold'>Explore Nearby
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {exploreData?.map( ({img, location, distance}) => (
              <SmallCard key={img} img={img} location={location} distance={distance} />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'> Live Anywhere </h2>

          <div className='flex overflow-scroll scrollbar-hide p-3 ml-3 space-x-3'>
            {cardData?.map( ({img, title}) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
         
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoor"
          description="Wishlists curated by Airbnb"
          buttonText="Get inspired" 
        />

      </menu>

      <Footer />
    </div>
  )
}


export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp")
                            .then(res => res.json());
                        
  const cardData = await fetch("https://links.papareact.com/zp1")
                            .then(res => res.json());
                          
  return {
    props: {
      exploreData,
      cardData
    }
  };
}