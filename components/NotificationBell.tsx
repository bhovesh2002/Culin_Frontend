import { useRouter } from "next/router";
import { platform } from "os";
import { useEffect, useState } from "react";
import NotificationBellIcon from "./NotificationBellIcon";

type PropsType = {
    product: string;
    platforms: platformType | null;
}

type priceDetails = {
    price: string;
    productName: string;
}

type platformType = {
    [platform: string]: priceDetails;
}

export default function NotificationBell(props: PropsType){

    const [jwt, setJwt] = useState<string | null>(null);
    const [data, setData] = useState<{ [key: string]: string }>({});
  
    useEffect(() => {
        console.log("PLATFORMS: ", props.platforms);
        const getCookie = (name: string) => {
            const value = `; ${document.cookie}`;
            console.log("COOKIE: ", value);
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift();
            return null;
        };

        const token = getCookie('token');
  
        if (token) {
            setJwt(token);
        }

        if (props.platforms) {
            const newData: { [key: string]: string } = {};
            Object.keys(props.platforms).forEach((platform) => {
                newData[`${platform}`] = props.platforms![platform].price;
            });
            setData(newData);
        }
    },[props.platforms]);

    const handleNotificationClick = async () => {
        const bodyData = {
            productName: props.product,
            data:data
        };
        const response = await fetch('http://localhost:8080/register-product',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(bodyData),
        });
        if(response.ok){
            console.log("REGISTERED!!!");
        }else{
            console.log("REGISTRATION FAILED :(");
        }
    }

    if (!jwt || (props.platforms == null)) return <></>;

    return(
        <div>
            <button onClick={handleNotificationClick} className=" border-2 w-12 h-12 flex justify-center items-center rounded-md border-white hover:bg-slate-950 hover:border-[#EBD3F8]">
                <NotificationBellIcon />
            </button>
        </div>
    )
}