import React from "react";
import { Icon } from "@iconify/react";

function ViewButton({ view }) {
    return (
        <button
            onClick={() => {
                view();
            }}
            className="px-4 rounded-sm hover:border-blue-500 flex items-center justify-center md:justify-start py-2 md:ml-4 h-[42px] text-blue-600 border select-none"
        >
            <Icon className="w-6 h-6 mr-2" icon="ic:baseline-remove-red-eye" />
            View
        </button>
    );
}

export default ViewButton;
