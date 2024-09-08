"use client"
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

const Home = () => {
  const [jwt, setJwt] = useState<string | null>(null);

  return (
    <main className="flex  flex-col items-center p-24">
      <img
          alt="Your Company"
          src="/CulinLogo.png"
          className="mx-auto h-16 w-auto"
        />
      <p className="text-3xl">A Price tracker application</p>
      <br />
      <br />

      <SearchBar />
    </main>
  );
};

export default Home;
