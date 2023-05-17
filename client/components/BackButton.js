import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

function BackButton({ path, title }) {
    const router = useRouter();

    return (
        <div className="flex items-center mb-8">
            <Icon
                onClick={() => router.push(path)}
                icon="bx:arrow-back"
                className="p-1 mr-2 border rounded-full cursor-pointer w-9 h-9"
            />
            <h2 className="text-xl font-semibold ">{title}</h2>
        </div>
    );
}

export default BackButton;
