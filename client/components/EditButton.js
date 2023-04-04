import React from "react";
import { Icon } from "@iconify/react";

function EditButton({ editSelectedBarangay }) {
    return (
        <button
            onClick={editSelectedBarangay}
            className="flex items-center justify-center px-4 py-2 text-blue-600 border rounded-sm select-none md:justify-start hover:border-blue-500 md:my-0 md:ml-4"
        >
            <Icon className="w-6 h-6 mr-2" icon="ic:baseline-edit" />
            Edit
        </button>
    );
}

export default EditButton;
