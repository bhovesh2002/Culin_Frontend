"use client"
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const getCookie = (name: string) => {
  //     const value = `; ${document.cookie}`;
  //     console.log("COOKIE: ", value);
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop()?.split(';').shift();
  //     return null;
  //   };

  //   const token = getCookie('token');

  //   if (token) {
  //     setJwt(token);
  //   } else {
  //     router.push('/login');
  //   }
  // }, [router]);

  // const logout = () => {
  //   document.cookie = 'token=; Max-Age=0; path=/';
  //   router.push('/login');
  // }

  // if (!jwt) return <p>Loading...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome to Culin!</h1>
      <p>A Price tracker application</p>
      <SearchBar />
    </main>
  );
};

export default Home;
