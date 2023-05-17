import React from "react";
import Image from "next/image";

function ImageWrapper({ url }) {
    return (
        <div className="relative w-full bg-black border h-96 ">
            <Image
                src={url}
                alt="route image"
                layout="fill"
                objectFit="contain"
            />
        </div>
    );
}

export default ImageWrapper;
