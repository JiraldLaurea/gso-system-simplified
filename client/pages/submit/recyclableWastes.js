import { Icon } from "@iconify/react";
import Axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import RecyclableWastesInput from "../../components/RecyclableWastesInput";
import { useAuthDispatch } from "../../context/auth";
import moment from "moment";

function recyclableWastes() {
    const router = useRouter();
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [dropdownMenuValueBarangay, setDropdownMenuValueBarangay] =
        useState("Barangay");
    const [dropdownMenuValueDistrict, setDropdownMenuValueDistrict] =
        useState("District");
    const [barangayId, setBarangayId] = useState(null);
    const date = new Date();
    const [loading, setLoading] = useState(false);
    const [yearSubmitted, setYearSubmitted] = useState(date.getFullYear());
    const [saway, setSaway] = useState(0);
    const [lata, setLata] = useState(0);
    const [plastic, setPlastic] = useState(0);
    const [mineral, setMineral] = useState(0);
    const [botelya, setBotelya] = useState(0);
    const [carton, setCarton] = useState(0);
    const [aluminum, setAluminum] = useState(0);
    const [sin, setSin] = useState(0);
    const [scrap, setScrap] = useState(0);
    const [kaldero, setKaldero] = useState(0);
    const [others, setOthers] = useState(0);
    const { data: me } = useSWR("http://localhost:3001/user/me");
    const dispatch = useAuthDispatch();
    const [dateSubmitted, setDateSubmitted] = useState(
        moment().format("yyyy-MM")
    );

    const { data: recyclableWastes } = useSWR(
        "http://localhost:3001/recyclableWastes/getEncodedRecyclableWastes"
    );

    useEffect(() => {
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_TITLE", "Recyclable wastes");
        dispatch("CHANGE_PATH", "/submit");
    }, []);

    // Recursive Binary Search
    // It returns location of x in given array arr[l..r] is present,otherwise -1
    const binarySearch = (arr, l, r, x) => {
        if (r >= l) {
            let mid = l + Math.floor((r - l) / 2);

            // If the element is present at the middle itself
            if (arr[mid] == x) return mid;

            // If element is smaller than mid, then it can only be present in left subarray
            if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);

            // Else the element can only be present in right subarray
            return binarySearch(arr, mid + 1, r, x);
        }

        // We reach here when element is not present in array
        return -1;
    };

    const submit = async () => {
        const isEncoded = await Axios.post(
            "http://localhost:3001/recyclableWastes/getSubmittedRecyclableWastesUser",
            {
                dateSubmitted: dateSubmitted,
            }
        ).then(async (res) => {
            return res.data;
        });

        if (isEncoded.length > 0) {
            return alert(
                "The document is already submitted from your chosen month and year."
            );
        }

        setLoading(true);

        const data = {
            dateSubmitted: dateSubmitted,
            barangayId: barangayId,
            barangayName: dropdownMenuValueBarangay,
            districtName: dropdownMenuValueDistrict,
            saway: saway,
            lata: lata,
            plastic: plastic,
            mineral: mineral,
            botelya: botelya,
            carton: carton,
            aluminum: aluminum,
            sin: sin,
            scrap: scrap,
            kaldero: kaldero,
            others: others,
        };

        await Axios.post(
            "http://localhost:3001/recyclableWastes/createRecyclableWastes",
            data
        ).then(() => {
            alert("Recyclable wastes report successfully submitted.");
            setLoading(false);
        });
    };

    return (
        <div className="flex flex-col w-full">
            <div className="p-4 md:p-8">
                {!recyclableWastes ? (
                    <p className="text-gray-600">
                        Your recyclable waste is not yet encoded by the GSO.
                    </p>
                ) : (
                    <>
                        <div className="mb-4">
                            <p className="mb-1 text-sm text-gray-600">
                                Date of submission
                            </p>
                            <input
                                max={moment().format("yyyy-MM")}
                                type="month"
                                id="fromDatePicker"
                                value={dateSubmitted}
                                onChange={(e) =>
                                    setDateSubmitted(e.target.value)
                                }
                                className="px-2 py-1 mb-4 border"
                            />
                        </div>

                        <p className="mb-1 text-sm text-gray-600">
                            Recyclable wastes &#40;kg&#41;
                        </p>
                        <div className="flex">
                            <RecyclableWastesInput
                                category="Saway"
                                state={saway}
                                setState={(e) => setSaway(e.target.value)}
                                firstChild
                            />
                            <RecyclableWastesInput
                                category="Lata"
                                state={lata}
                                setState={(e) => setLata(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Plastic"
                                state={plastic}
                                setState={(e) => setPlastic(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Mineral"
                                state={mineral}
                                setState={(e) => setMineral(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Botelya"
                                state={botelya}
                                setState={(e) => setBotelya(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Carton"
                                state={carton}
                                setState={(e) => setCarton(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Aluminum"
                                state={aluminum}
                                setState={(e) => setAluminum(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Sin"
                                state={sin}
                                setState={(e) => setSin(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Scrap"
                                state={scrap}
                                setState={(e) => setScrap(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Kaldero"
                                state={kaldero}
                                setState={(e) => setKaldero(e.target.value)}
                            />
                            <RecyclableWastesInput
                                category="Others"
                                state={others}
                                setState={(e) => setOthers(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => {
                                if (!loading) {
                                    submit();
                                }
                            }}
                            className={`w-36 flex hover:bg-blue-600 transition-colors items-center justify-center px-3 py-2 mt-8 mb-4 text-white bg-blue-500 rounded-sm ${
                                loading && "cursor-not-allowed"
                            } `}
                        >
                            {!loading ? (
                                <>
                                    <Icon
                                        icon="fluent:document-arrow-up-20-filled"
                                        className="w-6 h-6 mr-2"
                                    />
                                    Submit
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
                    </>
                )}
            </div>
        </div>
    );
}

export default recyclableWastes;
