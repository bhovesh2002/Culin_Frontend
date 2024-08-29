"use client"
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {

    const [jwt, setJwt] = useState("");
    const [isJwtExpired, setIsJwtExpired] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const noNavbarPaths = ['/login', '/register'];


    useEffect(() => {
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            console.log("COOKIE FROM NAVBAR: ", value);
            const parts = value.split( `; ${name}=`);
            if(parts.length ==2) return parts.pop()?.split(';').shift();
            return null;
        }

        const token = getCookie('token');

        function parseJwt (token: string) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        
            return JSON.parse(jsonPayload);
        }

        function isTokenExpired(token: string): boolean {
            const parsedJwt = parseJwt(token);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return parsedJwt.exp < currentTime;
        }
        
        if(token){
            // const parsedJwt = parseJwt(token);
            // console.log("PARSED TOKEN: ", parsedJwt);
            console.log("TOKEN EXPIRY: ", isTokenExpired(token));
        }
        

        if(token && isTokenExpired(token)){
            document.cookie = "token=";
            // setJwt("");
            router.refresh();
            setIsJwtExpired(true);
        }else if(token && !isTokenExpired(token)){
            setJwt(token);
            setIsJwtExpired(false);
        }
    }, [setIsJwtExpired, router, setJwt])


    if(noNavbarPaths.includes(pathname)){
        return <></>
    }


    const loginAndRegisterButton = () => {
        return (
            <>
                <li>
                    <a href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                </li>
                <li>
                    <a href="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                </li>
            </>
        );
    }

    return(
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/CulinLogo.png" className="h-12" alt="Flowbite Logo" />
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Culin</span> */}
            </a>
            {/* <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button> */}
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                {jwt == "" || isJwtExpired ? loginAndRegisterButton() : <></>}
                {/* <li>
                <a href="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                </li>
                <li>
                <a href="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                </li> */}
                {/* <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
                </li>
                <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
                </li> */}
            </ul>
            </div>
        </div>
        </nav>
    )
};
