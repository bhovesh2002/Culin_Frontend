import { useEffect, useState } from "react";
import NotificationBellIcon from "./NotificationBellIcon";

type PropsType = {
  product: string;
  platforms: platformType | null;
};

type priceDetails = {
  price: string;
  productName: string;
};

type platformType = {
  [platform: string]: priceDetails;
};

export default function NotificationBell(props: PropsType) {
  const [jwt, setJwt] = useState<string | null>(null);
  const [data, setData] = useState<{ [key: string]: string }>({});
  const [tooltipContent, setTooltipContent] = useState("Register Product");

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const token = getCookie("token");

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
  }, [props.platforms]);

  const handleNotificationClick = async () => {
    const bodyData = {
      productName: props.product,
      data: data,
    };
    const response = await fetch("http://localhost:8080/register-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(bodyData),
    });
    if (response.ok) {
      setTooltipContent("Product Registered ✔️");
    } else {
      setTooltipContent("Registration failed");
    }

    // Reset tooltip after 3 seconds (optional)
    setTimeout(() => {
      setTooltipContent("Register Product");
    }, 3000);
  };

  if (!jwt || props.platforms == null) return <></>;

  return (
    <div className="group relative">
      <button
        onClick={handleNotificationClick}
        data-tooltip-target="tooltip-default"
        className="border-2 w-12 h-12 flex justify-center items-center rounded-md border-white hover:bg-slate-950 hover:border-[#EBD3F8]"
      >
        <NotificationBellIcon />
      </button>
      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute invisible group-hover:visible bg-gray-900 text-white text-sm px-3 py-2 rounded-md z-10 bottom-16 left-1/2 transform -translate-x-1/2 w-44"
      >
        {tooltipContent}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
}
