// 'use server'

export async function searchPrice( productName:String ) {

    if(!productName) return;

    try{
        const response = await fetch(`http://localhost:8080/scrape?product=${productName}`);
        if(!response.ok){
            throw new Error(`Error: ${response}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.log("Error while fetching: ", error);
        return error;
    }
    

    // const data = {
    //     amazon: {
    //       'price': '23,900.',
    //       productName: 'Oppo F25 Pro 5G (Coral Purple, 8GB RAM, 128GB Storage) | without Offers'
    //     },
    //     flipkart: {
    //       'price': '1,399',
    //       productName: 'OPPO Enco Buds 2 with 28 hours Battery life & Deep Noise Cancellation Bluetooth HeadsetÂ Â (Midnight, True Wireless)'
    //     },
    //     myntra: {
    //       'price': '499',
    //       productName: 'Karwan Oppo F25 Pro Mobile Cover'
    //     }
    //   }

    //   setTimeout(() => {},5000);
    // return data;

}