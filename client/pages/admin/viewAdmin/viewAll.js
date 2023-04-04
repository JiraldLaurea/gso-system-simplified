import Axios from "axios";
import React, { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import useSWR from "swr";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import DocViewer from "react-doc-viewer";
import fileDownload from "js-file-download";
import { useAuthDispatch } from "../../../context/auth";
import ViewButton from "../../../components/ViewButton";
import DownloadButton from "../../../components/DownloadButton";
import SubmissionDetail from "../../../components/SubmissionDetail";
import ImageWrapper from "../../../components/ImageWrapper";

function viewAll() {
    const router = useRouter();
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [isDropdownMenuOpen2, setIsDropdownMenuOpen2] = useState(false);
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [barangayId, setBarangayId] = useState(null);
    const [submissionBarangayProfileUrl, setSubmissionBarangayProfileUrl] =
        useState();
    const [loadingDownload, setLoadingDownload] = useState(false);
    const [sketchUrl, setSketchUrl] = useState(null);
    const [programsUrl, setProgramsUrl] = useState(null);
    const [fundingReqUrl, setFundingReqUrl] = useState(null);
    const [junkshopUrl, setJunkshopUrl] = useState(null);
    const [businessPermitUrl, setBusinessPermitUrl] = useState(null);
    const [executiveOrderUrl, setExecutiveOrderUrl] = useState(null);
    const [barangayOrdinanceUrl, setBarangayOrdinanceUrl] = useState(null);
    const [dateIssuedBusinessPermit, setDateIssuedBusinessPermit] =
        useState(null);
    const [dateIssuedExecutiveOrder, setDateIssuedExecutiveOrder] =
        useState(null);
    const [junkshopName, setJunkshopName] = useState(null);

    const [moaUrl, setMoaUrl] = useState(null);
    const [sketch, setSketch] = useState([]);
    const [collectionSchedule, setCollectionSchedule] = useState(null);
    const [dateOfCreation, setDateOfCreation] = useState(null);
    const [barangayYears, setBarangayYears] = useState([]);
    const [yearOfSubmission, setYearOfSubmission] =
        useState("Year of submission");
    const [documentExtensionSketch, setDocumentExtensionSketch] = useState("");
    const [documentExtensionPrograms, setDocumentExtensionPrograms] =
        useState("");
    const [documentExtensionFundingReq, setDocumentExtensionFundingReq] =
        useState("");
    const [documentExtensionMoa, setDocumentExtensionMoa] = useState("");
    const [documentExtensionJunkshop, setDocumentExtensionJunkshop] =
        useState("");
    const [
        documentExtensionBusinessPermit,
        setDocumentExtensionBusinessPermit,
    ] = useState("");
    const [
        documentExtensionExecutiveOrder,
        setDocumentExtensionExecutiveOrder,
    ] = useState("");
    const [
        documentExtensionBarangayOrdinance,
        setDocumentExtensionBarangayOrdinance,
    ] = useState("");

    const [imageListSketch, setImageListSketch] = useState([]);
    const [imageListPrograms, setImageListPrograms] = useState([]);
    const [imageListFundingReq, setImageListFundingReq] = useState([]);
    const [imageListMoa, setImageListMoa] = useState([]);
    const [imageListJunkshop, setImageListJunkshop] = useState([]);
    const [imageListBusinessPermit, setImageListBusinessPermit] = useState([]);
    const [imageListExecutiveOrder, setImageListExecutiveOrder] = useState([]);
    const [imageListBarangayOrdinance, setImageListBarangayOrdinance] =
        useState([]);

    const documentImageExtensions = ["png", "jpg", "jpeg"];
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch("CHANGE_TITLE", "View all");
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_PATH", "/admin/viewAdmin");
    }, []);

    console.log(barangayId);

    const { data: barangaysEncode } = useSWR(
        "http://localhost:3001/barangay/getAllBarangay"
    );

    console.log("BRGY ENCODE", barangaysEncode);

    const displayYearSubmitted = async () => {
        const data = {
            barangayId: barangayId,
        };

        await Axios.post(
            "http://localhost:3001/shortenedSubmission/getAllSubmission",
            data
        ).then((res) => {
            console.log("DISPLAY YEAR SUBMITTED", res);
            setBarangayYears(res.data);
        });
    };

    useEffect(() => {
        if (barangayId != null) {
            displayYearSubmitted();
        }
    }, [barangayId]);

    // console.log("BRGY ID", barangayId);
    // console.log("YEAR", yearOfSubmission);

    const view = async (e) => {
        const data = {
            barangayId: barangayId,
            yearSubmitted: yearOfSubmission,
        };

        await Axios.post(
            "http://localhost:3001/sketch/getUpdatedSketch",
            data
        ).then((res) => {
            if (res.data) {
                setImageListSketch(res.data);
            } else {
                setImageListSketch([]);
            }
        });

        await Axios.post(
            "http://localhost:3001/programs/getUpdatedPrograms",
            data
        ).then((res) => {
            if (res.data) {
                setImageListPrograms(res.data);
            } else {
                setImageListPrograms([]);
            }
        });

        await Axios.post(
            "http://localhost:3001/fundingReq/getUpdatedFundingReq",
            data
        ).then((res) => {
            if (res.data) {
                setImageListFundingReq(res.data);
            } else {
                setImageListFundingReq([]);
            }
        });

        await Axios.post("http://localhost:3001/moa/getUpdatedMoa", data).then(
            (res) => {
                if (res.data) {
                    setImageListMoa(res.data);
                } else {
                    setImageListMoa([]);
                }
            }
        );

        await Axios.post(
            "http://localhost:3001/junkshop/getUpdatedJunkshop",
            data
        ).then((res) => {
            if (res.data) {
                setImageListJunkshop(res.data);
            } else {
                setImageListJunkshop([]);
            }
        });

        await Axios.post(
            "http://localhost:3001/businessPermit/getUpdatedBusinessPermit",
            data
        ).then((res) => {
            if (res.data) {
                setImageListBusinessPermit(res.data);
            } else {
                setImageListBusinessPermit([]);
            }
        });

        await Axios.post(
            "http://localhost:3001/executiveOrder/getUpdatedExecutiveOrder",
            data
        ).then((res) => {
            if (res.data) {
                setImageListExecutiveOrder(res.data);
            } else {
                setImageListExecutiveOrder([]);
            }
        });

        await Axios.post(
            "http://localhost:3001/barangayOrdinance/getUpdatedBarangayOrdinance",
            data
        ).then((res) => {
            if (res.data) {
                setImageListBarangayOrdinance(res.data);
            } else {
                setImageListBarangayOrdinance([]);
            }
        });
    };

    const downloadSketch = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/sketch/getUpdatedSketch",
                data
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.sketchUrl,
                        },
                    }).then((res) => {
                        fileDownload(res.data, documentName);
                        setLoadingDownload(false);
                    });
                });
            });
        }
    };

    const downloadPrograms = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/programs/getUpdatedPrograms",
                data
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.programsUrl,
                        },
                    }).then((res) => {
                        fileDownload(res.data, documentName);
                        setLoadingDownload(false);
                    });
                });
            });
        }
    };

    const downloadFundingReq = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/fundingReq/getUpdatedFundingReq",
                data
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.fundingReqUrl,
                        },
                    }).then((res) => {
                        fileDownload(res.data, documentName);
                        setLoadingDownload(false);
                    });
                });
            });
        }
    };

    const downloadMoa = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/moa/getUpdatedMoa",
                data
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.memorandumOfAgreementUrl,
                        },
                    }).then((res) => {
                        fileDownload(res.data, documentName);
                        setLoadingDownload(false);
                    });
                });
            });
        }
    };

    const downloadJunkshop = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/junkshop/getUpdatedJunkshop",
                data
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

    const downloadBusinessPermit = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/businessPermit/getUpdatedBusinessPermit",
                data
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.businessPermitUrl,
                        },
                    }).then((res) => {
                        fileDownload(res.data, documentName);
                        setLoadingDownload(false);
                    });
                });
            });
        }
    };

    const downloadExecutiveOrder = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/executiveOrder/getUpdatedExecutiveOrder",
                data
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.executiveOrderUrl,
                        },
                    }).then((res) => {
                        fileDownload(res.data, documentName);
                        setLoadingDownload(false);
                    });
                });
            });
        }
    };

    const downloadBarangayOrdinance = async () => {
        if (!loadingDownload) {
            setLoadingDownload(true);

            const data = {
                barangayId: barangayId,
                yearSubmitted: yearOfSubmission,
            };

            await Axios.post(
                "http://localhost:3001/barangayOrdinance/getUpdatedBarangayOrdinance",
                data
            ).then((res) => {
                res.data.map((res) => {
                    const documentName = res.documentName;

                    Axios({
                        url: "http://localhost:3001/download",
                        method: "POST",
                        responseType: "blob",
                        data: {
                            submissionUrl: res.barangayOrdinanceUrl,
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
                <div className="flex flex-col md:flex-row md:items-end">
                    <div>
                        <p className="mb-1 text-sm text-gray-600">
                            Barangay and district
                        </p>
                        <div className="relative">
                            <ClickAwayListener
                                onClickAway={() => setIsDropdownMenuOpen(false)}
                                className="relative"
                            >
                                <div className="select-none w-fit">
                                    <div
                                        onClick={() =>
                                            setIsDropdownMenuOpen(
                                                !isDropdownMenuOpen
                                            )
                                        }
                                        className={`flex items-center justify-between w-56 px-3 py-2 border cursor-pointer`}
                                    >
                                        <p
                                            className={`${
                                                dropdownMenuValueBarangay ==
                                                    "Barangay" &&
                                                dropdownMenuValueDistrict ==
                                                    "District" &&
                                                "text-gray-400"
                                            }`}
                                        >
                                            {dropdownMenuValueBarangay}
                                            &nbsp;-&nbsp;
                                            {dropdownMenuValueDistrict}
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
                                    {isDropdownMenuOpen && (
                                        <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[42px] w-56 dark:bg-gray-700 shadow-lg">
                                            <ul className="text-gray-700 bg-white">
                                                {barangaysEncode.map(
                                                    (barangay, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                onClick={() => {
                                                                    setYearOfSubmission(
                                                                        "Year of submission"
                                                                    );
                                                                    setDropdownMenuValueBarangay(
                                                                        barangay.barangayName
                                                                    );
                                                                    setDropdownMenuValueDistrict(
                                                                        barangay.districtName
                                                                    );
                                                                    setBarangayId(
                                                                        barangay.id
                                                                    );
                                                                    setIsDropdownMenuOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <a
                                                                    href="#"
                                                                    className="block px-3 py-2 hover:bg-gray-100"
                                                                >
                                                                    {
                                                                        barangay.barangayName
                                                                    }
                                                                    &nbsp; -
                                                                    &nbsp;
                                                                    {
                                                                        barangay.districtName
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
                    <div className="my-4 md:ml-4 md:my-0">
                        <p className="mb-1 text-sm text-gray-600">
                            Year of submission
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
                                                {barangayYears.map(
                                                    (barangayYear, index) => {
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

                    {dropdownMenuValueBarangay != "Barangay" &&
                        yearOfSubmission != "Year of submission" && (
                            <>
                                <ViewButton view={view} />
                            </>
                        )}
                </div>
                <div className="mt-4">
                    {/* {submissionBarangayProfileUrl && (
                        <>
                            <SubmissionDetail
                                title="Barangay profile"
                                editSelectedBarangay={editSelectedBarangay}
                                isBarangayProfile
                                firstChild
                                download={downloadBarangayProfile}
                                loadingDownload={loadingDownload}
                            />
                            <iframe
                                className="w-full h-[800px]"
                                src={`${submissionBarangayProfileUrl}`}
                            ></iframe>
                        </>
                    )} */}

                    {imageListSketch.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Sketch"
                                detailTitle="Collection schedule"
                                detail={imageListSketch[0].collectionSchedule}
                                hasDetail
                                download={downloadSketch}
                                loadingDownload={loadingDownload}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                {imageListSketch.map((image) => {
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
                                                    url={image.sketchUrl}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            {imageListSketch[0].documentName.split(".").pop() ==
                                "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListSketch[0].sketchUrl}`}
                                ></iframe>
                            )}
                            {imageListSketch[0].documentName.split(".").pop() ==
                                "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListSketch[0].sketchUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}
                    {imageListPrograms.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Programs"
                                download={downloadPrograms}
                                loadingDownload={loadingDownload}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {imageListPrograms.map((image) => {
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
                                                    url={image.programsUrl}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            {imageListPrograms[0].documentName
                                .split(".")
                                .pop() == "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListPrograms[0].programsUrl}`}
                                ></iframe>
                            )}
                            {imageListPrograms[0].documentName
                                .split(".")
                                .pop() == "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListPrograms[0].programsUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}
                    {imageListFundingReq.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Funding requirement"
                                download={downloadFundingReq}
                                loadingDownload={loadingDownload}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {imageListFundingReq.map((image) => {
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
                                                    url={image.fundingReqUrl}
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            {imageListFundingReq[0].documentName
                                .split(".")
                                .pop() == "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListFundingReq[0].fundingReqUrl}`}
                                ></iframe>
                            )}
                            {imageListFundingReq[0].documentName
                                .split(".")
                                .pop() == "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListFundingReq[0].fundingReqUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}

                    {imageListMoa.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Memorandum of agreement"
                                detailTitle="Date issued"
                                detail={imageListMoa[0].dateOfCreation}
                                hasDetail
                                download={downloadMoa}
                                loadingDownload={loadingDownload}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {imageListMoa.map((image) => {
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
                                                    url={
                                                        image.memorandumOfAgreementUrl
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            {imageListMoa[0].documentName.split(".").pop() ==
                                "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListMoa[0].memorandumOfAgreementUrl}`}
                                ></iframe>
                            )}
                            {imageListMoa[0].documentName.split(".").pop() ==
                                "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListMoa[0].memorandumOfAgreementUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}

                    {imageListJunkshop.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Junkshop"
                                detailTitle="Name of junkshop"
                                detail={imageListJunkshop[0].junkshopName}
                                hasDetail
                                download={downloadJunkshop}
                                loadingDownload={loadingDownload}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {imageListJunkshop.map((image) => {
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
                            {imageListJunkshop[0].documentName
                                .split(".")
                                .pop() == "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListJunkshop[0].junkshopUrl}`}
                                ></iframe>
                            )}
                            {imageListJunkshop[0].documentName
                                .split(".")
                                .pop() == "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListJunkshop[0].junkshopUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}

                    {imageListBusinessPermit.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Business permit"
                                detailTitle="Date issued"
                                detail={imageListBusinessPermit[0].dateIssued}
                                hasDetail
                                download={downloadBusinessPermit}
                                loadingDownload={loadingDownload}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                {imageListBusinessPermit.map((image) => {
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
                                                    url={
                                                        image.businessPermitUrl
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            {imageListBusinessPermit[0].documentName
                                .split(".")
                                .pop() == "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListBusinessPermit[0].businessPermitUrl}`}
                                ></iframe>
                            )}
                            {imageListBusinessPermit[0].documentName
                                .split(".")
                                .pop() == "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListBusinessPermit[0].businessPermitUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}

                    {imageListExecutiveOrder.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Executive order"
                                detailTitle="Executive order number"
                                detail={
                                    imageListExecutiveOrder[0].executiveOrderNo
                                }
                                detailTitle2="Date issued"
                                detail2={imageListExecutiveOrder[0].dateIssued}
                                hasDetail
                                hasDetail2
                                download={downloadExecutiveOrder}
                                loadingDownload={loadingDownload}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                {imageListExecutiveOrder.map((image) => {
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
                                                    url={
                                                        image.executiveOrderUrl
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            {imageListExecutiveOrder[0].documentName
                                .split(".")
                                .pop() == "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListExecutiveOrder[0].executiveOrderUrl}`}
                                ></iframe>
                            )}
                            {imageListExecutiveOrder[0].documentName
                                .split(".")
                                .pop() == "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListExecutiveOrder[0].executiveOrderUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}

                    {imageListBarangayOrdinance.length != 0 && (
                        <>
                            <SubmissionDetail
                                title="Barangay ordinance"
                                detailTitle="Barangay ordinance number"
                                detail={
                                    imageListBarangayOrdinance[0]
                                        .barangayOrdinanceNo
                                }
                                hasDetail
                                download={downloadBarangayOrdinance}
                                loadingDownload={loadingDownload}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                {imageListBarangayOrdinance.map((image) => {
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
                                                    url={
                                                        image.barangayOrdinanceUrl
                                                    }
                                                />
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                            {imageListBarangayOrdinance[0].documentName
                                .split(".")
                                .pop() == "pdf" && (
                                <iframe
                                    className="w-full h-[800px]"
                                    src={`${imageListBarangayOrdinance[0].barangayOrdinanceUrl}`}
                                ></iframe>
                            )}
                            {imageListBarangayOrdinance[0].documentName
                                .split(".")
                                .pop() == "docx" && (
                                <iframe
                                    className="w-full h-[800px] border-r border-b hover:border-r-blue-500 hover:border-b-blue-500"
                                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${imageListBarangayOrdinance[0].barangayOrdinanceUrl}`}
                                ></iframe>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default viewAll;
