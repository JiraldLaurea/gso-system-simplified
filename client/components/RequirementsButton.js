import React from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

function requirementsButton({
    requirement,
    path,
    requirementName,
    isAdmin,
    iconStyle,
}) {
    const router = useRouter();

    return (
        <div
            onClick={() => {
                if (requirement || isAdmin) {
                    router.push(path);
                }
            }}
            className={`flex items-center select-none w-full px-4 py-4 text-center border border-gray-300 rounded-sm cursor-pointer ${
                !requirement && !isAdmin
                    ? "bg-gray-300 border-gray-300 text-gray-500 hover:cursor-not-allowed"
                    : "hover:border-blue-500"
            }`}
        >
            <Icon icon={iconStyle} className="w-6 h-6 mr-2 text-slate-600" />
            <p className="text-sm">{requirementName}</p>
        </div>
    );
}

export default requirementsButton;
