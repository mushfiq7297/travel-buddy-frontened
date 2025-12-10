

import HeroSection from "@/components/modules/Home/Hero";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel Buddy - Find Your Travel Partner</title>
        <meta
          name="description"
          content="Find Your Travel Partner and make your tour plan in one place"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HeroSection/>
      </main>
    </>
  );
}