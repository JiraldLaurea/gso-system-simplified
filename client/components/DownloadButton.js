import React from "react";
import { Icon } from "@iconify/react";

function DownloadButton({ download, loadingDownload }) {
    return (
        <button
            onClick={download}
            className={`px-4 flex rounded-sm hover:bg-blue-600 transition-colors items-center justify-center md:justify-start py-2 md:ml-4 h-[42px] text-white bg-blue-500 border border-blue-500 select-none ${
                loadingDownload && "cursor-not-allowed"
            }`}
        >
            {!loadingDownload ? (
                <>
                    <Icon
                        className="w-6 h-6 mr-2"
                        icon="ic:baseline-download"
                    />
                    Download
                </>
            ) : (
                <>
                    <Icon icon="eos-icons:loading" className="w-6 h-6 mr-2" />
                    Processing...
                </>
            )}
        </button>
    );
}

export default DownloadButton;
