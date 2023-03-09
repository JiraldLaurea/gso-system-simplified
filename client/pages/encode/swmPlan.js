import { Icon } from "@iconify/react";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import useSWR from "swr";
import { useAuthDispatch } from "../../context/auth";

function barangayProfile({ savedData }) {
    const router = useRouter();
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [barangayId, setBarangayId] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useAuthDispatch();
    const date = new Date();
    const [yearSubmitted, setYearSubmitted] = useState(date.getFullYear());
    const [totalPopulation, setTotalPopulation] = useState(0);
    const formRef = useRef();
    const inputFileRefSketch = useRef();
    const inputFileRefPrograms = useRef();
    const inputFileRefFundingReq = useRef();
    const inputFileRefMoa = useRef();
    const inputFileRefJunkshop = useRef();
    const inputFileRefBusinessPermit = useRef();
    const inputFileRefExecutiveOrder = useRef();
    const inputFileRefBarangayOrdinance = useRef();
    const [collectionSchedule, setCollectionSchedule] = useState("");
    const [dateOfCreation, setDateOfCreation] = useState("");
    const [junkshopName, setJunkshopName] = useState("");
    const [dateIssuedBusinessPermit, setDateIssuedBusinessPermit] =
        useState("");
    const [executiveOrderNo, setExecutiveOrderNo] = useState("");
    const [dateIssuedExecutiveOrder, setDateIssuedExecutiveOrder] =
        useState("");
    const [barangayOrdinanceNo, setBarangayOrdinanceNo] = useState("");
    const { data: user } = useSWR("http://localhost:3001/user/me");
    const [imageSrcSketch, setImageSrcSketch] = useState([]);
    const [imageSrcPrograms, setImageSrcPrograms] = useState([]);
    const [imageSrcFundingReq, setImageSrcFundingReq] = useState([]);
    const [imageSrcMoa, setImageSrcMoa] = useState([]);
    const [imageSrcJunkshop, setImageSrcJunkshop] = useState([]);
    const [imageSrcBusinessPermit, setImageSrcBusinessPermit] = useState([]);
    const [imageSrcExecutiveOrder, setImageSrcExecutiveOrder] = useState([]);
    const [imageSrcBarangayOrdinance, setImageSrcBarangayOrdinance] = useState(
        []
    );
    const [imageNameSketch, setImageNameSketch] = useState([]);
    const [imageNamePrograms, setImageNamePrograms] = useState([]);
    const [imageNameFundingReq, setImageNameFundingReq] = useState([]);
    const [imageNameMoa, setImageNameMoa] = useState([]);
    const [imageNameJunkshop, setImageNameJunkshop] = useState([]);
    const [imageNameBusinessPermit, setImageNameBusinessPermit] = useState([]);
    const [imageNameExecutiveOrder, setImageNameExecutiveOrder] = useState([]);
    const [imageNameBarangayOrdinance, setImageNameBarangayOrdinance] =
        useState([]);

    const acceptableFileTypes =
        ".doc, .docx, application/pdf, image/png, image/gif, image/jpeg";

    const onChangeMultipleImages = (e, setImageSrc, setImageName) => {
        setImageName([]);
        setImageSrc([]);

        for (const file of e.target.files) {
            setImageName((imgs) => [...imgs, file.name]);
            setImageSrc((imgs) => [...imgs, file]);
        }
    };

    useEffect(() => {
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_TITLE", "SWM Plan");
        dispatch("CHANGE_PATH", "/encode");
    }, []);

    const { data: barangaysEncode } = useSWR(
        "http://localhost:3001/barangay/getAllBarangayEncode"
    );

    console.log("ALL BARANGAYS ENCODE", barangaysEncode);

    const handleClick = async () => {
        const data = { barangayId: barangayId };

        await Axios.post(
            "http://localhost:3001/submission/allBrgyProfilePages",
            data
        ).then((res) => {
            if (res.data) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        });
    };

    useEffect(() => {
        if (barangayId != null) {
            handleClick();
        }
    }, [barangayId]);

    const postSelectedBarangay = async (action) => {
        const actionData = {
            action: action,
            barangayId: barangayId,
        };
        const data = {
            barangayId: barangayId,
            selectedBarangay: dropdownMenuValueBarangay,
            selectedDistrict: dropdownMenuValueDistrict,
        };

        await Axios.post(
            "http://localhost:3001/barangay/postSelectedBarangay",
            data
        );

        await Axios.put(
            "http://localhost:3001/submission/updateAction",
            actionData
        );

        if (action == "CreateNewDocument") {
            await Axios.post(
                "http://localhost:3001/submission/createSubmissionBarangayProfilePages"
            ).then(async () => {
                router.push("/encode/barangayProfile/template");
            });
        }

        if (action == "LoadDocument") {
            router.push("/encode/barangayProfile/template");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="p-4 md:p-8">
                <div>
                    <div className="relative flex space-x-4">
                        <ClickAwayListener
                            onClickAway={() => setIsDropdownMenuOpen(false)}
                            className="relative"
                        >
                            <div className="select-none w-fit">
                                <p className="mb-1 text-sm text-gray-600">
                                    Barangay
                                </p>
                                <div
                                    onClick={() =>
                                        setIsDropdownMenuOpen(
                                            !isDropdownMenuOpen
                                        )
                                    }
                                    className={`flex items-center justify-between w-96 px-3 py-2 border cursor-pointer`}
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
                                    <div className="max-h-60 overflow-y-auto absolute z-10 py-4 bg-white border border-t-0 top-[66px] w-96 dark:bg-gray-700 shadow-lg">
                                        <ul className="text-gray-700 bg-white">
                                            {barangaysEncode.map(
                                                (barangayEncode, index) => {
                                                    return (
                                                        <li
                                                            key={index}
                                                            onClick={() => {
                                                                setDropdownMenuValueBarangay(
                                                                    barangayEncode.barangayName
                                                                );
                                                                setDropdownMenuValueDistrict(
                                                                    barangayEncode.districtName
                                                                );
                                                                setBarangayId(
                                                                    barangayEncode.id
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
                                                                    barangayEncode.barangayName
                                                                }
                                                                &nbsp; - &nbsp;
                                                                {
                                                                    barangayEncode.districtName
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

                        <div>
                            <p className="mb-1 text-sm text-gray-600">
                                Total population
                            </p>
                            <input
                                value={totalPopulation}
                                onChange={(e) =>
                                    setTotalPopulation(e.target.value)
                                }
                                type="number"
                                className="px-2 py-2 text-left border w-28 focus:outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-1 text-sm text-gray-600">
                                Year of submission
                            </p>
                            <input
                                max={date.getFullYear()}
                                value={yearSubmitted}
                                placeholder="Year"
                                onChange={(e) =>
                                    setYearSubmitted(e.target.value)
                                }
                                type="number"
                                className="px-2 py-2 text-center border w-14 restoreNumberArrows focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-8"></div>
                    <form
                        ref={formRef}
                        className="grid w-full grid-cols-2 gap-4 bg-white"
                    >
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border
                    ${
                        collectionSchedule && imageSrcSketch.length != 0
                            ? "bg-green-100 border-green-200"
                            : "bg-gray-50"
                    } }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold">
                                    Route sketch
                                </p>
                                {collectionSchedule &&
                                    imageSrcSketch.length != 0 && (
                                        <Icon
                                            className="w-6 h-6 text-green-500"
                                            icon="ic:round-check-circle"
                                        />
                                    )}
                            </div>

                            <p className="mb-1 text-sm text-gray-700 ">
                                Collection schedule
                            </p>
                            <input
                                value={collectionSchedule}
                                placeholder="Collection schedule"
                                onChange={(e) =>
                                    setCollectionSchedule(e.target.value)
                                }
                                type="text"
                                className="w-full px-2 py-1 mb-2 border focus:outline-none"
                            />
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefSketch}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcSketch,
                                        setImageNameSketch
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border ${
                                imageSrcPrograms.length != 0
                                    ? "bg-green-100 border-green-200"
                                    : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold ">
                                    Programs
                                </p>
                                {imageSrcPrograms.length != 0 && (
                                    <Icon
                                        className="w-6 h-6 text-green-500"
                                        icon="ic:round-check-circle"
                                    />
                                )}
                            </div>
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefPrograms}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcPrograms,
                                        setImageNamePrograms
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border ${
                                imageSrcFundingReq.length != 0
                                    ? "bg-green-100 border-green-200"
                                    : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold ">
                                    Funding requirements
                                </p>
                                {imageSrcFundingReq.length != 0 && (
                                    <Icon
                                        className="w-6 h-6 text-green-500"
                                        icon="ic:round-check-circle"
                                    />
                                )}
                            </div>
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefFundingReq}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcFundingReq,
                                        setImageNameFundingReq
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border ${
                                dateOfCreation && imageSrcMoa.length != 0
                                    ? "bg-green-100 border-green-200"
                                    : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold ">
                                    Memorandum of agreement
                                </p>
                                {dateOfCreation && imageSrcMoa.length != 0 && (
                                    <Icon
                                        className="w-6 h-6 text-green-500"
                                        icon="ic:round-check-circle"
                                    />
                                )}
                            </div>
                            <p className="mb-1 text-sm text-gray-700">
                                Date of creation
                            </p>
                            <input
                                value={dateOfCreation}
                                placeholder="Date of creation"
                                onChange={(e) =>
                                    setDateOfCreation(e.target.value)
                                }
                                type="text"
                                className="w-full px-2 py-1 mb-2 border focus:outline-none"
                            />
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefMoa}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcMoa,
                                        setImageNameMoa
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border ${
                                junkshopName && imageSrcJunkshop.length != 0
                                    ? "bg-green-100 border-green-200"
                                    : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold ">
                                    Junkshop
                                </p>
                                {junkshopName &&
                                    imageSrcJunkshop.length != 0 && (
                                        <Icon
                                            className="w-6 h-6 text-green-500"
                                            icon="ic:round-check-circle"
                                        />
                                    )}
                            </div>
                            <p className="mb-1 text-sm text-gray-700">
                                Name of junkshop
                            </p>
                            <input
                                value={junkshopName}
                                placeholder="Name of junkshop"
                                onChange={(e) =>
                                    setJunkshopName(e.target.value)
                                }
                                type="text"
                                className="w-full px-2 py-1 mb-2 border focus:outline-none"
                            />
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefJunkshop}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcJunkshop,
                                        setImageNameJunkshop
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border ${
                                dateIssuedBusinessPermit &&
                                imageSrcBusinessPermit.length != 0
                                    ? "bg-green-100 border-green-200"
                                    : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold ">
                                    Business permit
                                </p>
                                {dateIssuedBusinessPermit &&
                                    imageSrcBusinessPermit.length != 0 && (
                                        <Icon
                                            className="w-6 h-6 text-green-500"
                                            icon="ic:round-check-circle"
                                        />
                                    )}
                            </div>
                            <p className="mb-1 text-sm text-gray-700">
                                Date issued
                            </p>
                            <input
                                value={dateIssuedBusinessPermit}
                                placeholder="Date issued"
                                onChange={(e) =>
                                    setDateIssuedBusinessPermit(e.target.value)
                                }
                                type="text"
                                className="w-full px-2 py-1 mb-2 border focus:outline-none"
                            />
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefBusinessPermit}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcBusinessPermit,
                                        setImageNameBusinessPermit
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border ${
                                executiveOrderNo &&
                                dateIssuedExecutiveOrder &&
                                imageSrcExecutiveOrder.length != 0
                                    ? "bg-green-100 border-green-200"
                                    : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold ">
                                    Executive order
                                </p>
                                {executiveOrderNo &&
                                    dateIssuedExecutiveOrder &&
                                    imageSrcExecutiveOrder.length != 0 && (
                                        <Icon
                                            className="w-6 h-6 text-green-500"
                                            icon="ic:round-check-circle"
                                        />
                                    )}
                            </div>
                            <p className="mb-1 text-sm text-gray-700">
                                Executive order number
                            </p>
                            <input
                                value={executiveOrderNo}
                                placeholder="Executive order number"
                                onChange={(e) =>
                                    setExecutiveOrderNo(e.target.value)
                                }
                                type="text"
                                className="w-full px-2 py-1 mb-2 border focus:outline-none"
                            />
                            <p className="mb-1 text-sm text-gray-700">
                                Date issued
                            </p>
                            <input
                                value={dateIssuedExecutiveOrder}
                                placeholder="Date issued"
                                onChange={(e) =>
                                    setDateIssuedExecutiveOrder(e.target.value)
                                }
                                type="text"
                                className="w-full px-2 py-1 mb-2 border focus:outline-none"
                            />
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefExecutiveOrder}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcExecutiveOrder,
                                        setImageNameExecutiveOrder
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                        <div
                            className={`px-4 py-4 rounded-[3px] transition-colors border ${
                                barangayOrdinanceNo &&
                                imageSrcBarangayOrdinance.length != 0
                                    ? "bg-green-100 border-green-200"
                                    : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold ">
                                    Barangay ordinance
                                </p>
                                {barangayOrdinanceNo &&
                                    imageSrcBarangayOrdinance.length != 0 && (
                                        <Icon
                                            className="w-6 h-6 text-green-500"
                                            icon="ic:round-check-circle"
                                        />
                                    )}
                            </div>
                            <p className="mb-1 text-sm text-gray-700">
                                Barangay ordinance number
                            </p>
                            <input
                                value={barangayOrdinanceNo}
                                placeholder="Barangay ordinance number"
                                onChange={(e) =>
                                    setBarangayOrdinanceNo(e.target.value)
                                }
                                type="text"
                                className="w-full px-2 py-1 mb-2 border focus:outline-none"
                            />
                            <p className="mb-1 text-sm text-gray-700">
                                Select file
                            </p>
                            <input
                                accept={acceptableFileTypes}
                                multiple
                                ref={inputFileRefBarangayOrdinance}
                                onChange={(e) =>
                                    onChangeMultipleImages(
                                        e,
                                        setImageSrcBarangayOrdinance,
                                        setImageNameBarangayOrdinance
                                    )
                                }
                                className="w-full bg-white border"
                                type="file"
                                name="file"
                                id=""
                            />
                        </div>
                    </form>
                    <button
                        onClick={() => {
                            if (!loading) {
                                submit();
                            }
                        }}
                        className={`px-3 hover:bg-blue-600 flex items-center justify-center w-36 transition-colors py-2 mt-8 mb-4 text-white bg-blue-500 rounded-sm ${
                            loading && "cursor-not-allowed"
                        } `}
                    >
                        {!loading ? (
                            <>
                                <Icon
                                    icon="fluent:document-arrow-up-20-filled"
                                    className="w-6 h-6 mr-2"
                                />
                                Encode
                            </>
                        ) : (
                            <>
                                <Icon
                                    icon="eos-icons:loading"
                                    className="w-6 h-6 mr-2"
                                />
                                Processing...
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default barangayProfile;
