'use client'
import { useState } from "react";
import DisplayPrices from "./DisplayPrices";
import SearchButton from "./SearchButton";
import NotificationBell from "./NotificationBell";

type priceDetails = {
    price: string;
    productName: string;
    url: string;
    rating: string;
}

type Data = {
    [platform: string]: priceDetails;
}

export default function SearchBar() {

    const [product, setProduct] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [numberOfResult, setNumberOfResult] = useState(0);
    const [platforms, setPlatforms] = useState<Data | null>(null);

    //get the results from SearchButton
    const handleSearch = async (data: Data) => {
        setPlatforms(data);
        setNumberOfResult(Object.keys(data).length);
        setSearchQuery(product);
    }

    return(
        <div>
            <div className='max-w-md mx-auto flex justify-center items-center space-x-8'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="relative flex items-center w-96 h-14 rounded-lg focus-within:shadow-lg bg-slate-950 overflow-hidden border border-slate-600">
                        <input
                        className="peer h-full w-full pl-2 bg-slate-900 outline-none bg-slate-950 focus:bg-slate-900 hover:bg-slate-900 text-sm text-white-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="Search something.."
                        value={product}
                        onChange={(e) => setProduct(e.target.value)} /> 

                        <div>
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <SearchButton product={product} findProductPrice={handleSearch} />
                            </div>
                        </div>
                    </div>
                </form>
                <NotificationBell product={product} platforms={platforms} />
            </div>

            
            <br />
            <br />
            {searchQuery && 
                <div className="flex justify-between px-6">
                    <p>Search result for {searchQuery}: </p>
                    <p>{numberOfResult} found</p>
                </div>
            }
            <br />
            
            {platforms && <DisplayPrices platforms = {platforms} /> }
        </div>
    );
};
