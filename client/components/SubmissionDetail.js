import React from "react";
import DownloadButton from "./DownloadButton";
import EditButton from "./EditButton";

function SubmissionDetail({
    title,
    detailTitle,
    detail,
    detailTitle2,
    detail2,
    hasDetail,
    hasDetail2,
    firstChild,
    hasNoTitle,
    hasNoTitle2,
    editSelectedBarangay,
    isBarangayProfile,
    download,
    loadingDownload,
}) {
    return (
        <div
            className={`border border-b-0 border-gray-300 bg-gray-50 ${
                firstChild ? "mt-0" : "mt-4"
            }`}
        >
            {!hasNoTitle && (
                <div className="flex flex-col justify-between p-4 md:flex-row md:items-center">
                    <p
                        className={`md:text-lg font-semibold ${
                            hasDetail && ""
                        }`}
                    >
                        {title}
                    </p>
                    <div className="flex items-center mt-4 space-x-4 md:mt-0">
                        {isBarangayProfile && (
                            <EditButton
                                editSelectedBarangay={editSelectedBarangay}
                            />
                        )}
                        <DownloadButton
                            download={download}
                            loadingDownload={loadingDownload}
                        />
                    </div>
                </div>
            )}
            {hasDetail && (
                <div
                    className={`flex items-center p-4 border-t border-gray-300 ${
                        hasNoTitle && "border-t-0"
                    }`}
                >
                    <p className="mr-4 text-gray-500">{detailTitle}</p>
                    <p className="font-medium">{detail}</p>
                </div>
            )}
            {hasDetail2 && (
                <div
                    className={`flex items-center p-4 border-t border-gray-300 ${
                        hasNoTitle2 && "border-t-0"
                    }`}
                >
                    <p className="mr-4 text-gray-500">{detailTitle2}</p>
                    <p className="font-medium">{detail2}</p>
                </div>
            )}
        </div>
    );
}

export default SubmissionDetail;
