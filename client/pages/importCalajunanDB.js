import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useAuthDispatch } from "../context/auth";
import * as XLSX from "xlsx";
import Axios from "axios";
import ClickAwayListener from "react-click-away-listener";

function importCalajunanDB() {
    const dispatch = useAuthDispatch();
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
    const [dropdownMenuValue, setDropdownMenuValue] = useState("Select");
    const fileData = {};
    const [excelDataTablename, setExcelDataTablename] = useState("");
    const [excelDataArray, setExcelDataArray] = useState([]);
    const [dbDataArray, setDbDataArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch("CHANGE_TITLE", "Import Calajunan DB");
        dispatch("HAS_BUTTON_FALSE");
    }, []);

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, {
                    type: "buffer",
                    cellText: false,
                    cellDates: true,
                    // cellDates: true,
                });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws, {
                    raw: false,
                    dateNF: 'd"/"mm"/"yyyy',
                });

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            console.log("DATA", d);
            setExcelDataArray(d);
        });
    };

    const fileSelected = (e) => {
        const file = e.target.files[0];
        setExcelDataTablename(file.name.replace(/\.[^/.]+$/, ""));
        readExcel(file);
    };

    const importTblUser = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                user_id: data.user_id,
                usertype_id: data.usertype_id,
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                initial: data.initial,
            };

            await Axios.post("http://localhost:3001/tblUser/getTblUserId", {
                user_id: data.user_id,
            }).then(async (res) => {
                if (res?.data?.user_id != data.user_id) {
                    await Axios.post(
                        "http://localhost:3001/tblUser/postTblUser",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblCompany = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                ID: data.ID,
                COMPANY_NAME: data.COMPANY_NAME,
                COMPANY_ADDRESS: data.COMPANY_ADDRESS,
                DTI: data.DTI,
                PPA_NO: data.PPA_NO,
                PPA: data.PPA,
                PORT: data.PORT,
                SHOW_COMPNAME: data.SHOW_COMPNAME,
            };

            await Axios.post(
                "http://localhost:3001/tblCompany/getTblCompanyId",
                {
                    ID: data.ID,
                }
            ).then(async (res) => {
                if (res?.data?.ID != data.ID) {
                    await Axios.post(
                        "http://localhost:3001/tblCompany/postTblCompany",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblConSettings = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                id: data.id,
                portno: data.portno,
                baudstring: data.baudstring,
            };

            await Axios.post(
                "http://localhost:3001/tblConSettings/getTblConSettingsId",
                {
                    id: data.id,
                }
            ).then(async (res) => {
                if (res?.data?.id != data.id) {
                    await Axios.post(
                        "http://localhost:3001/tblConSettings/postTblConSettings",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblCustomer = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                CustomerID: data.CustomerID,
                Desc: data.Desc,
                Suspended: data.Suspended,
            };

            await Axios.post(
                "http://localhost:3001/tblCustomer/getTblCustomerId",
                {
                    CustomerID: data.CustomerID,
                }
            ).then(async (res) => {
                if (res?.data?.CustomerID != data.CustomerID) {
                    await Axios.post(
                        "http://localhost:3001/tblCustomer/postTblCustomer",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblProducts = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                ProductID: data.ProductID,
                Desc: data.Desc,
                Suspended: data.Suspended,
            };

            await Axios.post(
                "http://localhost:3001/tblProducts/getTblProductsId",
                {
                    ProductID: data.ProductID,
                }
            ).then(async (res) => {
                if (res?.data?.ProductID != data.ProductID) {
                    await Axios.post(
                        "http://localhost:3001/tblProducts/postTblProducts",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblTransaction = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                id: data.id,
                trandate: data.trandate,
                ticketno: data.ticketno,
                customer: data.customer,
                commodity: data.commodity,
                plateno: data.plateno,
                weighin: data.weighin,
                datetimein: data.datetimein,
                weighout: data.weighout,
                datetimeout: data.datetimeout,
                driver: data.driver,
                weigher: data.weigher,
                grosswt: data.grosswt,
                tarewt: data.tarewt,
                netwt: data.netwt,
                firstprint: data.firstprint,
                secondprint: data.secondprint,
                note: data.note,
            };

            await Axios.post(
                "http://localhost:3001/tblTransaction/getTblTransactionId",
                {
                    id: data.id,
                }
            ).then(async (res) => {
                if (res?.data?.id != data.id) {
                    await Axios.post(
                        "http://localhost:3001/tblTransaction/postTblTransaction",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblTruckDetails = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                WT_SLIP_NO: data.WT_SLIP_NO,
                PPA: data.PPA,
                PPA_NO: data.PPA_NO,
                COMPANY_NAME: data.COMPANY_NAME,
                COMPANY_ADD: data.COMPANY_ADD,
                DTI: data.DTI,
                DATE: data.DATE,
                HOURS: data.HOURS,
                VEHICLE_TYPE: data.VEHICLE_TYPE,
                PLATE_NO: data.PLATE_NO,
                VESSEL_NAME: data.VESSEL_NAME,
                TRIP_NO: data.TRIP_NO,
                SCALE_RATE: data.SCALE_RATE,
                VAT: data.VAT,
                AMOUNT: data.AMOUNT,
                OR_NO: data.OR_NO,
                AXLE1: data.AXLE1,
                AXLE2: data.AXLE2,
                AXLE3: data.AXLE3,
                AXLE4: data.AXLE4,
                AXLE5: data.AXLE5,
                AXLE6: data.AXLE6,
                TOTAL_WEIGHT: data.TOTAL_WEIGHT,
                REMARKS: data.REMARKS,
                SCALE_OPERATOR: data.SCALE_OPERATOR,
                DATE_WEIGHTED: data.DATE_WEIGHTED,
            };

            await Axios.post(
                "http://localhost:3001/tblTruckDetails/getTblTruckDetailsId",
                {
                    WT_SLIP_NO: data.WT_SLIP_NO,
                }
            ).then(async (res) => {
                if (res?.data?.WT_SLIP_NO != data.WT_SLIP_NO) {
                    await Axios.post(
                        "http://localhost:3001/tblTruckDetails/postTblTruckDetails",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblUserType = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                usertype_id: data.usertype_id,
                usertype: data.usertype,
            };

            await Axios.post(
                "http://localhost:3001/tblUserType/getTblUserTypeId",
                {
                    usertype_id: data.usertype_id,
                }
            ).then(async (res) => {
                if (res?.data?.usertype_id != data.usertype_id) {
                    await Axios.post(
                        "http://localhost:3001/tblUserType/postTblUserType",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importTblVehicleType = async () => {
        const promises = excelDataArray.map(async (data) => {
            const excelData = {
                vid: data.vid,
                vehicle_type: data.vehicle_type,
                rate: data.rate,
                vat: data.vat,
                amount: data.amount,
            };

            await Axios.post(
                "http://localhost:3001/tblVehicleType/getTblVehicleTypeId",
                {
                    vid: data.vid,
                }
            ).then(async (res) => {
                if (res?.data?.vid != data.vid) {
                    await Axios.post(
                        "http://localhost:3001/tblVehicleType/postTblVehicleType",
                        excelData
                    );
                }
            });
        });

        await Promise.all(promises).then(() => {
            alert("Data successfully imported");
            setIsLoading(false);
        });
    };

    const importCalajunanDB = async () => {
        setIsLoading(true);

        if (dropdownMenuValue == "tblCompany") {
            importTblCompany();
        }

        if (dropdownMenuValue == "tblConSettings") {
            importTblConSettings();
        }

        if (dropdownMenuValue == "tblCustomer") {
            importTblCustomer();
        }

        if (dropdownMenuValue == "tblProducts") {
            importTblProducts();
        }

        if (dropdownMenuValue == "tblTransaction") {
            importTblTransaction();
        }

        if (dropdownMenuValue == "tblTruckDetails") {
            importTblTruckDetails();
        }

        if (dropdownMenuValue == "tblUser") {
            importTblUser();
        }

        if (dropdownMenuValue == "tblUserType") {
            importTblUserType();
        }

        if (dropdownMenuValue == "tblVehicleType") {
            importTblVehicleType();
        }
    };

    // const fileSelected = (e) => {
    //     var files = e.target.files,
    //         f = files[0];
    //     fileData["fileName"] = files[0].name;
    //     // For Browsers other than Internet Explorer
    //     if (typeof FileReader != "undefined") {
    //         let reader = new FileReader();

    //         if (reader.readAsBinaryString) {
    //             console.log(reader);
    //             reader.onload = function (e) {
    //                 console.log("TEST");
    //                 processExcelFile(e.target.result);
    //             };
    //         }
    //     } else {
    //         // For Internet Explorer
    //         reader.onload = function (e) {
    //             let data = "";
    //             let bytes = new Uint8Array(e.target.result);
    //             for (let i = 0; (i = bytes.byteLength); i++) {
    //                 data += String.fromCharCode(bytes[i]);
    //             }
    //             processExcelFile(data);
    //         };
    //     }
    // };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-md">
                <p className="mb-1 text-sm text-gray-700">Select table</p>
                <div className="relative mb-4">
                    <ClickAwayListener
                        onClickAway={() => setIsDropdownMenuOpen(false)}
                        className="relative"
                    >
                        <div
                            className="select-none w-fit"
                            onMouseLeave={() => setIsDropdownMenuOpen(false)}
                        >
                            <div
                                onMouseOver={() => setIsDropdownMenuOpen(true)}
                                className={`flex items-center justify-between w-56 px-3 py-2 border cursor-pointer`}
                            >
                                <p
                                    className={`${
                                        dropdownMenuValue == "Select" &&
                                        "text-gray-400"
                                    }`}
                                >
                                    {dropdownMenuValue}
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
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblCompany"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblCompany
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblConSettings"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblConSettings
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblCustomer"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblCustomer
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblProducts"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblProducts
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblTransaction"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblTransaction
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblTruckDetails"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblTruckDetails
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue("tblUser");
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblUser
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblUserType"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblUserType
                                        </li>
                                        <li
                                            onClick={() => {
                                                setDropdownMenuValue(
                                                    "tblVehicleType"
                                                );
                                                setIsDropdownMenuOpen(false);
                                            }}
                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            tblVehicleType
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </ClickAwayListener>
                </div>
                <p className="mb-1 text-sm text-gray-700">Select file</p>
                <input
                    accept=".xls, .xlsx"
                    // multiple
                    // ref={inputFileRefFundingReq}
                    onChange={fileSelected}
                    className="w-full bg-white border"
                    type="file"
                    name="file"
                    id=""
                />
                {/* <button onClick={importCalajunanDB}>IMPORT</button> */}

                <button
                    onClick={() => {
                        if (!isLoading) {
                            importCalajunanDB();
                        }
                    }}
                    className={`px-3 hover:bg-blue-600 flex items-center justify-center w-36 transition-colors py-2 mt-8 mb-4 text-white bg-blue-500 rounded-sm ${
                        isLoading && "cursor-not-allowed"
                    } `}
                >
                    {!isLoading ? (
                        <>
                            <Icon icon="fe:import" className="w-6 h-6 mr-2" />
                            Import
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

export default importCalajunanDB;
