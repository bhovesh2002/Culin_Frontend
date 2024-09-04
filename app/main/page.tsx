"use client"
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

const Home = () => {
  const [jwt, setJwt] = useState<string | null>(null);

  return (
    <main className="flex  flex-col items-center p-24">
      <h1>Welcome to Culin!</h1>
      <p>A Price tracker application</p>
      <SearchBar />
    </main>
  );
};

export default Home;
