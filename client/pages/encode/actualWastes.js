import { Icon } from "@iconify/react";
import Axios from "axios";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadString,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import useSWR, { mutate } from "swr";
import { storage } from "../../firebase";
import { useRouter } from "next/router";
import RecyclableWastesInput from "../../components/RecyclableWastesInput";
import moment from "moment";
import { useAuthDispatch } from "../../context/auth";

function actualWastes() {
    const router = useRouter();
    const [barangayYears, setBarangayYears] = useState([]);
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [isDropdownMenuOpen2, setIsDropdownMenuOpen2] = useState(false);
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [barangayId, setBarangayId] = useState(null);
    const date = new Date();
    const [actualWastes, setActualWastes] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [populationCount, setPopulationCount] = useState(0);
    const [dateOfSubmission, setDateOfSubmission] = useState(
        moment().format("yyyy-MM-DD")
    );

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [yearSubmitted, setYearSubmitted] = useState(date.getFullYear());
    const inputFileRef = useRef();

    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_TITLE", "Actual wastes");
        dispatch("CHANGE_PATH", "/encode");
    }, []);

    const submit = async () => {
        const isEncoded = await Axios.post(
            "http://localhost:3001/actualWastes/getSubmittedActualWastes",
            { dateOfSubmission: dateOfSubmission }
        ).then(async (res) => {
            return res.data;
        });

        if (isEncoded) {
            return alert(
                "You have already encoded a document from your chosen date."
            );
        }

        setLoading(true);

        const data = {
            dateOfSubmission: dateOfSubmission,
            actualWastes: actualWastes,
            remarks: remarks,
        };

        await Axios.post(
            "http://localhost:3001/actualWastes/createActualWastes",
            data
        ).then(() => {
            alert("Actual wastes report successfully submitted.");
            setLoading(false);
        });
    };

    return (
        <div className="flex flex-col w-full">
            <div className="p-4 md:p-8">
                <div className="flex flex-col mb-4 md:flex-row md:items-end">
                    <div className="my-4 md:my-0">
                        <p className="mb-1 text-sm text-gray-600">
                            Date of submission
                        </p>
                        <input
                            max={moment().format("yyyy-MM-DD")}
                            className="px-2 py-1 border"
                            type="date"
                            value={dateOfSubmission}
                            onChange={(e) => {
                                setDateOfSubmission(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>

                <p className="mb-1 text-sm text-gray-600">
                    Actual wastes &#40;kg&#41;
                </p>

                <div className="flex mb-3 removeInputNumberArrows">
                    <input
                        value={actualWastes}
                        onChange={(e) => setActualWastes(e.target.value)}
                        type="number"
                        className={`appearance-none px-2 h-[36px] w-[176.4px] border focus:outline-none text-left`}
                        placeholder="Actual wastes"
                    />
                </div>

                <p className="mb-1 text-sm text-gray-600">Remarks</p>

                <div className="flex mb-3 removeInputNumberArrows">
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        className={`resize-none appearance-none p-2 h-[120px] w-[350px] border focus:outline-none text-left`}
                        placeholder="Remarks(optional)"
                    />
                </div>

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
    );
}

export default actualWastes;
