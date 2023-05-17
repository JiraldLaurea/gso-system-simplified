import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Axios from "axios";
import {
    getDownloadURL,
    ref,
    uploadBytes,
    uploadString,
} from "firebase/storage";
import { storage } from "../firebase";
import useSWR from "swr";
import { useRouter } from "next/router";

function Attachments({
    isMenuOpen,
    setIsMenuOpen,
    isEncoded,
    isSubmitted,
    setIsEncoded,
    setIsSubmitted,
    isEncodedAttachments,
    setIsEncodedAttachments,
    isSubmittedAttachments,
    setIsSubmittedAttachments,
    selectedBarangayData,
    yearSubmitted,
    setIsLoading,
    createPDF,
}) {
    const router = useRouter();
    const formRef = useRef();
    const inputFileRefSketch = useRef();
    const inputFileRefPrograms = useRef();
    const inputFileRefFundingReq = useRef();
    const inputFileRefMoa = useRef();
    const inputFileRefJunkshop = useRef();
    const inputFileRefBusinessPermit = useRef();
    const inputFileRefExecutiveOrder = useRef();
    const inputFileRefBarangayOrdinance = useRef();
    const [fileSketch, setFileSketch] = useState(null);
    const [filePrograms, setFilePrograms] = useState(null);
    const [fileFundingReq, setFileFundingReq] = useState(null);
    const [fileMoa, setFileMoa] = useState(null);
    const [fileJunkshop, setFileJunkshop] = useState(null);
    const [fileBusinessPermit, setFileBusinessPermit] = useState(null);
    const [fileExecutiveOrder, setFileExecutiveOrder] = useState(null);
    const [fileBarangayOrdinance, setFileBarangayOrdinance] = useState(null);

    const [fileNameSketch, setFileNameSketch] = useState("");
    const [fileNamePrograms, setFileNamePrograms] = useState("");
    const [fileNameFundingReq, setFileNameFundingReq] = useState("");
    const [fileNameMoa, setFileNameMoa] = useState("");
    const [fileNameJunkshop, setFileNameJunkshop] = useState("");
    const [fileNameBusinessPermit, setFileNameBusinessPermit] = useState("");
    const [fileNameExecutiveOrder, setFileNameExecutiveOrder] = useState("");
    const [fileNameBarangayOrdinance, setFileNameBarangayOrdinance] =
        useState("");
    const [collectionSchedule, setCollectionSchedule] = useState("");
    const [dateOfCreation, setDateOfCreation] = useState("");
    const [junkshopName, setJunkshopName] = useState("");
    const [dateIssuedBusinessPermit, setDateIssuedBusinessPermit] =
        useState("");
    const [dateIssuedExecutiveOrder, setDateIssuedExecutiveOrder] =
        useState("");

    const { data: user } = useSWR("http://localhost:3001/user/me");

    const acceptableFileTypes =
        ".doc, .docx, application/pdf, image/png, image/gif, image/jpeg";

    const [imageSrc, setImageSrc] = useState([]);
    const [imageName, setImageName] = useState([]);

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

    const onChangeMultipleImages = (e, setImageSrc, setImageName) => {
        setImageName([]);
        setImageSrc([]);

        for (const file of e.target.files) {
            setImageName((imgs) => [...imgs, file.name]);
            setImageSrc((imgs) => [...imgs, file]);
        }
    };

    const SubmitBarangayProfile = async () => {
        const isSubmitted = await Axios.get(
            "http://localhost:3001/submission/getSubmittedBarangayProfilePage"
        ).then((res) => res.data);

        if (isSubmitted.length > 0) {
            setIsEncoded(false);
            return alert(
                "You have already encoded a document from this barangay."
            );
        }

        if (
            isSubmitted.length == 0 &&
            collectionSchedule != "" &&
            dateOfCreation != "" &&
            junkshopName != "" &&
            dateIssuedBusinessPermit != "" &&
            dateIssuedExecutiveOrder != "" &&
            imageSrcSketch.length != 0 &&
            imageSrcPrograms.length != 0 &&
            imageSrcFundingReq.length != 0 &&
            imageSrcMoa.length != 0 &&
            imageSrcJunkshop.length != 0 &&
            imageSrcBusinessPermit.length != 0 &&
            imageSrcExecutiveOrder.length != 0 &&
            imageSrcBarangayOrdinance.length != 0
        ) {
            createPDF();
        } else {
            alert("Please fill in all the attachments.");
        }
        setIsEncoded(false);
    };

    const SubmitUpdatedBarangayProfile = async () => {
        const isEncoded = await Axios.post(
            "http://localhost:3001/submission/getSubmittedBarangayProfilePageUser",
            { yearSubmitted: yearSubmitted }
        ).then((res) => res.data);

        const isSubmitted = await Axios.post(
            "http://localhost:3001/shortenedSubmission/getSubmittedBarangayProfilePageYear",
            { yearSubmitted: yearSubmitted }
        ).then((res) => res.data);

        if (isSubmitted || isEncoded) {
            setIsSubmitted(false);
            return alert(
                "You have already submitted a document from your chosen year."
            );
        }

        if (
            !isSubmitted &&
            !isEncoded &&
            dateIssuedBusinessPermit != "" &&
            imageSrcBusinessPermit.length != 0
        ) {
            createPDF();
        } else {
            alert("Please fill in the business permit attachment.");
        }
        setIsSubmitted(false);
    };

    const SubmitAttachments = async () => {
        imageSrcSketch.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Sketch${
                selectedBarangayData.selectedBarangay
            }${selectedBarangayData.selectedDistrict}${yearSubmitted}-${
                index + 1
            }.${extension}`;

            const fileRef = ref(storage, `submission/sketch/${documentName}`);

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                collectionSchedule: collectionSchedule,
                documentName: documentName,
                sketchUrl: url,
            };

            await Axios.post(
                "http://localhost:3001/sketch/createSketch",
                postData
            );
        });

        imageSrcPrograms.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Programs${
                selectedBarangayData.selectedBarangay
            }${selectedBarangayData.selectedDistrict}${yearSubmitted}-${
                index + 1
            }.${extension}`;

            const fileRef = ref(storage, `submission/programs/${documentName}`);

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                documentName: documentName,
                programsUrl: url,
            };

            await Axios.post(
                "http://localhost:3001/programs/createPrograms",
                postData
            );
        });

        imageSrcFundingReq.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `FundingReq${
                selectedBarangayData.selectedBarangay
            }${selectedBarangayData.selectedDistrict}${yearSubmitted}-${
                index + 1
            }.${extension}`;

            const fileRef = ref(
                storage,
                `submission/fundingReq/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                documentName: documentName,
                fundingReqUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/fundingReq/createFundingReq",
                postData
            );
        });

        imageSrcMoa.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Moa${selectedBarangayData.selectedBarangay}${
                selectedBarangayData.selectedDistrict
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(
                storage,
                `submission/memorandumOfAgreement/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                dateOfCreation: dateOfCreation,
                documentName: documentName,
                memorandumOfAgreementUrl: url,
            };
            await Axios.post("http://localhost:3001/moa/createMoa", postData);
        });

        imageSrcJunkshop.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Junkshop${
                selectedBarangayData.selectedBarangay
            }${selectedBarangayData.selectedDistrict}${yearSubmitted}-${
                index + 1
            }.${extension}`;

            const fileRef = ref(storage, `submission/junkshop/${documentName}`);

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                junkshopName: junkshopName,
                documentName: documentName,
                junkshopUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/junkshop/createJunkshop",
                postData
            );
        });

        imageSrcBusinessPermit.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `BusinessPermit${
                selectedBarangayData.selectedBarangay
            }${selectedBarangayData.selectedDistrict}${yearSubmitted}-${
                index + 1
            }.${extension}`;

            const fileRef = ref(
                storage,
                `submission/businessPermit/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                dateIssued: dateIssuedBusinessPermit,
                documentName: documentName,
                businessPermitUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/businessPermit/createBusinessPermit",
                postData
            );
        });

        imageSrcExecutiveOrder.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `ExecutiveOrder${
                selectedBarangayData.selectedBarangay
            }${selectedBarangayData.selectedDistrict}${yearSubmitted}-${
                index + 1
            }.${extension}`;

            const fileRef = ref(
                storage,
                `submission/executiveOrder/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                dateIssued: dateIssuedExecutiveOrder,
                documentName: documentName,
                executiveOrderUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/executiveOrder/createExecutiveOrder",
                postData
            );
        });

        imageSrcBarangayOrdinance.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `BarangayOrdinance${
                selectedBarangayData.selectedBarangay
            }${selectedBarangayData.selectedDistrict}${yearSubmitted}-${
                index + 1
            }.${extension}`;

            const fileRef = ref(
                storage,
                `submission/barangayOrdinance/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                documentName: documentName,
                barangayOrdinanceUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/barangayOrdinance/createBarangayOrdinance",
                postData
            );
        });

        resetInputs(setIsEncodedAttachments);
    };

    const SubmitUpdatedAttachments = async () => {
        imageSrcSketch.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Sketch${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(storage, `submission/sketch/${documentName}`);

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                collectionSchedule: collectionSchedule,
                documentName: documentName,
                sketchUrl: url,
            };

            await Axios.post(
                "http://localhost:3001/sketch/createShortenedSketch",
                postData
            );
        });

        imageSrcPrograms.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Programs${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(storage, `submission/programs/${documentName}`);

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                documentName: documentName,
                programsUrl: url,
            };

            await Axios.post(
                "http://localhost:3001/programs/createShortenedPrograms",
                postData
            );
        });

        imageSrcFundingReq.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `FundingReq${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(
                storage,
                `submission/fundingReq/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                documentName: documentName,
                fundingReqUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/fundingReq/createShortenedFundingReq",
                postData
            );
        });

        imageSrcMoa.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Moa${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(
                storage,
                `submission/memorandumOfAgreement/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                dateOfCreation: dateOfCreation,
                documentName: documentName,
                memorandumOfAgreementUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/moa/createShortenedMoa",
                postData
            );
        });

        imageSrcJunkshop.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `Junkshop${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(storage, `submission/junkshop/${documentName}`);

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                junkshopName: junkshopName,
                documentName: documentName,
                junkshopUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/junkshop/createShortenedJunkshop",
                postData
            );
        });

        imageSrcBusinessPermit.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `BusinessPermit${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(
                storage,
                `submission/businessPermit/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                dateIssued: dateIssuedBusinessPermit,
                documentName: documentName,
                businessPermitUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/businessPermit/createShortenedBusinessPermit",
                postData
            );
        });

        imageSrcExecutiveOrder.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `ExecutiveOrder${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(
                storage,
                `submission/executiveOrder/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                dateIssued: dateIssuedExecutiveOrder,
                documentName: documentName,
                executiveOrderUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/executiveOrder/createShortenedExecutiveOrder",
                postData
            );
        });

        imageSrcBarangayOrdinance.map(async (file, index) => {
            const extension = file.name.substring(
                file.name.lastIndexOf(".") + 1
            );

            const formData = new FormData();
            formData.append("file", file);

            const documentName = `BarangayOrdinance${user.barangayName}${
                user.districtName
            }${yearSubmitted}-${index + 1}.${extension}`;

            const fileRef = ref(
                storage,
                `submission/barangayOrdinance/${documentName}`
            );

            await uploadBytes(fileRef, file);

            const url = await getDownloadURL(fileRef);

            const postData = {
                yearSubmitted: yearSubmitted,
                documentName: documentName,
                barangayOrdinanceUrl: url,
            };
            await Axios.post(
                "http://localhost:3001/barangayOrdinance/createShortenedBarangayOrdinance",
                postData
            );
        });

        resetInputs(setIsSubmittedAttachments);
    };

    const resetInputs = (typeOfSubmission) => {
        setImageNameSketch([]);
        setImageNamePrograms([]);
        setImageNameFundingReq([]);
        setImageNameMoa([]);
        setImageNameJunkshop([]);
        setImageNameBusinessPermit([]);
        setImageNameExecutiveOrder([]);
        setImageNameBarangayOrdinance([]);

        setImageSrcSketch([]);
        setImageSrcPrograms([]);
        setImageSrcFundingReq([]);
        setImageSrcMoa([]);
        setImageSrcJunkshop([]);
        setImageSrcBusinessPermit([]);
        setImageSrcExecutiveOrder([]);
        setImageSrcBarangayOrdinance([]);

        setCollectionSchedule("");
        setDateOfCreation("");
        setJunkshopName("");
        setDateIssuedBusinessPermit("");
        setDateIssuedExecutiveOrder("");

        alert("Document successfully submitted.");

        setIsLoading(false);
        typeOfSubmission(false);
        formRef.current.reset();
    };

    useEffect(() => {
        if (isEncoded) {
            SubmitBarangayProfile();
        }
    }, [isEncoded]);

    useEffect(() => {
        if (isSubmitted) {
            SubmitUpdatedBarangayProfile();
        }
    }, [isSubmitted]);

    useEffect(() => {
        if (isEncodedAttachments) {
            SubmitAttachments();
        }
    }, [isEncodedAttachments]);

    useEffect(() => {
        if (isSubmittedAttachments) {
            SubmitUpdatedAttachments();
        }
    }, [isSubmittedAttachments]);

    return (
        <div className={`${!isMenuOpen && "invisible"}`}>
            <div
                onClick={() => setIsMenuOpen(false)}
                className="fixed top-0 left-0 z-20 w-screen h-screen bg-gray-700/30"
            />

            <form
                ref={formRef}
                className="fixed inset-x-0 z-30 w-full max-w-2xl p-4 md:p-6 mx-auto overflow-y-auto bg-white top-0 md:top-24 h-screen md:max-h-[600px]"
            >
                <div className="flex items-center justify-between">
                    <p className="text-xl font-semibold">Attachments</p>
                    <Icon
                        onClick={() => setIsMenuOpen(false)}
                        className="p-1 text-gray-600 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 w-9 h-9"
                        icon="clarity:close-line"
                    />
                </div>
                <div
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors
                    ${
                        collectionSchedule && imageSrcSketch.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    } }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">Route sketch</p>
                        {collectionSchedule && imageSrcSketch.length != 0 && (
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
                        onChange={(e) => setCollectionSchedule(e.target.value)}
                        type="text"
                        className="w-full px-2 py-1 mb-2 border focus:outline-none"
                    />
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors  ${
                        imageSrcPrograms.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">Programs</p>
                        {imageSrcPrograms.length != 0 && (
                            <Icon
                                className="w-6 h-6 text-green-500"
                                icon="ic:round-check-circle"
                            />
                        )}
                    </div>
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors  ${
                        imageSrcFundingReq.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">
                            Funding requirements
                        </p>
                        {imageSrcFundingReq.length != 0 && (
                            <Icon
                                className="w-6 h-6 text-green-500"
                                icon="ic:round-check-circle"
                            />
                        )}
                    </div>
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors  ${
                        dateOfCreation && imageSrcMoa.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">
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
                        onChange={(e) => setDateOfCreation(e.target.value)}
                        type="text"
                        className="w-full px-2 py-1 mb-2 border focus:outline-none"
                    />
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors  ${
                        junkshopName && imageSrcJunkshop.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">Junkshop</p>
                        {junkshopName && imageSrcJunkshop.length != 0 && (
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
                        onChange={(e) => setJunkshopName(e.target.value)}
                        type="text"
                        className="w-full px-2 py-1 mb-2 border focus:outline-none"
                    />
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors  ${
                        dateIssuedBusinessPermit &&
                        imageSrcBusinessPermit.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">Business permit</p>
                        {dateIssuedBusinessPermit &&
                            imageSrcBusinessPermit.length != 0 && (
                                <Icon
                                    className="w-6 h-6 text-green-500"
                                    icon="ic:round-check-circle"
                                />
                            )}
                    </div>
                    <p className="mb-1 text-sm text-gray-700">Date issued</p>
                    <input
                        value={dateIssuedBusinessPermit}
                        placeholder="Date issued"
                        onChange={(e) =>
                            setDateIssuedBusinessPermit(e.target.value)
                        }
                        type="text"
                        className="w-full px-2 py-1 mb-2 border focus:outline-none"
                    />
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors  ${
                        dateIssuedExecutiveOrder &&
                        imageSrcExecutiveOrder.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">Executive order</p>
                        {dateIssuedExecutiveOrder &&
                            imageSrcExecutiveOrder.length != 0 && (
                                <Icon
                                    className="w-6 h-6 text-green-500"
                                    icon="ic:round-check-circle"
                                />
                            )}
                    </div>
                    <p className="mb-1 text-sm text-gray-700">Date issued</p>
                    <input
                        value={dateIssuedExecutiveOrder}
                        placeholder="Date issued"
                        onChange={(e) =>
                            setDateIssuedExecutiveOrder(e.target.value)
                        }
                        type="text"
                        className="w-full px-2 py-1 mb-2 border focus:outline-none"
                    />
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
                    className={`px-4 pt-4 pb-6 my-6 rounded-[3px] transition-colors  ${
                        imageSrcBarangayOrdinance.length != 0
                            ? "bg-green-100"
                            : "bg-gray-100"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-medium ">
                            Barangay ordinance
                        </p>
                        {imageSrcBarangayOrdinance.length != 0 && (
                            <Icon
                                className="w-6 h-6 text-green-500"
                                icon="ic:round-check-circle"
                            />
                        )}
                    </div>
                    <p className="mb-1 text-sm text-gray-700">Select file</p>
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
        </div>
    );
}

export default Attachments;
