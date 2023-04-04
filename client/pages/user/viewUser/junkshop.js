import Axios from "axios";
import React, { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import useSWR from "swr";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import fileDownload from "js-file-download";
import { useAuthDispatch } from "../../../context/auth";
import ViewButton from "../../../components/ViewButton";
import DownloadButton from "../../../components/DownloadButton";
import ImageWrapper from "../../../components/ImageWrapper";
import SubmissionDetail from "../../../components/SubmissionDetail";

function junkshop() {
    const router = useRouter();
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [barangayId, setBarangayId] = useState(null);
    const [junkshopUrl, setJunkshopUrl] = useState(null);
    const [junkshopName, setJunkshopName] = useState(null);
    const [isDropdownMenuOpen2, setIsDropdownMenuOpen2] = useState(false);
    const [yearOfSubmission, setYearOfSubmission] =
        useState("Year of submission");
    const [barangayYears, setBarangayYears] = useState([]);
    const [documentExtension, setDocumentExtension] = useState("");
    const documentImageExtensions = ["png", "jpg", "jpeg"];
    const [loadingDownload, setLoadingDownload] = useState(false);
    const dispatch = useAuthDispatch();

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        dispatch("CHANGE_TITLE", "Junkshop");
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_PATH", "/user/viewUser");
    }, []);

    const { data } = useSWR(
        "http://localhost:3001/junkshop/getAllUpdatedUserJunkshopYearSubmitted"
    );

    const view = async (e) => {
        const data = {
            yearOfSubmission: yearOfSubmission,
        };

        await Axios.post(
            "http://localhost:3001/junkshop/getUpdatedUserJunkshopUrl",
            data
        ).then((res) => {
            setImageList(res.data);
        });
    };

    const download = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const dataYearOfSubmission = {
                yearOfSubmission: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/junkshop/getUpdatedUserJunkshopUrl",
                dataYearOfSubmission
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.junkshopUrl,
                        },
                    }).then((res) => {
                        fileDownload(res.data, documentName);
                        setLoadingDownload(false);
                    });
                });
            });
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="p-4 md:p-8">
                <div>
                    <div className="flex flex-col md:flex-row md:items-end">
                        <div>
                            <p className="mb-1 text-sm text-gray-600">
                                Select year of submission
                            </p>
                            <div className="relative">
                                <ClickAwayListener
                                    onClickAway={() =>
                                        setIsDropdownMenuOpen2(false)
                                    }
                                    className="relative"
                                >
                                    <div className="select-none w-fit">
                                        <div
                                            onClick={() =>
                                                setIsDropdownMenuOpen2(
                                                    !isDropdownMenuOpen2
                                                )
                                            }
                                            className={`flex items-center justify-between w-56 px-3 py-2 border cursor-pointer`}
                                        >
                                            <p
                                                className={`${
                                                    yearOfSubmission ==
                                                        "Year of submission" &&
                                                    "text-gray-400"
                                                }`}
                                            >
                                                {yearOfSubmission}
                                            </p>
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </div>
                                        {isDropdownMenuOpen2 && (
                                            <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[42px] w-56 dark:bg-gray-700 shadow-lg">
                                                <ul className="text-gray-700 bg-white">
                                                    {data.map(
                                                        (
                                                            barangayYear,
                                                            index
                                                        ) => {
                                                            return (
                                                                <li
                                                                    key={index}
                                                                    onClick={() => {
                                                                        setYearOfSubmission(
                                                                            barangayYear.yearSubmitted
                                                                        );
                                                                        setIsDropdownMenuOpen2(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    <a
                                                                        href="#"
                                                                        className="block px-3 py-2 hover:bg-gray-100"
                                                                    >
                                                                        {
                                                                            barangayYear.yearSubmitted
                                                                        }
                                                                    </a>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </div>

                        {yearOfSubmission != "Year of submission" && (
                            <>
                                <ViewButton view={view} />
                                <DownloadButton
                                    download={download}
                                    loadingDownload={loadingDownload}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className="mt-4">
                    {imageList.length != 0 && (
                        <>
                            {!documentImageExtensions.includes(
                                imageList[0].documentName.split(".").pop()
                            ) && (
                                <SubmissionDetail
                                    detailTitle="Collection schedule"
                                    detail={imageList[0].junkshopName}
                                    hasDetail
                                    firstChild
                                    hasNoTitle
                                />
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                {imageList.map((image) => {
                                    const extension = image.documentName
                                        .split(".")
                                        .pop();
                                    if (
                                        documentImageExtensions.includes(
                                            extension
                                        )
                                    ) {
                                        return (
                                            <div key={image.id}>
                                                <ImageWrapper
                                                    url={image.junkshopUrl}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>

                            {imageList[0].documentName.split(".").pop() ==
                                "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageList[0].junkshopUrl}`}
                                ></iframe>
                            )}
                            {imageList[0].documentName.split(".").pop() ==
                                "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageList[0].junkshopUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default junkshop;
