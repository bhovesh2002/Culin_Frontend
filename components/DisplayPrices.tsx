type priceDetails = {
    price: string;
    productName: string;
    url: string;
    rating: string;
}

type platformType = {
    [platform: string]: priceDetails;
}

type propsType = {
    platforms: platformType;
}

const DisplayPrices = ( props : propsType) => {

    const upDownSVG = () => {
        return (
            <a href="#">
                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                </svg>
            </a>
        )
    }
  
    return(
        <div>
            <div className="relative shadow-md sm:rounded-lg">
                <table className="max-w-56 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Site
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Product
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Rating
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                    Price
                                    {upDownSVG()}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(props.platforms).map((platform) => (
                            <tr key={platform} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{platform}</td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-lg overflow-hidden text-ellipsis truncate">
                                    <a target="_blank" href={props.platforms[platform].url}>{props.platforms[platform].productName}</a>
                                </th>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                                            {props.platforms[platform].rating || "N/A"}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{props.platforms[platform].price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )

}

export default DisplayPrices;