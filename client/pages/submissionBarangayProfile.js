import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Axios from "axios";
import SubmissionBarangayProfilePage1 from "../components/SubmissionBarangayProfilePage1";
import SubmissionBarangayProfilePage2 from "../components/SubmissionBarangayProfilePage2";
import SubmissionBarangayProfilePage3 from "../components/SubmissionBarangayProfilePage3";
import SubmissionBarangayProfilePage4 from "../components/SubmissionBarangayProfilePage4";
import SubmissionBarangayProfilePage5 from "../components/SubmissionBarangayProfilePage5";
import SubmissionBarangayProfilePage6 from "../components/SubmissionBarangayProfilePage6";
import SubmissionBarangayProfilePage7 from "../components/SubmissionBarangayProfilePage7";
import SubmissionBarangayProfilePage8 from "../components/SubmissionBarangayProfilePage8";
import SubmissionBarangayProfilePage9 from "../components/SubmissionBarangayProfilePage9";
import { useSWRConfig } from "swr";
import { Icon } from "@iconify/react";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function submissionBarangayProfile({
    page1Data,
    page2Data,
    page3Data,
    page4Data,
    page5Data,
    page6Data,
    page7Data,
    page8Data,
    page9Data,
    actionData,
    submittedData,
}) {
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
    const {
        data: meData,
        error,
        isValidating,
    } = useSWR("http://localhost:3001/user/me");
    const { data: selectedBarangayData } = useSWR(
        "http://localhost:3001/barangay/getSelectedBarangay"
    );
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

    const [values, setValues] = useState({
        city: page1Data.city,
        legalBasis: page1Data.legalBasis,
        dateRatification: page1Data.dateRatification,
        sitio1: page1Data.sitio1,
        sitio2: page1Data.sitio2,
        sitio3: page1Data.sitio3,
        sitio4: page1Data.sitio4,
        north: page1Data.north,
        south: page1Data.south,
        east: page1Data.east,
        west: page1Data.west,
        distanceFromCityHall: page1Data.distanceFromCityHall,
        distanceFromPoblacion: page1Data.distanceFromPoblacion,
        distanceFromCapitol: page1Data.distanceFromCapitol,
        distanceFromHighway: page1Data.distanceFromHighway,
        totalLandArea: page1Data.totalLandArea,
        totalPopulation: page1Data.totalPopulation,
        totalPopulationMale: page1Data.totalPopulationMale,
        totalPopulationFemale: page1Data.totalPopulationFemale,
        totalPopulationBoth: page1Data.totalPopulationBoth,
        male1: page1Data.male1,
        male2: page1Data.male2,
        male3: page1Data.male3,
        male4: page1Data.male4,
        male5: page1Data.male5,
        male6: page1Data.male6,
        male7: page1Data.male7,
        male8: page1Data.male8,
        male9: page1Data.male9,
        male10: page1Data.male10,
        male11: page1Data.male11,
        male12: page1Data.male12,
        male13: page1Data.male13,
        male14: page1Data.male14,
        male15: page1Data.male15,
        male16: page1Data.male16,
        male17: page1Data.male17,
        male18: page1Data.male18,
        male19: page1Data.male19,
        male20: page1Data.male20,
        female1: page1Data.female1,
        female2: page1Data.female2,
        female3: page1Data.female3,
        female4: page1Data.female4,
        female5: page1Data.female5,
        female6: page1Data.female6,
        female7: page1Data.female7,
        female8: page1Data.female8,
        female9: page1Data.female9,
        female10: page1Data.female10,
        female11: page1Data.female11,
        female12: page1Data.female12,
        female13: page1Data.female13,
        female14: page1Data.female14,
        female15: page1Data.female15,
        female16: page1Data.female16,
        female17: page1Data.female17,
        female18: page1Data.female18,
        female19: page1Data.female19,
        female20: page1Data.female20,
        both1: page1Data.both1,
        both2: page1Data.both2,
        both3: page1Data.both3,
        both4: page1Data.both4,
        both5: page1Data.both5,
        both6: page1Data.both6,
        both7: page1Data.both7,
        both8: page1Data.both8,
        both9: page1Data.both9,
        both10: page1Data.both10,
        both11: page1Data.both11,
        both12: page1Data.both12,
        both13: page1Data.both13,
        both14: page1Data.both14,
        both15: page1Data.both15,
        both16: page1Data.both16,
        both17: page1Data.both17,
        both18: page1Data.both18,
        both19: page1Data.both19,
        both20: page1Data.both20,
        totalMale: page1Data.totalMale,
        totalFemale: page1Data.totalFemale,
        totalBoth: page1Data.totalBoth,
        totalHouseholdsCY: page1Data.totalHouseholdsCY,
        totalHouseholds: page1Data.totalHouseholds,
        dialectSpoken: page1Data.dialectSpoken,
        ethnicGroups: page1Data.ethnicGroups,
        // Page 2
        dateLastElection: page2Data.dateLastElection,
        numRegisteredVoters: page2Data.numRegisteredVoters,
        numPredominantVoters: page2Data.numPredominantVoters,
        numPrecincts: page2Data.numPrecincts,
        majorSourcesLivelihood: page2Data.majorSourcesLivelihood,
        totalSelfEmployed: page2Data.totalSelfEmployed,
        totalDriver: page2Data.totalDriver,
        totalEmployee: page2Data.totalEmployee,
        totalTrisikadDriver: page2Data.totalTrisikadDriver,
        totalTeacher: page2Data.totalTeacher,
        totalFishermanFarmer: page2Data.totalFishermanFarmer,
        totalOFWSeaman: page2Data.totalOFWSeaman,
        totalVendor: page2Data.totalVendor,
        totalMedicalProfession: page2Data.totalMedicalProfession,
        totalDressmakerTailor: page2Data.totalDressmakerTailor,
        totalCarpenterPlumber: page2Data.totalCarpenterPlumber,
        totalBarbersHairdresser: page2Data.totalBarbersHairdresser,
        totalLaborerOddJobs: page2Data.totalLaborerOddJobs,
        totalBusinessman: page2Data.totalBusinessman,
        totalJanitorGardener: page2Data.totalJanitorGardener,
        totalBeautician: page2Data.totalBeautician,
        totalSecretary: page2Data.totalSecretary,
        totalElectricianTechnician: page2Data.totalElectricianTechnician,
        totalSalesClerk: page2Data.totalSalesClerk,
        totalOthers: page2Data.totalOthers,
        totalOthersSpecify: page2Data.totalOthersSpecify,
        totalOneToTen: page2Data.totalOneToTen,
        totalElevenToTwenty: page2Data.totalElevenToTwenty,
        totalGrand: page2Data.totalGrand,
        employmentMale1: page2Data.employmentMale1,
        employmentMale2: page2Data.employmentMale2,
        employmentMale3: page2Data.employmentMale3,
        employmentMale4: page2Data.employmentMale4,
        employmentMale5: page2Data.employmentMale5,
        employmentMale6: page2Data.employmentMale6,
        employmentMale7: page2Data.employmentMale7,
        employmentMale8: page2Data.employmentMale8,
        employmentMale9: page2Data.employmentMale9,
        employmentMale10: page2Data.employmentMale10,
        employmentMale11: page2Data.employmentMale11,
        employmentFemale1: page2Data.employmentFemale1,
        employmentFemale2: page2Data.employmentFemale2,
        employmentFemale3: page2Data.employmentFemale3,
        employmentFemale4: page2Data.employmentFemale4,
        employmentFemale5: page2Data.employmentFemale5,
        employmentFemale6: page2Data.employmentFemale6,
        employmentFemale7: page2Data.employmentFemale7,
        employmentFemale8: page2Data.employmentFemale8,
        employmentFemale9: page2Data.employmentFemale9,
        employmentFemale10: page2Data.employmentFemale10,
        employmentFemale11: page2Data.employmentFemale11,
        employmentTotalMale: page2Data.employmentTotalMale,
        employmentTotalFemale: page2Data.employmentTotalFemale,
        monthlyIncome1: page2Data.monthlyIncome1,
        monthlyIncome2: page2Data.monthlyIncome2,
        monthlyIncome3: page2Data.monthlyIncome3,
        monthlyIncome4: page2Data.monthlyIncome4,
        monthlyIncome5: page2Data.monthlyIncome5,
        monthlyIncome6: page2Data.monthlyIncome6,
        monthlyIncome7: page2Data.monthlyIncome7,
        monthlyIncome8: page2Data.monthlyIncome8,
        monthlyIncome9: page2Data.monthlyIncome9,
        monthlyIncome10: page2Data.monthlyIncome10,
        monthlyIncome11: page2Data.monthlyIncome11,
        monthlyIncome12: page2Data.monthlyIncome12,
        monthlyIncome13: page2Data.monthlyIncome13,
        monthlyIncome14: page2Data.monthlyIncome14,
        monthlyIncome15: page2Data.monthlyIncome15,
        monthlyIncomeGrandTotal: page2Data.monthlyIncomeGrandTotal,
        farmingTechnique: page2Data.farmingTechnique,
        methodUsed: page2Data.methodUsed,
        annualIncomeFarmerTenant: page2Data.annualIncomeFarmerTenant,
        cropsRice: page2Data.cropsRice,
        cropsVegetableCorn: page2Data.cropsVegetableCorn,
        cropsRiceYieldYearKg: page2Data.cropsRiceYieldYearKg,
        cropsVegetableCornYieldYearKg: page2Data.cropsVegetableCornYieldYearKg,
        numFarmersTenantsRice: page2Data.numFarmersTenantsRice,
        numFarmersTenantsVegetableCorn:
            page2Data.numFarmersTenantsVegetableCorn,
        cropsProduced1: page2Data.cropsProduced1,
        cropsProduced1Number: page2Data.cropsProduced1Number,
        cropsProduced1YieldYear: page2Data.cropsProduced1YieldYear,
        cropsProduced1FarmersTenants: page2Data.cropsProduced1FarmersTenants,
        agriFacilityRicemills: page2Data.agriFacilityRicemills,
        agriFacilityCono: page2Data.agriFacilityCono,
        agriFacilityKiskisan: page2Data.agriFacilityKiskisan,
        agriFacilityWarehouse: page2Data.agriFacilityWarehouse,
        agriFacilityBuyingStations: page2Data.agriFacilityBuyingStations,
        agriFacilityTractors: page2Data.agriFacilityTractors,
        agriFacilityOthers: page2Data.agriFacilityOthers,
        agriFacilityOthersSpecify: page2Data.agriFacilityOthersSpecify,
        irrigationSystem1: page2Data.irrigationSystem1,
        irrigationSystem1ServicesArea: page2Data.irrigationSystem1ServicesArea,
        irrigationSystem1NumFarmers: page2Data.irrigationSystem1NumFarmers,
        irrigationSystem1ThrougoutTheYear:
            page2Data.irrigationSystem1ThrougoutTheYear,
        irrigationSystem1TwiceAYear: page2Data.irrigationSystem1TwiceAYear,
        irrigationSystem1OnceAYear: page2Data.irrigationSystem1OnceAYear,
        irrigationSystem2: page2Data.irrigationSystem2,
        irrigationSystem2ServicesArea: page2Data.irrigationSystem2ServicesArea,
        irrigationSystem2NumFarmers: page2Data.irrigationSystem2NumFarmers,
        irrigationSystem2ThrougoutTheYear:
            page2Data.irrigationSystem2ThrougoutTheYear,
        irrigationSystem2TwiceAYear: page2Data.irrigationSystem2TwiceAYear,
        irrigationSystem2OnceAYear: page2Data.irrigationSystem2OnceAYear,
        irrigationSystem3: page2Data.irrigationSystem3,
        irrigationSystem3ServicesArea: page2Data.irrigationSystem3ServicesArea,
        irrigationSystem3NumFarmers: page2Data.irrigationSystem3NumFarmers,
        irrigationSystem3ThrougoutTheYear:
            page2Data.irrigationSystem3ThrougoutTheYear,
        irrigationSystem3TwiceAYear: page2Data.irrigationSystem3TwiceAYear,
        irrigationSystem3OnceAYear: page2Data.irrigationSystem3OnceAYear,
        // Page 3
        fishFarm1Type: page3Data.fishFarm1Type,
        fishFarm1Num: page3Data.fishFarm1Num,
        fishFarm1NumWorkers: page3Data.fishFarm1NumWorkers,
        fishFarm1AreasCovered: page3Data.fishFarm1AreasCovered,
        fishFarm1VolumeCatch: page3Data.fishFarm1VolumeCatch,
        fishFarm1ProductionValue: page3Data.fishFarm1ProductionValue,
        fishFarm2Type: page3Data.fishFarm2Type,
        fishFarm2Num: page3Data.fishFarm2Num,
        fishFarm2NumWorkers: page3Data.fishFarm2NumWorkers,
        fishFarm2AreasCovered: page3Data.fishFarm2AreasCovered,
        fishFarm2VolumeCatch: page3Data.fishFarm2VolumeCatch,
        fishFarm2ProductionValue: page3Data.fishFarm2ProductionValue,
        fishFarm3Type: page3Data.fishFarm3Type,
        fishFarm3Num: page3Data.fishFarm3Num,
        fishFarm3NumWorkers: page3Data.fishFarm3NumWorkers,
        fishFarm3AreasCovered: page3Data.fishFarm3AreasCovered,
        fishFarm3VolumeCatch: page3Data.fishFarm3VolumeCatch,
        fishFarm3ProductionValue: page3Data.fishFarm3ProductionValue,
        fishVolume: page3Data.fishVolume,
        fishProductionValue: page3Data.fishProductionValue,
        shrimpVolume: page3Data.shrimpVolume,
        shrimpProductionValue: page3Data.shrimpProductionValue,
        shellsVolume: page3Data.shellsVolume,
        shellsProductionValue: page3Data.shellsProductionValue,
        fishFryVolume: page3Data.fishFryVolume,
        fishFryProductionValue: page3Data.fishFryProductionValue,
        musselsVolume: page3Data.musselsVolume,
        musselsProductionValue: page3Data.musselsProductionValue,
        oystersVolume: page3Data.oystersVolume,
        oystersProductionValue: page3Data.oystersProductionValue,
        fishOthersVolume: page3Data.fishOthersVolume,
        fishOthersProductionValue: page3Data.fishOthersProductionValue,
        fishOthersSpecify: page3Data.fishOthersSpecify,
        numFisherman: page3Data.numFisherman,
        averageIncomeFisherman: page3Data.averageIncomeFisherman,
        livestockLayers: page3Data.livestockLayers,
        livestockCattles: page3Data.livestockCattles,
        livestockBroilers: page3Data.livestockBroilers,
        livestockCarabaos: page3Data.livestockCarabaos,
        livestockMuscovy: page3Data.livestockMuscovy,
        livestockHogs: page3Data.livestockHogs,
        livestockGeese: page3Data.livestockGeese,
        livestockGoats: page3Data.livestockGoats,
        livestockPigeons: page3Data.livestockPigeons,
        livestockHorses: page3Data.livestockHorses,
        livestockQuails: page3Data.livestockQuails,
        livestockDogs: page3Data.livestockDogs,
        livestockPoultryOthers: page3Data.livestockPoultryOthers,
        livestockPoultryOthersSpecify: page3Data.livestockPoultryOthersSpecify,
        livestockOthers: page3Data.livestockOthers,
        livestockTurkey: page3Data.livestockTurkey,
        livestockCats: page3Data.livestockCats,
        livestockLoveBirds: page3Data.livestockLoveBirds,
        livestockFightingCocks: page3Data.livestockFightingCocks,
        livestockPig: page3Data.livestockPig,
        livestockChicken: page3Data.livestockChicken,
        prescenceAgricultural: page3Data.prescenceAgricultural,
        prescenceWeeklyVisitation: page3Data.prescenceWeeklyVisitation,
        prescenceSeedCollection: page3Data.prescenceSeedCollection,
        prescenceStorageAndProcessing: page3Data.prescenceStorageAndProcessing,
        prescenceCreditAndCooperative: page3Data.prescenceCreditAndCooperative,
        prescenceOthers: page3Data.prescenceOthers,
        prescenceOthersInput: page3Data.prescenceOthersInput,
        numBakery: page3Data.numBakery,
        numGrocery: page3Data.numGrocery,
        numIceCream: page3Data.numIceCream,
        numSariSariStore: page3Data.numSariSariStore,
        numNativeDelicacies: page3Data.numNativeDelicacies,
        numHardwareElectrical: page3Data.numHardwareElectrical,
        numSweetPreserves: page3Data.numSweetPreserves,
        numConstructionConcrete: page3Data.numConstructionConcrete,
        numSitcharon: page3Data.numSitcharon,
        numCarJeepPartsSupplies: page3Data.numCarJeepPartsSupplies,
        numNoodles: page3Data.numNoodles,
        numMotorcyclesBicyclesSupplies:
            page3Data.numMotorcyclesBicyclesSupplies,
        numBalut: page3Data.numBalut,
        numAgriculturalEquipmentSupplies:
            page3Data.numAgriculturalEquipmentSupplies,
        numVinegar: page3Data.numVinegar,
        numSchoolOfficeSupplies: page3Data.numSchoolOfficeSupplies,
        numFishDryingSmoking: page3Data.numFishDryingSmoking,
        numPhotoCenterSupplies: page3Data.numPhotoCenterSupplies,
        numLaboratories: page3Data.numLaboratories,
        numAppliance: page3Data.numAppliance,
        numChemicalIndustries: page3Data.numChemicalIndustries,
        numJewelryShopStore: page3Data.numJewelryShopStore,
        numFeedmills: page3Data.numFeedmills,
        numBagsFootwearStore: page3Data.numBagsFootwearStore,
        numGarmentEmbroidery: page3Data.numGarmentEmbroidery,
        numVideoTapesCenter: page3Data.numVideoTapesCenter,
        numFootwearFactories: page3Data.numFootwearFactories,
        numBazaars: page3Data.numBazaars,
        numTextileMills: page3Data.numTextileMills,
        numPrintingPress: page3Data.numPrintingPress,
        numBagsWalletFactories: page3Data.numBagsWalletFactories,
        numPawnshop: page3Data.numPawnshop,
        numFurnitureWooden: page3Data.numFurnitureWooden,
        numFurnitureRattan: page3Data.numFurnitureRattan,
        numFurnitureBamboo: page3Data.numFurnitureBamboo,
        numFurnitureMetal: page3Data.numFurnitureMetal,
        numFuneralParlor: page3Data.numFuneralParlor,
        numDrugStore: page3Data.numDrugStore,
        numPublicMarket: page3Data.numPublicMarket,
        numTalipapa: page3Data.numTalipapa,
        numCinema: page3Data.numCinema,
        // Page 4
        numPaperManufacturing: page4Data.numPaperManufacturing,
        numCockpit: page4Data.numCockpit,
        numCementManufacturing: page4Data.numCementManufacturing,
        numFinancialInstitutions: page4Data.numFinancialInstitutions,
        numHallowBlocksMaking: page4Data.numHallowBlocksMaking,
        numRestaurants: page4Data.numRestaurants,
        numMarbleCraft: page4Data.numMarbleCraft,
        numRealEstate: page4Data.numRealEstate,
        numBlacksmith: page4Data.numBlacksmith,
        numNightClubBarMassage: page4Data.numNightClubBarMassage,
        numIronMetalCraft: page4Data.numIronMetalCraft,
        numMemorialParks: page4Data.numMemorialParks,
        numEngineeringWorkMachineShop: page4Data.numEngineeringWorkMachineShop,
        numInsurance: page4Data.numInsurance,
        numJewelryManufacturingGoldsmith:
            page4Data.numJewelryManufacturingGoldsmith,
        numGasolineStation: page4Data.numGasolineStation,
        numCeramicsPottery: page4Data.numCeramicsPottery,
        numGeneralServiceContractors: page4Data.numGeneralServiceContractors,
        numWoodcraft: page4Data.numWoodcraft,
        numArrastreServices: page4Data.numArrastreServices,
        numEngraving: page4Data.numEngraving,
        numBodyWorkshop: page4Data.numBodyWorkshop,
        numFashionAccessories: page4Data.numFashionAccessories,
        numFitnessGym: page4Data.numFitnessGym,
        numOthersManufacturing: page4Data.numOthersManufacturing,
        numOthersManufacturingSpecify: page4Data.numOthersManufacturingSpecify,
        numBeautyParlorBarberShop: page4Data.numBeautyParlorBarberShop,
        numCooperativeRiceGrowers: page4Data.numCooperativeRiceGrowers,
        numOthersCommercial: page4Data.numOthersCommercial,
        numOthersCommercialSpecify: page4Data.numOthersCommercialSpecify,
        totalNumBirths: page4Data.totalNumBirths,
        totalNumDeathsAllCauses: page4Data.totalNumDeathsAllCauses,
        totalNumStillBirth: page4Data.totalNumStillBirth,
        totalNumInfantDeaths: page4Data.totalNumInfantDeaths,
        totalNumEarlyNeonatalDeaths: page4Data.totalNumEarlyNeonatalDeaths,
        fiveLeadingCausesMortalityCY: page4Data.fiveLeadingCausesMortalityCY,
        fiveLeadingMorbidityCY: page4Data.fiveLeadingMorbidityCY,
        causeCardiovascularDisorder: page4Data.causeCardiovascularDisorder,
        causeCancer: page4Data.causeCancer,
        causeOldAge: page4Data.causeOldAge,
        causeKidneyFailure: page4Data.causeKidneyFailure,
        causeTB: page4Data.causeTB,
        causeFeverFlu: page4Data.causeFeverFlu,
        causeCough: page4Data.causeCough,
        causeAsthma: page4Data.causeAsthma,
        causeHypertension: page4Data.causeHypertension,
        causePTB: page4Data.causePTB,
        numMalnourishedChildrenCY: page4Data.numMalnourishedChildrenCY,
        totalNumChildWeighted: page4Data.totalNumChildWeighted,
        childSUUnderOneYearNum: page4Data.childSUUnderOneYearNum,
        childSUUnderOneYearPercent: page4Data.childSUUnderOneYearPercent,
        childSUOneToFourYearsNum: page4Data.childSUOneToFourYearsNum,
        childSUOneToFourYearsPercent: page4Data.childSUOneToFourYearsPercent,
        childSUFiveToSixYearsNum: page4Data.childSUFiveToSixYearsNum,
        childSUFiveToSixYearsPercent: page4Data.childSUFiveToSixYearsPercent,
        childSUTotalNum: page4Data.childSUTotalNum,
        childSUPercent: page4Data.childSUPercent,
        childModUUnderOneYearNum: page4Data.childModUUnderOneYearNum,
        childModUUnderOneYearPercent: page4Data.childModUUnderOneYearPercent,
        childModUOneToFourYearsNum: page4Data.childModUOneToFourYearsNum,
        childModUOneToFourYearsPercent:
            page4Data.childModUOneToFourYearsPercent,
        childModUFiveToSixYearsNum: page4Data.childModUFiveToSixYearsNum,
        childModUFiveToSixYearsPercent:
            page4Data.childModUFiveToSixYearsPercent,
        childModUTotalNum: page4Data.childModUTotalNum,
        childModUPercent: page4Data.childModUPercent,
        childMildUUnderOneYearNum: page4Data.childMildUUnderOneYearNum,
        childMildUUnderOneYearPercent: page4Data.childMildUUnderOneYearPercent,
        childMildUOneToFourYearsNum: page4Data.childMildUOneToFourYearsNum,
        childMildUOneToFourYearsPercent:
            page4Data.childMildUOneToFourYearsPercent,
        childMildUFiveToSixYearsNum: page4Data.childMildUFiveToSixYearsNum,
        childMildUFiveToSixYearsPercent:
            page4Data.childMildUFiveToSixYearsPercent,
        childMildUTotalNum: page4Data.childMildUTotalNum,
        childMildUPercent: page4Data.childMildUPercent,
        childTotalUnderOneYearNum: page4Data.childTotalUnderOneYearNum,
        childTotalUnderOneYearPercent: page4Data.childTotalUnderOneYearPercent,
        childTotalOneToFourYearsNum: page4Data.childTotalOneToFourYearsNum,
        childTotalOneToFourYearsPercent:
            page4Data.childTotalOneToFourYearsPercent,
        childTotalFiveToSixYearsNum: page4Data.childTotalFiveToSixYearsNum,
        childTotalFiveToSixYearsPercent:
            page4Data.childTotalFiveToSixYearsPercent,
        childTotalTotalNum: page4Data.childTotalTotalNum,
        childTotalPercent: page4Data.childTotalPercent,
        infantLeadingCausesMortalityCY:
            page4Data.infantLeadingCausesMortalityCY,
        infantLeadingCausesMorbidityCY:
            page4Data.infantLeadingCausesMorbidityCY,
        infantMortalityCause1: page4Data.infantMortalityCause1,
        infantMortalityCause2: page4Data.infantMortalityCause2,
        infantMortalityCause3: page4Data.infantMortalityCause3,
        infantMortalityNum1: page4Data.infantMortalityNum1,
        infantMortalityNum2: page4Data.infantMortalityNum2,
        infantMortalityNum3: page4Data.infantMortalityNum3,
        infantMorbidityFeverNum: page4Data.infantMorbidityFeverNum,
        infantMorbidityCoughNum: page4Data.infantMorbidityCoughNum,
        infantMorbidityMalnutritionNum:
            page4Data.infantMorbidityMalnutritionNum,
        infantMorbidityDiarrheaNum: page4Data.infantMorbidityDiarrheaNum,
        infantMorbidityTCPrimaryComplexNum:
            page4Data.infantMorbidityTCPrimaryComplexNum,
        // Page5
        causeEarlyNeonatalDeathsCY: page5Data.causeEarlyNeonatalDeathsCY,
        causeEarlyNeonatalCause1: page5Data.causeEarlyNeonatalCause1,
        causeEarlyNeonatalCause2: page5Data.causeEarlyNeonatalCause2,
        causeEarlyNeonatalCause3: page5Data.causeEarlyNeonatalCause3,
        causeEarlyNeonatalNum1: page5Data.causeEarlyNeonatalNum1,
        causeEarlyNeonatalNum2: page5Data.causeEarlyNeonatalNum2,
        causeEarlyNeonatalNum3: page5Data.causeEarlyNeonatalNum3,
        causeMaternalDeathsCY: page5Data.causeMaternalDeathsCY,
        causeMaternalCause1: page5Data.causeMaternalCause1,
        causeMaternalCause2: page5Data.causeMaternalCause2,
        causeMaternalCause3: page5Data.causeMaternalCause3,
        causeMaternalNum1: page5Data.causeMaternalNum1,
        causeMaternalNum2: page5Data.causeMaternalNum2,
        causeMaternalNum3: page5Data.causeMaternalNum3,
        healthClinicsHospitalName1: page5Data.healthClinicsHospitalName1,
        healthClinicsHospitalName2: page5Data.healthClinicsHospitalName2,
        healthClinicsHospitalName3: page5Data.healthClinicsHospitalName3,
        healthClinicsHospitalName4: page5Data.healthClinicsHospitalName4,
        healthClinicsHospitalNumGov1: page5Data.healthClinicsHospitalNumGov1,
        healthClinicsHospitalNumGov2: page5Data.healthClinicsHospitalNumGov2,
        healthClinicsHospitalNumGov3: page5Data.healthClinicsHospitalNumGov3,
        healthClinicsHospitalNumGov4: page5Data.healthClinicsHospitalNumGov4,
        healthClinicsHospitalNumPrivate1:
            page5Data.healthClinicsHospitalNumPrivate1,
        healthClinicsHospitalNumPrivate2:
            page5Data.healthClinicsHospitalNumPrivate2,
        healthClinicsHospitalNumPrivate3:
            page5Data.healthClinicsHospitalNumPrivate3,
        healthClinicsHospitalNumPrivate4:
            page5Data.healthClinicsHospitalNumPrivate4,
        medicalHealthPersonnelDoctorNumGov:
            page5Data.medicalHealthPersonnelDoctorNumGov,
        medicalHealthPersonnelNurseNumGov:
            page5Data.medicalHealthPersonnelNurseNumGov,
        medicalHealthPersonnelMidwifeNumGov:
            page5Data.medicalHealthPersonnelMidwifeNumGov,
        medicalHealthPersonnelBHWNumGov:
            page5Data.medicalHealthPersonnelBHWNumGov,
        medicalHealthPersonnelDoctorNumPrivate:
            page5Data.medicalHealthPersonnelDoctorNumPrivate,
        medicalHealthPersonnelNurseNumPrivate:
            page5Data.medicalHealthPersonnelNurseNumPrivate,
        medicalHealthPersonnelMidwifeNumPrivate:
            page5Data.medicalHealthPersonnelMidwifeNumPrivate,
        medicalHealthPersonnelBHWNumPrivate:
            page5Data.medicalHealthPersonnelBHWNumPrivate,
        medicalServiceType1: page5Data.medicalServiceType1,
        medicalServiceType2: page5Data.medicalServiceType2,
        medicalServiceType3: page5Data.medicalServiceType3,
        medicalServiceType4: page5Data.medicalServiceType4,
        medicalServiceFrequency1: page5Data.medicalServiceFrequency1,
        medicalServiceFrequency2: page5Data.medicalServiceFrequency2,
        medicalServiceFrequency3: page5Data.medicalServiceFrequency3,
        medicalServiceFrequency4: page5Data.medicalServiceFrequency4,
        toiletAutoFlush: page5Data.toiletAutoFlush,
        toiletWaterSealed: page5Data.toiletWaterSealed,
        toiletAntipolo: page5Data.toiletAntipolo,
        toiletOthersSpecify: page5Data.toiletOthersSpecify,
        toiletOthers: page5Data.toiletOthers,
        toiletTotal: page5Data.toiletTotal,
        disposalTrucks: page5Data.disposalTrucks,
        disposalOpenPit: page5Data.disposalOpenPit,
        disposalBurying: page5Data.disposalBurying,
        disposalBurning: page5Data.disposalBurning,
        disposalThrowAnywhere: page5Data.disposalThrowAnywhere,
        disposalOthersSpecify: page5Data.disposalOthersSpecify,
        disposalOthers: page5Data.disposalOthers,
        householdOSYThirteenToTwentyOneMale:
            page5Data.householdOSYThirteenToTwentyOneMale,
        householdOSYThirteenToTwentyOneFemale:
            page5Data.householdOSYThirteenToTwentyOneFemale,
        householdOSYThirteenToTwentyOneTotal:
            page5Data.householdOSYThirteenToTwentyOneTotal,
        householdDisabilitiesMale: page5Data.householdDisabilitiesMale,
        householdDisabilitiesFemale: page5Data.householdDisabilitiesFemale,
        householdDisabilitiesTotal: page5Data.householdDisabilitiesTotal,
        householdTotalFiveToSeventeen: page5Data.householdTotalFiveToSeventeen,
        householdTotalFiveToSeventeenHelping:
            page5Data.householdTotalFiveToSeventeenHelping,
        householdFiveToSeventeenHelpingName1:
            page5Data.householdFiveToSeventeenHelpingName1,
        householdFiveToSeventeenHelpingName2:
            page5Data.householdFiveToSeventeenHelpingName2,
        householdFiveToSeventeenHelpingName3:
            page5Data.householdFiveToSeventeenHelpingName3,
        householdFiveToSeventeenHelpingName4:
            page5Data.householdFiveToSeventeenHelpingName4,
        householdFiveToSeventeenHelpingAge1:
            page5Data.householdFiveToSeventeenHelpingAge1,
        householdFiveToSeventeenHelpingAge2:
            page5Data.householdFiveToSeventeenHelpingAge2,
        householdFiveToSeventeenHelpingAge3:
            page5Data.householdFiveToSeventeenHelpingAge3,
        householdFiveToSeventeenHelpingAge4:
            page5Data.householdFiveToSeventeenHelpingAge4,
        householdFiveToSeventeenHelpingGradeSchool1:
            page5Data.householdFiveToSeventeenHelpingGradeSchool1,
        householdFiveToSeventeenHelpingGradeSchool2:
            page5Data.householdFiveToSeventeenHelpingGradeSchool2,
        householdFiveToSeventeenHelpingGradeSchool3:
            page5Data.householdFiveToSeventeenHelpingGradeSchool3,
        householdFiveToSeventeenHelpingGradeSchool4:
            page5Data.householdFiveToSeventeenHelpingGradeSchool4,
        householdFiveToSeventeenHelpingJobActivity1:
            page5Data.householdFiveToSeventeenHelpingJobActivity1,
        householdFiveToSeventeenHelpingJobActivity2:
            page5Data.householdFiveToSeventeenHelpingJobActivity2,
        householdFiveToSeventeenHelpingJobActivity3:
            page5Data.householdFiveToSeventeenHelpingJobActivity3,
        householdFiveToSeventeenHelpingJobActivity4:
            page5Data.householdFiveToSeventeenHelpingJobActivity4,
        householdFiveToSeventeenHelpingIncomeWeekly1:
            page5Data.householdFiveToSeventeenHelpingIncomeWeekly1,
        householdFiveToSeventeenHelpingIncomeWeekly2:
            page5Data.householdFiveToSeventeenHelpingIncomeWeekly2,
        householdFiveToSeventeenHelpingIncomeWeekly3:
            page5Data.householdFiveToSeventeenHelpingIncomeWeekly3,
        householdFiveToSeventeenHelpingIncomeWeekly4:
            page5Data.householdFiveToSeventeenHelpingIncomeWeekly4,
        householdFiveToSeventeenHelpingProgramsAvailed:
            page5Data.householdFiveToSeventeenHelpingProgramsAvailed,
        // Page 6
        numGradeCompleted: page6Data.numGradeCompleted,
        nurseryPrepKinder: page6Data.nurseryPrepKinder,
        grade1: page6Data.grade1,
        grade2: page6Data.grade2,
        grade3: page6Data.grade3,
        grade4: page6Data.grade4,
        grade5: page6Data.grade5,
        grade6: page6Data.grade6,
        grade7: page6Data.grade7,
        grade8: page6Data.grade8,
        grade9: page6Data.grade9,
        grade10: page6Data.grade10,
        juniorHigh: page6Data.juniorHigh,
        seniorHigh: page6Data.seniorHigh,
        college1: page6Data.college1,
        college2: page6Data.college2,
        college3: page6Data.college3,
        college4: page6Data.college4,
        college5: page6Data.college5,
        baccalaureate: page6Data.baccalaureate,
        postBaccalaureate: page6Data.postBaccalaureate,
        aquacultureNum: page6Data.aquacultureNum,
        aquacultureSponsoredBy: page6Data.aquacultureSponsoredBy,
        aquaculturePublic: page6Data.aquaculturePublic,
        aquaculturePrivate: page6Data.aquaculturePrivate,
        sewingNum: page6Data.sewingNum,
        sewingSponsoredBy: page6Data.sewingSponsoredBy,
        sewingPublic: page6Data.sewingPublic,
        sewingPrivate: page6Data.sewingPrivate,
        flowerMakingNum: page6Data.flowerMakingNum,
        flowerMakingSponsoredBy: page6Data.flowerMakingSponsoredBy,
        flowerMakingPublic: page6Data.flowerMakingPublic,
        flowerMakingPrivate: page6Data.flowerMakingPrivate,
        backyardGardeningNum: page6Data.backyardGardeningNum,
        backyardGardeningSponsoredBy: page6Data.backyardGardeningSponsoredBy,
        backyardGardeningPublic: page6Data.backyardGardeningPublic,
        backyardGardeningPrivate: page6Data.backyardGardeningPrivate,
        handicraftNum: page6Data.handicraftNum,
        handicraftSponsoredBy: page6Data.handicraftSponsoredBy,
        handicraftPublic: page6Data.handicraftPublic,
        handicraftPrivate: page6Data.handicraftPrivate,
        beautyCulturalNum: page6Data.beautyCulturalNum,
        beautyCulturalSponsoredBy: page6Data.beautyCulturalSponsoredBy,
        beautyCulturalPublic: page6Data.beautyCulturalPublic,
        beautyCulturalPrivate: page6Data.beautyCulturalPrivate,
        livestockRaisingNum: page6Data.livestockRaisingNum,
        livestockRaisingSponsoredBy: page6Data.livestockRaisingSponsoredBy,
        livestockRaisingPublic: page6Data.livestockRaisingPublic,
        livestockRaisingPrivate: page6Data.livestockRaisingPrivate,
        carpentryNum: page6Data.carpentryNum,
        carpentrySponsoredBy: page6Data.carpentrySponsoredBy,
        carpentryPublic: page6Data.carpentryPublic,
        carpentryPrivate: page6Data.carpentryPrivate,
        cosmetologyNum: page6Data.cosmetologyNum,
        cosmetologySponsoredBy: page6Data.cosmetologySponsoredBy,
        cosmetologyPublic: page6Data.cosmetologyPublic,
        cosmetologyPrivate: page6Data.cosmetologyPrivate,
        recyclingOfMaterialNum: page6Data.recyclingOfMaterialNum,
        recyclingOfMaterialSponsoredBy:
            page6Data.recyclingOfMaterialSponsoredBy,
        recyclingOfMaterialPublic: page6Data.recyclingOfMaterialPublic,
        recyclingOfMaterialPrivate: page6Data.recyclingOfMaterialPrivate,
        culinaryArtNum: page6Data.culinaryArtNum,
        culinaryArtSponsoredBy: page6Data.culinaryArtSponsoredBy,
        culinaryArtPublic: page6Data.culinaryArtPublic,
        culinaryArtPrivate: page6Data.culinaryArtPrivate,
        typingEncodingNum: page6Data.typingEncodingNum,
        typingEncodingSponsoredBy: page6Data.typingEncodingSponsoredBy,
        typingEncodingPublic: page6Data.typingEncodingPublic,
        typingEncodingPrivate: page6Data.typingEncodingPrivate,
        electronicsNum: page6Data.electronicsNum,
        electronicsSponsoredBy: page6Data.electronicsSponsoredBy,
        electronicsPublic: page6Data.electronicsPublic,
        electronicsPrivate: page6Data.electronicsPrivate,
        practicalElectricityNum: page6Data.practicalElectricityNum,
        practicalElectricitySponsoredBy:
            page6Data.practicalElectricitySponsoredBy,
        practicalElectricityPublic: page6Data.practicalElectricityPublic,
        practicalElectricityPrivate: page6Data.practicalElectricityPrivate,
        othersNumSpecify: page6Data.othersNumSpecify,
        othersNum: page6Data.othersNum,
        othersSponsoredBy: page6Data.othersSponsoredBy,
        othersPublic: page6Data.othersPublic,
        othersPrivate: page6Data.othersPrivate,
        educInstructionPublic1: page6Data.educInstructionPublic1,
        educInstructionPrivate1: page6Data.educInstructionPrivate1,
        educInstructionDayCare1: page6Data.educInstructionDayCare1,
        educInstructionPreschoolKinder1:
            page6Data.educInstructionPreschoolKinder1,
        educInstructionElementary1: page6Data.educInstructionElementary1,
        educInstructionSecondary1: page6Data.educInstructionSecondary1,
        educInstructionTertiaryCollege1:
            page6Data.educInstructionTertiaryCollege1,
        educInstructionPostGraduate1: page6Data.educInstructionPostGraduate1,
        educInstructionPublic2: page6Data.educInstructionPublic2,
        educInstructionPrivate2: page6Data.educInstructionPrivate2,
        educInstructionDayCare2: page6Data.educInstructionDayCare2,
        educInstructionPreschoolKinder2:
            page6Data.educInstructionPreschoolKinder2,
        educInstructionElementary2: page6Data.educInstructionElementary2,
        educInstructionSecondary2: page6Data.educInstructionSecondary2,
        educInstructionTertiaryCollege2:
            page6Data.educInstructionTertiaryCollege2,
        educInstructionPostGraduate2: page6Data.educInstructionPostGraduate2,
        educInstructionPublic3: page6Data.educInstructionPublic3,
        educInstructionPrivate3: page6Data.educInstructionPrivate3,
        educInstructionDayCare3: page6Data.educInstructionDayCare3,
        educInstructionPreschoolKinder3:
            page6Data.educInstructionPreschoolKinder3,
        educInstructionElementary3: page6Data.educInstructionElementary3,
        educInstructionSecondary3: page6Data.educInstructionSecondary3,
        educInstructionTertiaryCollege3:
            page6Data.educInstructionTertiaryCollege3,
        educInstructionPostGraduate3: page6Data.educInstructionPostGraduate3,
        // Page 7
        typeOfBuildingNum1: page7Data.typeOfBuildingNum1,
        typeOfBuildingNum2: page7Data.typeOfBuildingNum2,
        typeOfBuildingNum3: page7Data.typeOfBuildingNum3,
        typeOfBuildingNum4: page7Data.typeOfBuildingNum4,
        typeOfBuildingNum5: page7Data.typeOfBuildingNum5,
        typeOfBuildingNum6: page7Data.typeOfBuildingNum6,
        typeOfBuildingNum6Specify: page7Data.typeOfBuildingNum6Specify,
        typeOfConstructionMats1: page7Data.typeOfConstructionMats1,
        typeOfConstructionMats2: page7Data.typeOfConstructionMats2,
        typeOfConstructionMats3: page7Data.typeOfConstructionMats3,
        typeOfConstructionMats4: page7Data.typeOfConstructionMats4,
        typeOfConstructionMats5: page7Data.typeOfConstructionMats5,
        typeOfConstructionMats5Specify:
            page7Data.typeOfConstructionMats5Specify,
        numInformalSettler1: page7Data.numInformalSettler1,
        numInformalSettler2: page7Data.numInformalSettler2,
        numInformalSettler3: page7Data.numInformalSettler3,
        numInformalSettler4: page7Data.numInformalSettler4,
        numInformalSettler5: page7Data.numInformalSettler5,
        numInformalSettlerLocation1: page7Data.numInformalSettlerLocation1,
        numInformalSettlerLocation2: page7Data.numInformalSettlerLocation2,
        numInformalSettlerLocation3: page7Data.numInformalSettlerLocation3,
        numInformalSettlerLocation4: page7Data.numInformalSettlerLocation4,
        numInformalSettlerLocation5: page7Data.numInformalSettlerLocation5,
        numHeritageStructure1: page7Data.numHeritageStructure1,
        numHeritageStructure2: page7Data.numHeritageStructure2,
        numHeritageStructure3: page7Data.numHeritageStructure3,
        numHeritageStructure4: page7Data.numHeritageStructure4,
        numHeritageStructure5: page7Data.numHeritageStructure5,
        numHeritageStructure6: page7Data.numHeritageStructure6,
        heritageStructureLocation1: page7Data.heritageStructureLocation1,
        heritageStructureLocation2: page7Data.heritageStructureLocation2,
        heritageStructureLocation3: page7Data.heritageStructureLocation3,
        heritageStructureLocation4: page7Data.heritageStructureLocation4,
        heritageStructureLocation5: page7Data.heritageStructureLocation5,
        heritageStructureLocation6: page7Data.heritageStructureLocation6,
        presenceProtectiveService1: page7Data.presenceProtectiveService1,
        presenceProtectiveService2: page7Data.presenceProtectiveService2,
        presenceProtectiveService3: page7Data.presenceProtectiveService3,
        presenceProtectiveService4: page7Data.presenceProtectiveService4,
        presenceProtectiveService5: page7Data.presenceProtectiveService5,
        presenceProtectiveService5Specify:
            page7Data.presenceProtectiveService5Specify,
        presenceNumPersonnel1: page7Data.presenceNumPersonnel1,
        presenceNumPersonnel2: page7Data.presenceNumPersonnel2,
        presenceNumPersonnel3: page7Data.presenceNumPersonnel3,
        presenceNumPersonnel4: page7Data.presenceNumPersonnel4,
        presenceNumPersonnel5: page7Data.presenceNumPersonnel5,
        sportsFacilitiesPublic1: page7Data.sportsFacilitiesPublic1,
        sportsFacilitiesPublic2: page7Data.sportsFacilitiesPublic2,
        sportsFacilitiesPublic3: page7Data.sportsFacilitiesPublic3,
        sportsFacilitiesPublic4: page7Data.sportsFacilitiesPublic4,
        sportsFacilitiesPublic5: page7Data.sportsFacilitiesPublic5,
        sportsFacilitiesPublic6: page7Data.sportsFacilitiesPublic6,
        sportsFacilitiesPublic7: page7Data.sportsFacilitiesPublic7,
        sportsFacilitiesPublic8: page7Data.sportsFacilitiesPublic8,
        sportsFacilitiesPrivate1: page7Data.sportsFacilitiesPrivate1,
        sportsFacilitiesPrivate2: page7Data.sportsFacilitiesPrivate2,
        sportsFacilitiesPrivate3: page7Data.sportsFacilitiesPrivate3,
        sportsFacilitiesPrivate4: page7Data.sportsFacilitiesPrivate4,
        sportsFacilitiesPrivate5: page7Data.sportsFacilitiesPrivate5,
        sportsFacilitiesPrivate6: page7Data.sportsFacilitiesPrivate6,
        sportsFacilitiesPrivate7: page7Data.sportsFacilitiesPrivate7,
        sportsFacilitiesPrivate8: page7Data.sportsFacilitiesPrivate8,
        sportsFacilities8Specify: page7Data.sportsFacilities8Specify,
        recreationalPublic1: page7Data.recreationalPublic1,
        recreationalPublic2: page7Data.recreationalPublic2,
        recreationalPublic3: page7Data.recreationalPublic3,
        recreationalPublic4: page7Data.recreationalPublic4,
        recreationalPublic5: page7Data.recreationalPublic5,
        recreationalPublic6: page7Data.recreationalPublic6,
        recreationalPublic7: page7Data.recreationalPublic7,
        recreationalPublic8: page7Data.recreationalPublic8,
        recreationalPrivate1: page7Data.recreationalPrivate1,
        recreationalPrivate2: page7Data.recreationalPrivate2,
        recreationalPrivate3: page7Data.recreationalPrivate3,
        recreationalPrivate4: page7Data.recreationalPrivate4,
        recreationalPrivate5: page7Data.recreationalPrivate5,
        recreationalPrivate6: page7Data.recreationalPrivate6,
        recreationalPrivate7: page7Data.recreationalPrivate7,
        recreationalPrivate8: page7Data.recreationalPrivate8,
        recreational8Specify: page7Data.recreational8Specify,
        // Page 8
        tricycleWithinBarangay: page8Data.tricycleWithinBarangay,
        tricycleWithinDistrict: page8Data.tricycleWithinDistrict,
        tricycleWithinCityProper: page8Data.tricycleWithinCityProper,
        trisikadWithinBarangay: page8Data.trisikadWithinBarangay,
        trisikadWithinDistrict: page8Data.trisikadWithinDistrict,
        trisikadWithinCityProper: page8Data.trisikadWithinCityProper,
        jeepneyWithinBarangay: page8Data.jeepneyWithinBarangay,
        jeepneyWithinDistrict: page8Data.jeepneyWithinDistrict,
        jeepneyWithinCityProper: page8Data.jeepneyWithinCityProper,
        carWithinBarangay: page8Data.carWithinBarangay,
        carWithinDistrict: page8Data.carWithinDistrict,
        carWithinCityProper: page8Data.carWithinCityProper,
        busWithinBarangay: page8Data.busWithinBarangay,
        busWithinDistrict: page8Data.busWithinDistrict,
        busWithinCityProper: page8Data.busWithinCityProper,
        boatMotorizedWithinBarangay: page8Data.boatMotorizedWithinBarangay,
        boatMotorizedWithinDistrict: page8Data.boatMotorizedWithinDistrict,
        boatMotorizedWithinCityProper: page8Data.boatMotorizedWithinCityProper,
        boatNonMotorizedWithinBarangay:
            page8Data.boatNonMotorizedWithinBarangay,
        boatNonMotorizedWithinDistrict:
            page8Data.boatNonMotorizedWithinDistrict,
        boatNonMotorizedWithinCityProper:
            page8Data.boatNonMotorizedWithinCityProper,
        othersWithinBarangay: page8Data.othersWithinBarangay,
        othersWithinDistrict: page8Data.othersWithinDistrict,
        othersWithinCityProper: page8Data.othersWithinCityProper,
        othersTransportFacilitySpecify:
            page8Data.othersTransportFacilitySpecify,
        waterSupplyNumHousehold1: page8Data.waterSupplyNumHousehold1,
        waterSupplyNumHousehold2: page8Data.waterSupplyNumHousehold2,
        waterSupplyNumHousehold3: page8Data.waterSupplyNumHousehold3,
        waterSupplyNumHousehold4: page8Data.waterSupplyNumHousehold4,
        waterSupplyNumHousehold5: page8Data.waterSupplyNumHousehold5,
        waterSupplyNumHousehold6: page8Data.waterSupplyNumHousehold6,
        waterSupplyNumHousehold7: page8Data.waterSupplyNumHousehold7,
        waterSupplyPercentHousehold1: page8Data.waterSupplyPercentHousehold1,
        waterSupplyPercentHousehold2: page8Data.waterSupplyPercentHousehold2,
        waterSupplyPercentHousehold3: page8Data.waterSupplyPercentHousehold3,
        waterSupplyPercentHousehold4: page8Data.waterSupplyPercentHousehold4,
        waterSupplyPercentHousehold5: page8Data.waterSupplyPercentHousehold5,
        waterSupplyPercentHousehold6: page8Data.waterSupplyPercentHousehold6,
        waterSupplyPercentHousehold7: page8Data.waterSupplyPercentHousehold7,
        waterSupply7Specify: page8Data.waterSupply7Specify,
        waterSupplyNumTotal: page8Data.waterSupplyNumTotal,
        waterSupplyPercentTotal: page8Data.waterSupplyPercentTotal,
        inventoryExistingPowerSupplyNum1:
            page8Data.inventoryExistingPowerSupplyNum1,
        inventoryExistingPowerSupplyPercent1:
            page8Data.inventoryExistingPowerSupplyPercent1,
        inventoryExistingPowerSupplyNum2:
            page8Data.inventoryExistingPowerSupplyNum2,
        inventoryExistingPowerSupplyPercent2:
            page8Data.inventoryExistingPowerSupplyPercent2,
        inventoryExistingPowerSupplySpecify:
            page8Data.inventoryExistingPowerSupplySpecify,
        inventoryExistingPowerSupplyNumTotal:
            page8Data.inventoryExistingPowerSupplyNumTotal,
        inventoryExistingPowerSupplyPercentTotal:
            page8Data.inventoryExistingPowerSupplyPercentTotal,
        inventoryFuelUsedNum1: page8Data.inventoryFuelUsedNum1,
        inventoryFuelUsedPercent1: page8Data.inventoryFuelUsedPercent1,
        inventoryFuelUsedNum2: page8Data.inventoryFuelUsedNum2,
        inventoryFuelUsedPercent2: page8Data.inventoryFuelUsedPercent2,
        inventoryFuelUsedNum3: page8Data.inventoryFuelUsedNum3,
        inventoryFuelUsedPercent3: page8Data.inventoryFuelUsedPercent3,
        inventoryFuelUsedNum4: page8Data.inventoryFuelUsedNum4,
        inventoryFuelUsedPercent4: page8Data.inventoryFuelUsedPercent4,
        inventoryFuelUsed4Specify: page8Data.inventoryFuelUsed4Specify,
        inventoryFuelUsedNumTotal: page8Data.inventoryFuelUsedNumTotal,
        inventoryFuelUsedPercentTotal: page8Data.inventoryFuelUsedPercentTotal,
        sourceIncomeCY1: page8Data.sourceIncomeCY1,
        sourceIncomeCY2: page8Data.sourceIncomeCY2,
        sourceIncomeAmount1CY1: page8Data.sourceIncomeAmount1CY1,
        sourceIncomeAmount1CY2: page8Data.sourceIncomeAmount1CY2,
        sourceIncomeAmount2CY1: page8Data.sourceIncomeAmount2CY1,
        sourceIncomeAmount2CY2: page8Data.sourceIncomeAmount2CY2,
        sourceIncomeAmount3CY1: page8Data.sourceIncomeAmount3CY1,
        sourceIncomeAmount3CY2: page8Data.sourceIncomeAmount3CY2,
        sourceIncomeAmount4CY1: page8Data.sourceIncomeAmount4CY1,
        sourceIncomeAmount4CY2: page8Data.sourceIncomeAmount4CY2,
        sourceIncomeAmount5CY1: page8Data.sourceIncomeAmount5CY1,
        sourceIncomeAmount5CY2: page8Data.sourceIncomeAmount5CY2,
        sourceIncomeAmount6CY1: page8Data.sourceIncomeAmount6CY1,
        sourceIncomeAmount6CY2: page8Data.sourceIncomeAmount6CY2,
        sourceIncomeAmount7CY1: page8Data.sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2: page8Data.sourceIncomeAmount7CY2,
        sourceIncomeAmount8CY1: page8Data.sourceIncomeAmount8CY1,
        sourceIncomeAmount8CY2: page8Data.sourceIncomeAmount8CY2,
        sourceIncomeAmount9CY1: page8Data.sourceIncomeAmount9CY1,
        sourceIncomeAmount9CY2: page8Data.sourceIncomeAmount9CY2,
        sourceIncomeAmount10CY1: page8Data.sourceIncomeAmount10CY1,
        sourceIncomeAmount10CY2: page8Data.sourceIncomeAmount10CY2,
        sourceIncomeAmountTotalCY1: page8Data.sourceIncomeAmountTotalCY1,
        sourceIncomeAmountTotalCY2: page8Data.sourceIncomeAmountTotalCY2,
        // Page 9
        actualExpendituresCY1: page9Data.actualExpendituresCY1,
        actualExpendituresCY2: page9Data.actualExpendituresCY2,
        actualExpendituresAmount1CY1: page9Data.actualExpendituresAmount1CY1,
        actualExpendituresAmount1CY2: page9Data.actualExpendituresAmount1CY2,
        actualExpendituresAmount2CY1: page9Data.actualExpendituresAmount2CY1,
        actualExpendituresAmount2CY2: page9Data.actualExpendituresAmount2CY2,
        actualExpendituresAmount3CY1: page9Data.actualExpendituresAmount3CY1,
        actualExpendituresAmount3CY2: page9Data.actualExpendituresAmount3CY2,
        actualExpendituresAmountTotalCY1:
            page9Data.actualExpendituresAmountTotalCY1,
        actualExpendituresAmountTotalCY2:
            page9Data.actualExpendituresAmountTotalCY2,
        governanceOwnedFacilities1: page9Data.governanceOwnedFacilities1,
        governanceOwnedFacilities2: page9Data.governanceOwnedFacilities2,
        governanceOwnedFacilities3: page9Data.governanceOwnedFacilities3,
        governanceOwnedFacilities4: page9Data.governanceOwnedFacilities4,
        governanceOwnedFacilities5: page9Data.governanceOwnedFacilities5,
        governanceOwnedFacilities6: page9Data.governanceOwnedFacilities6,
        governanceOwnedFacilities7: page9Data.governanceOwnedFacilities7,
        governanceOwnedFacilities8: page9Data.governanceOwnedFacilities8,
        governanceOwnedFacilities8StateOwnership:
            page9Data.governanceOwnedFacilities8StateOwnership,
        governanceOwnedFacilities9: page9Data.governanceOwnedFacilities9,
        governanceOwnedFacilities9StateOwnership:
            page9Data.governanceOwnedFacilities9StateOwnership,
        governanceOwnedFacilities10: page9Data.governanceOwnedFacilities10,
        governanceOwnedFacilities11: page9Data.governanceOwnedFacilities11,
        governanceOwnedFacilities12: page9Data.governanceOwnedFacilities12,
        governanceOwnedFacilities12Specify:
            page9Data.governanceOwnedFacilities12Specify,
        barangayGovSupportOrgNum1: page9Data.barangayGovSupportOrgNum1,
        barangayGovSupportOrgNum2: page9Data.barangayGovSupportOrgNum2,
        barangayGovSupportOrgNum3: page9Data.barangayGovSupportOrgNum3,
        barangayGovSupportOrgNum4: page9Data.barangayGovSupportOrgNum4,
        barangayGovSupportOrgNum5: page9Data.barangayGovSupportOrgNum5,
        barangayGovSupportOrgNum6: page9Data.barangayGovSupportOrgNum6,
        barangayGovSupportOrgNum7: page9Data.barangayGovSupportOrgNum7,
        barangayGovSupportOrgNum7Specify:
            page9Data.barangayGovSupportOrgNum7Specify,
        barangayGovSupportOrgNum8: page9Data.barangayGovSupportOrgNum8,
        barangayGovSupportOrgNum8Specify:
            page9Data.barangayGovSupportOrgNum8Specify,
        barangayGovSupportOrgNum9: page9Data.barangayGovSupportOrgNum9,
        barangayGovSupportOrgNum10: page9Data.barangayGovSupportOrgNum10,
        barangayGovSupportOrgNum11: page9Data.barangayGovSupportOrgNum11,
        barangayGovSupportOrgNum12: page9Data.barangayGovSupportOrgNum12,
        signatureOverPrintedName: page9Data.signatureOverPrintedName,
        position: page9Data.position,
        date1: page9Data.date1,
        barangayCaptain: page9Data.barangayCaptain,
        date2: page9Data.date2,
    });

    const handleChange = (e) => {
        setValues((previousValues) => ({
            ...previousValues,
            [e.target.name]: e.target.value,
        }));
    };

    const handleScroll = () => {
        const position = window.pageYOffset + 68;
        setScrollPosition(position);
        // console.log("POSITION", position);
        // console.log("PAGE 1 REF", page1Ref.current.offsetTop);
        // console.log("PAGE 2 REF", page2Ref.current.offsetTop);

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

        if (
            position >= page3Ref.current?.offsetTop &&
            page4Ref.current.offsetTop > position
        ) {
            setPage3(true);
        } else {
            setPage3(false);
        }

        if (
            position >= page4Ref.current?.offsetTop &&
            page5Ref.current.offsetTop > position
        ) {
            setPage4(true);
        } else {
            setPage4(false);
        }

        if (
            position >= page5Ref.current?.offsetTop &&
            page6Ref.current.offsetTop > position
        ) {
            setPage5(true);
        } else {
            setPage5(false);
        }

        if (
            position >= page6Ref.current?.offsetTop &&
            page7Ref.current.offsetTop > position
        ) {
            setPage6(true);
        } else {
            setPage6(false);
        }

        if (
            position >= page7Ref.current?.offsetTop &&
            page8Ref.current.offsetTop > position
        ) {
            setPage7(true);
        } else {
            setPage7(false);
        }

        if (
            position >= page8Ref.current?.offsetTop &&
            page9Ref.current.offsetTop > position
        ) {
            setPage8(true);
        } else {
            setPage8(false);
        }

        if (position >= page9Ref.current?.offsetTop) {
            setPage9(true);
        } else {
            setPage9(false);
        }

        // if (position <= 1200) {
        //     setPage1(true);
        // } else {
        //     setPage1(false);
        // }

        // console.log("Page 2 ref", page2Ref.current.offsetTop);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const updateSubmissionBarangayProfilePage1 = async () => {
        const data = {
            city: values.city,
            legalBasis: values.legalBasis,
            dateRatification: values.dateRatification,
            sitio1: values.sitio1,
            sitio2: values.sitio2,
            sitio3: values.sitio3,
            sitio4: values.sitio4,
            north: values.north,
            south: values.south,
            east: values.east,
            west: values.west,
            distanceFromCityHall: values.distanceFromCityHall,
            distanceFromPoblacion: values.distanceFromPoblacion,
            distanceFromCapitol: values.distanceFromCapitol,
            distanceFromHighway: values.distanceFromHighway,
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
            dialectSpoken: values.dialectSpoken,
            ethnicGroups: values.ethnicGroups,
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage1",
            data
        );
    };

    const updateSubmissionBarangayProfilePage2 = async () => {
        // console.log("CITY: ", values.city);
        // setTotalPopulationBoth(
        //     Number(totalPopulationMaleRef.current?.value) +
        //         Number(totalPopulationFemaleRef.current?.value)
        // );

        const data = {
            dateLastElection: values.dateLastElection,
            numRegisteredVoters: values.numRegisteredVoters,
            numPredominantVoters: values.numPredominantVoters,
            numPrecincts: values.numPrecincts,
            majorSourcesLivelihood: values.majorSourcesLivelihood,
            totalSelfEmployed: values.totalSelfEmployed,
            totalDriver: values.totalDriver,
            totalEmployee: values.totalEmployee,
            totalTrisikadDriver: values.totalTrisikadDriver,
            totalTeacher: values.totalTeacher,
            totalFishermanFarmer: values.totalFishermanFarmer,
            totalOFWSeaman: values.totalOFWSeaman,
            totalVendor: values.totalVendor,
            totalMedicalProfession: values.totalMedicalProfession,
            totalDressmakerTailor: values.totalDressmakerTailor,
            totalCarpenterPlumber: values.totalCarpenterPlumber,
            totalBarbersHairdresser: values.totalBarbersHairdresser,
            totalLaborerOddJobs: values.totalLaborerOddJobs,
            totalBusinessman: values.totalBusinessman,
            totalJanitorGardener: values.totalJanitorGardener,
            totalBeautician: values.totalBeautician,
            totalSecretary: values.totalSecretary,
            totalElectricianTechnician: values.totalElectricianTechnician,
            totalSalesClerk: values.totalSalesClerk,
            totalOthers: values.totalOthers,
            totalOthersSpecify: values.totalOthersSpecify,
            totalOneToTen: values.totalOneToTen,
            totalElevenToTwenty: values.totalElevenToTwenty,
            totalGrand: values.totalGrand,
            employmentMale1: values.employmentMale1,
            employmentMale2: values.employmentMale2,
            employmentMale3: values.employmentMale3,
            employmentMale4: values.employmentMale4,
            employmentMale5: values.employmentMale5,
            employmentMale6: values.employmentMale6,
            employmentMale7: values.employmentMale7,
            employmentMale8: values.employmentMale8,
            employmentMale9: values.employmentMale9,
            employmentMale10: values.employmentMale10,
            employmentMale11: values.employmentMale11,
            employmentFemale1: values.employmentFemale1,
            employmentFemale2: values.employmentFemale2,
            employmentFemale3: values.employmentFemale3,
            employmentFemale4: values.employmentFemale4,
            employmentFemale5: values.employmentFemale5,
            employmentFemale6: values.employmentFemale6,
            employmentFemale7: values.employmentFemale7,
            employmentFemale8: values.employmentFemale8,
            employmentFemale9: values.employmentFemale9,
            employmentFemale10: values.employmentFemale10,
            employmentFemale11: values.employmentFemale11,
            employmentTotalMale: values.employmentTotalMale,
            employmentTotalFemale: values.employmentTotalFemale,
            monthlyIncome1: values.monthlyIncome1,
            monthlyIncome2: values.monthlyIncome2,
            monthlyIncome3: values.monthlyIncome3,
            monthlyIncome4: values.monthlyIncome4,
            monthlyIncome5: values.monthlyIncome5,
            monthlyIncome6: values.monthlyIncome6,
            monthlyIncome7: values.monthlyIncome7,
            monthlyIncome8: values.monthlyIncome8,
            monthlyIncome9: values.monthlyIncome9,
            monthlyIncome10: values.monthlyIncome10,
            monthlyIncome11: values.monthlyIncome11,
            monthlyIncome12: values.monthlyIncome12,
            monthlyIncome13: values.monthlyIncome13,
            monthlyIncome14: values.monthlyIncome14,
            monthlyIncome15: values.monthlyIncome15,
            monthlyIncomeGrandTotal: values.monthlyIncomeGrandTotal,
            farmingTechnique: values.farmingTechnique,
            methodUsed: values.methodUsed,
            annualIncomeFarmerTenant: values.annualIncomeFarmerTenant,
            cropsRice: values.cropsRice,
            cropsVegetableCorn: values.cropsVegetableCorn,
            cropsRiceYieldYearKg: values.cropsRiceYieldYearKg,
            cropsVegetableCornYieldYearKg: values.cropsVegetableCornYieldYearKg,
            numFarmersTenantsRice: values.numFarmersTenantsRice,
            numFarmersTenantsVegetableCorn:
                values.numFarmersTenantsVegetableCorn,
            cropsProduced1: values.cropsProduced1,
            cropsProduced1Number: values.cropsProduced1Number,
            cropsProduced1YieldYear: values.cropsProduced1YieldYear,
            cropsProduced1FarmersTenants: values.cropsProduced1FarmersTenants,
            agriFacilityRicemills: values.agriFacilityRicemills,
            agriFacilityCono: values.agriFacilityCono,
            agriFacilityKiskisan: values.agriFacilityKiskisan,
            agriFacilityWarehouse: values.agriFacilityWarehouse,
            agriFacilityBuyingStations: values.agriFacilityBuyingStations,
            agriFacilityTractors: values.agriFacilityTractors,
            agriFacilityOthers: values.agriFacilityOthers,
            agriFacilityOthersSpecify: values.agriFacilityOthersSpecify,
            irrigationSystem1: values.irrigationSystem1,
            irrigationSystem1ServicesArea: values.irrigationSystem1ServicesArea,
            irrigationSystem1NumFarmers: values.irrigationSystem1NumFarmers,
            irrigationSystem1ThrougoutTheYear:
                values.irrigationSystem1ThrougoutTheYear,
            irrigationSystem1TwiceAYear: values.irrigationSystem1TwiceAYear,
            irrigationSystem1OnceAYear: values.irrigationSystem1OnceAYear,
            irrigationSystem2: values.irrigationSystem2,
            irrigationSystem2ServicesArea: values.irrigationSystem2ServicesArea,
            irrigationSystem2NumFarmers: values.irrigationSystem2NumFarmers,
            irrigationSystem2ThrougoutTheYear:
                values.irrigationSystem2ThrougoutTheYear,
            irrigationSystem2TwiceAYear: values.irrigationSystem2TwiceAYear,
            irrigationSystem2OnceAYear: values.irrigationSystem2OnceAYear,
            irrigationSystem3: values.irrigationSystem3,
            irrigationSystem3ServicesArea: values.irrigationSystem3ServicesArea,
            irrigationSystem3NumFarmers: values.irrigationSystem3NumFarmers,
            irrigationSystem3ThrougoutTheYear:
                values.irrigationSystem3ThrougoutTheYear,
            irrigationSystem3TwiceAYear: values.irrigationSystem3TwiceAYear,
            irrigationSystem3OnceAYear: values.irrigationSystem3OnceAYear,
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage2",
            data
        );
    };

    const updateSubmissionBarangayProfilePage3 = async () => {
        const data = {
            fishFarm1Type: values.fishFarm1Type,
            fishFarm1Num: values.fishFarm1Num,
            fishFarm1NumWorkers: values.fishFarm1NumWorkers,
            fishFarm1AreasCovered: values.fishFarm1AreasCovered,
            fishFarm1VolumeCatch: values.fishFarm1VolumeCatch,
            fishFarm1ProductionValue: values.fishFarm1ProductionValue,
            fishFarm2Type: values.fishFarm2Type,
            fishFarm2Num: values.fishFarm2Num,
            fishFarm2NumWorkers: values.fishFarm2NumWorkers,
            fishFarm2AreasCovered: values.fishFarm2AreasCovered,
            fishFarm2VolumeCatch: values.fishFarm2VolumeCatch,
            fishFarm2ProductionValue: values.fishFarm2ProductionValue,
            fishFarm3Type: values.fishFarm3Type,
            fishFarm3Num: values.fishFarm3Num,
            fishFarm3NumWorkers: values.fishFarm3NumWorkers,
            fishFarm3AreasCovered: values.fishFarm3AreasCovered,
            fishFarm3VolumeCatch: values.fishFarm3VolumeCatch,
            fishFarm3ProductionValue: values.fishFarm3ProductionValue,
            fishVolume: values.fishVolume,
            fishProductionValue: values.fishProductionValue,
            shrimpVolume: values.shrimpVolume,
            shrimpProductionValue: values.shrimpProductionValue,
            shellsVolume: values.shellsVolume,
            shellsProductionValue: values.shellsProductionValue,
            fishFryVolume: values.fishFryVolume,
            fishFryProductionValue: values.fishFryProductionValue,
            musselsVolume: values.musselsVolume,
            musselsProductionValue: values.musselsProductionValue,
            oystersVolume: values.oystersVolume,
            oystersProductionValue: values.oystersProductionValue,
            fishOthersVolume: values.fishOthersVolume,
            fishOthersProductionValue: values.fishOthersProductionValue,
            fishOthersSpecify: values.fishOthersSpecify,
            numFisherman: values.numFisherman,
            averageIncomeFisherman: values.averageIncomeFisherman,
            livestockLayers: values.livestockLayers,
            livestockCattles: values.livestockCattles,
            livestockBroilers: values.livestockBroilers,
            livestockCarabaos: values.livestockCarabaos,
            livestockMuscovy: values.livestockMuscovy,
            livestockHogs: values.livestockHogs,
            livestockGeese: values.livestockGeese,
            livestockGoats: values.livestockGoats,
            livestockPigeons: values.livestockPigeons,
            livestockHorses: values.livestockHorses,
            livestockQuails: values.livestockQuails,
            livestockDogs: values.livestockDogs,
            livestockPoultryOthers: values.livestockPoultryOthers,
            livestockPoultryOthersSpecify: values.livestockPoultryOthersSpecify,
            livestockOthers: values.livestockOthers,
            livestockTurkey: values.livestockTurkey,
            livestockCats: values.livestockCats,
            livestockLoveBirds: values.livestockLoveBirds,
            livestockFightingCocks: values.livestockFightingCocks,
            livestockPig: values.livestockPig,
            livestockChicken: values.livestockChicken,
            prescenceAgricultural: values.prescenceAgricultural,
            prescenceWeeklyVisitation: values.prescenceWeeklyVisitation,
            prescenceSeedCollection: values.prescenceSeedCollection,
            prescenceStorageAndProcessing: values.prescenceStorageAndProcessing,
            prescenceCreditAndCooperative: values.prescenceCreditAndCooperative,
            prescenceOthers: values.prescenceOthers,
            prescenceOthersInput: values.prescenceOthersInput,
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
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage3",
            data
        );
    };

    const updateSubmissionBarangayProfilePage4 = async () => {
        const data = {
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
            numMalnourishedChildrenCY: values.numMalnourishedChildrenCY,
            totalNumChildWeighted: values.totalNumChildWeighted,
            childSUUnderOneYearNum: values.childSUUnderOneYearNum,
            childSUUnderOneYearPercent: values.childSUUnderOneYearPercent,
            childSUOneToFourYearsNum: values.childSUOneToFourYearsNum,
            childSUOneToFourYearsPercent: values.childSUOneToFourYearsPercent,
            childSUFiveToSixYearsNum: values.childSUFiveToSixYearsNum,
            childSUFiveToSixYearsPercent: values.childSUFiveToSixYearsPercent,
            childSUTotalNum: values.childSUTotalNum,
            childSUPercent: values.childSUPercent,
            childModUUnderOneYearNum: values.childModUUnderOneYearNum,
            childModUUnderOneYearPercent: values.childModUUnderOneYearPercent,
            childModUOneToFourYearsNum: values.childModUOneToFourYearsNum,
            childModUOneToFourYearsPercent:
                values.childModUOneToFourYearsPercent,
            childModUFiveToSixYearsNum: values.childModUFiveToSixYearsNum,
            childModUFiveToSixYearsPercent:
                values.childModUFiveToSixYearsPercent,
            childModUTotalNum: values.childModUTotalNum,
            childModUPercent: values.childModUPercent,
            childMildUUnderOneYearNum: values.childMildUUnderOneYearNum,
            childMildUUnderOneYearPercent: values.childMildUUnderOneYearPercent,
            childMildUOneToFourYearsNum: values.childMildUOneToFourYearsNum,
            childMildUOneToFourYearsPercent:
                values.childMildUOneToFourYearsPercent,
            childMildUFiveToSixYearsNum: values.childMildUFiveToSixYearsNum,
            childMildUFiveToSixYearsPercent:
                values.childMildUFiveToSixYearsPercent,
            childMildUTotalNum: values.childMildUTotalNum,
            childMildUPercent: values.childMildUPercent,
            childTotalUnderOneYearNum: values.childTotalUnderOneYearNum,
            childTotalUnderOneYearPercent: values.childTotalUnderOneYearPercent,
            childTotalOneToFourYearsNum: values.childTotalOneToFourYearsNum,
            childTotalOneToFourYearsPercent:
                values.childTotalOneToFourYearsPercent,
            childTotalFiveToSixYearsNum: values.childTotalFiveToSixYearsNum,
            childTotalFiveToSixYearsPercent:
                values.childTotalFiveToSixYearsPercent,
            childTotalTotalNum: values.childTotalTotalNum,
            childTotalPercent: values.childTotalPercent,
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
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage4",
            data
        );
    };

    const updateSubmissionBarangayProfilePage5 = async () => {
        const data = {
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
            toiletAutoFlush: values.toiletAutoFlush,
            toiletWaterSealed: values.toiletWaterSealed,
            toiletAntipolo: values.toiletAntipolo,
            toiletOthersSpecify: values.toiletOthersSpecify,
            toiletOthers: values.toiletOthers,
            toiletTotal: values.toiletTotal,
            disposalTrucks: values.disposalTrucks,
            disposalOpenPit: values.disposalOpenPit,
            disposalBurying: values.disposalBurying,
            disposalBurning: values.disposalBurning,
            disposalThrowAnywhere: values.disposalThrowAnywhere,
            disposalOthersSpecify: values.disposalOthersSpecify,
            disposalOthers: values.disposalOthers,
            householdOSYThirteenToTwentyOneMale:
                values.householdOSYThirteenToTwentyOneMale,
            householdOSYThirteenToTwentyOneFemale:
                values.householdOSYThirteenToTwentyOneFemale,
            householdOSYThirteenToTwentyOneTotal:
                values.householdOSYThirteenToTwentyOneTotal,
            householdDisabilitiesMale: values.householdDisabilitiesMale,
            householdDisabilitiesFemale: values.householdDisabilitiesFemale,
            householdDisabilitiesTotal: values.householdDisabilitiesTotal,
            householdTotalFiveToSeventeen: values.householdTotalFiveToSeventeen,
            householdTotalFiveToSeventeenHelping:
                values.householdTotalFiveToSeventeenHelping,
            householdFiveToSeventeenHelpingName1:
                values.householdFiveToSeventeenHelpingName1,
            householdFiveToSeventeenHelpingName2:
                values.householdFiveToSeventeenHelpingName2,
            householdFiveToSeventeenHelpingName3:
                values.householdFiveToSeventeenHelpingName3,
            householdFiveToSeventeenHelpingName4:
                values.householdFiveToSeventeenHelpingName4,
            householdFiveToSeventeenHelpingAge1:
                values.householdFiveToSeventeenHelpingAge1,
            householdFiveToSeventeenHelpingAge2:
                values.householdFiveToSeventeenHelpingAge2,
            householdFiveToSeventeenHelpingAge3:
                values.householdFiveToSeventeenHelpingAge3,
            householdFiveToSeventeenHelpingAge4:
                values.householdFiveToSeventeenHelpingAge4,
            householdFiveToSeventeenHelpingGradeSchool1:
                values.householdFiveToSeventeenHelpingGradeSchool1,
            householdFiveToSeventeenHelpingGradeSchool2:
                values.householdFiveToSeventeenHelpingGradeSchool2,
            householdFiveToSeventeenHelpingGradeSchool3:
                values.householdFiveToSeventeenHelpingGradeSchool3,
            householdFiveToSeventeenHelpingGradeSchool4:
                values.householdFiveToSeventeenHelpingGradeSchool4,
            householdFiveToSeventeenHelpingJobActivity1:
                values.householdFiveToSeventeenHelpingJobActivity1,
            householdFiveToSeventeenHelpingJobActivity2:
                values.householdFiveToSeventeenHelpingJobActivity2,
            householdFiveToSeventeenHelpingJobActivity3:
                values.householdFiveToSeventeenHelpingJobActivity3,
            householdFiveToSeventeenHelpingJobActivity4:
                values.householdFiveToSeventeenHelpingJobActivity4,
            householdFiveToSeventeenHelpingIncomeWeekly1:
                values.householdFiveToSeventeenHelpingIncomeWeekly1,
            householdFiveToSeventeenHelpingIncomeWeekly2:
                values.householdFiveToSeventeenHelpingIncomeWeekly2,
            householdFiveToSeventeenHelpingIncomeWeekly3:
                values.householdFiveToSeventeenHelpingIncomeWeekly3,
            householdFiveToSeventeenHelpingIncomeWeekly4:
                values.householdFiveToSeventeenHelpingIncomeWeekly4,
            householdFiveToSeventeenHelpingProgramsAvailed:
                values.householdFiveToSeventeenHelpingProgramsAvailed,
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage5",
            data
        );
    };

    const updateSubmissionBarangayProfilePage6 = async () => {
        const data = {
            numGradeCompleted: values.numGradeCompleted,
            nurseryPrepKinder: values.nurseryPrepKinder,
            grade1: values.grade1,
            grade2: values.grade2,
            grade3: values.grade3,
            grade4: values.grade4,
            grade5: values.grade5,
            grade6: values.grade6,
            grade7: values.grade7,
            grade8: values.grade8,
            grade9: values.grade9,
            grade10: values.grade10,
            juniorHigh: values.juniorHigh,
            seniorHigh: values.seniorHigh,
            college1: values.college1,
            college2: values.college2,
            college3: values.college3,
            college4: values.college4,
            college5: values.college5,
            baccalaureate: values.baccalaureate,
            postBaccalaureate: values.postBaccalaureate,
            aquacultureNum: values.aquacultureNum,
            aquacultureSponsoredBy: values.aquacultureSponsoredBy,
            aquaculturePublic: values.aquaculturePublic,
            aquaculturePrivate: values.aquaculturePrivate,
            sewingNum: values.sewingNum,
            sewingSponsoredBy: values.sewingSponsoredBy,
            sewingPublic: values.sewingPublic,
            sewingPrivate: values.sewingPrivate,
            flowerMakingNum: values.flowerMakingNum,
            flowerMakingSponsoredBy: values.flowerMakingSponsoredBy,
            flowerMakingPublic: values.flowerMakingPublic,
            flowerMakingPrivate: values.flowerMakingPrivate,
            backyardGardeningNum: values.backyardGardeningNum,
            backyardGardeningSponsoredBy: values.backyardGardeningSponsoredBy,
            backyardGardeningPublic: values.backyardGardeningPublic,
            backyardGardeningPrivate: values.backyardGardeningPrivate,
            handicraftNum: values.handicraftNum,
            handicraftSponsoredBy: values.handicraftSponsoredBy,
            handicraftPublic: values.handicraftPublic,
            handicraftPrivate: values.handicraftPrivate,
            beautyCulturalNum: values.beautyCulturalNum,
            beautyCulturalSponsoredBy: values.beautyCulturalSponsoredBy,
            beautyCulturalPublic: values.beautyCulturalPublic,
            beautyCulturalPrivate: values.beautyCulturalPrivate,
            livestockRaisingNum: values.livestockRaisingNum,
            livestockRaisingSponsoredBy: values.livestockRaisingSponsoredBy,
            livestockRaisingPublic: values.livestockRaisingPublic,
            livestockRaisingPrivate: values.livestockRaisingPrivate,
            carpentryNum: values.carpentryNum,
            carpentrySponsoredBy: values.carpentrySponsoredBy,
            carpentryPublic: values.carpentryPublic,
            carpentryPrivate: values.carpentryPrivate,
            cosmetologyNum: values.cosmetologyNum,
            cosmetologySponsoredBy: values.cosmetologySponsoredBy,
            cosmetologyPublic: values.cosmetologyPublic,
            cosmetologyPrivate: values.cosmetologyPrivate,
            recyclingOfMaterialNum: values.recyclingOfMaterialNum,
            recyclingOfMaterialSponsoredBy:
                values.recyclingOfMaterialSponsoredBy,
            recyclingOfMaterialPublic: values.recyclingOfMaterialPublic,
            recyclingOfMaterialPrivate: values.recyclingOfMaterialPrivate,
            culinaryArtNum: values.culinaryArtNum,
            culinaryArtSponsoredBy: values.culinaryArtSponsoredBy,
            culinaryArtPublic: values.culinaryArtPublic,
            culinaryArtPrivate: values.culinaryArtPrivate,
            typingEncodingNum: values.typingEncodingNum,
            typingEncodingSponsoredBy: values.typingEncodingSponsoredBy,
            typingEncodingPublic: values.typingEncodingPublic,
            typingEncodingPrivate: values.typingEncodingPrivate,
            electronicsNum: values.electronicsNum,
            electronicsSponsoredBy: values.electronicsSponsoredBy,
            electronicsPublic: values.electronicsPublic,
            electronicsPrivate: values.electronicsPrivate,
            practicalElectricityNum: values.practicalElectricityNum,
            practicalElectricitySponsoredBy:
                values.practicalElectricitySponsoredBy,
            practicalElectricityPublic: values.practicalElectricityPublic,
            practicalElectricityPrivate: values.practicalElectricityPrivate,
            othersNumSpecify: values.othersNumSpecify,
            othersNum: values.othersNum,
            othersSponsoredBy: values.othersSponsoredBy,
            othersPublic: values.othersPublic,
            othersPrivate: values.othersPrivate,
            educInstructionPublic1: values.educInstructionPublic1,
            educInstructionPrivate1: values.educInstructionPrivate1,
            educInstructionDayCare1: values.educInstructionDayCare1,
            educInstructionPreschoolKinder1:
                values.educInstructionPreschoolKinder1,
            educInstructionElementary1: values.educInstructionElementary1,
            educInstructionSecondary1: values.educInstructionSecondary1,
            educInstructionTertiaryCollege1:
                values.educInstructionTertiaryCollege1,
            educInstructionPostGraduate1: values.educInstructionPostGraduate1,
            educInstructionPublic2: values.educInstructionPublic2,
            educInstructionPrivate2: values.educInstructionPrivate2,
            educInstructionDayCare2: values.educInstructionDayCare2,
            educInstructionPreschoolKinder2:
                values.educInstructionPreschoolKinder2,
            educInstructionElementary2: values.educInstructionElementary2,
            educInstructionSecondary2: values.educInstructionSecondary2,
            educInstructionTertiaryCollege2:
                values.educInstructionTertiaryCollege2,
            educInstructionPostGraduate2: values.educInstructionPostGraduate2,
            educInstructionPublic3: values.educInstructionPublic3,
            educInstructionPrivate3: values.educInstructionPrivate3,
            educInstructionDayCare3: values.educInstructionDayCare3,
            educInstructionPreschoolKinder3:
                values.educInstructionPreschoolKinder3,
            educInstructionElementary3: values.educInstructionElementary3,
            educInstructionSecondary3: values.educInstructionSecondary3,
            educInstructionTertiaryCollege3:
                values.educInstructionTertiaryCollege3,
            educInstructionPostGraduate3: values.educInstructionPostGraduate3,
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage6",
            data
        );
    };

    const updateSubmissionBarangayProfilePage7 = async () => {
        const data = {
            typeOfBuildingNum1: values.typeOfBuildingNum1,
            typeOfBuildingNum2: values.typeOfBuildingNum2,
            typeOfBuildingNum3: values.typeOfBuildingNum3,
            typeOfBuildingNum4: values.typeOfBuildingNum4,
            typeOfBuildingNum5: values.typeOfBuildingNum5,
            typeOfBuildingNum6: values.typeOfBuildingNum6,
            typeOfBuildingNum6Specify: values.typeOfBuildingNum6Specify,
            typeOfConstructionMats1: values.typeOfConstructionMats1,
            typeOfConstructionMats2: values.typeOfConstructionMats2,
            typeOfConstructionMats3: values.typeOfConstructionMats3,
            typeOfConstructionMats4: values.typeOfConstructionMats4,
            typeOfConstructionMats5: values.typeOfConstructionMats5,
            typeOfConstructionMats5Specify:
                values.typeOfConstructionMats5Specify,
            numInformalSettler1: values.numInformalSettler1,
            numInformalSettler2: values.numInformalSettler2,
            numInformalSettler3: values.numInformalSettler3,
            numInformalSettler4: values.numInformalSettler4,
            numInformalSettler5: values.numInformalSettler5,
            numInformalSettlerLocation1: values.numInformalSettlerLocation1,
            numInformalSettlerLocation2: values.numInformalSettlerLocation2,
            numInformalSettlerLocation3: values.numInformalSettlerLocation3,
            numInformalSettlerLocation4: values.numInformalSettlerLocation4,
            numInformalSettlerLocation5: values.numInformalSettlerLocation5,
            numHeritageStructure1: values.numHeritageStructure1,
            numHeritageStructure2: values.numHeritageStructure2,
            numHeritageStructure3: values.numHeritageStructure3,
            numHeritageStructure4: values.numHeritageStructure4,
            numHeritageStructure5: values.numHeritageStructure5,
            numHeritageStructure6: values.numHeritageStructure6,
            heritageStructureLocation1: values.heritageStructureLocation1,
            heritageStructureLocation2: values.heritageStructureLocation2,
            heritageStructureLocation3: values.heritageStructureLocation3,
            heritageStructureLocation4: values.heritageStructureLocation4,
            heritageStructureLocation5: values.heritageStructureLocation5,
            heritageStructureLocation6: values.heritageStructureLocation6,
            presenceProtectiveService1: values.presenceProtectiveService1,
            presenceProtectiveService2: values.presenceProtectiveService2,
            presenceProtectiveService3: values.presenceProtectiveService3,
            presenceProtectiveService4: values.presenceProtectiveService4,
            presenceProtectiveService5: values.presenceProtectiveService5,
            presenceProtectiveService5Specify:
                values.presenceProtectiveService5Specify,
            presenceNumPersonnel1: values.presenceNumPersonnel1,
            presenceNumPersonnel2: values.presenceNumPersonnel2,
            presenceNumPersonnel3: values.presenceNumPersonnel3,
            presenceNumPersonnel4: values.presenceNumPersonnel4,
            presenceNumPersonnel5: values.presenceNumPersonnel5,
            sportsFacilitiesPublic1: values.sportsFacilitiesPublic1,
            sportsFacilitiesPublic2: values.sportsFacilitiesPublic2,
            sportsFacilitiesPublic3: values.sportsFacilitiesPublic3,
            sportsFacilitiesPublic4: values.sportsFacilitiesPublic4,
            sportsFacilitiesPublic5: values.sportsFacilitiesPublic5,
            sportsFacilitiesPublic6: values.sportsFacilitiesPublic6,
            sportsFacilitiesPublic7: values.sportsFacilitiesPublic7,
            sportsFacilitiesPublic8: values.sportsFacilitiesPublic8,
            sportsFacilitiesPrivate1: values.sportsFacilitiesPrivate1,
            sportsFacilitiesPrivate2: values.sportsFacilitiesPrivate2,
            sportsFacilitiesPrivate3: values.sportsFacilitiesPrivate3,
            sportsFacilitiesPrivate4: values.sportsFacilitiesPrivate4,
            sportsFacilitiesPrivate5: values.sportsFacilitiesPrivate5,
            sportsFacilitiesPrivate6: values.sportsFacilitiesPrivate6,
            sportsFacilitiesPrivate7: values.sportsFacilitiesPrivate7,
            sportsFacilitiesPrivate8: values.sportsFacilitiesPrivate8,
            sportsFacilities8Specify: values.sportsFacilities8Specify,
            recreationalPublic1: values.recreationalPublic1,
            recreationalPublic2: values.recreationalPublic2,
            recreationalPublic3: values.recreationalPublic3,
            recreationalPublic4: values.recreationalPublic4,
            recreationalPublic5: values.recreationalPublic5,
            recreationalPublic6: values.recreationalPublic6,
            recreationalPublic7: values.recreationalPublic7,
            recreationalPublic8: values.recreationalPublic8,
            recreationalPrivate1: values.recreationalPrivate1,
            recreationalPrivate2: values.recreationalPrivate2,
            recreationalPrivate3: values.recreationalPrivate3,
            recreationalPrivate4: values.recreationalPrivate4,
            recreationalPrivate5: values.recreationalPrivate5,
            recreationalPrivate6: values.recreationalPrivate6,
            recreationalPrivate7: values.recreationalPrivate7,
            recreationalPrivate8: values.recreationalPrivate8,
            recreational8Specify: values.recreational8Specify,
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage7",
            data
        );
    };

    const updateSubmissionBarangayProfilePage8 = async () => {
        const data = {
            tricycleWithinBarangay: values.tricycleWithinBarangay,
            tricycleWithinDistrict: values.tricycleWithinDistrict,
            tricycleWithinCityProper: values.tricycleWithinCityProper,
            trisikadWithinBarangay: values.trisikadWithinBarangay,
            trisikadWithinDistrict: values.trisikadWithinDistrict,
            trisikadWithinCityProper: values.trisikadWithinCityProper,
            jeepneyWithinBarangay: values.jeepneyWithinBarangay,
            jeepneyWithinDistrict: values.jeepneyWithinDistrict,
            jeepneyWithinCityProper: values.jeepneyWithinCityProper,
            carWithinBarangay: values.carWithinBarangay,
            carWithinDistrict: values.carWithinDistrict,
            carWithinCityProper: values.carWithinCityProper,
            busWithinBarangay: values.busWithinBarangay,
            busWithinDistrict: values.busWithinDistrict,
            busWithinCityProper: values.busWithinCityProper,
            boatMotorizedWithinBarangay: values.boatMotorizedWithinBarangay,
            boatMotorizedWithinDistrict: values.boatMotorizedWithinDistrict,
            boatMotorizedWithinCityProper: values.boatMotorizedWithinCityProper,
            boatNonMotorizedWithinBarangay:
                values.boatNonMotorizedWithinBarangay,
            boatNonMotorizedWithinDistrict:
                values.boatNonMotorizedWithinDistrict,
            boatNonMotorizedWithinCityProper:
                values.boatNonMotorizedWithinCityProper,
            othersWithinBarangay: values.othersWithinBarangay,
            othersWithinDistrict: values.othersWithinDistrict,
            othersWithinCityProper: values.othersWithinCityProper,
            othersTransportFacilitySpecify:
                values.othersTransportFacilitySpecify,
            waterSupplyNumHousehold1: values.waterSupplyNumHousehold1,
            waterSupplyNumHousehold2: values.waterSupplyNumHousehold2,
            waterSupplyNumHousehold3: values.waterSupplyNumHousehold3,
            waterSupplyNumHousehold4: values.waterSupplyNumHousehold4,
            waterSupplyNumHousehold5: values.waterSupplyNumHousehold5,
            waterSupplyNumHousehold6: values.waterSupplyNumHousehold6,
            waterSupplyNumHousehold7: values.waterSupplyNumHousehold7,
            waterSupplyPercentHousehold1: values.waterSupplyPercentHousehold1,
            waterSupplyPercentHousehold2: values.waterSupplyPercentHousehold2,
            waterSupplyPercentHousehold3: values.waterSupplyPercentHousehold3,
            waterSupplyPercentHousehold4: values.waterSupplyPercentHousehold4,
            waterSupplyPercentHousehold5: values.waterSupplyPercentHousehold5,
            waterSupplyPercentHousehold6: values.waterSupplyPercentHousehold6,
            waterSupplyPercentHousehold7: values.waterSupplyPercentHousehold7,
            waterSupply7Specify: values.waterSupply7Specify,
            waterSupplyNumTotal: values.waterSupplyNumTotal,
            waterSupplyPercentTotal: values.waterSupplyPercentTotal,
            inventoryExistingPowerSupplyNum1:
                values.inventoryExistingPowerSupplyNum1,
            inventoryExistingPowerSupplyPercent1:
                values.inventoryExistingPowerSupplyPercent1,
            inventoryExistingPowerSupplyNum2:
                values.inventoryExistingPowerSupplyNum2,
            inventoryExistingPowerSupplyPercent2:
                values.inventoryExistingPowerSupplyPercent2,
            inventoryExistingPowerSupplySpecify:
                values.inventoryExistingPowerSupplySpecify,
            inventoryExistingPowerSupplyNumTotal:
                values.inventoryExistingPowerSupplyNumTotal,
            inventoryExistingPowerSupplyPercentTotal:
                values.inventoryExistingPowerSupplyPercentTotal,
            inventoryFuelUsedNum1: values.inventoryFuelUsedNum1,
            inventoryFuelUsedPercent1: values.inventoryFuelUsedPercent1,
            inventoryFuelUsedNum2: values.inventoryFuelUsedNum2,
            inventoryFuelUsedPercent2: values.inventoryFuelUsedPercent2,
            inventoryFuelUsedNum3: values.inventoryFuelUsedNum3,
            inventoryFuelUsedPercent3: values.inventoryFuelUsedPercent3,
            inventoryFuelUsedNum4: values.inventoryFuelUsedNum4,
            inventoryFuelUsedPercent4: values.inventoryFuelUsedPercent4,
            inventoryFuelUsed4Specify: values.inventoryFuelUsed4Specify,
            inventoryFuelUsedNumTotal: values.inventoryFuelUsedNumTotal,
            inventoryFuelUsedPercentTotal: values.inventoryFuelUsedPercentTotal,
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
        };

        await Axios.put(
            "http://localhost:3001/submission/brgyProfilePage8",
            data
        );
    };

    const updateSubmissionBarangayProfilePage9 = async () => {
        const data = {
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
            "http://localhost:3001/submission/brgyProfilePage9",
            data
        );
    };

    // console.log("PAGE1 DATA", page1Data);

    // const generatePDF = async (e) => {
    //     e.preventDefault();
    //     const pdf = new jsPDF("portrait", "in", [14, 8.5]);
    //     const pdfHeight2 = pdf.internal.pageSize.getHeight();
    //     const imgHeight = contentRef.current.clientHeight / 96;
    //     const totalPDFPages = imgHeight / pdfHeight2;
    //     const data = contentRef.current;

    //     let i = 1;

    //     while (totalPDFPages > i) {
    //         pdf.addPage();
    //     }

    //     pdf.html(data).then(() => {
    //         pdf.save("BarangayProdile.pdf");
    //     });

    //     doc.html(document.querySelector("#content"), {
    //         callback: function (pdf) {
    //             pdf.save(`${data?.barangayName}BarangayProfile.pdf`);
    //         },
    //     });
    // };

    const submit = async (e) => {
        e.preventDefault();
    };

    // useEffect(() => {
    //     window.addEventListener("keydown", detectKeyDown, true);
    // }, []);

    // const detectKeyDown = (e) => {
    //     console.log("Pressed Key: ", e.key);
    //     if (e.key == "s") {
    //         console.log("SAVED");
    //     }
    // };

    // Save key shortcut

    // const submittedDatas = submittedData.map((data) => {
    //     return data.yearSubmitted;
    // });

    // console.log(submittedDatas);

    // if (submittedDatas == 2022) {
    //     console.log("TEST");
    // }

    // console.log(submittedData);
    // useEffect(() => {
    //     const checkYearOfSubmission = async () => {
    //         const isSubmitted = await Axios.post(
    //             "http://localhost:3001/submission/getSubmittedBarangayProfilePage",
    //             { yearSubmitted: yearSubmitted }
    //         ).then((res) => res.data);

    //         console.log(isSubmitted);
    //         // const submittedDatas = submittedData.map((data) => {
    //         //     return data.yearSubmitted;
    //         // });
    //         // console.log("SUBMITTED DATAS", submittedDatas);
    //         // console.log("YEAR SUBMITTED", yearSubmitted);

    //         // const isIncluded = submittedDatas.includes(yearSubmitted);

    //         // console.log(isIncluded);
    //     };
    //     checkYearOfSubmission();
    // }, [yearSubmitted]);

    const createPDF = async (e) => {
        e.preventDefault();

        const isSubmitted = await Axios.post(
            "http://localhost:3001/submission/getSubmittedBarangayProfilePage",
            { yearSubmitted: yearSubmitted }
        ).then((res) => res.data);

        if (isSubmitted) {
            return alert(
                "You have already submitted a document from your chosen year."
            );
        }

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
        // const imgHeight = contentRef.current.clientHeight / 96;
        // // const totalPDFPages = imgHeight / pdfHeight2;
        // const data = await html2canvas(contentRef.current, {
        //     useCORS: true,
        //     scale: 2,
        // });

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
            `BarangayProfile${selectedBarangayData.selectedBarangay}${selectedBarangayData.selectedDistrict}${yearSubmitted}.pdf`,
            {
                type: pdf.output("blob").type,
                lastModified: pdf.output("blob").lastModified,
            }
        );

        // Upload file to server
        // const formData = new FormData();
        // formData.append("file", pdfAttachment);

        // await Axios.post("http://localhost:3001/upload", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        // });

        const submissionName = `BarangayProfile${selectedBarangayData.selectedBarangay}${selectedBarangayData.selectedDistrict}${yearSubmitted}.pdf`;

        const submissionRef = ref(
            storage,
            `submission/barangayProfile/${submissionName}`
        );

        await uploadBytes(submissionRef, pdfAttachment);
        const submissionBarangayProfileUrl = await getDownloadURL(
            submissionRef
        );
        // console.log("SUBMISSION URL", submissionBarangayProfileUrl);

        const data = {
            yearSubmitted: yearSubmitted,
            city: values.city,
            legalBasis: values.legalBasis,
            dateRatification: values.dateRatification,
            sitio1: values.sitio1,
            sitio2: values.sitio2,
            sitio3: values.sitio3,
            sitio4: values.sitio4,
            north: values.north,
            south: values.south,
            east: values.east,
            west: values.west,
            distanceFromCityHall: values.distanceFromCityHall,
            distanceFromPoblacion: values.distanceFromPoblacion,
            distanceFromCapitol: values.distanceFromCapitol,
            distanceFromHighway: values.distanceFromHighway,
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
            dialectSpoken: values.dialectSpoken,
            ethnicGroups: values.ethnicGroups,
            dateLastElection: values.dateLastElection,
            numRegisteredVoters: values.numRegisteredVoters,
            numPredominantVoters: values.numPredominantVoters,
            numPrecincts: values.numPrecincts,
            majorSourcesLivelihood: values.majorSourcesLivelihood,
            totalSelfEmployed: values.totalSelfEmployed,
            totalDriver: values.totalDriver,
            totalEmployee: values.totalEmployee,
            totalTrisikadDriver: values.totalTrisikadDriver,
            totalTeacher: values.totalTeacher,
            totalFishermanFarmer: values.totalFishermanFarmer,
            totalOFWSeaman: values.totalOFWSeaman,
            totalVendor: values.totalVendor,
            totalMedicalProfession: values.totalMedicalProfession,
            totalDressmakerTailor: values.totalDressmakerTailor,
            totalCarpenterPlumber: values.totalCarpenterPlumber,
            totalBarbersHairdresser: values.totalBarbersHairdresser,
            totalLaborerOddJobs: values.totalLaborerOddJobs,
            totalBusinessman: values.totalBusinessman,
            totalJanitorGardener: values.totalJanitorGardener,
            totalBeautician: values.totalBeautician,
            totalSecretary: values.totalSecretary,
            totalElectricianTechnician: values.totalElectricianTechnician,
            totalSalesClerk: values.totalSalesClerk,
            totalOthers: values.totalOthers,
            totalOthersSpecify: values.totalOthersSpecify,
            totalGrand: values.totalGrand,
            employmentMale1: values.employmentMale1,
            employmentMale2: values.employmentMale2,
            employmentMale3: values.employmentMale3,
            employmentMale4: values.employmentMale4,
            employmentMale5: values.employmentMale5,
            employmentMale6: values.employmentMale6,
            employmentMale7: values.employmentMale7,
            employmentMale8: values.employmentMale8,
            employmentMale9: values.employmentMale9,
            employmentMale10: values.employmentMale10,
            employmentMale11: values.employmentMale11,
            employmentFemale1: values.employmentFemale1,
            employmentFemale2: values.employmentFemale2,
            employmentFemale3: values.employmentFemale3,
            employmentFemale4: values.employmentFemale4,
            employmentFemale5: values.employmentFemale5,
            employmentFemale6: values.employmentFemale6,
            employmentFemale7: values.employmentFemale7,
            employmentFemale8: values.employmentFemale8,
            employmentFemale9: values.employmentFemale9,
            employmentFemale10: values.employmentFemale10,
            employmentFemale11: values.employmentFemale11,
            monthlyIncome1: values.monthlyIncome1,
            monthlyIncome2: values.monthlyIncome2,
            monthlyIncome3: values.monthlyIncome3,
            monthlyIncome4: values.monthlyIncome4,
            monthlyIncome5: values.monthlyIncome5,
            monthlyIncome6: values.monthlyIncome6,
            monthlyIncome7: values.monthlyIncome7,
            monthlyIncome8: values.monthlyIncome8,
            monthlyIncome9: values.monthlyIncome9,
            monthlyIncome10: values.monthlyIncome10,
            monthlyIncome11: values.monthlyIncome11,
            monthlyIncome12: values.monthlyIncome12,
            monthlyIncome13: values.monthlyIncome13,
            monthlyIncome14: values.monthlyIncome14,
            monthlyIncome15: values.monthlyIncome15,
            farmingTechnique: values.farmingTechnique,
            methodUsed: values.methodUsed,
            annualIncomeFarmerTenant: values.annualIncomeFarmerTenant,
            cropsRice: values.cropsRice,
            cropsVegetableCorn: values.cropsVegetableCorn,
            cropsRiceYieldYearKg: values.cropsRiceYieldYearKg,
            cropsVegetableCornYieldYearKg: values.cropsVegetableCornYieldYearKg,
            numFarmersTenantsRice: values.numFarmersTenantsRice,
            numFarmersTenantsVegetableCorn:
                values.numFarmersTenantsVegetableCorn,
            cropsProduced1: values.cropsProduced1,
            cropsProduced1Number: values.cropsProduced1Number,
            cropsProduced1YieldYear: values.cropsProduced1YieldYear,
            cropsProduced1FarmersTenants: values.cropsProduced1FarmersTenants,
            agriFacilityRicemills: values.agriFacilityRicemills,
            agriFacilityCono: values.agriFacilityCono,
            agriFacilityKiskisan: values.agriFacilityKiskisan,
            agriFacilityWarehouse: values.agriFacilityWarehouse,
            agriFacilityBuyingStations: values.agriFacilityBuyingStations,
            agriFacilityTractors: values.agriFacilityTractors,
            agriFacilityOthers: values.agriFacilityOthers,
            agriFacilityOthersSpecify: values.agriFacilityOthersSpecify,
            irrigationSystem1: values.irrigationSystem1,
            irrigationSystem1ServicesArea: values.irrigationSystem1ServicesArea,
            irrigationSystem1NumFarmers: values.irrigationSystem1NumFarmers,
            irrigationSystem1ThrougoutTheYear:
                values.irrigationSystem1ThrougoutTheYear,
            irrigationSystem1TwiceAYear: values.irrigationSystem1TwiceAYear,
            irrigationSystem1OnceAYear: values.irrigationSystem1OnceAYear,
            irrigationSystem2: values.irrigationSystem2,
            irrigationSystem2ServicesArea: values.irrigationSystem2ServicesArea,
            irrigationSystem2NumFarmers: values.irrigationSystem2NumFarmers,
            irrigationSystem2ThrougoutTheYear:
                values.irrigationSystem2ThrougoutTheYear,
            irrigationSystem2TwiceAYear: values.irrigationSystem2TwiceAYear,
            irrigationSystem2OnceAYear: values.irrigationSystem2OnceAYear,
            irrigationSystem3: values.irrigationSystem3,
            irrigationSystem3ServicesArea: values.irrigationSystem3ServicesArea,
            irrigationSystem3NumFarmers: values.irrigationSystem3NumFarmers,
            irrigationSystem3ThrougoutTheYear:
                values.irrigationSystem3ThrougoutTheYear,
            irrigationSystem3TwiceAYear: values.irrigationSystem3TwiceAYear,
            irrigationSystem3OnceAYear: values.irrigationSystem3OnceAYear,
            fishFarm1Type: values.fishFarm1Type,
            fishFarm1Num: values.fishFarm1Num,
            fishFarm1NumWorkers: values.fishFarm1NumWorkers,
            fishFarm1AreasCovered: values.fishFarm1AreasCovered,
            fishFarm1VolumeCatch: values.fishFarm1VolumeCatch,
            fishFarm1ProductionValue: values.fishFarm1ProductionValue,
            fishFarm2Type: values.fishFarm2Type,
            fishFarm2Num: values.fishFarm2Num,
            fishFarm2NumWorkers: values.fishFarm2NumWorkers,
            fishFarm2AreasCovered: values.fishFarm2AreasCovered,
            fishFarm2VolumeCatch: values.fishFarm2VolumeCatch,
            fishFarm2ProductionValue: values.fishFarm2ProductionValue,
            fishFarm3Type: values.fishFarm3Type,
            fishFarm3Num: values.fishFarm3Num,
            fishFarm3NumWorkers: values.fishFarm3NumWorkers,
            fishFarm3AreasCovered: values.fishFarm3AreasCovered,
            fishFarm3VolumeCatch: values.fishFarm3VolumeCatch,
            fishFarm3ProductionValue: values.fishFarm3ProductionValue,
            fishVolume: values.fishVolume,
            fishProductionValue: values.fishProductionValue,
            shrimpVolume: values.shrimpVolume,
            shrimpProductionValue: values.shrimpProductionValue,
            shellsVolume: values.shellsVolume,
            shellsProductionValue: values.shellsProductionValue,
            fishFryVolume: values.fishFryVolume,
            fishFryProductionValue: values.fishFryProductionValue,
            musselsVolume: values.musselsVolume,
            musselsProductionValue: values.musselsProductionValue,
            oystersVolume: values.oystersVolume,
            oystersProductionValue: values.oystersProductionValue,
            fishOthersVolume: values.fishOthersVolume,
            fishOthersProductionValue: values.fishOthersProductionValue,
            fishOthersSpecify: values.fishOthersSpecify,
            numFisherman: values.numFisherman,
            averageIncomeFisherman: values.averageIncomeFisherman,
            livestockLayers: values.livestockLayers,
            livestockCattles: values.livestockCattles,
            livestockBroilers: values.livestockBroilers,
            livestockCarabaos: values.livestockCarabaos,
            livestockMuscovy: values.livestockMuscovy,
            livestockHogs: values.livestockHogs,
            livestockGeese: values.livestockGeese,
            livestockGoats: values.livestockGoats,
            livestockPigeons: values.livestockPigeons,
            livestockHorses: values.livestockHorses,
            livestockQuails: values.livestockQuails,
            livestockDogs: values.livestockDogs,
            livestockPoultryOthers: values.livestockPoultryOthers,
            livestockPoultryOthersSpecify: values.livestockPoultryOthersSpecify,
            livestockOthers: values.livestockOthers,
            livestockTurkey: values.livestockTurkey,
            livestockCats: values.livestockCats,
            livestockLoveBirds: values.livestockLoveBirds,
            livestockFightingCocks: values.livestockFightingCocks,
            livestockPig: values.livestockPig,
            livestockChicken: values.livestockChicken,
            prescenceAgricultural: values.prescenceAgricultural,
            prescenceWeeklyVisitation: values.prescenceWeeklyVisitation,
            prescenceSeedCollection: values.prescenceSeedCollection,
            prescenceStorageAndProcessing: values.prescenceStorageAndProcessing,
            prescenceCreditAndCooperative: values.prescenceCreditAndCooperative,
            prescenceOthers: values.prescenceOthers,
            prescenceOthersInput: values.prescenceOthersInput,
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
            numMalnourishedChildrenCY: values.numMalnourishedChildrenCY,
            totalNumChildWeighted: values.totalNumChildWeighted,
            childSUUnderOneYearNum: values.childSUUnderOneYearNum,
            childSUUnderOneYearPercent: values.childSUUnderOneYearPercent,
            childSUOneToFourYearsNum: values.childSUOneToFourYearsNum,
            childSUOneToFourYearsPercent: values.childSUOneToFourYearsPercent,
            childSUFiveToSixYearsNum: values.childSUFiveToSixYearsNum,
            childSUFiveToSixYearsPercent: values.childSUFiveToSixYearsPercent,
            childSUTotalNum: values.childSUTotalNum,
            childSUPercent: values.childSUPercent,
            childModUUnderOneYearNum: values.childModUUnderOneYearNum,
            childModUUnderOneYearPercent: values.childModUUnderOneYearPercent,
            childModUOneToFourYearsNum: values.childModUOneToFourYearsNum,
            childModUOneToFourYearsPercent:
                values.childModUOneToFourYearsPercent,
            childModUFiveToSixYearsNum: values.childModUFiveToSixYearsNum,
            childModUFiveToSixYearsPercent:
                values.childModUFiveToSixYearsPercent,
            childModUTotalNum: values.childModUTotalNum,
            childModUPercent: values.childModUPercent,
            childMildUUnderOneYearNum: values.childMildUUnderOneYearNum,
            childMildUUnderOneYearPercent: values.childMildUUnderOneYearPercent,
            childMildUOneToFourYearsNum: values.childMildUOneToFourYearsNum,
            childMildUOneToFourYearsPercent:
                values.childMildUOneToFourYearsPercent,
            childMildUFiveToSixYearsNum: values.childMildUFiveToSixYearsNum,
            childMildUFiveToSixYearsPercent:
                values.childMildUFiveToSixYearsPercent,
            childMildUTotalNum: values.childMildUTotalNum,
            childMildUPercent: values.childMildUPercent,
            childTotalUnderOneYearNum: values.childTotalUnderOneYearNum,
            childTotalUnderOneYearPercent: values.childTotalUnderOneYearPercent,
            childTotalOneToFourYearsNum: values.childTotalOneToFourYearsNum,
            childTotalOneToFourYearsPercent:
                values.childTotalOneToFourYearsPercent,
            childTotalFiveToSixYearsNum: values.childTotalFiveToSixYearsNum,
            childTotalFiveToSixYearsPercent:
                values.childTotalFiveToSixYearsPercent,
            childTotalTotalNum: values.childTotalTotalNum,
            childTotalPercent: values.childTotalPercent,
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
            toiletAutoFlush: values.toiletAutoFlush,
            toiletWaterSealed: values.toiletWaterSealed,
            toiletAntipolo: values.toiletAntipolo,
            toiletOthersSpecify: values.toiletOthersSpecify,
            toiletOthers: values.toiletOthers,
            toiletTotal: values.toiletTotal,
            disposalTrucks: values.disposalTrucks,
            disposalOpenPit: values.disposalOpenPit,
            disposalBurying: values.disposalBurying,
            disposalBurning: values.disposalBurning,
            disposalThrowAnywhere: values.disposalThrowAnywhere,
            disposalOthersSpecify: values.disposalOthersSpecify,
            disposalOthers: values.disposalOthers,
            householdOSYThirteenToTwentyOneMale:
                values.householdOSYThirteenToTwentyOneMale,
            householdOSYThirteenToTwentyOneFemale:
                values.householdOSYThirteenToTwentyOneFemale,
            householdOSYThirteenToTwentyOneTotal:
                values.householdOSYThirteenToTwentyOneTotal,
            householdDisabilitiesMale: values.householdDisabilitiesMale,
            householdDisabilitiesFemale: values.householdDisabilitiesFemale,
            householdDisabilitiesTotal: values.householdDisabilitiesTotal,
            householdTotalFiveToSeventeen: values.householdTotalFiveToSeventeen,
            householdTotalFiveToSeventeenHelping:
                values.householdTotalFiveToSeventeenHelping,
            householdFiveToSeventeenHelpingName1:
                values.householdFiveToSeventeenHelpingName1,
            householdFiveToSeventeenHelpingName2:
                values.householdFiveToSeventeenHelpingName2,
            householdFiveToSeventeenHelpingName3:
                values.householdFiveToSeventeenHelpingName3,
            householdFiveToSeventeenHelpingName4:
                values.householdFiveToSeventeenHelpingName4,
            householdFiveToSeventeenHelpingAge1:
                values.householdFiveToSeventeenHelpingAge1,
            householdFiveToSeventeenHelpingAge2:
                values.householdFiveToSeventeenHelpingAge2,
            householdFiveToSeventeenHelpingAge3:
                values.householdFiveToSeventeenHelpingAge3,
            householdFiveToSeventeenHelpingAge4:
                values.householdFiveToSeventeenHelpingAge4,
            householdFiveToSeventeenHelpingGradeSchool1:
                values.householdFiveToSeventeenHelpingGradeSchool1,
            householdFiveToSeventeenHelpingGradeSchool2:
                values.householdFiveToSeventeenHelpingGradeSchool2,
            householdFiveToSeventeenHelpingGradeSchool3:
                values.householdFiveToSeventeenHelpingGradeSchool3,
            householdFiveToSeventeenHelpingGradeSchool4:
                values.householdFiveToSeventeenHelpingGradeSchool4,
            householdFiveToSeventeenHelpingJobActivity1:
                values.householdFiveToSeventeenHelpingJobActivity1,
            householdFiveToSeventeenHelpingJobActivity2:
                values.householdFiveToSeventeenHelpingJobActivity2,
            householdFiveToSeventeenHelpingJobActivity3:
                values.householdFiveToSeventeenHelpingJobActivity3,
            householdFiveToSeventeenHelpingJobActivity4:
                values.householdFiveToSeventeenHelpingJobActivity4,
            householdFiveToSeventeenHelpingIncomeWeekly1:
                values.householdFiveToSeventeenHelpingIncomeWeekly1,
            householdFiveToSeventeenHelpingIncomeWeekly2:
                values.householdFiveToSeventeenHelpingIncomeWeekly2,
            householdFiveToSeventeenHelpingIncomeWeekly3:
                values.householdFiveToSeventeenHelpingIncomeWeekly3,
            householdFiveToSeventeenHelpingIncomeWeekly4:
                values.householdFiveToSeventeenHelpingIncomeWeekly4,
            householdFiveToSeventeenHelpingProgramsAvailed:
                values.householdFiveToSeventeenHelpingProgramsAvailed,
            numGradeCompleted: values.numGradeCompleted,
            nurseryPrepKinder: values.nurseryPrepKinder,
            grade1: values.grade1,
            grade2: values.grade2,
            grade3: values.grade3,
            grade4: values.grade4,
            grade5: values.grade5,
            grade6: values.grade6,
            grade7: values.grade7,
            grade8: values.grade8,
            grade9: values.grade9,
            grade10: values.grade10,
            juniorHigh: values.juniorHigh,
            seniorHigh: values.seniorHigh,
            college1: values.college1,
            college2: values.college2,
            college3: values.college3,
            college4: values.college4,
            college5: values.college5,
            baccalaureate: values.baccalaureate,
            postBaccalaureate: values.postBaccalaureate,
            aquacultureNum: values.aquacultureNum,
            aquacultureSponsoredBy: values.aquacultureSponsoredBy,
            aquaculturePublic: values.aquaculturePublic,
            aquaculturePrivate: values.aquaculturePrivate,
            sewingNum: values.sewingNum,
            sewingSponsoredBy: values.sewingSponsoredBy,
            sewingPublic: values.sewingPublic,
            sewingPrivate: values.sewingPrivate,
            flowerMakingNum: values.flowerMakingNum,
            flowerMakingSponsoredBy: values.flowerMakingSponsoredBy,
            flowerMakingPublic: values.flowerMakingPublic,
            flowerMakingPrivate: values.flowerMakingPrivate,
            backyardGardeningNum: values.backyardGardeningNum,
            backyardGardeningSponsoredBy: values.backyardGardeningSponsoredBy,
            backyardGardeningPublic: values.backyardGardeningPublic,
            backyardGardeningPrivate: values.backyardGardeningPrivate,
            handicraftNum: values.handicraftNum,
            handicraftSponsoredBy: values.handicraftSponsoredBy,
            handicraftPublic: values.handicraftPublic,
            handicraftPrivate: values.handicraftPrivate,
            beautyCulturalNum: values.beautyCulturalNum,
            beautyCulturalSponsoredBy: values.beautyCulturalSponsoredBy,
            beautyCulturalPublic: values.beautyCulturalPublic,
            beautyCulturalPrivate: values.beautyCulturalPrivate,
            livestockRaisingNum: values.livestockRaisingNum,
            livestockRaisingSponsoredBy: values.livestockRaisingSponsoredBy,
            livestockRaisingPublic: values.livestockRaisingPublic,
            livestockRaisingPrivate: values.livestockRaisingPrivate,
            carpentryNum: values.carpentryNum,
            carpentrySponsoredBy: values.carpentrySponsoredBy,
            carpentryPublic: values.carpentryPublic,
            carpentryPrivate: values.carpentryPrivate,
            cosmetologyNum: values.cosmetologyNum,
            cosmetologySponsoredBy: values.cosmetologySponsoredBy,
            cosmetologyPublic: values.cosmetologyPublic,
            cosmetologyPrivate: values.cosmetologyPrivate,
            recyclingOfMaterialNum: values.recyclingOfMaterialNum,
            recyclingOfMaterialSponsoredBy:
                values.recyclingOfMaterialSponsoredBy,
            recyclingOfMaterialPublic: values.recyclingOfMaterialPublic,
            recyclingOfMaterialPrivate: values.recyclingOfMaterialPrivate,
            culinaryArtNum: values.culinaryArtNum,
            culinaryArtSponsoredBy: values.culinaryArtSponsoredBy,
            culinaryArtPublic: values.culinaryArtPublic,
            culinaryArtPrivate: values.culinaryArtPrivate,
            typingEncodingNum: values.typingEncodingNum,
            typingEncodingSponsoredBy: values.typingEncodingSponsoredBy,
            typingEncodingPublic: values.typingEncodingPublic,
            typingEncodingPrivate: values.typingEncodingPrivate,
            electronicsNum: values.electronicsNum,
            electronicsSponsoredBy: values.electronicsSponsoredBy,
            electronicsPublic: values.electronicsPublic,
            electronicsPrivate: values.electronicsPrivate,
            practicalElectricityNum: values.practicalElectricityNum,
            practicalElectricitySponsoredBy:
                values.practicalElectricitySponsoredBy,
            practicalElectricityPublic: values.practicalElectricityPublic,
            practicalElectricityPrivate: values.practicalElectricityPrivate,
            othersNumSpecify: values.othersNumSpecify,
            othersNum: values.othersNum,
            othersSponsoredBy: values.othersSponsoredBy,
            othersPublic: values.othersPublic,
            othersPrivate: values.othersPrivate,
            educInstructionPublic1: values.educInstructionPublic1,
            educInstructionPrivate1: values.educInstructionPrivate1,
            educInstructionDayCare1: values.educInstructionDayCare1,
            educInstructionPreschoolKinder1:
                values.educInstructionPreschoolKinder1,
            educInstructionElementary1: values.educInstructionElementary1,
            educInstructionSecondary1: values.educInstructionSecondary1,
            educInstructionTertiaryCollege1:
                values.educInstructionTertiaryCollege1,
            educInstructionPostGraduate1: values.educInstructionPostGraduate1,
            educInstructionPublic2: values.educInstructionPublic2,
            educInstructionPrivate2: values.educInstructionPrivate2,
            educInstructionDayCare2: values.educInstructionDayCare2,
            educInstructionPreschoolKinder2:
                values.educInstructionPreschoolKinder2,
            educInstructionElementary2: values.educInstructionElementary2,
            educInstructionSecondary2: values.educInstructionSecondary2,
            educInstructionTertiaryCollege2:
                values.educInstructionTertiaryCollege2,
            educInstructionPostGraduate2: values.educInstructionPostGraduate2,
            educInstructionPublic3: values.educInstructionPublic3,
            educInstructionPrivate3: values.educInstructionPrivate3,
            educInstructionDayCare3: values.educInstructionDayCare3,
            educInstructionPreschoolKinder3:
                values.educInstructionPreschoolKinder3,
            educInstructionElementary3: values.educInstructionElementary3,
            educInstructionSecondary3: values.educInstructionSecondary3,
            educInstructionTertiaryCollege3:
                values.educInstructionTertiaryCollege3,
            educInstructionPostGraduate3: values.educInstructionPostGraduate3,
            typeOfBuildingNum1: values.typeOfBuildingNum1,
            typeOfBuildingNum2: values.typeOfBuildingNum2,
            typeOfBuildingNum3: values.typeOfBuildingNum3,
            typeOfBuildingNum4: values.typeOfBuildingNum4,
            typeOfBuildingNum5: values.typeOfBuildingNum5,
            typeOfBuildingNum6: values.typeOfBuildingNum6,
            typeOfBuildingNum6Specify: values.typeOfBuildingNum6Specify,
            typeOfConstructionMats1: values.typeOfConstructionMats1,
            typeOfConstructionMats2: values.typeOfConstructionMats2,
            typeOfConstructionMats3: values.typeOfConstructionMats3,
            typeOfConstructionMats4: values.typeOfConstructionMats4,
            typeOfConstructionMats5: values.typeOfConstructionMats5,
            typeOfConstructionMats5Specify:
                values.typeOfConstructionMats5Specify,
            numInformalSettler1: values.numInformalSettler1,
            numInformalSettler2: values.numInformalSettler2,
            numInformalSettler3: values.numInformalSettler3,
            numInformalSettler4: values.numInformalSettler4,
            numInformalSettler5: values.numInformalSettler5,
            numInformalSettlerLocation1: values.numInformalSettlerLocation1,
            numInformalSettlerLocation2: values.numInformalSettlerLocation2,
            numInformalSettlerLocation3: values.numInformalSettlerLocation3,
            numInformalSettlerLocation4: values.numInformalSettlerLocation4,
            numInformalSettlerLocation5: values.numInformalSettlerLocation5,
            numHeritageStructure1: values.numHeritageStructure1,
            numHeritageStructure2: values.numHeritageStructure2,
            numHeritageStructure3: values.numHeritageStructure3,
            numHeritageStructure4: values.numHeritageStructure4,
            numHeritageStructure5: values.numHeritageStructure5,
            numHeritageStructure6: values.numHeritageStructure6,
            heritageStructureLocation1: values.heritageStructureLocation1,
            heritageStructureLocation2: values.heritageStructureLocation2,
            heritageStructureLocation3: values.heritageStructureLocation3,
            heritageStructureLocation4: values.heritageStructureLocation4,
            heritageStructureLocation5: values.heritageStructureLocation5,
            heritageStructureLocation6: values.heritageStructureLocation6,
            presenceProtectiveService1: values.presenceProtectiveService1,
            presenceProtectiveService2: values.presenceProtectiveService2,
            presenceProtectiveService3: values.presenceProtectiveService3,
            presenceProtectiveService4: values.presenceProtectiveService4,
            presenceProtectiveService5: values.presenceProtectiveService5,
            presenceProtectiveService5Specify:
                values.presenceProtectiveService5Specify,
            presenceNumPersonnel1: values.presenceNumPersonnel1,
            presenceNumPersonnel2: values.presenceNumPersonnel2,
            presenceNumPersonnel3: values.presenceNumPersonnel3,
            presenceNumPersonnel4: values.presenceNumPersonnel4,
            presenceNumPersonnel5: values.presenceNumPersonnel5,
            sportsFacilitiesPublic1: values.sportsFacilitiesPublic1,
            sportsFacilitiesPublic2: values.sportsFacilitiesPublic2,
            sportsFacilitiesPublic3: values.sportsFacilitiesPublic3,
            sportsFacilitiesPublic4: values.sportsFacilitiesPublic4,
            sportsFacilitiesPublic5: values.sportsFacilitiesPublic5,
            sportsFacilitiesPublic6: values.sportsFacilitiesPublic6,
            sportsFacilitiesPublic7: values.sportsFacilitiesPublic7,
            sportsFacilitiesPublic8: values.sportsFacilitiesPublic8,
            sportsFacilitiesPrivate1: values.sportsFacilitiesPrivate1,
            sportsFacilitiesPrivate2: values.sportsFacilitiesPrivate2,
            sportsFacilitiesPrivate3: values.sportsFacilitiesPrivate3,
            sportsFacilitiesPrivate4: values.sportsFacilitiesPrivate4,
            sportsFacilitiesPrivate5: values.sportsFacilitiesPrivate5,
            sportsFacilitiesPrivate6: values.sportsFacilitiesPrivate6,
            sportsFacilitiesPrivate7: values.sportsFacilitiesPrivate7,
            sportsFacilitiesPrivate8: values.sportsFacilitiesPrivate8,
            sportsFacilities8Specify: values.sportsFacilities8Specify,
            recreationalPublic1: values.recreationalPublic1,
            recreationalPublic2: values.recreationalPublic2,
            recreationalPublic3: values.recreationalPublic3,
            recreationalPublic4: values.recreationalPublic4,
            recreationalPublic5: values.recreationalPublic5,
            recreationalPublic6: values.recreationalPublic6,
            recreationalPublic7: values.recreationalPublic7,
            recreationalPublic8: values.recreationalPublic8,
            recreationalPrivate1: values.recreationalPrivate1,
            recreationalPrivate2: values.recreationalPrivate2,
            recreationalPrivate3: values.recreationalPrivate3,
            recreationalPrivate4: values.recreationalPrivate4,
            recreationalPrivate5: values.recreationalPrivate5,
            recreationalPrivate6: values.recreationalPrivate6,
            recreationalPrivate7: values.recreationalPrivate7,
            recreationalPrivate8: values.recreationalPrivate8,
            recreational8Specify: values.recreational8Specify,
            tricycleWithinBarangay: values.tricycleWithinBarangay,
            tricycleWithinDistrict: values.tricycleWithinDistrict,
            tricycleWithinCityProper: values.tricycleWithinCityProper,
            trisikadWithinBarangay: values.trisikadWithinBarangay,
            trisikadWithinDistrict: values.trisikadWithinDistrict,
            trisikadWithinCityProper: values.trisikadWithinCityProper,
            jeepneyWithinBarangay: values.jeepneyWithinBarangay,
            jeepneyWithinDistrict: values.jeepneyWithinDistrict,
            jeepneyWithinCityProper: values.jeepneyWithinCityProper,
            carWithinBarangay: values.carWithinBarangay,
            carWithinDistrict: values.carWithinDistrict,
            carWithinCityProper: values.carWithinCityProper,
            busWithinBarangay: values.busWithinBarangay,
            busWithinDistrict: values.busWithinDistrict,
            busWithinCityProper: values.busWithinCityProper,
            boatMotorizedWithinBarangay: values.boatMotorizedWithinBarangay,
            boatMotorizedWithinDistrict: values.boatMotorizedWithinDistrict,
            boatMotorizedWithinCityProper: values.boatMotorizedWithinCityProper,
            boatNonMotorizedWithinBarangay:
                values.boatNonMotorizedWithinBarangay,
            boatNonMotorizedWithinDistrict:
                values.boatNonMotorizedWithinDistrict,
            boatNonMotorizedWithinCityProper:
                values.boatNonMotorizedWithinCityProper,
            othersWithinBarangay: values.othersWithinBarangay,
            othersWithinDistrict: values.othersWithinDistrict,
            othersWithinCityProper: values.othersWithinCityProper,
            othersTransportFacilitySpecify:
                values.othersTransportFacilitySpecify,
            waterSupplyNumHousehold1: values.waterSupplyNumHousehold1,
            waterSupplyNumHousehold2: values.waterSupplyNumHousehold2,
            waterSupplyNumHousehold3: values.waterSupplyNumHousehold3,
            waterSupplyNumHousehold4: values.waterSupplyNumHousehold4,
            waterSupplyNumHousehold5: values.waterSupplyNumHousehold5,
            waterSupplyNumHousehold6: values.waterSupplyNumHousehold6,
            waterSupplyNumHousehold7: values.waterSupplyNumHousehold7,
            waterSupplyPercentHousehold1: values.waterSupplyPercentHousehold1,
            waterSupplyPercentHousehold2: values.waterSupplyPercentHousehold2,
            waterSupplyPercentHousehold3: values.waterSupplyPercentHousehold3,
            waterSupplyPercentHousehold4: values.waterSupplyPercentHousehold4,
            waterSupplyPercentHousehold5: values.waterSupplyPercentHousehold5,
            waterSupplyPercentHousehold6: values.waterSupplyPercentHousehold6,
            waterSupplyPercentHousehold7: values.waterSupplyPercentHousehold7,
            waterSupply7Specify: values.waterSupply7Specify,
            waterSupplyNumTotal: values.waterSupplyNumTotal,
            waterSupplyPercentTotal: values.waterSupplyPercentTotal,
            inventoryExistingPowerSupplyNum1:
                values.inventoryExistingPowerSupplyNum1,
            inventoryExistingPowerSupplyPercent1:
                values.inventoryExistingPowerSupplyPercent1,
            inventoryExistingPowerSupplyNum2:
                values.inventoryExistingPowerSupplyNum2,
            inventoryExistingPowerSupplyPercent2:
                values.inventoryExistingPowerSupplyPercent2,
            inventoryExistingPowerSupplySpecify:
                values.inventoryExistingPowerSupplySpecify,
            inventoryExistingPowerSupplyNumTotal:
                values.inventoryExistingPowerSupplyNumTotal,
            inventoryExistingPowerSupplyPercentTotal:
                values.inventoryExistingPowerSupplyPercentTotal,
            inventoryFuelUsedNum1: values.inventoryFuelUsedNum1,
            inventoryFuelUsedPercent1: values.inventoryFuelUsedPercent1,
            inventoryFuelUsedNum2: values.inventoryFuelUsedNum2,
            inventoryFuelUsedPercent2: values.inventoryFuelUsedPercent2,
            inventoryFuelUsedNum3: values.inventoryFuelUsedNum3,
            inventoryFuelUsedPercent3: values.inventoryFuelUsedPercent3,
            inventoryFuelUsedNum4: values.inventoryFuelUsedNum4,
            inventoryFuelUsedPercent4: values.inventoryFuelUsedPercent4,
            inventoryFuelUsed4Specify: values.inventoryFuelUsed4Specify,
            inventoryFuelUsedNumTotal: values.inventoryFuelUsedNumTotal,
            inventoryFuelUsedPercentTotal: values.inventoryFuelUsedPercentTotal,
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
            documentName: `BarangayProfile${selectedBarangayData.selectedBarangay}${selectedBarangayData.selectedDistrict}${yearSubmitted}.pdf`,
            populationCount: totalPopulationCount,
            submissionBarangayProfileUrl: submissionBarangayProfileUrl,
        };

        const totalWaste = totalPopulationCount * 0.68;

        await Axios.post("http://localhost:3001/submission/submit", data).then(
            () => {
                alert("Successfully submitted document");
                // fetchSubmissions();
                Axios.put("http://localhost:3001/barangay/update", {
                    populationCount: totalPopulationCount,
                    userId: meData.id,
                });
            }
        );

        // pdf.save(
        //     `BarangayProfile${meData.barangayName}${meData.districtName}${yearSubmitted}.pdf`
        // );

        mutate("http://localhost:3001/submission/updateTypeOfDocument");

        setIsLoading(false);
    };

    // const submitDocument = (e) => {
    //     createPDF(e);
    // };

    // const generatePDF = () => {
    //     const input = document.getElementById("content");
    //     html2canvas(input, {
    //         logging: true,
    //         letterRendering: 1,
    //         useCORS: true,
    //     }).then((canvas) => {
    //         const imgWidth = canvas.width;
    //         const imgHeight = canvas.height;
    //         const imgData = canvas.toDataURL("img/png");
    //         const pdf = new jsPDF("p", "pt", "letter");
    //         pdf.addImage(imgData, "PNG", 0, 0, imgHeight, imgHeight);
    //         pdf.save("BarangayProfile.pdf");
    //     });
    // };

    // useEffect(() => {
    //     setValues(localStorage.getItem("form"));
    // }, []);

    const attemptSave = async () => {
        const savedDocument = await Axios.get(
            "http://localhost:3001/submission/getSavedBarangayProfile"
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
            "http://localhost:3001/submission/updateTypeOfDocument",
            data
        );

        updateSubmissionBarangayProfilePage1();
        updateSubmissionBarangayProfilePage2();
        updateSubmissionBarangayProfilePage3();
        updateSubmissionBarangayProfilePage4();
        updateSubmissionBarangayProfilePage5();
        updateSubmissionBarangayProfilePage6();
        updateSubmissionBarangayProfilePage7();
        updateSubmissionBarangayProfilePage8();
        updateSubmissionBarangayProfilePage9();

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
                        <SubmissionBarangayProfilePage1
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
                        <SubmissionBarangayProfilePage2
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page3Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <SubmissionBarangayProfilePage3
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page4Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <SubmissionBarangayProfilePage4
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page5Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <SubmissionBarangayProfilePage5
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page6Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <SubmissionBarangayProfilePage6
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page7Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <SubmissionBarangayProfilePage7
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page8Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <SubmissionBarangayProfilePage8
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                    <div
                        ref={page9Ref}
                        className="bg-white w-[8.5in] h-[14in] py-4 px-20 mt-3"
                    >
                        <SubmissionBarangayProfilePage9
                            values={values}
                            handleChange={handleChange}
                        />
                    </div>
                </form>
            </div>

            <div className="h-[calc(100vh-56px)] sticky top-[56px] bg-gray-50 flex flex-col py-4 border-l  w-full max-w-[260px] overflow-y-auto">
                <div className="px-4">
                    <p className="mb-2 text-sm text-gray-700">
                        Year of submission:
                    </p>
                    <input
                        value={yearSubmitted}
                        placeholder="Year"
                        onChange={(e) => setYearSubmitted(e.target.value)}
                        type="number"
                        className="w-20 px-2 py-1 text-center border restoreNumberArrows focus:outline-none"
                    />
                </div>
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
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page4Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page4 && "bg-gray-300"
                        }`}
                    >
                        Page 4
                    </p>
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page5Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page5 && "bg-gray-300"
                        }`}
                    >
                        Page 5
                    </p>
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page6Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page6 && "bg-gray-300"
                        }`}
                    >
                        Page 6
                    </p>
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page7Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page7 && "bg-gray-300"
                        }`}
                    >
                        Page 7
                    </p>
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page8Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page8 && "bg-gray-300"
                        }`}
                    >
                        Page 8
                    </p>
                    <p
                        onClick={() => {
                            window.scrollTo({
                                top: page9Ref.current.offsetTop - 68,
                            });
                        }}
                        className={`py-2 pl-4 cursor-pointer hover:bg-gray-300 ${
                            page9 && "bg-gray-300"
                        }`}
                    >
                        Page 9
                    </p>
                </div>
                <hr className="my-4" />
                <div className="px-4">
                    {actionData != "UpdateSubmission" && (
                        <button
                            disabled={isLoading}
                            onClick={attemptSave}
                            className={`w-full px-3 mb-4 py-2 border text-blue-600  rounded-sm ${
                                isLoading && "cursor-not-allowed "
                            }`}
                        >
                            {isSaved ? "Successfully saved" : "Save"}
                        </button>
                    )}

                    <button
                        disabled={isLoading}
                        onClick={createPDF}
                        className={`w-full px-3 mb-4 py-2 text-white bg-blue-500 rounded-sm ${
                            isLoading && "cursor-not-allowed "
                        }`}
                    >
                        {!isLoading ? "Submit" : "Processing..."}
                    </button>
                    {/* <button
                        disabled={isLoading}
                        onClick={createPDF}
                        className={`w-full px-3 py-2 border text-blue-600 rounded-sm ${
                            isLoading && "cursor-not-allowed"
                        }`}
                    >
                        {!isLoading ? "Download" : "Processing..."}
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default submissionBarangayProfile;

export const getServerSideProps = async (context) => {
    const me = await fetch("http://localhost:3001/user/me", {
        headers: { Cookie: context.req.headers.cookie },
    }).then((res) => res.json());

    if (me.isAdmin == true) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    const pageData = await fetch(
        "http://localhost:3001/submission/brgyProfilePages",
        {
            headers: { Cookie: context.req.headers.cookie },
        }
    ).then((res) => res.json());

    if (!pageData) {
        return {
            redirect: {
                permanent: false,
                destination: "/barangayProfile",
            },
        };
    }

    if (pageData[9]) {
        return {
            props: {
                page1Data: pageData[0],
                page2Data: pageData[1],
                page3Data: pageData[2],
                page4Data: pageData[3],
                page5Data: pageData[4],
                page6Data: pageData[5],
                page7Data: pageData[6],
                page8Data: pageData[7],
                page9Data: pageData[8],
                actionData: pageData[9],
            },
        };
    } else {
        return {
            props: {
                page1Data: pageData[0],
                page2Data: pageData[1],
                page3Data: pageData[2],
                page4Data: pageData[3],
                page5Data: pageData[4],
                page6Data: pageData[5],
                page7Data: pageData[6],
                page8Data: pageData[7],
                page9Data: pageData[8],
            },
        };
    }
};
