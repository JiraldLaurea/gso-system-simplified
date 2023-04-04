import { Icon } from "@iconify/react";
import Axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import ShortenedBarangayProfilePage1 from "../../../../components/ShortenedBarangayProfilePage1";
import ShortenedBarangayProfilePage2 from "../../../../components/ShortenedBarangayProfilePage2";
import ShortenedBarangayProfilePage3 from "../../../../components/ShortenedBarangayProfilePage3";
import { storage } from "../../../../firebase";
import { useAuthDispatch } from "../../../../context/auth";

function template({ pageData, actionData }) {
    const contentRef = useRef(null);
    const page1Ref = useRef(null);
    const page2Ref = useRef(null);
    const page3Ref = useRef(null);
    const page4Ref = useRef(null);
    const page5Ref = useRef(null);
    const page6Ref = useRef(null);
    const page7Ref = useRef(null);
    const page8Ref = useRef(null);
    const page9Ref = useRef(null);
    const date = new Date();
    const { mutate } = useSWRConfig();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPopulationCount, setTotalPopulationCount] = useState(0);
    const [yearSubmitted, setYearSubmitted] = useState(date.getFullYear());
    const [scrollPosition, setScrollPosition] = useState(0);
    const [page1, setPage1] = useState(true);
    const [page2, setPage2] = useState(false);
    const [page3, setPage3] = useState(false);
    const [page4, setPage4] = useState(false);
    const [page5, setPage5] = useState(false);
    const [page6, setPage6] = useState(false);
    const [page7, setPage7] = useState(false);
    const [page8, setPage8] = useState(false);
    const [page9, setPage9] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isOverwriting, setIsOverwriting] = useState(false);
    const [isOverwritten, setIsOverwritten] = useState(false);
    const [submissionUpload, setSubmissionUpload] = useState(null);
    const [submissionBarangayProfileUrl, setSubmissionBarangayProfileUrl] =
        useState("");
    const dispatch = useAuthDispatch();

    const { data: meData } = useSWR("http://localhost:3001/user/me");

    const { data: selectedBarangay } = useSWR(
        "http://localhost:3001/barangay/getSelectedBarangay"
    );

    useEffect(() => {
        dispatch(
            "CHANGE_TITLE",
            `Barangay profile - ${selectedBarangay?.selectedBarangay}`
        );
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_PATH", "/admin/viewAdmin/viewAll");
    }, [selectedBarangay?.selectedBarangay]);

    const [values, setValues] = useState({
        totalLandArea: pageData.totalLandArea,
        totalPopulation: pageData.totalPopulation,
        totalPopulationMale: pageData.totalPopulationMale,
        totalPopulationFemale: pageData.totalPopulationFemale,
        totalPopulationBoth: pageData.totalPopulationBoth,
        male1: pageData.male1,
        male2: pageData.male2,
        male3: pageData.male3,
        male4: pageData.male4,
        male5: pageData.male5,
        male6: pageData.male6,
        male7: pageData.male7,
        male8: pageData.male8,
        male9: pageData.male9,
        male10: pageData.male10,
        male11: pageData.male11,
        male12: pageData.male12,
        male13: pageData.male13,
        male14: pageData.male14,
        male15: pageData.male15,
        male16: pageData.male16,
        male17: pageData.male17,
        male18: pageData.male18,
        male19: pageData.male19,
        male20: pageData.male20,
        female1: pageData.female1,
        female2: pageData.female2,
        female3: pageData.female3,
        female4: pageData.female4,
        female5: pageData.female5,
        female6: pageData.female6,
        female7: pageData.female7,
        female8: pageData.female8,
        female9: pageData.female9,
        female10: pageData.female10,
        female11: pageData.female11,
        female12: pageData.female12,
        female13: pageData.female13,
        female14: pageData.female14,
        female15: pageData.female15,
        female16: pageData.female16,
        female17: pageData.female17,
        female18: pageData.female18,
        female19: pageData.female19,
        female20: pageData.female20,
        both1: pageData.both1,
        both2: pageData.both2,
        both3: pageData.both3,
        both4: pageData.both4,
        both5: pageData.both5,
        both6: pageData.both6,
        both7: pageData.both7,
        both8: pageData.both8,
        both9: pageData.both9,
        both10: pageData.both10,
        both11: pageData.both11,
        both12: pageData.both12,
        both13: pageData.both13,
        both14: pageData.both14,
        both15: pageData.both15,
        both16: pageData.both16,
        both17: pageData.both17,
        both18: pageData.both18,
        both19: pageData.both19,
        both20: pageData.both20,
        totalMale: pageData.totalMale,
        totalFemale: pageData.totalFemale,
        totalBoth: pageData.totalBoth,
        totalHouseholdsCY: pageData.totalHouseholdsCY,
        totalHouseholds: pageData.totalHouseholds,
        numBakery: pageData.numBakery,
        numGrocery: pageData.numGrocery,
        numIceCream: pageData.numIceCream,
        numSariSariStore: pageData.numSariSariStore,
        numNativeDelicacies: pageData.numNativeDelicacies,
        numHardwareElectrical: pageData.numHardwareElectrical,
        numSweetPreserves: pageData.numSweetPreserves,
        numConstructionConcrete: pageData.numConstructionConcrete,
        numSitcharon: pageData.numSitcharon,
        numCarJeepPartsSupplies: pageData.numCarJeepPartsSupplies,
        numNoodles: pageData.numNoodles,
        numMotorcyclesBicyclesSupplies: pageData.numMotorcyclesBicyclesSupplies,
        numBalut: pageData.numBalut,
        numAgriculturalEquipmentSupplies:
            pageData.numAgriculturalEquipmentSupplies,
        numVinegar: pageData.numVinegar,
        numSchoolOfficeSupplies: pageData.numSchoolOfficeSupplies,
        numFishDryingSmoking: pageData.numFishDryingSmoking,
        numPhotoCenterSupplies: pageData.numPhotoCenterSupplies,
        numLaboratories: pageData.numLaboratories,
        numAppliance: pageData.numAppliance,
        numChemicalIndustries: pageData.numChemicalIndustries,
        numJewelryShopStore: pageData.numJewelryShopStore,
        numFeedmills: pageData.numFeedmills,
        numBagsFootwearStore: pageData.numBagsFootwearStore,
        numGarmentEmbroidery: pageData.numGarmentEmbroidery,
        numVideoTapesCenter: pageData.numVideoTapesCenter,
        numFootwearFactories: pageData.numFootwearFactories,
        numBazaars: pageData.numBazaars,
        numTextileMills: pageData.numTextileMills,
        numPrintingPress: pageData.numPrintingPress,
        numBagsWalletFactories: pageData.numBagsWalletFactories,
        numPawnshop: pageData.numPawnshop,
        numFurnitureWooden: pageData.numFurnitureWooden,
        numFurnitureRattan: pageData.numFurnitureRattan,
        numFurnitureBamboo: pageData.numFurnitureBamboo,
        numFurnitureMetal: pageData.numFurnitureMetal,
        numFuneralParlor: pageData.numFuneralParlor,
        numDrugStore: pageData.numDrugStore,
        numPublicMarket: pageData.numPublicMarket,
        numTalipapa: pageData.numTalipapa,
        numCinema: pageData.numCinema,
        numPaperManufacturing: pageData.numPaperManufacturing,
        numCockpit: pageData.numCockpit,
        numCementManufacturing: pageData.numCementManufacturing,
        numFinancialInstitutions: pageData.numFinancialInstitutions,
        numHallowBlocksMaking: pageData.numHallowBlocksMaking,
        numRestaurants: pageData.numRestaurants,
        numMarbleCraft: pageData.numMarbleCraft,
        numRealEstate: pageData.numRealEstate,
        numBlacksmith: pageData.numBlacksmith,
        numNightClubBarMassage: pageData.numNightClubBarMassage,
        numIronMetalCraft: pageData.numIronMetalCraft,
        numMemorialParks: pageData.numMemorialParks,
        numEngineeringWorkMachineShop: pageData.numEngineeringWorkMachineShop,
        numInsurance: pageData.numInsurance,
        numJewelryManufacturingGoldsmith:
            pageData.numJewelryManufacturingGoldsmith,
        numGasolineStation: pageData.numGasolineStation,
        numCeramicsPottery: pageData.numCeramicsPottery,
        numGeneralServiceContractors: pageData.numGeneralServiceContractors,
        numWoodcraft: pageData.numWoodcraft,
        numArrastreServices: pageData.numArrastreServices,
        numEngraving: pageData.numEngraving,
        numBodyWorkshop: pageData.numBodyWorkshop,
        numFashionAccessories: pageData.numFashionAccessories,
        numFitnessGym: pageData.numFitnessGym,
        numOthersManufacturing: pageData.numOthersManufacturing,
        numOthersManufacturingSpecify: pageData.numOthersManufacturingSpecify,
        numBeautyParlorBarberShop: pageData.numBeautyParlorBarberShop,
        numCooperativeRiceGrowers: pageData.numCooperativeRiceGrowers,
        numOthersCommercial: pageData.numOthersCommercial,
        numOthersCommercialSpecify: pageData.numOthersCommercialSpecify,
        totalNumBirths: pageData.totalNumBirths,
        totalNumDeathsAllCauses: pageData.totalNumDeathsAllCauses,
        totalNumStillBirth: pageData.totalNumStillBirth,
        totalNumInfantDeaths: pageData.totalNumInfantDeaths,
        totalNumEarlyNeonatalDeaths: pageData.totalNumEarlyNeonatalDeaths,
        fiveLeadingCausesMortalityCY: pageData.fiveLeadingCausesMortalityCY,
        fiveLeadingMorbidityCY: pageData.fiveLeadingMorbidityCY,
        causeCardiovascularDisorder: pageData.causeCardiovascularDisorder,
        causeCancer: pageData.causeCancer,
        causeOldAge: pageData.causeOldAge,
        causeKidneyFailure: pageData.causeKidneyFailure,
        causeTB: pageData.causeTB,
        causeFeverFlu: pageData.causeFeverFlu,
        causeCough: pageData.causeCough,
        causeAsthma: pageData.causeAsthma,
        causeHypertension: pageData.causeHypertension,
        causePTB: pageData.causePTB,
        infantLeadingCausesMortalityCY: pageData.infantLeadingCausesMortalityCY,
        infantLeadingCausesMorbidityCY: pageData.infantLeadingCausesMorbidityCY,
        infantMortalityCause1: pageData.infantMortalityCause1,
        infantMortalityCause2: pageData.infantMortalityCause2,
        infantMortalityCause3: pageData.infantMortalityCause3,
        infantMortalityNum1: pageData.infantMortalityNum1,
        infantMortalityNum2: pageData.infantMortalityNum2,
        infantMortalityNum3: pageData.infantMortalityNum3,
        infantMorbidityFeverNum: pageData.infantMorbidityFeverNum,
        infantMorbidityCoughNum: pageData.infantMorbidityCoughNum,
        infantMorbidityMalnutritionNum: pageData.infantMorbidityMalnutritionNum,
        infantMorbidityDiarrheaNum: pageData.infantMorbidityDiarrheaNum,
        infantMorbidityTCPrimaryComplexNum:
            pageData.infantMorbidityTCPrimaryComplexNum,

        causeEarlyNeonatalDeathsCY: pageData.causeEarlyNeonatalDeathsCY,
        causeEarlyNeonatalCause1: pageData.causeEarlyNeonatalCause1,
        causeEarlyNeonatalCause2: pageData.causeEarlyNeonatalCause2,
        causeEarlyNeonatalCause3: pageData.causeEarlyNeonatalCause3,
        causeEarlyNeonatalNum1: pageData.causeEarlyNeonatalNum1,
        causeEarlyNeonatalNum2: pageData.causeEarlyNeonatalNum2,
        causeEarlyNeonatalNum3: pageData.causeEarlyNeonatalNum3,
        causeMaternalDeathsCY: pageData.causeMaternalDeathsCY,
        causeMaternalCause1: pageData.causeMaternalCause1,
        causeMaternalCause2: pageData.causeMaternalCause2,
        causeMaternalCause3: pageData.causeMaternalCause3,
        causeMaternalNum1: pageData.causeMaternalNum1,
        causeMaternalNum2: pageData.causeMaternalNum2,
        causeMaternalNum3: pageData.causeMaternalNum3,
        healthClinicsHospitalName1: pageData.healthClinicsHospitalName1,
        healthClinicsHospitalName2: pageData.healthClinicsHospitalName2,
        healthClinicsHospitalName3: pageData.healthClinicsHospitalName3,
        healthClinicsHospitalName4: pageData.healthClinicsHospitalName4,
        healthClinicsHospitalNumGov1: pageData.healthClinicsHospitalNumGov1,
        healthClinicsHospitalNumGov2: pageData.healthClinicsHospitalNumGov2,
        healthClinicsHospitalNumGov3: pageData.healthClinicsHospitalNumGov3,
        healthClinicsHospitalNumGov4: pageData.healthClinicsHospitalNumGov4,
        healthClinicsHospitalNumPrivate1:
            pageData.healthClinicsHospitalNumPrivate1,
        healthClinicsHospitalNumPrivate2:
            pageData.healthClinicsHospitalNumPrivate2,
        healthClinicsHospitalNumPrivate3:
            pageData.healthClinicsHospitalNumPrivate3,
        healthClinicsHospitalNumPrivate4:
            pageData.healthClinicsHospitalNumPrivate4,
        medicalHealthPersonnelDoctorNumGov:
            pageData.medicalHealthPersonnelDoctorNumGov,
        medicalHealthPersonnelNurseNumGov:
            pageData.medicalHealthPersonnelNurseNumGov,
        medicalHealthPersonnelMidwifeNumGov:
            pageData.medicalHealthPersonnelMidwifeNumGov,
        medicalHealthPersonnelBHWNumGov:
            pageData.medicalHealthPersonnelBHWNumGov,
        medicalHealthPersonnelDoctorNumPrivate:
            pageData.medicalHealthPersonnelDoctorNumPrivate,
        medicalHealthPersonnelNurseNumPrivate:
            pageData.medicalHealthPersonnelNurseNumPrivate,
        medicalHealthPersonnelMidwifeNumPrivate:
            pageData.medicalHealthPersonnelMidwifeNumPrivate,
        medicalHealthPersonnelBHWNumPrivate:
            pageData.medicalHealthPersonnelBHWNumPrivate,
        medicalServiceType1: pageData.medicalServiceType1,
        medicalServiceType2: pageData.medicalServiceType2,
        medicalServiceType3: pageData.medicalServiceType3,
        medicalServiceType4: pageData.medicalServiceType4,
        medicalServiceFrequency1: pageData.medicalServiceFrequency1,
        medicalServiceFrequency2: pageData.medicalServiceFrequency2,
        medicalServiceFrequency3: pageData.medicalServiceFrequency3,
        medicalServiceFrequency4: pageData.medicalServiceFrequency4,
        disposalTrucks: pageData.disposalTrucks,
        disposalOpenPit: pageData.disposalOpenPit,
        disposalBurying: pageData.disposalBurying,
        disposalBurning: pageData.disposalBurning,
        disposalThrowAnywhere: pageData.disposalThrowAnywhere,
        disposalOthersSpecify: pageData.disposalOthersSpecify,
        disposalOthers: pageData.disposalOthers,

        sourceIncomeCY1: pageData.sourceIncomeCY1,
        sourceIncomeCY2: pageData.sourceIncomeCY2,
        sourceIncomeAmount1CY1: pageData.sourceIncomeAmount1CY1,
        sourceIncomeAmount1CY2: pageData.sourceIncomeAmount1CY2,
        sourceIncomeAmount2CY1: pageData.sourceIncomeAmount2CY1,
        sourceIncomeAmount2CY2: pageData.sourceIncomeAmount2CY2,
        sourceIncomeAmount3CY1: pageData.sourceIncomeAmount3CY1,
        sourceIncomeAmount3CY2: pageData.sourceIncomeAmount3CY2,
        sourceIncomeAmount4CY1: pageData.sourceIncomeAmount4CY1,
        sourceIncomeAmount4CY2: pageData.sourceIncomeAmount4CY2,
        sourceIncomeAmount5CY1: pageData.sourceIncomeAmount5CY1,
        sourceIncomeAmount5CY2: pageData.sourceIncomeAmount5CY2,
        sourceIncomeAmount6CY1: pageData.sourceIncomeAmount6CY1,
        sourceIncomeAmount6CY2: pageData.sourceIncomeAmount6CY2,
        sourceIncomeAmount7CY1: pageData.sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2: pageData.sourceIncomeAmount7CY2,
        sourceIncomeAmount7CY1: pageData.sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2: pageData.sourceIncomeAmount7CY2,
        sourceIncomeAmount8CY1: pageData.sourceIncomeAmount8CY1,
        sourceIncomeAmount8CY2: pageData.sourceIncomeAmount8CY2,
        sourceIncomeAmount9CY1: pageData.sourceIncomeAmount9CY1,
        sourceIncomeAmount9CY2: pageData.sourceIncomeAmount9CY2,
        sourceIncomeAmount10CY1: pageData.sourceIncomeAmount10CY1,
        sourceIncomeAmount10CY2: pageData.sourceIncomeAmount10CY2,
        sourceIncomeAmountTotalCY1: pageData.sourceIncomeAmountTotalCY1,
        sourceIncomeAmountTotalCY2: pageData.sourceIncomeAmountTotalCY2,
        actualExpendituresCY1: pageData.actualExpendituresCY1,
        actualExpendituresCY2: pageData.actualExpendituresCY2,
        actualExpendituresAmount1CY1: pageData.actualExpendituresAmount1CY1,
        actualExpendituresAmount1CY2: pageData.actualExpendituresAmount1CY2,
        actualExpendituresAmount2CY1: pageData.actualExpendituresAmount2CY1,
        actualExpendituresAmount2CY2: pageData.actualExpendituresAmount2CY2,
        actualExpendituresAmount3CY1: pageData.actualExpendituresAmount3CY1,
        actualExpendituresAmount3CY2: pageData.actualExpendituresAmount3CY2,
        actualExpendituresAmountTotalCY1:
            pageData.actualExpendituresAmountTotalCY1,
        actualExpendituresAmountTotalCY2:
            pageData.actualExpendituresAmountTotalCY2,
        governanceOwnedFacilities1: pageData.governanceOwnedFacilities1,
        governanceOwnedFacilities2: pageData.governanceOwnedFacilities2,
        governanceOwnedFacilities3: pageData.governanceOwnedFacilities3,
        governanceOwnedFacilities4: pageData.governanceOwnedFacilities4,
        governanceOwnedFacilities5: pageData.governanceOwnedFacilities5,
        governanceOwnedFacilities6: pageData.governanceOwnedFacilities6,
        governanceOwnedFacilities7: pageData.governanceOwnedFacilities7,
        governanceOwnedFacilities8: pageData.governanceOwnedFacilities8,
        governanceOwnedFacilities8StateOwnership:
            pageData.governanceOwnedFacilities8StateOwnership,
        governanceOwnedFacilities9: pageData.governanceOwnedFacilities9,
        governanceOwnedFacilities9StateOwnership:
            pageData.governanceOwnedFacilities9StateOwnership,
        governanceOwnedFacilities10: pageData.governanceOwnedFacilities10,
        governanceOwnedFacilities11: pageData.governanceOwnedFacilities11,
        governanceOwnedFacilities12: pageData.governanceOwnedFacilities12,
        governanceOwnedFacilities12Specify:
            pageData.governanceOwnedFacilities12Specify,
        barangayGovSupportOrgNum1: pageData.barangayGovSupportOrgNum1,
        barangayGovSupportOrgNum2: pageData.barangayGovSupportOrgNum2,
        barangayGovSupportOrgNum3: pageData.barangayGovSupportOrgNum3,
        barangayGovSupportOrgNum4: pageData.barangayGovSupportOrgNum4,
        barangayGovSupportOrgNum5: pageData.barangayGovSupportOrgNum5,
        barangayGovSupportOrgNum6: pageData.barangayGovSupportOrgNum6,
        barangayGovSupportOrgNum7: pageData.barangayGovSupportOrgNum7,
        barangayGovSupportOrgNum7Specify:
            pageData.barangayGovSupportOrgNum7Specify,
        barangayGovSupportOrgNum8: pageData.barangayGovSupportOrgNum8,
        barangayGovSupportOrgNum8Specify:
            pageData.barangayGovSupportOrgNum8Specify,
        barangayGovSupportOrgNum9: pageData.barangayGovSupportOrgNum9,
        barangayGovSupportOrgNum10: pageData.barangayGovSupportOrgNum10,
        barangayGovSupportOrgNum11: pageData.barangayGovSupportOrgNum11,
        barangayGovSupportOrgNum12: pageData.barangayGovSupportOrgNum12,
        signatureOverPrintedName: pageData.signatureOverPrintedName,
        position: pageData.position,
        date1: pageData.date1,
        barangayCaptain: pageData.barangayCaptain,
        date2: pageData.date2,
    });

    const handleChange = (e) => {
        setValues((previousValues) => ({
            ...previousValues,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeBoolean = (e) => {
        setValues((previousValues) => ({
            ...previousValues,
            [e.target.name]: e.target.checked,
        }));
    };

    const handleScroll = () => {
        const position = window.pageYOffset + 68;
        setScrollPosition(position);

        if (
            position >= page1Ref.current?.offsetTop &&
            page2Ref.current.offsetTop > position
        ) {
            setPage1(true);
        } else {
            setPage1(false);
        }

        if (
            position >= page2Ref.current?.offsetTop &&
            page3Ref.current.offsetTop > position
        ) {
            setPage2(true);
        } else {
            setPage2(false);
        }

        if (position >= page3Ref.current?.offsetTop) {
            setPage3(true);
        } else {
            setPage3(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const updateBarangayProfileShortened = async () => {
        const data = {
            totalLandArea: values.totalLandArea,
            totalPopulation: values.totalPopulation,
            totalPopulationMale: values.totalPopulationMale,
            totalPopulationFemale: values.totalPopulationFemale,
            totalPopulationBoth: values.totalPopulationBoth,
            male1: values.male1,
            male2: values.male2,
            male3: values.male3,
            male4: values.male4,
            male5: values.male5,
            male6: values.male6,
            male7: values.male7,
            male8: values.male8,
            male9: values.male9,
            male10: values.male10,
            male11: values.male11,
            male12: values.male12,
            male13: values.male13,
            male14: values.male14,
            male15: values.male15,
            male16: values.male16,
            male17: values.male17,
            male18: values.male18,
            male19: values.male19,
            male20: values.male20,
            female1: values.female1,
            female2: values.female2,
            female3: values.female3,
            female4: values.female4,
            female5: values.female5,
            female6: values.female6,
            female7: values.female7,
            female8: values.female8,
            female9: values.female9,
            female10: values.female10,
            female11: values.female11,
            female12: values.female12,
            female13: values.female13,
            female14: values.female14,
            female15: values.female15,
            female16: values.female16,
            female17: values.female17,
            female18: values.female18,
            female19: values.female19,
            female20: values.female20,
            both1: values.both1,
            both2: values.both2,
            both3: values.both3,
            both4: values.both4,
            both5: values.both5,
            both6: values.both6,
            both7: values.both7,
            both8: values.both8,
            both9: values.both9,
            both10: values.both10,
            both11: values.both11,
            both12: values.both12,
            both13: values.both13,
            both14: values.both14,
            both15: values.both15,
            both16: values.both16,
            both17: values.both17,
            both18: values.both18,
            both19: values.both19,
            both20: values.both20,
            totalMale: values.totalMale,
            totalFemale: values.totalFemale,
            totalBoth: values.totalBoth,
            totalHouseholdsCY: values.totalHouseholdsCY,
            totalHouseholds: values.totalHouseholds,

            numBakery: values.numBakery,
            numGrocery: values.numGrocery,
            numIceCream: values.numIceCream,
            numSariSariStore: values.numSariSariStore,
            numNativeDelicacies: values.numNativeDelicacies,
            numHardwareElectrical: values.numHardwareElectrical,
            numSweetPreserves: values.numSweetPreserves,
            numConstructionConcrete: values.numConstructionConcrete,
            numSitcharon: values.numSitcharon,
            numCarJeepPartsSupplies: values.numCarJeepPartsSupplies,
            numNoodles: values.numNoodles,
            numMotorcyclesBicyclesSupplies:
                values.numMotorcyclesBicyclesSupplies,
            numBalut: values.numBalut,
            numAgriculturalEquipmentSupplies:
                values.numAgriculturalEquipmentSupplies,
            numVinegar: values.numVinegar,
            numSchoolOfficeSupplies: values.numSchoolOfficeSupplies,
            numFishDryingSmoking: values.numFishDryingSmoking,
            numPhotoCenterSupplies: values.numPhotoCenterSupplies,
            numLaboratories: values.numLaboratories,
            numAppliance: values.numAppliance,
            numChemicalIndustries: values.numChemicalIndustries,
            numJewelryShopStore: values.numJewelryShopStore,
            numFeedmills: values.numFeedmills,
            numBagsFootwearStore: values.numBagsFootwearStore,
            numGarmentEmbroidery: values.numGarmentEmbroidery,
            numVideoTapesCenter: values.numVideoTapesCenter,
            numFootwearFactories: values.numFootwearFactories,
            numBazaars: values.numBazaars,
            numTextileMills: values.numTextileMills,
            numPrintingPress: values.numPrintingPress,
            numBagsWalletFactories: values.numBagsWalletFactories,
            numPawnshop: values.numPawnshop,
            numFurnitureWooden: values.numFurnitureWooden,
            numFurnitureRattan: values.numFurnitureRattan,
            numFurnitureBamboo: values.numFurnitureBamboo,
            numFurnitureMetal: values.numFurnitureMetal,
            numFuneralParlor: values.numFuneralParlor,
            numDrugStore: values.numDrugStore,
            numPublicMarket: values.numPublicMarket,
            numTalipapa: values.numTalipapa,
            numCinema: values.numCinema,
            numPaperManufacturing: values.numPaperManufacturing,
            numCockpit: values.numCockpit,
            numCementManufacturing: values.numCementManufacturing,
            numFinancialInstitutions: values.numFinancialInstitutions,
            numHallowBlocksMaking: values.numHallowBlocksMaking,
            numRestaurants: values.numRestaurants,
            numMarbleCraft: values.numMarbleCraft,
            numRealEstate: values.numRealEstate,
            numBlacksmith: values.numBlacksmith,
            numNightClubBarMassage: values.numNightClubBarMassage,
            numIronMetalCraft: values.numIronMetalCraft,
            numMemorialParks: values.numMemorialParks,
            numEngineeringWorkMachineShop: values.numEngineeringWorkMachineShop,
            numInsurance: values.numInsurance,
            numJewelryManufacturingGoldsmith:
                values.numJewelryManufacturingGoldsmith,
            numGasolineStation: values.numGasolineStation,
            numCeramicsPottery: values.numCeramicsPottery,
            numGeneralServiceContractors: values.numGeneralServiceContractors,
            numWoodcraft: values.numWoodcraft,
            numArrastreServices: values.numArrastreServices,
            numEngraving: values.numEngraving,
            numBodyWorkshop: values.numBodyWorkshop,
            numFashionAccessories: values.numFashionAccessories,
            numFitnessGym: values.numFitnessGym,
            numOthersManufacturing: values.numOthersManufacturing,
            numOthersManufacturingSpecify: values.numOthersManufacturingSpecify,
            numBeautyParlorBarberShop: values.numBeautyParlorBarberShop,
            numCooperativeRiceGrowers: values.numCooperativeRiceGrowers,
            numOthersCommercial: values.numOthersCommercial,
            numOthersCommercialSpecify: values.numOthersCommercialSpecify,

            totalNumBirths: values.totalNumBirths,
            totalNumDeathsAllCauses: values.totalNumDeathsAllCauses,
            totalNumStillBirth: values.totalNumStillBirth,
            totalNumInfantDeaths: values.totalNumInfantDeaths,
            totalNumEarlyNeonatalDeaths: values.totalNumEarlyNeonatalDeaths,
            fiveLeadingCausesMortalityCY: values.fiveLeadingCausesMortalityCY,
            fiveLeadingMorbidityCY: values.fiveLeadingMorbidityCY,
            causeCardiovascularDisorder: values.causeCardiovascularDisorder,
            causeCancer: values.causeCancer,
            causeOldAge: values.causeOldAge,
            causeKidneyFailure: values.causeKidneyFailure,
            causeTB: values.causeTB,
            causeFeverFlu: values.causeFeverFlu,
            causeCough: values.causeCough,
            causeAsthma: values.causeAsthma,
            causeHypertension: values.causeHypertension,
            causePTB: values.causePTB,
            infantLeadingCausesMortalityCY:
                values.infantLeadingCausesMortalityCY,
            infantLeadingCausesMorbidityCY:
                values.infantLeadingCausesMorbidityCY,
            infantMortalityCause1: values.infantMortalityCause1,
            infantMortalityCause2: values.infantMortalityCause2,
            infantMortalityCause3: values.infantMortalityCause3,
            infantMortalityNum1: values.infantMortalityNum1,
            infantMortalityNum2: values.infantMortalityNum2,
            infantMortalityNum3: values.infantMortalityNum3,
            infantMorbidityFeverNum: values.infantMorbidityFeverNum,
            infantMorbidityCoughNum: values.infantMorbidityCoughNum,
            infantMorbidityMalnutritionNum:
                values.infantMorbidityMalnutritionNum,
            infantMorbidityDiarrheaNum: values.infantMorbidityDiarrheaNum,
            infantMorbidityTCPrimaryComplexNum:
                values.infantMorbidityTCPrimaryComplexNum,

            causeEarlyNeonatalDeathsCY: values.causeEarlyNeonatalDeathsCY,
            causeEarlyNeonatalCause1: values.causeEarlyNeonatalCause1,
            causeEarlyNeonatalCause2: values.causeEarlyNeonatalCause2,
            causeEarlyNeonatalCause3: values.causeEarlyNeonatalCause3,
            causeEarlyNeonatalNum1: values.causeEarlyNeonatalNum1,
            causeEarlyNeonatalNum2: values.causeEarlyNeonatalNum2,
            causeEarlyNeonatalNum3: values.causeEarlyNeonatalNum3,
            causeMaternalDeathsCY: values.causeMaternalDeathsCY,
            causeMaternalCause1: values.causeMaternalCause1,
            causeMaternalCause2: values.causeMaternalCause2,
            causeMaternalCause3: values.causeMaternalCause3,
            causeMaternalNum1: values.causeMaternalNum1,
            causeMaternalNum2: values.causeMaternalNum2,
            causeMaternalNum3: values.causeMaternalNum3,
            healthClinicsHospitalName1: values.healthClinicsHospitalName1,
            healthClinicsHospitalName2: values.healthClinicsHospitalName2,
            healthClinicsHospitalName3: values.healthClinicsHospitalName3,
            healthClinicsHospitalName4: values.healthClinicsHospitalName4,
            healthClinicsHospitalNumGov1: values.healthClinicsHospitalNumGov1,
            healthClinicsHospitalNumGov2: values.healthClinicsHospitalNumGov2,
            healthClinicsHospitalNumGov3: values.healthClinicsHospitalNumGov3,
            healthClinicsHospitalNumGov4: values.healthClinicsHospitalNumGov4,
            healthClinicsHospitalNumPrivate1:
                values.healthClinicsHospitalNumPrivate1,
            healthClinicsHospitalNumPrivate2:
                values.healthClinicsHospitalNumPrivate2,
            healthClinicsHospitalNumPrivate3:
                values.healthClinicsHospitalNumPrivate3,
            healthClinicsHospitalNumPrivate4:
                values.healthClinicsHospitalNumPrivate4,
            medicalHealthPersonnelDoctorNumGov:
                values.medicalHealthPersonnelDoctorNumGov,
            medicalHealthPersonnelNurseNumGov:
                values.medicalHealthPersonnelNurseNumGov,
            medicalHealthPersonnelMidwifeNumGov:
                values.medicalHealthPersonnelMidwifeNumGov,
            medicalHealthPersonnelBHWNumGov:
                values.medicalHealthPersonnelBHWNumGov,
            medicalHealthPersonnelDoctorNumPrivate:
                values.medicalHealthPersonnelDoctorNumPrivate,
            medicalHealthPersonnelNurseNumPrivate:
                values.medicalHealthPersonnelNurseNumPrivate,
            medicalHealthPersonnelMidwifeNumPrivate:
                values.medicalHealthPersonnelMidwifeNumPrivate,
            medicalHealthPersonnelBHWNumPrivate:
                values.medicalHealthPersonnelBHWNumPrivate,
            medicalServiceType1: values.medicalServiceType1,
            medicalServiceType2: values.medicalServiceType2,
            medicalServiceType3: values.medicalServiceType3,
            medicalServiceType4: values.medicalServiceType4,
            medicalServiceFrequency1: values.medicalServiceFrequency1,
            medicalServiceFrequency2: values.medicalServiceFrequency2,
            medicalServiceFrequency3: values.medicalServiceFrequency3,
            medicalServiceFrequency4: values.medicalServiceFrequency4,
            disposalTrucks: values.disposalTrucks,
            disposalOpenPit: values.disposalOpenPit,
            disposalBurying: values.disposalBurying,
            disposalBurning: values.disposalBurning,
            disposalThrowAnywhere: values.disposalThrowAnywhere,
            disposalOthersSpecify: values.disposalOthersSpecify,
            disposalOthers: values.disposalOthers,

            sourceIncomeCY1: values.sourceIncomeCY1,
            sourceIncomeCY2: values.sourceIncomeCY2,
            sourceIncomeAmount1CY1: values.sourceIncomeAmount1CY1,
            sourceIncomeAmount1CY2: values.sourceIncomeAmount1CY2,
            sourceIncomeAmount2CY1: values.sourceIncomeAmount2CY1,
            sourceIncomeAmount2CY2: values.sourceIncomeAmount2CY2,
            sourceIncomeAmount3CY1: values.sourceIncomeAmount3CY1,
            sourceIncomeAmount3CY2: values.sourceIncomeAmount3CY2,
            sourceIncomeAmount4CY1: values.sourceIncomeAmount4CY1,
            sourceIncomeAmount4CY2: values.sourceIncomeAmount4CY2,
            sourceIncomeAmount5CY1: values.sourceIncomeAmount5CY1,
            sourceIncomeAmount5CY2: values.sourceIncomeAmount5CY2,
            sourceIncomeAmount6CY1: values.sourceIncomeAmount6CY1,
            sourceIncomeAmount6CY2: values.sourceIncomeAmount6CY2,
            sourceIncomeAmount7CY1: values.sourceIncomeAmount7CY1,
            sourceIncomeAmount7CY2: values.sourceIncomeAmount7CY2,
            sourceIncomeAmount7CY1: values.sourceIncomeAmount7CY1,
            sourceIncomeAmount7CY2: values.sourceIncomeAmount7CY2,
            sourceIncomeAmount8CY1: values.sourceIncomeAmount8CY1,
            sourceIncomeAmount8CY2: values.sourceIncomeAmount8CY2,
            sourceIncomeAmount9CY1: values.sourceIncomeAmount9CY1,
            sourceIncomeAmount9CY2: values.sourceIncomeAmount9CY2,
            sourceIncomeAmount10CY1: values.sourceIncomeAmount10CY1,
            sourceIncomeAmount10CY2: values.sourceIncomeAmount10CY2,
            sourceIncomeAmountTotalCY1: values.sourceIncomeAmountTotalCY1,
            sourceIncomeAmountTotalCY2: values.sourceIncomeAmountTotalCY2,
            actualExpendituresCY1: values.actualExpendituresCY1,
            actualExpendituresCY2: values.actualExpendituresCY2,
            actualExpendituresAmount1CY1: values.actualExpendituresAmount1CY1,
            actualExpendituresAmount1CY2: values.actualExpendituresAmount1CY2,
            actualExpendituresAmount2CY1: values.actualExpendituresAmount2CY1,
            actualExpendituresAmount2CY2: values.actualExpendituresAmount2CY2,
            actualExpendituresAmount3CY1: values.actualExpendituresAmount3CY1,
            actualExpendituresAmount3CY2: values.actualExpendituresAmount3CY2,
            actualExpendituresAmountTotalCY1:
                values.actualExpendituresAmountTotalCY1,
            actualExpendituresAmountTotalCY2:
                values.actualExpendituresAmountTotalCY2,
            governanceOwnedFacilities1: values.governanceOwnedFacilities1,
            governanceOwnedFacilities2: values.governanceOwnedFacilities2,
            governanceOwnedFacilities3: values.governanceOwnedFacilities3,
            governanceOwnedFacilities4: values.governanceOwnedFacilities4,
            governanceOwnedFacilities5: values.governanceOwnedFacilities5,
            governanceOwnedFacilities6: values.governanceOwnedFacilities6,
            governanceOwnedFacilities7: values.governanceOwnedFacilities7,
            governanceOwnedFacilities8: values.governanceOwnedFacilities8,
            governanceOwnedFacilities8StateOwnership:
                values.governanceOwnedFacilities8StateOwnership,
            governanceOwnedFacilities9: values.governanceOwnedFacilities9,
            governanceOwnedFacilities9StateOwnership:
                values.governanceOwnedFacilities9StateOwnership,
            governanceOwnedFacilities10: values.governanceOwnedFacilities10,
            governanceOwnedFacilities11: values.governanceOwnedFacilities11,
            governanceOwnedFacilities12: values.governanceOwnedFacilities12,
            governanceOwnedFacilities12Specify:
                values.governanceOwnedFacilities12Specify,
            barangayGovSupportOrgNum1: values.barangayGovSupportOrgNum1,
            barangayGovSupportOrgNum2: values.barangayGovSupportOrgNum2,
            barangayGovSupportOrgNum3: values.barangayGovSupportOrgNum3,
            barangayGovSupportOrgNum4: values.barangayGovSupportOrgNum4,
            barangayGovSupportOrgNum5: values.barangayGovSupportOrgNum5,
            barangayGovSupportOrgNum6: values.barangayGovSupportOrgNum6,
            barangayGovSupportOrgNum7: values.barangayGovSupportOrgNum7,
            barangayGovSupportOrgNum7Specify:
                values.barangayGovSupportOrgNum7Specify,
            barangayGovSupportOrgNum8: values.barangayGovSupportOrgNum8,
            barangayGovSupportOrgNum8Specify:
                values.barangayGovSupportOrgNum8Specify,
            barangayGovSupportOrgNum9: values.barangayGovSupportOrgNum9,
            barangayGovSupportOrgNum10: values.barangayGovSupportOrgNum10,
            barangayGovSupportOrgNum11: values.barangayGovSupportOrgNum11,
            barangayGovSupportOrgNum12: values.barangayGovSupportOrgNum12,
            signatureOverPrintedName: values.signatureOverPrintedName,
            position: values.position,
            date1: values.date1,
            barangayCaptain: values.barangayCaptain,
            date2: values.date2,
        };

        await Axios.put(
            "http://localhost:3001/shortenedSubmission/updateShortenedBarangayProfile",
            data
        );
    };

    const createPDF = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        let scImg = null;

        await htmlToImage
            .toJpeg(contentRef.current, {
                pixelRatio: 1,
            })
            .then(function (dataUrl) {
                let img = new Image();
                img.src = dataUrl;
                scImg = img;
            });

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [14, 8.5],
        });

        const formPages = contentRef.current.children.length;
        const pdfHeight2 = pdf.internal.pageSize.getHeight();
        const imgProperties = pdf.getImageProperties(scImg);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(scImg, "JPEG", 0, 0, pdfWidth, pdfHeight);

        let i = 1;

        while (formPages > i) {
            pdf.addPage();
            pdf.addImage(
                scImg,
                "JPEG",
                0,
                -(pdfHeight2 * i + 0.125 * i),
                pdfWidth,
                pdfHeight
            );
            i += 1;
        }

        const pdfAttachment = new File(
            [pdf.output("blob")],
            `BarangayProfile${selectedBarangay.selectedBarangay}${selectedBarangay.selectedDistrict}${selectedBarangay.yearSubmitted}.pdf`,
            {
                type: pdf.output("blob").type,
                lastModified: pdf.output("blob").lastModified,
            }
        );

        const submissionName = `ShortenedBarangayProfile${selectedBarangay.selectedBarangay}${selectedBarangay.selectedDistrict}${selectedBarangay.yearSubmitted}.pdf`;

        const submissionRef = ref(
            storage,
            `shortenedSubmission/barangayProfile/${submissionName}`
        );

        await uploadBytes(submissionRef, pdfAttachment);
        const shortenedBarangayProfileUrl = await getDownloadURL(submissionRef);

        const data = {
            yearSubmitted: yearSubmitted,
            totalLandArea: values.totalLandArea,
            totalPopulation: values.totalPopulation,
            totalPopulationMale: values.totalPopulationMale,
            totalPopulationFemale: values.totalPopulationFemale,
            totalPopulationBoth: values.totalPopulationBoth,
            male1: values.male1,
            male2: values.male2,
            male3: values.male3,
            male4: values.male4,
            male5: values.male5,
            male6: values.male6,
            male7: values.male7,
            male8: values.male8,
            male9: values.male9,
            male10: values.male10,
            male11: values.male11,
            male12: values.male12,
            male13: values.male13,
            male14: values.male14,
            male15: values.male15,
            male16: values.male16,
            male17: values.male17,
            male18: values.male18,
            male19: values.male19,
            male20: values.male20,
            female1: values.female1,
            female2: values.female2,
            female3: values.female3,
            female4: values.female4,
            female5: values.female5,
            female6: values.female6,
            female7: values.female7,
            female8: values.female8,
            female9: values.female9,
            female10: values.female10,
            female11: values.female11,
            female12: values.female12,
            female13: values.female13,
            female14: values.female14,
            female15: values.female15,
            female16: values.female16,
            female17: values.female17,
            female18: values.female18,
            female19: values.female19,
            female20: values.female20,
            both1: values.both1,
            both2: values.both2,
            both3: values.both3,
            both4: values.both4,
            both5: values.both5,
            both6: values.both6,
            both7: values.both7,
            both8: values.both8,
            both9: values.both9,
            both10: values.both10,
            both11: values.both11,
            both12: values.both12,
            both13: values.both13,
            both14: values.both14,
            both15: values.both15,
            both16: values.both16,
            both17: values.both17,
            both18: values.both18,
            both19: values.both19,
            both20: values.both20,
            totalBoth: values.totalBoth,
            totalHouseholdsCY: values.totalHouseholdsCY,
            totalHouseholds: values.totalHouseholds,
            numBakery: values.numBakery,
            numGrocery: values.numGrocery,
            numIceCream: values.numIceCream,
            numSariSariStore: values.numSariSariStore,
            numNativeDelicacies: values.numNativeDelicacies,
            numHardwareElectrical: values.numHardwareElectrical,
            numSweetPreserves: values.numSweetPreserves,
            numConstructionConcrete: values.numConstructionConcrete,
            numSitcharon: values.numSitcharon,
            numCarJeepPartsSupplies: values.numCarJeepPartsSupplies,
            numNoodles: values.numNoodles,
            numMotorcyclesBicyclesSupplies:
                values.numMotorcyclesBicyclesSupplies,
            numBalut: values.numBalut,
            numAgriculturalEquipmentSupplies:
                values.numAgriculturalEquipmentSupplies,
            numVinegar: values.numVinegar,
            numSchoolOfficeSupplies: values.numSchoolOfficeSupplies,
            numFishDryingSmoking: values.numFishDryingSmoking,
            numPhotoCenterSupplies: values.numPhotoCenterSupplies,
            numLaboratories: values.numLaboratories,
            numAppliance: values.numAppliance,
            numChemicalIndustries: values.numChemicalIndustries,
            numJewelryShopStore: values.numJewelryShopStore,
            numFeedmills: values.numFeedmills,
            numBagsFootwearStore: values.numBagsFootwearStore,
            numGarmentEmbroidery: values.numGarmentEmbroidery,
            numVideoTapesCenter: values.numVideoTapesCenter,
            numFootwearFactories: values.numFootwearFactories,
            numBazaars: values.numBazaars,
            numTextileMills: values.numTextileMills,
            numPrintingPress: values.numPrintingPress,
            numBagsWalletFactories: values.numBagsWalletFactories,
            numPawnshop: values.numPawnshop,
            numFurnitureWooden: values.numFurnitureWooden,
            numFurnitureRattan: values.numFurnitureRattan,
            numFurnitureBamboo: values.numFurnitureBamboo,
            numFurnitureMetal: values.numFurnitureMetal,
            numFuneralParlor: values.numFuneralParlor,
            numDrugStore: values.numDrugStore,
            numPublicMarket: values.numPublicMarket,
            numTalipapa: values.numTalipapa,
            numCinema: values.numCinema,
            numPaperManufacturing: values.numPaperManufacturing,
            numCockpit: values.numCockpit,
            numCementManufacturing: values.numCementManufacturing,
            numFinancialInstitutions: values.numFinancialInstitutions,
            numHallowBlocksMaking: values.numHallowBlocksMaking,
            numRestaurants: values.numRestaurants,
            numMarbleCraft: values.numMarbleCraft,
            numRealEstate: values.numRealEstate,
            numBlacksmith: values.numBlacksmith,
            numNightClubBarMassage: values.numNightClubBarMassage,
            numIronMetalCraft: values.numIronMetalCraft,
            numMemorialParks: values.numMemorialParks,
            numEngineeringWorkMachineShop: values.numEngineeringWorkMachineShop,
            numInsurance: values.numInsurance,
            numJewelryManufacturingGoldsmith:
                values.numJewelryManufacturingGoldsmith,
            numGasolineStation: values.numGasolineStation,
            numCeramicsPottery: values.numCeramicsPottery,
            numGeneralServiceContractors: values.numGeneralServiceContractors,
            numWoodcraft: values.numWoodcraft,
            numArrastreServices: values.numArrastreServices,
            numEngraving: values.numEngraving,
            numBodyWorkshop: values.numBodyWorkshop,
            numFashionAccessories: values.numFashionAccessories,
            numFitnessGym: values.numFitnessGym,
            numOthersManufacturing: values.numOthersManufacturing,
            numOthersManufacturingSpecify: values.numOthersManufacturingSpecify,
            numBeautyParlorBarberShop: values.numBeautyParlorBarberShop,
            numCooperativeRiceGrowers: values.numCooperativeRiceGrowers,
            numOthersCommercial: values.numOthersCommercial,
            numOthersCommercialSpecify: values.numOthersCommercialSpecify,
            totalNumBirths: values.totalNumBirths,
            totalNumDeathsAllCauses: values.totalNumDeathsAllCauses,
            totalNumStillBirth: values.totalNumStillBirth,
            totalNumInfantDeaths: values.totalNumInfantDeaths,
            totalNumEarlyNeonatalDeaths: values.totalNumEarlyNeonatalDeaths,
            fiveLeadingCausesMortalityCY: values.fiveLeadingCausesMortalityCY,
            fiveLeadingMorbidityCY: values.fiveLeadingMorbidityCY,
            causeCardiovascularDisorder: values.causeCardiovascularDisorder,
            causeCancer: values.causeCancer,
            causeOldAge: values.causeOldAge,
            causeKidneyFailure: values.causeKidneyFailure,
            causeTB: values.causeTB,
            causeFeverFlu: values.causeFeverFlu,
            causeCough: values.causeCough,
            causeAsthma: values.causeAsthma,
            causeHypertension: values.causeHypertension,
            causePTB: values.causePTB,
            infantLeadingCausesMortalityCY:
                values.infantLeadingCausesMortalityCY,
            infantLeadingCausesMorbidityCY:
                values.infantLeadingCausesMorbidityCY,
            infantMortalityCause1: values.infantMortalityCause1,
            infantMortalityCause2: values.infantMortalityCause2,
            infantMortalityCause3: values.infantMortalityCause3,
            infantMortalityNum1: values.infantMortalityNum1,
            infantMortalityNum2: values.infantMortalityNum2,
            infantMortalityNum3: values.infantMortalityNum3,
            infantMorbidityFeverNum: values.infantMorbidityFeverNum,
            infantMorbidityCoughNum: values.infantMorbidityCoughNum,
            infantMorbidityMalnutritionNum:
                values.infantMorbidityMalnutritionNum,
            infantMorbidityDiarrheaNum: values.infantMorbidityDiarrheaNum,
            infantMorbidityTCPrimaryComplexNum:
                values.infantMorbidityTCPrimaryComplexNum,

            causeEarlyNeonatalDeathsCY: values.causeEarlyNeonatalDeathsCY,
            causeEarlyNeonatalCause1: values.causeEarlyNeonatalCause1,
            causeEarlyNeonatalCause2: values.causeEarlyNeonatalCause2,
            causeEarlyNeonatalCause3: values.causeEarlyNeonatalCause3,
            causeEarlyNeonatalNum1: values.causeEarlyNeonatalNum1,
            causeEarlyNeonatalNum2: values.causeEarlyNeonatalNum2,
            causeEarlyNeonatalNum3: values.causeEarlyNeonatalNum3,
            causeMaternalDeathsCY: values.causeMaternalDeathsCY,
            causeMaternalCause1: values.causeMaternalCause1,
            causeMaternalCause2: values.causeMaternalCause2,
            causeMaternalCause3: values.causeMaternalCause3,
            causeMaternalNum1: values.causeMaternalNum1,
            causeMaternalNum2: values.causeMaternalNum2,
            causeMaternalNum3: values.causeMaternalNum3,
            healthClinicsHospitalName1: values.healthClinicsHospitalName1,
            healthClinicsHospitalName2: values.healthClinicsHospitalName2,
            healthClinicsHospitalName3: values.healthClinicsHospitalName3,
            healthClinicsHospitalName4: values.healthClinicsHospitalName4,
            healthClinicsHospitalNumGov1: values.healthClinicsHospitalNumGov1,
            healthClinicsHospitalNumGov2: values.healthClinicsHospitalNumGov2,
            healthClinicsHospitalNumGov3: values.healthClinicsHospitalNumGov3,
            healthClinicsHospitalNumGov4: values.healthClinicsHospitalNumGov4,
            healthClinicsHospitalNumPrivate1:
                values.healthClinicsHospitalNumPrivate1,
            healthClinicsHospitalNumPrivate2:
                values.healthClinicsHospitalNumPrivate2,
            healthClinicsHospitalNumPrivate3:
                values.healthClinicsHospitalNumPrivate3,
            healthClinicsHospitalNumPrivate4:
                values.healthClinicsHospitalNumPrivate4,
            medicalHealthPersonnelDoctorNumGov:
                values.medicalHealthPersonnelDoctorNumGov,
            medicalHealthPersonnelNurseNumGov:
                values.medicalHealthPersonnelNurseNumGov,
            medicalHealthPersonnelMidwifeNumGov:
                values.medicalHealthPersonnelMidwifeNumGov,
            medicalHealthPersonnelBHWNumGov:
                values.medicalHealthPersonnelBHWNumGov,
            medicalHealthPersonnelDoctorNumPrivate:
                values.medicalHealthPersonnelDoctorNumPrivate,
            medicalHealthPersonnelNurseNumPrivate:
                values.medicalHealthPersonnelNurseNumPrivate,
            medicalHealthPersonnelMidwifeNumPrivate:
                values.medicalHealthPersonnelMidwifeNumPrivate,
            medicalHealthPersonnelBHWNumPrivate:
                values.medicalHealthPersonnelBHWNumPrivate,
            medicalServiceType1: values.medicalServiceType1,
            medicalServiceType2: values.medicalServiceType2,
            medicalServiceType3: values.medicalServiceType3,
            medicalServiceType4: values.medicalServiceType4,
            medicalServiceFrequency1: values.medicalServiceFrequency1,
            medicalServiceFrequency2: values.medicalServiceFrequency2,
            medicalServiceFrequency3: values.medicalServiceFrequency3,
            medicalServiceFrequency4: values.medicalServiceFrequency4,
            disposalTrucks: values.disposalTrucks,
            disposalOpenPit: values.disposalOpenPit,
            disposalBurying: values.disposalBurying,
            disposalBurning: values.disposalBurning,
            disposalThrowAnywhere: values.disposalThrowAnywhere,
            disposalOthersSpecify: values.disposalOthersSpecify,
            disposalOthers: values.disposalOthers,
            sourceIncomeCY1: values.sourceIncomeCY1,
            sourceIncomeCY2: values.sourceIncomeCY2,
            sourceIncomeAmount1CY1: values.sourceIncomeAmount1CY1,
            sourceIncomeAmount1CY2: values.sourceIncomeAmount1CY2,
            sourceIncomeAmount2CY1: values.sourceIncomeAmount2CY1,
            sourceIncomeAmount2CY2: values.sourceIncomeAmount2CY2,
            sourceIncomeAmount3CY1: values.sourceIncomeAmount3CY1,
            sourceIncomeAmount3CY2: values.sourceIncomeAmount3CY2,
            sourceIncomeAmount4CY1: values.sourceIncomeAmount4CY1,
            sourceIncomeAmount4CY2: values.sourceIncomeAmount4CY2,
            sourceIncomeAmount5CY1: values.sourceIncomeAmount5CY1,
            sourceIncomeAmount5CY2: values.sourceIncomeAmount5CY2,
            sourceIncomeAmount6CY1: values.sourceIncomeAmount6CY1,
            sourceIncomeAmount6CY2: values.sourceIncomeAmount6CY2,
            sourceIncomeAmount7CY1: values.sourceIncomeAmount7CY1,
            sourceIncomeAmount7CY2: values.sourceIncomeAmount7CY2,
            sourceIncomeAmount7CY1: values.sourceIncomeAmount7CY1,
            sourceIncomeAmount7CY2: values.sourceIncomeAmount7CY2,
            sourceIncomeAmount8CY1: values.sourceIncomeAmount8CY1,
            sourceIncomeAmount8CY2: values.sourceIncomeAmount8CY2,
            sourceIncomeAmount9CY1: values.sourceIncomeAmount9CY1,
            sourceIncomeAmount9CY2: values.sourceIncomeAmount9CY2,
            sourceIncomeAmount10CY1: values.sourceIncomeAmount10CY1,
            sourceIncomeAmount10CY2: values.sourceIncomeAmount10CY2,
            sourceIncomeAmountTotalCY1: values.sourceIncomeAmountTotalCY1,
            sourceIncomeAmountTotalCY2: values.sourceIncomeAmountTotalCY2,
            actualExpendituresCY1: values.actualExpendituresCY1,
            actualExpendituresCY2: values.actualExpendituresCY2,
            actualExpendituresAmount1CY1: values.actualExpendituresAmount1CY1,
            actualExpendituresAmount1CY2: values.actualExpendituresAmount1CY2,
            actualExpendituresAmount2CY1: values.actualExpendituresAmount2CY1,
            actualExpendituresAmount2CY2: values.actualExpendituresAmount2CY2,
            actualExpendituresAmount3CY1: values.actualExpendituresAmount3CY1,
            actualExpendituresAmount3CY2: values.actualExpendituresAmount3CY2,
            actualExpendituresAmountTotalCY1:
                values.actualExpendituresAmountTotalCY1,
            actualExpendituresAmountTotalCY2:
                values.actualExpendituresAmountTotalCY2,
            governanceOwnedFacilities1: values.governanceOwnedFacilities1,
            governanceOwnedFacilities2: values.governanceOwnedFacilities2,
            governanceOwnedFacilities3: values.governanceOwnedFacilities3,
            governanceOwnedFacilities4: values.governanceOwnedFacilities4,
            governanceOwnedFacilities5: values.governanceOwnedFacilities5,
            governanceOwnedFacilities6: values.governanceOwnedFacilities6,
            governanceOwnedFacilities7: values.governanceOwnedFacilities7,
            governanceOwnedFacilities8: values.governanceOwnedFacilities8,
            governanceOwnedFacilities8StateOwnership:
                values.governanceOwnedFacilities8StateOwnership,
            governanceOwnedFacilities9: values.governanceOwnedFacilities9,
            governanceOwnedFacilities9StateOwnership:
                values.governanceOwnedFacilities9StateOwnership,
            governanceOwnedFacilities10: values.governanceOwnedFacilities10,
            governanceOwnedFacilities11: values.governanceOwnedFacilities11,
            governanceOwnedFacilities12: values.governanceOwnedFacilities12,
            governanceOwnedFacilities12Specify:
                values.governanceOwnedFacilities12Specify,
            barangayGovSupportOrgNum1: values.barangayGovSupportOrgNum1,
            barangayGovSupportOrgNum2: values.barangayGovSupportOrgNum2,
            barangayGovSupportOrgNum3: values.barangayGovSupportOrgNum3,
            barangayGovSupportOrgNum4: values.barangayGovSupportOrgNum4,
            barangayGovSupportOrgNum5: values.barangayGovSupportOrgNum5,
            barangayGovSupportOrgNum6: values.barangayGovSupportOrgNum6,
            barangayGovSupportOrgNum7: values.barangayGovSupportOrgNum7,
            barangayGovSupportOrgNum7Specify:
                values.barangayGovSupportOrgNum7Specify,
            barangayGovSupportOrgNum8: values.barangayGovSupportOrgNum8,
            barangayGovSupportOrgNum8Specify:
                values.barangayGovSupportOrgNum8Specify,
            barangayGovSupportOrgNum9: values.barangayGovSupportOrgNum9,
            barangayGovSupportOrgNum10: values.barangayGovSupportOrgNum10,
            barangayGovSupportOrgNum11: values.barangayGovSupportOrgNum11,
            barangayGovSupportOrgNum12: values.barangayGovSupportOrgNum12,
            signatureOverPrintedName: values.signatureOverPrintedName,
            position: values.position,
            date1: values.date1,
            barangayCaptain: values.barangayCaptain,
            date2: values.date2,
            documentName: `BarangayProfileShortened${selectedBarangay.selectedBarangay}${selectedBarangay.selectedDistrict}${selectedBarangay.selectedDistrict}.pdf`,
            populationCount: totalPopulationCount,
            shortenedBarangayProfileUrl: shortenedBarangayProfileUrl,
        };

        await Axios.post(
            "http://localhost:3001/shortenedSubmission/updateSubmittedShortenedBarangayProfile",
            data
        ).then(() => {
            alert("Successfully updated changes");
            Axios.put("http://localhost:3001/barangay/update", {
                populationCount: totalPopulationCount,
            });
        });

        mutate(
            "http://localhost:3001/shortenedSubmission/updateTypeOfDocument"
        );

        setIsLoading(false);
    };

    const attemptSave = async () => {
        const savedDocument = await Axios.get(
            "http://localhost:3001/shortenedSubmission/getSavedBarangayProfile"
        ).then((res) => res.data);

        if (savedDocument) {
            setIsOverwriting(true);
        } else {
            save("Saved", "LoadDocument");
        }
    };

    const save = async (typeOfDocument, action) => {
        const data = {
            typeOfDocument: typeOfDocument,
            action: action,
        };

        await Axios.put(
            "http://localhost:3001/shortenedSubmission/updateTypeOfDocument",
            data
        );

        updateBarangayProfileShortened();

        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 3000);
    };

    return (
        <div className="flex justify-between ">
            {/* {!isSaved && (
                <div className="fixed inset-x-0 top-0 z-30 w-full mx-auto text-center bg-red-500">
                    <p>Successfully saved</p>
                </div>
            )} */}
            {isOverwriting && (
                <>
                    <div
                        onClick={() => setIsOverwriting(false)}
                        className="fixed top-0 left-0 z-20 flex items-center w-screen h-screen bg-gray-700/30"
                    />
                    <div className="fixed z-30 flex flex-col items-center p-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-sm top-1/2 left-1/2">
                        <Icon
                            className="mb-2 text-blue-500 w-14 h-14"
                            icon="ic:baseline-info"
                        />
                        <p className="text-lg font-medium">
                            Are you sure you want to save?
                        </p>
                        <p className="text-sm text-gray-700">
                            Saving will overwrite the previously saved document
                        </p>
                        <div className="flex items-center justify-end w-full mt-8">
                            <button
                                onClick={() => setIsOverwriting(false)}
                                className="px-4 py-1 mr-4 text-blue-600 border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    save("Saved", "LoadDocument");
                                    setIsOverwriting(false);
                                }}
                                className="px-4 py-1 text-white bg-blue-500 border border-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </>
            )}
            <div className="flex flex-col items-center flex-grow p-3 space-y-4 text-sm bg-gray-200">
                <form
                    spellCheck="false"
                    onSubmit={createPDF}
                    autoComplete="off"
                    ref={contentRef}
                    className="submissionBarangayProfile"
                >
                    <div
                        ref={page1Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20"
                    >
                        <ShortenedBarangayProfilePage1
                            values={values}
                            totalPopulationCount={totalPopulationCount}
                            setTotalPopulationCount={setTotalPopulationCount}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page2Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <ShortenedBarangayProfilePage2
                            values={values}
                            totalPopulationCount={totalPopulationCount}
                            setTotalPopulationCount={setTotalPopulationCount}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page3Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <ShortenedBarangayProfilePage3
                            values={values}
                            totalPopulationCount={totalPopulationCount}
                            setTotalPopulationCount={setTotalPopulationCount}
                            handleChange={handleChange}
                            handleChangeBoolean={handleChangeBoolean}
                        />
                    </div>
                </form>
            </div>

            <div className="h-[calc(100vh-56px)] sticky top-[56px] bg-gray-50 flex flex-col py-4 border-l  w-full max-w-[260px] overflow-y-auto">
                <p className="ml-4 text-sm text-gray-700">
                    Year submitted:{" "}
                    <span className="font-medium">
                        {selectedBarangay?.yearSubmitted}
                    </span>
                </p>
                <hr className="my-4" />
                <p className="mb-2 ml-4 text-sm text-gray-700">
                    Barangay profile
                </p>
                <div className="text-sm ">
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page1Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page1 && "bg-gray-300"
                        }`}
                    >
                        Page 1
                    </p>
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page2Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page2 && "bg-gray-300"
                        }`}
                    >
                        Page 2
                    </p>
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page3Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page3 && "bg-gray-300"
                        }`}
                    >
                        Page 3
                    </p>
                </div>
                <hr className="my-4" />
                <div className="px-4">
                    <button
                        disabled={isLoading}
                        onClick={createPDF}
                        className={`w-full flex items-center justify-center px-3 py-2 text-white bg-blue-500 rounded-sm transition-colors ${
                            isLoading
                                ? "cursor-not-allowed hover:bg-blue-500"
                                : "hover:bg-blue-600"
                        }`}
                    >
                        {!isLoading ? (
                            <>
                                <Icon
                                    icon="ic:baseline-save"
                                    className="w-6 h-6 mr-2"
                                />
                                Update changes
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

export default template;

export const getServerSideProps = async (context) => {
    const me = await fetch("http://localhost:3001/user/me", {
        headers: { Cookie: context.req.headers.cookie },
    }).then((res) => res.json());

    if (!me.isAdmin == true) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    const pageData = await fetch(
        "http://localhost:3001/shortenedSubmission/getShortenedBarangayProfile",
        {
            headers: { Cookie: context.req.headers.cookie },
        }
    ).then((res) => res.json());

    if (!pageData) {
        return {
            redirect: {
                permanent: false,
                destination: "/admin/updatedSubmissions/barangayProfile",
            },
        };
    }

    return {
        props: {
            pageData: pageData,
        },
    };
};
