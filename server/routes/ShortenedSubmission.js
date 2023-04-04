const express = require("express");
const { validate } = require("../middleware/auth");
const { validateUser } = require("../middleware/user");
const router = express.Router();
const { Barangay, Sequelize } = require("../models");
const { User } = require("../models");
const { ActionSelectedBarangay } = require("../models");
const { ShortenedBarangayProfile } = require("../models");
const { Action } = require("../models");
const { TypeOfDocument } = require("../models");
const { ShortenedSubmission } = require("../models");
const { ActualWastes } = require("../models");
const { Submission } = require("../models");

const Op = Sequelize.Op;

const getAllShortenedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    const shortenedBarangayProfileSaved =
        await ShortenedBarangayProfile.findOne({
            where: {
                barangayId: user.barangayId,
                typeOfDocument: "Saved",
            },
            order: [["createdAt", "DESC"]],
        });

    const shortenedBarangayProfileSubmitted =
        await ShortenedBarangayProfile.findOne({
            where: {
                barangayId: user.barangayId,
                typeOfDocument: "Submitted",
            },
            order: [["createdAt", "DESC"]],
        });

    return res.json([
        shortenedBarangayProfileSaved,
        shortenedBarangayProfileSubmitted,
    ]);
};

const getAllSubmission = async (req, res) => {
    const { barangayId } = req.body;

    const submission = await Submission.findAll({
        // group: "yearSubmitted",
        where: {
            barangayId: barangayId,
        },
        order: [["yearSubmitted", "DESC"]],
    });

    return res.json(submission);
};

const getAllSubmissions = async (req, res) => {
    const submissions = await Submission.findAll({
        order: [["barangayName", "ASC"]],
    });

    return res.json(submissions);
};

const getAllSubmissionUser = async (req, res) => {
    const user = res.locals.user;

    const submission = await Submission.findAll({
        where: {
            barangayId: user.barangayId,
        },
        order: [["yearSubmitted", "DESC"]],
    });

    return res.json(submission);
};

const updateAction = async (req, res) => {
    const user = res.locals.user;
    const { action } = req.body;

    await Action.update(
        { action: action, userId: user.id, barangayId: user.barangayId },
        { where: { userId: user.id } }
    );

    res.json("SUCCESS");
};

const createShortenedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    const typeOfDocumentData = await TypeOfDocument.findOne({
        where: {
            userId: user.id,
            barangayId: user.barangayId,
            typeOfDocument: "New",
        },
    });

    const action = await Action.findOne({
        where: { userId: user.id },
    });

    if (!action) {
        await Action.create({
            userId: user.id,
            barangayId: user.barangayId,
            action: "CreateNewDocument",
        });
    }

    if (!typeOfDocumentData) {
        const typeOfDocument = await TypeOfDocument.create({
            userId: user.id,
            barangayId: user.barangayId,
            typeOfDocument: "New",
        });

        await ShortenedBarangayProfile.create({
            barangayId: user.barangayId,
            typeOfDocumentId: typeOfDocument.id,
            typeOfDocument: "New",
        });

        return res.json("SUCCESS");
    }

    return res.json("SUCCESS");
};

const getShortenedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    let action;

    if (user.isAdmin) {
        const selectedBarangay = await ActionSelectedBarangay.findOne({
            where: { userId: user.id },
        });
        action = await Action.findOne({
            where: { userId: user.id, barangayId: selectedBarangay.barangayId },
        });
    } else {
        action = await Action.findOne({
            where: { userId: user.id, barangayId: user.barangayId },
        });
    }

    if (action.action == "CreateNewDocument") {
        const shortenedBarangayProfile = await ShortenedBarangayProfile.findOne(
            {
                where: {
                    barangayId: user.barangayId,
                    typeOfDocument: "New",
                },
                order: [["createdAt", "DESC"]],
            }
        );

        return res.json(shortenedBarangayProfile);
    }

    if (action.action == "LoadDocument") {
        const typeOfDocument = await TypeOfDocument.findOne({
            where: { barangayId: user.barangayId },
        });

        const shortenedBarangayProfile = await ShortenedBarangayProfile.findOne(
            {
                where: {
                    barangayId: user.barangayId,
                    typeOfDocument: "Saved",
                },
                order: [["createdAt", "DESC"]],
            }
        );

        return res.json(shortenedBarangayProfile);
    }

    if (action.action == "UpdateSubmission") {
        const shortenedBarangayProfile = await ShortenedBarangayProfile.findOne(
            {
                where: {
                    barangayId: user.barangayId,
                    typeOfDocument: "Submitted",
                },
                order: [["createdAt", "DESC"]],
            }
        );

        return res.json([shortenedBarangayProfile, action.action]);
    }

    if (action.action == "EditSubmission") {
        const selectedBarangay = await ActionSelectedBarangay.findOne({
            where: { userId: user.id },
        });

        const shortenedBarangayProfile = await ShortenedBarangayProfile.findOne(
            {
                where: {
                    barangayId: selectedBarangay.barangayId,
                    typeOfDocument: "Submitted",
                    yearSubmitted: selectedBarangay.yearSubmitted,
                },
            }
        );

        return res.json(shortenedBarangayProfile);
    }
};

const submitShortenedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    const typeOfDocumentId = await TypeOfDocument.findOne({
        where: { userId: user.id, barangayId: user.barangayId },
    });

    const {
        totalLandArea,
        totalPopulation,
        totalPopulationMale,
        totalPopulationFemale,
        totalPopulationBoth,
        male1,
        male2,
        male3,
        male4,
        male5,
        male6,
        male7,
        male8,
        male9,
        male10,
        male11,
        male12,
        male13,
        male14,
        male15,
        male16,
        male17,
        male18,
        male19,
        male20,
        female1,
        female2,
        female3,
        female4,
        female5,
        female6,
        female7,
        female8,
        female9,
        female10,
        female11,
        female12,
        female13,
        female14,
        female15,
        female16,
        female17,
        female18,
        female19,
        female20,
        both1,
        both2,
        both3,
        both4,
        both5,
        both6,
        both7,
        both8,
        both9,
        both10,
        both11,
        both12,
        both13,
        both14,
        both15,
        both16,
        both17,
        both18,
        both19,
        both20,
        totalBoth,
        totalHouseholdsCY,
        totalHouseholds,
        yearSubmitted,
        documentName,
        populationCount,
        shortenedBarangayProfileUrl,
        numBakery,
        numGrocery,
        numIceCream,
        numSariSariStore,
        numNativeDelicacies,
        numHardwareElectrical,
        numSweetPreserves,
        numConstructionConcrete,
        numSitcharon,
        numCarJeepPartsSupplies,
        numNoodles,
        numMotorcyclesBicyclesSupplies,
        numBalut,
        numAgriculturalEquipmentSupplies,
        numVinegar,
        numSchoolOfficeSupplies,
        numFishDryingSmoking,
        numPhotoCenterSupplies,
        numLaboratories,
        numAppliance,
        numChemicalIndustries,
        numJewelryShopStore,
        numFeedmills,
        numBagsFootwearStore,
        numGarmentEmbroidery,
        numVideoTapesCenter,
        numFootwearFactories,
        numBazaars,
        numTextileMills,
        numPrintingPress,
        numBagsWalletFactories,
        numPawnshop,
        numFurnitureWooden,
        numFurnitureRattan,
        numFurnitureBamboo,
        numFurnitureMetal,
        numFuneralParlor,
        numDrugStore,
        numPublicMarket,
        numTalipapa,
        numCinema,
        numPaperManufacturing,
        numCockpit,
        numCementManufacturing,
        numFinancialInstitutions,
        numHallowBlocksMaking,
        numRestaurants,
        numMarbleCraft,
        numRealEstate,
        numBlacksmith,
        numNightClubBarMassage,
        numIronMetalCraft,
        numMemorialParks,
        numEngineeringWorkMachineShop,
        numInsurance,
        numJewelryManufacturingGoldsmith,
        numGasolineStation,
        numCeramicsPottery,
        numGeneralServiceContractors,
        numWoodcraft,
        numArrastreServices,
        numEngraving,
        numBodyWorkshop,
        numFashionAccessories,
        numFitnessGym,
        numOthersManufacturing,
        numOthersManufacturingSpecify,
        numBeautyParlorBarberShop,
        numCooperativeRiceGrowers,
        numOthersCommercial,
        numOthersCommercialSpecify,
        totalNumBirths,
        totalNumDeathsAllCauses,
        totalNumStillBirth,
        totalNumInfantDeaths,
        totalNumEarlyNeonatalDeaths,
        fiveLeadingCausesMortalityCY,
        fiveLeadingMorbidityCY,
        causeCardiovascularDisorder,
        causeCancer,
        causeOldAge,
        causeKidneyFailure,
        causeTB,
        causeFeverFlu,
        causeCough,
        causeAsthma,
        causeHypertension,
        causePTB,
        infantLeadingCausesMortalityCY,
        infantLeadingCausesMorbidityCY,
        infantMortalityCause1,
        infantMortalityCause2,
        infantMortalityCause3,
        infantMortalityNum1,
        infantMortalityNum2,
        infantMortalityNum3,
        infantMorbidityFeverNum,
        infantMorbidityCoughNum,
        infantMorbidityMalnutritionNum,
        infantMorbidityDiarrheaNum,
        infantMorbidityTCPrimaryComplexNum,
        causeEarlyNeonatalDeathsCY,
        causeEarlyNeonatalCause1,
        causeEarlyNeonatalCause2,
        causeEarlyNeonatalCause3,
        causeEarlyNeonatalNum1,
        causeEarlyNeonatalNum2,
        causeEarlyNeonatalNum3,
        causeMaternalDeathsCY,
        causeMaternalCause1,
        causeMaternalCause2,
        causeMaternalCause3,
        causeMaternalNum1,
        causeMaternalNum2,
        causeMaternalNum3,
        healthClinicsHospitalName1,
        healthClinicsHospitalName2,
        healthClinicsHospitalName3,
        healthClinicsHospitalName4,
        healthClinicsHospitalNumGov1,
        healthClinicsHospitalNumGov2,
        healthClinicsHospitalNumGov3,
        healthClinicsHospitalNumGov4,
        healthClinicsHospitalNumPrivate1,
        healthClinicsHospitalNumPrivate2,
        healthClinicsHospitalNumPrivate3,
        healthClinicsHospitalNumPrivate4,
        medicalHealthPersonnelDoctorNumGov,
        medicalHealthPersonnelNurseNumGov,
        medicalHealthPersonnelMidwifeNumGov,
        medicalHealthPersonnelBHWNumGov,
        medicalHealthPersonnelDoctorNumPrivate,
        medicalHealthPersonnelNurseNumPrivate,
        medicalHealthPersonnelMidwifeNumPrivate,
        medicalHealthPersonnelBHWNumPrivate,
        medicalServiceType1,
        medicalServiceType2,
        medicalServiceType3,
        medicalServiceType4,
        medicalServiceFrequency1,
        medicalServiceFrequency2,
        medicalServiceFrequency3,
        medicalServiceFrequency4,
        disposalTrucks,
        disposalOpenPit,
        disposalBurying,
        disposalBurning,
        disposalThrowAnywhere,
        disposalOthersSpecify,
        disposalOthers,
        sourceIncomeCY1,
        sourceIncomeCY2,
        sourceIncomeAmount1CY1,
        sourceIncomeAmount1CY2,
        sourceIncomeAmount2CY1,
        sourceIncomeAmount2CY2,
        sourceIncomeAmount3CY1,
        sourceIncomeAmount3CY2,
        sourceIncomeAmount4CY1,
        sourceIncomeAmount4CY2,
        sourceIncomeAmount5CY1,
        sourceIncomeAmount5CY2,
        sourceIncomeAmount6CY1,
        sourceIncomeAmount6CY2,
        sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2,
        sourceIncomeAmount8CY1,
        sourceIncomeAmount8CY2,
        sourceIncomeAmount9CY1,
        sourceIncomeAmount9CY2,
        sourceIncomeAmount10CY1,
        sourceIncomeAmount10CY2,
        sourceIncomeAmountTotalCY1,
        sourceIncomeAmountTotalCY2,
        actualExpendituresCY1,
        actualExpendituresCY2,
        actualExpendituresAmount1CY1,
        actualExpendituresAmount1CY2,
        actualExpendituresAmount2CY1,
        actualExpendituresAmount2CY2,
        actualExpendituresAmount3CY1,
        actualExpendituresAmount3CY2,
        actualExpendituresAmountTotalCY1,
        actualExpendituresAmountTotalCY2,
        governanceOwnedFacilities1,
        governanceOwnedFacilities2,
        governanceOwnedFacilities3,
        governanceOwnedFacilities4,
        governanceOwnedFacilities5,
        governanceOwnedFacilities6,
        governanceOwnedFacilities7,
        governanceOwnedFacilities8,
        governanceOwnedFacilities8StateOwnership,
        governanceOwnedFacilities9,
        governanceOwnedFacilities9StateOwnership,
        governanceOwnedFacilities10,
        governanceOwnedFacilities11,
        governanceOwnedFacilities12,
        governanceOwnedFacilities12Specify,
        barangayGovSupportOrgNum1,
        barangayGovSupportOrgNum2,
        barangayGovSupportOrgNum3,
        barangayGovSupportOrgNum4,
        barangayGovSupportOrgNum5,
        barangayGovSupportOrgNum6,
        barangayGovSupportOrgNum7,
        barangayGovSupportOrgNum7Specify,
        barangayGovSupportOrgNum8,
        barangayGovSupportOrgNum8Specify,
        barangayGovSupportOrgNum9,
        barangayGovSupportOrgNum10,
        barangayGovSupportOrgNum11,
        barangayGovSupportOrgNum12,
        signatureOverPrintedName,
        position,
        date1,
        barangayCaptain,
        date2,
    } = req.body;

    const barangay = await Barangay.findOne({
        where: { userId: user.id },
    });

    const totalWaste = (populationCount * 0.68).toFixed(2);

    await Submission.create({
        documentName: documentName,
        isShortened: true,
        totalWaste: totalWaste,
        yearSubmitted: yearSubmitted,
        populationCount: populationCount,
        userId: user.id,
        barangayId: barangay.id,
        barangayName: barangay.barangayName,
        districtName: barangay.districtName,
        barangayProfile: true,
        submissionBarangayProfileUrl: shortenedBarangayProfileUrl,
    });

    const totalMale =
        Number(male1) +
        Number(male2) +
        Number(male3) +
        Number(male4) +
        Number(male5) +
        Number(male6) +
        Number(male7) +
        Number(male8) +
        Number(male9) +
        Number(male10) +
        Number(male11) +
        Number(male12) +
        Number(male13) +
        Number(male14) +
        Number(male15) +
        Number(male16) +
        Number(male17);

    const totalFemale =
        Number(female1) +
        Number(female2) +
        Number(female3) +
        Number(female4) +
        Number(female5) +
        Number(female6) +
        Number(female7) +
        Number(female8) +
        Number(female9) +
        Number(female10) +
        Number(female11) +
        Number(female12) +
        Number(female13) +
        Number(female14) +
        Number(female15) +
        Number(female16) +
        Number(female17);

    const shortenedBarangayProfile = await ShortenedBarangayProfile.create({
        barangayId: user.barangayId,
        typeOfDocumentId: typeOfDocumentId.id,
        typeOfDocument: "Submitted",
        yearSubmitted: yearSubmitted,
        totalLandArea: totalLandArea,
        totalPopulation: totalPopulation,
        totalPopulationMale: totalPopulationMale,
        totalPopulationFemale: totalPopulationFemale,
        totalPopulationBoth:
            Number(totalPopulationMale) + Number(totalPopulationFemale),
        male1: male1,
        male2: male2,
        male3: male3,
        male4: male4,
        male5: male5,
        male6: male6,
        male7: male7,
        male8: male8,
        male9: male9,
        male10: male10,
        male11: male11,
        male12: male12,
        male13: male13,
        male14: male14,
        male15: male15,
        male16: male16,
        male17: male17,
        male18: male18,
        male19: male19,
        male20: male20,
        female1: female1,
        female2: female2,
        female3: female3,
        female4: female4,
        female5: female5,
        female6: female6,
        female7: female7,
        female8: female8,
        female9: female9,
        female10: female10,
        female11: female11,
        female12: female12,
        female13: female13,
        female14: female14,
        female15: female15,
        female16: female16,
        female17: female17,
        female18: female18,
        female19: female19,
        female20: female20,
        both1: both1,
        both2: both2,
        both3: both3,
        both4: both4,
        both5: both5,
        both6: both6,
        both7: both7,
        both8: both8,
        both9: both9,
        both10: both10,
        both11: both11,
        both12: both12,
        both13: both13,
        both14: both14,
        both15: both15,
        both16: both16,
        both17: both17,
        both18: both18,
        both19: both19,
        both20: both20,
        totalMale: totalMale,
        totalFemale: totalFemale,
        totalBoth: totalMale + totalFemale,
        totalHouseholdsCY: totalHouseholdsCY,
        totalHouseholds: totalHouseholds,
        numBakery: numBakery,
        numGrocery: numGrocery,
        numIceCream: numIceCream,
        numSariSariStore: numSariSariStore,
        numNativeDelicacies: numNativeDelicacies,
        numHardwareElectrical: numHardwareElectrical,
        numSweetPreserves: numSweetPreserves,
        numConstructionConcrete: numConstructionConcrete,
        numSitcharon: numSitcharon,
        numCarJeepPartsSupplies: numCarJeepPartsSupplies,
        numNoodles: numNoodles,
        numMotorcyclesBicyclesSupplies: numMotorcyclesBicyclesSupplies,
        numBalut: numBalut,
        numAgriculturalEquipmentSupplies: numAgriculturalEquipmentSupplies,
        numVinegar: numVinegar,
        numSchoolOfficeSupplies: numSchoolOfficeSupplies,
        numFishDryingSmoking: numFishDryingSmoking,
        numPhotoCenterSupplies: numPhotoCenterSupplies,
        numLaboratories: numLaboratories,
        numAppliance: numAppliance,
        numChemicalIndustries: numChemicalIndustries,
        numJewelryShopStore: numJewelryShopStore,
        numFeedmills: numFeedmills,
        numBagsFootwearStore: numBagsFootwearStore,
        numGarmentEmbroidery: numGarmentEmbroidery,
        numVideoTapesCenter: numVideoTapesCenter,
        numFootwearFactories: numFootwearFactories,
        numBazaars: numBazaars,
        numTextileMills: numTextileMills,
        numPrintingPress: numPrintingPress,
        numBagsWalletFactories: numBagsWalletFactories,
        numPawnshop: numPawnshop,
        numFurnitureWooden: numFurnitureWooden,
        numFurnitureRattan: numFurnitureRattan,
        numFurnitureBamboo: numFurnitureBamboo,
        numFurnitureMetal: numFurnitureMetal,
        numFuneralParlor: numFuneralParlor,
        numDrugStore: numDrugStore,
        numPublicMarket: numPublicMarket,
        numTalipapa: numTalipapa,
        numCinema: numCinema,
        numPaperManufacturing: numPaperManufacturing,
        numCockpit: numCockpit,
        numCementManufacturing: numCementManufacturing,
        numFinancialInstitutions: numFinancialInstitutions,
        numHallowBlocksMaking: numHallowBlocksMaking,
        numRestaurants: numRestaurants,
        numMarbleCraft: numMarbleCraft,
        numRealEstate: numRealEstate,
        numBlacksmith: numBlacksmith,
        numNightClubBarMassage: numNightClubBarMassage,
        numIronMetalCraft: numIronMetalCraft,
        numMemorialParks: numMemorialParks,
        numEngineeringWorkMachineShop: numEngineeringWorkMachineShop,
        numInsurance: numInsurance,
        numJewelryManufacturingGoldsmith: numJewelryManufacturingGoldsmith,
        numGasolineStation: numGasolineStation,
        numCeramicsPottery: numCeramicsPottery,
        numGeneralServiceContractors: numGeneralServiceContractors,
        numWoodcraft: numWoodcraft,
        numArrastreServices: numArrastreServices,
        numEngraving: numEngraving,
        numBodyWorkshop: numBodyWorkshop,
        numFashionAccessories: numFashionAccessories,
        numFitnessGym: numFitnessGym,
        numOthersManufacturing: numOthersManufacturing,
        numOthersManufacturingSpecify: numOthersManufacturingSpecify,
        numBeautyParlorBarberShop: numBeautyParlorBarberShop,
        numCooperativeRiceGrowers: numCooperativeRiceGrowers,
        numOthersCommercial: numOthersCommercial,
        numOthersCommercialSpecify: numOthersCommercialSpecify,
        totalNumBirths: totalNumBirths,
        totalNumDeathsAllCauses: totalNumDeathsAllCauses,
        totalNumStillBirth: totalNumStillBirth,
        totalNumInfantDeaths: totalNumInfantDeaths,
        totalNumEarlyNeonatalDeaths: totalNumEarlyNeonatalDeaths,
        fiveLeadingCausesMortalityCY: fiveLeadingCausesMortalityCY,
        fiveLeadingMorbidityCY: fiveLeadingMorbidityCY,
        causeCardiovascularDisorder: causeCardiovascularDisorder,
        causeCancer: causeCancer,
        causeOldAge: causeOldAge,
        causeKidneyFailure: causeKidneyFailure,
        causeTB: causeTB,
        causeFeverFlu: causeFeverFlu,
        causeCough: causeCough,
        causeAsthma: causeAsthma,
        causeHypertension: causeHypertension,
        causePTB: causePTB,
        infantLeadingCausesMortalityCY: infantLeadingCausesMortalityCY,
        infantLeadingCausesMorbidityCY: infantLeadingCausesMorbidityCY,
        infantMortalityCause1: infantMortalityCause1,
        infantMortalityCause2: infantMortalityCause2,
        infantMortalityCause3: infantMortalityCause3,
        infantMortalityNum1: infantMortalityNum1,
        infantMortalityNum2: infantMortalityNum2,
        infantMortalityNum3: infantMortalityNum3,
        infantMorbidityFeverNum: infantMorbidityFeverNum,
        infantMorbidityCoughNum: infantMorbidityCoughNum,
        infantMorbidityMalnutritionNum: infantMorbidityMalnutritionNum,
        infantMorbidityDiarrheaNum: infantMorbidityDiarrheaNum,
        infantMorbidityTCPrimaryComplexNum: infantMorbidityTCPrimaryComplexNum,

        causeEarlyNeonatalDeathsCY: causeEarlyNeonatalDeathsCY,
        causeEarlyNeonatalCause1: causeEarlyNeonatalCause1,
        causeEarlyNeonatalCause2: causeEarlyNeonatalCause2,
        causeEarlyNeonatalCause3: causeEarlyNeonatalCause3,
        causeEarlyNeonatalNum1: causeEarlyNeonatalNum1,
        causeEarlyNeonatalNum2: causeEarlyNeonatalNum2,
        causeEarlyNeonatalNum3: causeEarlyNeonatalNum3,
        causeMaternalDeathsCY: causeMaternalDeathsCY,
        causeMaternalCause1: causeMaternalCause1,
        causeMaternalCause2: causeMaternalCause2,
        causeMaternalCause3: causeMaternalCause3,
        causeMaternalNum1: causeMaternalNum1,
        causeMaternalNum2: causeMaternalNum2,
        causeMaternalNum3: causeMaternalNum3,
        healthClinicsHospitalName1: healthClinicsHospitalName1,
        healthClinicsHospitalName2: healthClinicsHospitalName2,
        healthClinicsHospitalName3: healthClinicsHospitalName3,
        healthClinicsHospitalName4: healthClinicsHospitalName4,
        healthClinicsHospitalNumGov1: healthClinicsHospitalNumGov1,
        healthClinicsHospitalNumGov2: healthClinicsHospitalNumGov2,
        healthClinicsHospitalNumGov3: healthClinicsHospitalNumGov3,
        healthClinicsHospitalNumGov4: healthClinicsHospitalNumGov4,
        healthClinicsHospitalNumPrivate1: healthClinicsHospitalNumPrivate1,
        healthClinicsHospitalNumPrivate2: healthClinicsHospitalNumPrivate2,
        healthClinicsHospitalNumPrivate3: healthClinicsHospitalNumPrivate3,
        healthClinicsHospitalNumPrivate4: healthClinicsHospitalNumPrivate4,
        medicalHealthPersonnelDoctorNumGov: medicalHealthPersonnelDoctorNumGov,
        medicalHealthPersonnelNurseNumGov: medicalHealthPersonnelNurseNumGov,
        medicalHealthPersonnelMidwifeNumGov:
            medicalHealthPersonnelMidwifeNumGov,
        medicalHealthPersonnelBHWNumGov: medicalHealthPersonnelBHWNumGov,
        medicalHealthPersonnelDoctorNumPrivate:
            medicalHealthPersonnelDoctorNumPrivate,
        medicalHealthPersonnelNurseNumPrivate:
            medicalHealthPersonnelNurseNumPrivate,
        medicalHealthPersonnelMidwifeNumPrivate:
            medicalHealthPersonnelMidwifeNumPrivate,
        medicalHealthPersonnelBHWNumPrivate:
            medicalHealthPersonnelBHWNumPrivate,
        medicalServiceType1: medicalServiceType1,
        medicalServiceType2: medicalServiceType2,
        medicalServiceType3: medicalServiceType3,
        medicalServiceType4: medicalServiceType4,
        medicalServiceFrequency1: medicalServiceFrequency1,
        medicalServiceFrequency2: medicalServiceFrequency2,
        medicalServiceFrequency3: medicalServiceFrequency3,
        medicalServiceFrequency4: medicalServiceFrequency4,
        disposalTrucks: disposalTrucks,
        disposalOpenPit: disposalOpenPit,
        disposalBurying: disposalBurying,
        disposalBurning: disposalBurning,
        disposalThrowAnywhere: disposalThrowAnywhere,
        disposalOthersSpecify: disposalOthersSpecify,
        disposalOthers: disposalOthers,

        sourceIncomeCY1: sourceIncomeCY1,
        sourceIncomeCY2: sourceIncomeCY2,
        sourceIncomeAmount1CY1: sourceIncomeAmount1CY1,
        sourceIncomeAmount1CY2: sourceIncomeAmount1CY2,
        sourceIncomeAmount2CY1: sourceIncomeAmount2CY1,
        sourceIncomeAmount2CY2: sourceIncomeAmount2CY2,
        sourceIncomeAmount3CY1: sourceIncomeAmount3CY1,
        sourceIncomeAmount3CY2: sourceIncomeAmount3CY2,
        sourceIncomeAmount4CY1: sourceIncomeAmount4CY1,
        sourceIncomeAmount4CY2: sourceIncomeAmount4CY2,
        sourceIncomeAmount5CY1: sourceIncomeAmount5CY1,
        sourceIncomeAmount5CY2: sourceIncomeAmount5CY2,
        sourceIncomeAmount6CY1: sourceIncomeAmount6CY1,
        sourceIncomeAmount6CY2: sourceIncomeAmount6CY2,
        sourceIncomeAmount7CY1: sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2: sourceIncomeAmount7CY2,
        sourceIncomeAmount7CY1: sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2: sourceIncomeAmount7CY2,
        sourceIncomeAmount8CY1: sourceIncomeAmount8CY1,
        sourceIncomeAmount8CY2: sourceIncomeAmount8CY2,
        sourceIncomeAmount9CY1: sourceIncomeAmount9CY1,
        sourceIncomeAmount9CY2: sourceIncomeAmount9CY2,
        sourceIncomeAmount10CY1: sourceIncomeAmount10CY1,
        sourceIncomeAmount10CY2: sourceIncomeAmount10CY2,
        sourceIncomeAmountTotalCY1: sourceIncomeAmountTotalCY1,
        sourceIncomeAmountTotalCY2: sourceIncomeAmountTotalCY2,
        actualExpendituresCY1: actualExpendituresCY1,
        actualExpendituresCY2: actualExpendituresCY2,
        actualExpendituresAmount1CY1: actualExpendituresAmount1CY1,
        actualExpendituresAmount1CY2: actualExpendituresAmount1CY2,
        actualExpendituresAmount2CY1: actualExpendituresAmount2CY1,
        actualExpendituresAmount2CY2: actualExpendituresAmount2CY2,
        actualExpendituresAmount3CY1: actualExpendituresAmount3CY1,
        actualExpendituresAmount3CY2: actualExpendituresAmount3CY2,
        actualExpendituresAmountTotalCY1: actualExpendituresAmountTotalCY1,
        actualExpendituresAmountTotalCY2: actualExpendituresAmountTotalCY2,
        governanceOwnedFacilities1: governanceOwnedFacilities1,
        governanceOwnedFacilities2: governanceOwnedFacilities2,
        governanceOwnedFacilities3: governanceOwnedFacilities3,
        governanceOwnedFacilities4: governanceOwnedFacilities4,
        governanceOwnedFacilities5: governanceOwnedFacilities5,
        governanceOwnedFacilities6: governanceOwnedFacilities6,
        governanceOwnedFacilities7: governanceOwnedFacilities7,
        governanceOwnedFacilities8: governanceOwnedFacilities8,
        governanceOwnedFacilities8StateOwnership:
            governanceOwnedFacilities8StateOwnership,
        governanceOwnedFacilities9: governanceOwnedFacilities9,
        governanceOwnedFacilities9StateOwnership:
            governanceOwnedFacilities9StateOwnership,
        governanceOwnedFacilities10: governanceOwnedFacilities10,
        governanceOwnedFacilities11: governanceOwnedFacilities11,
        governanceOwnedFacilities12: governanceOwnedFacilities12,
        governanceOwnedFacilities12Specify: governanceOwnedFacilities12Specify,
        barangayGovSupportOrgNum1: barangayGovSupportOrgNum1,
        barangayGovSupportOrgNum2: barangayGovSupportOrgNum2,
        barangayGovSupportOrgNum3: barangayGovSupportOrgNum3,
        barangayGovSupportOrgNum4: barangayGovSupportOrgNum4,
        barangayGovSupportOrgNum5: barangayGovSupportOrgNum5,
        barangayGovSupportOrgNum6: barangayGovSupportOrgNum6,
        barangayGovSupportOrgNum7: barangayGovSupportOrgNum7,
        barangayGovSupportOrgNum7Specify: barangayGovSupportOrgNum7Specify,
        barangayGovSupportOrgNum8: barangayGovSupportOrgNum8,
        barangayGovSupportOrgNum8Specify: barangayGovSupportOrgNum8Specify,
        barangayGovSupportOrgNum9: barangayGovSupportOrgNum9,
        barangayGovSupportOrgNum10: barangayGovSupportOrgNum10,
        barangayGovSupportOrgNum11: barangayGovSupportOrgNum11,
        barangayGovSupportOrgNum12: barangayGovSupportOrgNum12,
        signatureOverPrintedName: signatureOverPrintedName,
        position: position,
        date1: date1,
        barangayCaptain: barangayCaptain,
        date2: date2,
    });

    await TypeOfDocument.create({
        userId: user.id,
        barangayId: user.barangayId,
        typeOfDocument: "Submitted",
    });

    const shortenedBarangayProfileSaved =
        await ShortenedBarangayProfile.findOne({
            where: { barangayId: user.barangayId, typeOfDocument: "Saved" },
        });

    if (shortenedBarangayProfileSaved) {
        await ShortenedBarangayProfile.findOne({
            where: {
                barangayId: user.barangayId,
                typeOfDocument: "Saved",
            },
            order: [["createdAt", "ASC"]],
        }).then((data) => {
            data.destroy();
        });
    }

    res.json(shortenedBarangayProfile);
};

const updateSubmittedShortenedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const typeOfDocumentId = await TypeOfDocument.findOne({
        where: {
            userId: selectedBarangay.userId,
            barangayId: selectedBarangay.barangayId,
        },
    });

    const {
        totalLandArea,
        totalPopulation,
        totalPopulationMale,
        totalPopulationFemale,
        totalPopulationBoth,
        male1,
        male2,
        male3,
        male4,
        male5,
        male6,
        male7,
        male8,
        male9,
        male10,
        male11,
        male12,
        male13,
        male14,
        male15,
        male16,
        male17,
        male18,
        male19,
        male20,
        female1,
        female2,
        female3,
        female4,
        female5,
        female6,
        female7,
        female8,
        female9,
        female10,
        female11,
        female12,
        female13,
        female14,
        female15,
        female16,
        female17,
        female18,
        female19,
        female20,
        both1,
        both2,
        both3,
        both4,
        both5,
        both6,
        both7,
        both8,
        both9,
        both10,
        both11,
        both12,
        both13,
        both14,
        both15,
        both16,
        both17,
        both18,
        both19,
        both20,
        totalBoth,
        totalHouseholdsCY,
        totalHouseholds,
        yearSubmitted,
        documentName,
        populationCount,
        shortenedBarangayProfileUrl,
        numBakery,
        numGrocery,
        numIceCream,
        numSariSariStore,
        numNativeDelicacies,
        numHardwareElectrical,
        numSweetPreserves,
        numConstructionConcrete,
        numSitcharon,
        numCarJeepPartsSupplies,
        numNoodles,
        numMotorcyclesBicyclesSupplies,
        numBalut,
        numAgriculturalEquipmentSupplies,
        numVinegar,
        numSchoolOfficeSupplies,
        numFishDryingSmoking,
        numPhotoCenterSupplies,
        numLaboratories,
        numAppliance,
        numChemicalIndustries,
        numJewelryShopStore,
        numFeedmills,
        numBagsFootwearStore,
        numGarmentEmbroidery,
        numVideoTapesCenter,
        numFootwearFactories,
        numBazaars,
        numTextileMills,
        numPrintingPress,
        numBagsWalletFactories,
        numPawnshop,
        numFurnitureWooden,
        numFurnitureRattan,
        numFurnitureBamboo,
        numFurnitureMetal,
        numFuneralParlor,
        numDrugStore,
        numPublicMarket,
        numTalipapa,
        numCinema,
        numPaperManufacturing,
        numCockpit,
        numCementManufacturing,
        numFinancialInstitutions,
        numHallowBlocksMaking,
        numRestaurants,
        numMarbleCraft,
        numRealEstate,
        numBlacksmith,
        numNightClubBarMassage,
        numIronMetalCraft,
        numMemorialParks,
        numEngineeringWorkMachineShop,
        numInsurance,
        numJewelryManufacturingGoldsmith,
        numGasolineStation,
        numCeramicsPottery,
        numGeneralServiceContractors,
        numWoodcraft,
        numArrastreServices,
        numEngraving,
        numBodyWorkshop,
        numFashionAccessories,
        numFitnessGym,
        numOthersManufacturing,
        numOthersManufacturingSpecify,
        numBeautyParlorBarberShop,
        numCooperativeRiceGrowers,
        numOthersCommercial,
        numOthersCommercialSpecify,
        totalNumBirths,
        totalNumDeathsAllCauses,
        totalNumStillBirth,
        totalNumInfantDeaths,
        totalNumEarlyNeonatalDeaths,
        fiveLeadingCausesMortalityCY,
        fiveLeadingMorbidityCY,
        causeCardiovascularDisorder,
        causeCancer,
        causeOldAge,
        causeKidneyFailure,
        causeTB,
        causeFeverFlu,
        causeCough,
        causeAsthma,
        causeHypertension,
        causePTB,
        infantLeadingCausesMortalityCY,
        infantLeadingCausesMorbidityCY,
        infantMortalityCause1,
        infantMortalityCause2,
        infantMortalityCause3,
        infantMortalityNum1,
        infantMortalityNum2,
        infantMortalityNum3,
        infantMorbidityFeverNum,
        infantMorbidityCoughNum,
        infantMorbidityMalnutritionNum,
        infantMorbidityDiarrheaNum,
        infantMorbidityTCPrimaryComplexNum,
        causeEarlyNeonatalDeathsCY,
        causeEarlyNeonatalCause1,
        causeEarlyNeonatalCause2,
        causeEarlyNeonatalCause3,
        causeEarlyNeonatalNum1,
        causeEarlyNeonatalNum2,
        causeEarlyNeonatalNum3,
        causeMaternalDeathsCY,
        causeMaternalCause1,
        causeMaternalCause2,
        causeMaternalCause3,
        causeMaternalNum1,
        causeMaternalNum2,
        causeMaternalNum3,
        healthClinicsHospitalName1,
        healthClinicsHospitalName2,
        healthClinicsHospitalName3,
        healthClinicsHospitalName4,
        healthClinicsHospitalNumGov1,
        healthClinicsHospitalNumGov2,
        healthClinicsHospitalNumGov3,
        healthClinicsHospitalNumGov4,
        healthClinicsHospitalNumPrivate1,
        healthClinicsHospitalNumPrivate2,
        healthClinicsHospitalNumPrivate3,
        healthClinicsHospitalNumPrivate4,
        medicalHealthPersonnelDoctorNumGov,
        medicalHealthPersonnelNurseNumGov,
        medicalHealthPersonnelMidwifeNumGov,
        medicalHealthPersonnelBHWNumGov,
        medicalHealthPersonnelDoctorNumPrivate,
        medicalHealthPersonnelNurseNumPrivate,
        medicalHealthPersonnelMidwifeNumPrivate,
        medicalHealthPersonnelBHWNumPrivate,
        medicalServiceType1,
        medicalServiceType2,
        medicalServiceType3,
        medicalServiceType4,
        medicalServiceFrequency1,
        medicalServiceFrequency2,
        medicalServiceFrequency3,
        medicalServiceFrequency4,
        disposalTrucks,
        disposalOpenPit,
        disposalBurying,
        disposalBurning,
        disposalThrowAnywhere,
        disposalOthersSpecify,
        disposalOthers,
        sourceIncomeCY1,
        sourceIncomeCY2,
        sourceIncomeAmount1CY1,
        sourceIncomeAmount1CY2,
        sourceIncomeAmount2CY1,
        sourceIncomeAmount2CY2,
        sourceIncomeAmount3CY1,
        sourceIncomeAmount3CY2,
        sourceIncomeAmount4CY1,
        sourceIncomeAmount4CY2,
        sourceIncomeAmount5CY1,
        sourceIncomeAmount5CY2,
        sourceIncomeAmount6CY1,
        sourceIncomeAmount6CY2,
        sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2,
        sourceIncomeAmount8CY1,
        sourceIncomeAmount8CY2,
        sourceIncomeAmount9CY1,
        sourceIncomeAmount9CY2,
        sourceIncomeAmount10CY1,
        sourceIncomeAmount10CY2,
        sourceIncomeAmountTotalCY1,
        sourceIncomeAmountTotalCY2,
        actualExpendituresCY1,
        actualExpendituresCY2,
        actualExpendituresAmount1CY1,
        actualExpendituresAmount1CY2,
        actualExpendituresAmount2CY1,
        actualExpendituresAmount2CY2,
        actualExpendituresAmount3CY1,
        actualExpendituresAmount3CY2,
        actualExpendituresAmountTotalCY1,
        actualExpendituresAmountTotalCY2,
        governanceOwnedFacilities1,
        governanceOwnedFacilities2,
        governanceOwnedFacilities3,
        governanceOwnedFacilities4,
        governanceOwnedFacilities5,
        governanceOwnedFacilities6,
        governanceOwnedFacilities7,
        governanceOwnedFacilities8,
        governanceOwnedFacilities8StateOwnership,
        governanceOwnedFacilities9,
        governanceOwnedFacilities9StateOwnership,
        governanceOwnedFacilities10,
        governanceOwnedFacilities11,
        governanceOwnedFacilities12,
        governanceOwnedFacilities12Specify,
        barangayGovSupportOrgNum1,
        barangayGovSupportOrgNum2,
        barangayGovSupportOrgNum3,
        barangayGovSupportOrgNum4,
        barangayGovSupportOrgNum5,
        barangayGovSupportOrgNum6,
        barangayGovSupportOrgNum7,
        barangayGovSupportOrgNum7Specify,
        barangayGovSupportOrgNum8,
        barangayGovSupportOrgNum8Specify,
        barangayGovSupportOrgNum9,
        barangayGovSupportOrgNum10,
        barangayGovSupportOrgNum11,
        barangayGovSupportOrgNum12,
        signatureOverPrintedName,
        position,
        date1,
        barangayCaptain,
        date2,
    } = req.body;

    const totalMale =
        Number(male1) +
        Number(male2) +
        Number(male3) +
        Number(male4) +
        Number(male5) +
        Number(male6) +
        Number(male7) +
        Number(male8) +
        Number(male9) +
        Number(male10) +
        Number(male11) +
        Number(male12) +
        Number(male13) +
        Number(male14) +
        Number(male15) +
        Number(male16) +
        Number(male17);

    const totalFemale =
        Number(female1) +
        Number(female2) +
        Number(female3) +
        Number(female4) +
        Number(female5) +
        Number(female6) +
        Number(female7) +
        Number(female8) +
        Number(female9) +
        Number(female10) +
        Number(female11) +
        Number(female12) +
        Number(female13) +
        Number(female14) +
        Number(female15) +
        Number(female16) +
        Number(female17);

    await ShortenedBarangayProfile.findOne({
        where: {
            barangayId: selectedBarangay.barangayId,
            typeOfDocument: "Submitted",
            yearSubmitted: selectedBarangay.yearSubmitted,
        },
    }).then((data) => {
        data.update({
            barangayId: selectedBarangay.barangayId,
            typeOfDocumentId: typeOfDocumentId.id,
            typeOfDocument: "Submitted",
            yearSubmitted: selectedBarangay.yearSubmitted,
            totalLandArea: totalLandArea,
            totalPopulation: totalPopulation,
            totalPopulationMale: totalPopulationMale,
            totalPopulationFemale: totalPopulationFemale,
            totalPopulationBoth:
                Number(totalPopulationMale) + Number(totalPopulationFemale),
            male1: male1,
            male2: male2,
            male3: male3,
            male4: male4,
            male5: male5,
            male6: male6,
            male7: male7,
            male8: male8,
            male9: male9,
            male10: male10,
            male11: male11,
            male12: male12,
            male13: male13,
            male14: male14,
            male15: male15,
            male16: male16,
            male17: male17,
            male18: male18,
            male19: male19,
            male20: male20,
            female1: female1,
            female2: female2,
            female3: female3,
            female4: female4,
            female5: female5,
            female6: female6,
            female7: female7,
            female8: female8,
            female9: female9,
            female10: female10,
            female11: female11,
            female12: female12,
            female13: female13,
            female14: female14,
            female15: female15,
            female16: female16,
            female17: female17,
            female18: female18,
            female19: female19,
            female20: female20,
            both1: both1,
            both2: both2,
            both3: both3,
            both4: both4,
            both5: both5,
            both6: both6,
            both7: both7,
            both8: both8,
            both9: both9,
            both10: both10,
            both11: both11,
            both12: both12,
            both13: both13,
            both14: both14,
            both15: both15,
            both16: both16,
            both17: both17,
            both18: both18,
            both19: both19,
            both20: both20,
            totalMale: totalMale,
            totalFemale: totalFemale,
            totalBoth: totalMale + totalFemale,
            totalHouseholdsCY: totalHouseholdsCY,
            totalHouseholds: totalHouseholds,
            numBakery: numBakery,
            numGrocery: numGrocery,
            numIceCream: numIceCream,
            numSariSariStore: numSariSariStore,
            numNativeDelicacies: numNativeDelicacies,
            numHardwareElectrical: numHardwareElectrical,
            numSweetPreserves: numSweetPreserves,
            numConstructionConcrete: numConstructionConcrete,
            numSitcharon: numSitcharon,
            numCarJeepPartsSupplies: numCarJeepPartsSupplies,
            numNoodles: numNoodles,
            numMotorcyclesBicyclesSupplies: numMotorcyclesBicyclesSupplies,
            numBalut: numBalut,
            numAgriculturalEquipmentSupplies: numAgriculturalEquipmentSupplies,
            numVinegar: numVinegar,
            numSchoolOfficeSupplies: numSchoolOfficeSupplies,
            numFishDryingSmoking: numFishDryingSmoking,
            numPhotoCenterSupplies: numPhotoCenterSupplies,
            numLaboratories: numLaboratories,
            numAppliance: numAppliance,
            numChemicalIndustries: numChemicalIndustries,
            numJewelryShopStore: numJewelryShopStore,
            numFeedmills: numFeedmills,
            numBagsFootwearStore: numBagsFootwearStore,
            numGarmentEmbroidery: numGarmentEmbroidery,
            numVideoTapesCenter: numVideoTapesCenter,
            numFootwearFactories: numFootwearFactories,
            numBazaars: numBazaars,
            numTextileMills: numTextileMills,
            numPrintingPress: numPrintingPress,
            numBagsWalletFactories: numBagsWalletFactories,
            numPawnshop: numPawnshop,
            numFurnitureWooden: numFurnitureWooden,
            numFurnitureRattan: numFurnitureRattan,
            numFurnitureBamboo: numFurnitureBamboo,
            numFurnitureMetal: numFurnitureMetal,
            numFuneralParlor: numFuneralParlor,
            numDrugStore: numDrugStore,
            numPublicMarket: numPublicMarket,
            numTalipapa: numTalipapa,
            numCinema: numCinema,
            numPaperManufacturing: numPaperManufacturing,
            numCockpit: numCockpit,
            numCementManufacturing: numCementManufacturing,
            numFinancialInstitutions: numFinancialInstitutions,
            numHallowBlocksMaking: numHallowBlocksMaking,
            numRestaurants: numRestaurants,
            numMarbleCraft: numMarbleCraft,
            numRealEstate: numRealEstate,
            numBlacksmith: numBlacksmith,
            numNightClubBarMassage: numNightClubBarMassage,
            numIronMetalCraft: numIronMetalCraft,
            numMemorialParks: numMemorialParks,
            numEngineeringWorkMachineShop: numEngineeringWorkMachineShop,
            numInsurance: numInsurance,
            numJewelryManufacturingGoldsmith: numJewelryManufacturingGoldsmith,
            numGasolineStation: numGasolineStation,
            numCeramicsPottery: numCeramicsPottery,
            numGeneralServiceContractors: numGeneralServiceContractors,
            numWoodcraft: numWoodcraft,
            numArrastreServices: numArrastreServices,
            numEngraving: numEngraving,
            numBodyWorkshop: numBodyWorkshop,
            numFashionAccessories: numFashionAccessories,
            numFitnessGym: numFitnessGym,
            numOthersManufacturing: numOthersManufacturing,
            numOthersManufacturingSpecify: numOthersManufacturingSpecify,
            numBeautyParlorBarberShop: numBeautyParlorBarberShop,
            numCooperativeRiceGrowers: numCooperativeRiceGrowers,
            numOthersCommercial: numOthersCommercial,
            numOthersCommercialSpecify: numOthersCommercialSpecify,
            totalNumBirths: totalNumBirths,
            totalNumDeathsAllCauses: totalNumDeathsAllCauses,
            totalNumStillBirth: totalNumStillBirth,
            totalNumInfantDeaths: totalNumInfantDeaths,
            totalNumEarlyNeonatalDeaths: totalNumEarlyNeonatalDeaths,
            fiveLeadingCausesMortalityCY: fiveLeadingCausesMortalityCY,
            fiveLeadingMorbidityCY: fiveLeadingMorbidityCY,
            causeCardiovascularDisorder: causeCardiovascularDisorder,
            causeCancer: causeCancer,
            causeOldAge: causeOldAge,
            causeKidneyFailure: causeKidneyFailure,
            causeTB: causeTB,
            causeFeverFlu: causeFeverFlu,
            causeCough: causeCough,
            causeAsthma: causeAsthma,
            causeHypertension: causeHypertension,
            causePTB: causePTB,
            infantLeadingCausesMortalityCY: infantLeadingCausesMortalityCY,
            infantLeadingCausesMorbidityCY: infantLeadingCausesMorbidityCY,
            infantMortalityCause1: infantMortalityCause1,
            infantMortalityCause2: infantMortalityCause2,
            infantMortalityCause3: infantMortalityCause3,
            infantMortalityNum1: infantMortalityNum1,
            infantMortalityNum2: infantMortalityNum2,
            infantMortalityNum3: infantMortalityNum3,
            infantMorbidityFeverNum: infantMorbidityFeverNum,
            infantMorbidityCoughNum: infantMorbidityCoughNum,
            infantMorbidityMalnutritionNum: infantMorbidityMalnutritionNum,
            infantMorbidityDiarrheaNum: infantMorbidityDiarrheaNum,
            infantMorbidityTCPrimaryComplexNum:
                infantMorbidityTCPrimaryComplexNum,

            causeEarlyNeonatalDeathsCY: causeEarlyNeonatalDeathsCY,
            causeEarlyNeonatalCause1: causeEarlyNeonatalCause1,
            causeEarlyNeonatalCause2: causeEarlyNeonatalCause2,
            causeEarlyNeonatalCause3: causeEarlyNeonatalCause3,
            causeEarlyNeonatalNum1: causeEarlyNeonatalNum1,
            causeEarlyNeonatalNum2: causeEarlyNeonatalNum2,
            causeEarlyNeonatalNum3: causeEarlyNeonatalNum3,
            causeMaternalDeathsCY: causeMaternalDeathsCY,
            causeMaternalCause1: causeMaternalCause1,
            causeMaternalCause2: causeMaternalCause2,
            causeMaternalCause3: causeMaternalCause3,
            causeMaternalNum1: causeMaternalNum1,
            causeMaternalNum2: causeMaternalNum2,
            causeMaternalNum3: causeMaternalNum3,
            healthClinicsHospitalName1: healthClinicsHospitalName1,
            healthClinicsHospitalName2: healthClinicsHospitalName2,
            healthClinicsHospitalName3: healthClinicsHospitalName3,
            healthClinicsHospitalName4: healthClinicsHospitalName4,
            healthClinicsHospitalNumGov1: healthClinicsHospitalNumGov1,
            healthClinicsHospitalNumGov2: healthClinicsHospitalNumGov2,
            healthClinicsHospitalNumGov3: healthClinicsHospitalNumGov3,
            healthClinicsHospitalNumGov4: healthClinicsHospitalNumGov4,
            healthClinicsHospitalNumPrivate1: healthClinicsHospitalNumPrivate1,
            healthClinicsHospitalNumPrivate2: healthClinicsHospitalNumPrivate2,
            healthClinicsHospitalNumPrivate3: healthClinicsHospitalNumPrivate3,
            healthClinicsHospitalNumPrivate4: healthClinicsHospitalNumPrivate4,
            medicalHealthPersonnelDoctorNumGov:
                medicalHealthPersonnelDoctorNumGov,
            medicalHealthPersonnelNurseNumGov:
                medicalHealthPersonnelNurseNumGov,
            medicalHealthPersonnelMidwifeNumGov:
                medicalHealthPersonnelMidwifeNumGov,
            medicalHealthPersonnelBHWNumGov: medicalHealthPersonnelBHWNumGov,
            medicalHealthPersonnelDoctorNumPrivate:
                medicalHealthPersonnelDoctorNumPrivate,
            medicalHealthPersonnelNurseNumPrivate:
                medicalHealthPersonnelNurseNumPrivate,
            medicalHealthPersonnelMidwifeNumPrivate:
                medicalHealthPersonnelMidwifeNumPrivate,
            medicalHealthPersonnelBHWNumPrivate:
                medicalHealthPersonnelBHWNumPrivate,
            medicalServiceType1: medicalServiceType1,
            medicalServiceType2: medicalServiceType2,
            medicalServiceType3: medicalServiceType3,
            medicalServiceType4: medicalServiceType4,
            medicalServiceFrequency1: medicalServiceFrequency1,
            medicalServiceFrequency2: medicalServiceFrequency2,
            medicalServiceFrequency3: medicalServiceFrequency3,
            medicalServiceFrequency4: medicalServiceFrequency4,
            disposalTrucks: disposalTrucks,
            disposalOpenPit: disposalOpenPit,
            disposalBurying: disposalBurying,
            disposalBurning: disposalBurning,
            disposalThrowAnywhere: disposalThrowAnywhere,
            disposalOthersSpecify: disposalOthersSpecify,
            disposalOthers: disposalOthers,
            sourceIncomeCY1: sourceIncomeCY1,
            sourceIncomeCY2: sourceIncomeCY2,
            sourceIncomeAmount1CY1: sourceIncomeAmount1CY1,
            sourceIncomeAmount1CY2: sourceIncomeAmount1CY2,
            sourceIncomeAmount2CY1: sourceIncomeAmount2CY1,
            sourceIncomeAmount2CY2: sourceIncomeAmount2CY2,
            sourceIncomeAmount3CY1: sourceIncomeAmount3CY1,
            sourceIncomeAmount3CY2: sourceIncomeAmount3CY2,
            sourceIncomeAmount4CY1: sourceIncomeAmount4CY1,
            sourceIncomeAmount4CY2: sourceIncomeAmount4CY2,
            sourceIncomeAmount5CY1: sourceIncomeAmount5CY1,
            sourceIncomeAmount5CY2: sourceIncomeAmount5CY2,
            sourceIncomeAmount6CY1: sourceIncomeAmount6CY1,
            sourceIncomeAmount6CY2: sourceIncomeAmount6CY2,
            sourceIncomeAmount7CY1: sourceIncomeAmount7CY1,
            sourceIncomeAmount7CY2: sourceIncomeAmount7CY2,
            sourceIncomeAmount7CY1: sourceIncomeAmount7CY1,
            sourceIncomeAmount7CY2: sourceIncomeAmount7CY2,
            sourceIncomeAmount8CY1: sourceIncomeAmount8CY1,
            sourceIncomeAmount8CY2: sourceIncomeAmount8CY2,
            sourceIncomeAmount9CY1: sourceIncomeAmount9CY1,
            sourceIncomeAmount9CY2: sourceIncomeAmount9CY2,
            sourceIncomeAmount10CY1: sourceIncomeAmount10CY1,
            sourceIncomeAmount10CY2: sourceIncomeAmount10CY2,
            sourceIncomeAmountTotalCY1: sourceIncomeAmountTotalCY1,
            sourceIncomeAmountTotalCY2: sourceIncomeAmountTotalCY2,
            actualExpendituresCY1: actualExpendituresCY1,
            actualExpendituresCY2: actualExpendituresCY2,
            actualExpendituresAmount1CY1: actualExpendituresAmount1CY1,
            actualExpendituresAmount1CY2: actualExpendituresAmount1CY2,
            actualExpendituresAmount2CY1: actualExpendituresAmount2CY1,
            actualExpendituresAmount2CY2: actualExpendituresAmount2CY2,
            actualExpendituresAmount3CY1: actualExpendituresAmount3CY1,
            actualExpendituresAmount3CY2: actualExpendituresAmount3CY2,
            actualExpendituresAmountTotalCY1: actualExpendituresAmountTotalCY1,
            actualExpendituresAmountTotalCY2: actualExpendituresAmountTotalCY2,
            governanceOwnedFacilities1: governanceOwnedFacilities1,
            governanceOwnedFacilities2: governanceOwnedFacilities2,
            governanceOwnedFacilities3: governanceOwnedFacilities3,
            governanceOwnedFacilities4: governanceOwnedFacilities4,
            governanceOwnedFacilities5: governanceOwnedFacilities5,
            governanceOwnedFacilities6: governanceOwnedFacilities6,
            governanceOwnedFacilities7: governanceOwnedFacilities7,
            governanceOwnedFacilities8: governanceOwnedFacilities8,
            governanceOwnedFacilities8StateOwnership:
                governanceOwnedFacilities8StateOwnership,
            governanceOwnedFacilities9: governanceOwnedFacilities9,
            governanceOwnedFacilities9StateOwnership:
                governanceOwnedFacilities9StateOwnership,
            governanceOwnedFacilities10: governanceOwnedFacilities10,
            governanceOwnedFacilities11: governanceOwnedFacilities11,
            governanceOwnedFacilities12: governanceOwnedFacilities12,
            governanceOwnedFacilities12Specify:
                governanceOwnedFacilities12Specify,
            barangayGovSupportOrgNum1: barangayGovSupportOrgNum1,
            barangayGovSupportOrgNum2: barangayGovSupportOrgNum2,
            barangayGovSupportOrgNum3: barangayGovSupportOrgNum3,
            barangayGovSupportOrgNum4: barangayGovSupportOrgNum4,
            barangayGovSupportOrgNum5: barangayGovSupportOrgNum5,
            barangayGovSupportOrgNum6: barangayGovSupportOrgNum6,
            barangayGovSupportOrgNum7: barangayGovSupportOrgNum7,
            barangayGovSupportOrgNum7Specify: barangayGovSupportOrgNum7Specify,
            barangayGovSupportOrgNum8: barangayGovSupportOrgNum8,
            barangayGovSupportOrgNum8Specify: barangayGovSupportOrgNum8Specify,
            barangayGovSupportOrgNum9: barangayGovSupportOrgNum9,
            barangayGovSupportOrgNum10: barangayGovSupportOrgNum10,
            barangayGovSupportOrgNum11: barangayGovSupportOrgNum11,
            barangayGovSupportOrgNum12: barangayGovSupportOrgNum12,
            signatureOverPrintedName: signatureOverPrintedName,
            position: position,
            date1: date1,
            barangayCaptain: barangayCaptain,
            date2: date2,
        });
    });

    // await ShortenedSubmission.findOne({
    //     where: {
    //         barangayId: selectedBarangay.barangayId,
    //         yearSubmitted: selectedBarangay.yearSubmitted,
    //     },
    // }).then((data) => {
    //     data.update({
    //         populationCount: populationCount,
    //         submissionBarangayProfileUrl: shortenedBarangayProfileUrl,
    //     });
    // });

    res.json("SUCESS");
};

const updateTypeOfDocument = async (req, res) => {
    const user = res.locals.user;
    const { typeOfDocument, action } = req.body;

    const shortenedBarangayProfile = await ShortenedBarangayProfile.findOne({
        where: {
            barangayId: user.barangayId,
            typeOfDocument: "Saved",
        },
    });

    const actionData = await Action.findOne({
        where: { userId: user.id, barangayId: user.barangayId },
    });

    if (actionData.action == "CreateNewDocument") {
        if (shortenedBarangayProfile) {
            await ShortenedBarangayProfile.findOne({
                where: {
                    barangayId: user.barangayId,
                    typeOfDocument: "Saved",
                },
                order: [["createdAt", "ASC"]],
            }).then((data) => {
                data.destroy();
            });
        }

        await ShortenedBarangayProfile.update(
            { typeOfDocument: typeOfDocument },
            {
                where: {
                    barangayId: user.barangayId,
                    typeOfDocument: "New",
                },
            },
            { order: [["createdAt", "DESC"]] }
        );

        await TypeOfDocument.update(
            { typeOfDocument: typeOfDocument },
            {
                where: {
                    userId: user.id,
                    barangayId: user.barangayId,
                    typeOfDocument: "New",
                },
            },
            { order: [["createdAt", "DESC"]] }
        );
    }

    await Action.update(
        { action: action },
        {
            where: { barangayId: user.barangayId },
        }
    );

    res.json("SUCCESS");
};

const getSavedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    const action = await Action.findOne({
        where: { userId: user.id, barangayId: user.barangayId },
    });

    if (action.action == "CreateNewDocument") {
        const shortenedBarangayProfile = await ShortenedBarangayProfile.findOne(
            {
                where: {
                    barangayId: user.barangayId,
                    typeOfDocument: "Saved",
                },
            }
        );

        return res.json(shortenedBarangayProfile);
    }

    return res.json(null);
};

const updateShortenedBarangayProfile = async (req, res) => {
    const user = res.locals.user;

    const {
        totalLandArea,
        totalPopulation,
        totalPopulationMale,
        totalPopulationFemale,
        totalPopulationBoth,
        male1,
        male2,
        male3,
        male4,
        male5,
        male6,
        male7,
        male8,
        male9,
        male10,
        male11,
        male12,
        male13,
        male14,
        male15,
        male16,
        male17,
        male18,
        male19,
        male20,
        female1,
        female2,
        female3,
        female4,
        female5,
        female6,
        female7,
        female8,
        female9,
        female10,
        female11,
        female12,
        female13,
        female14,
        female15,
        female16,
        female17,
        female18,
        female19,
        female20,
        both1,
        both2,
        both3,
        both4,
        both5,
        both6,
        both7,
        both8,
        both9,
        both10,
        both11,
        both12,
        both13,
        both14,
        both15,
        both16,
        both17,
        both18,
        both19,
        both20,
        totalBoth,
        totalHouseholdsCY,
        totalHouseholds,
        numBakery,
        numGrocery,
        numIceCream,
        numSariSariStore,
        numNativeDelicacies,
        numHardwareElectrical,
        numSweetPreserves,
        numConstructionConcrete,
        numSitcharon,
        numCarJeepPartsSupplies,
        numNoodles,
        numMotorcyclesBicyclesSupplies,
        numBalut,
        numAgriculturalEquipmentSupplies,
        numVinegar,
        numSchoolOfficeSupplies,
        numFishDryingSmoking,
        numPhotoCenterSupplies,
        numLaboratories,
        numAppliance,
        numChemicalIndustries,
        numJewelryShopStore,
        numFeedmills,
        numBagsFootwearStore,
        numGarmentEmbroidery,
        numVideoTapesCenter,
        numFootwearFactories,
        numBazaars,
        numTextileMills,
        numPrintingPress,
        numBagsWalletFactories,
        numPawnshop,
        numFurnitureWooden,
        numFurnitureRattan,
        numFurnitureBamboo,
        numFurnitureMetal,
        numFuneralParlor,
        numDrugStore,
        numPublicMarket,
        numTalipapa,
        numCinema,
        numPaperManufacturing,
        numCockpit,
        numCementManufacturing,
        numFinancialInstitutions,
        numHallowBlocksMaking,
        numRestaurants,
        numMarbleCraft,
        numRealEstate,
        numBlacksmith,
        numNightClubBarMassage,
        numIronMetalCraft,
        numMemorialParks,
        numEngineeringWorkMachineShop,
        numInsurance,
        numJewelryManufacturingGoldsmith,
        numGasolineStation,
        numCeramicsPottery,
        numGeneralServiceContractors,
        numWoodcraft,
        numArrastreServices,
        numEngraving,
        numBodyWorkshop,
        numFashionAccessories,
        numFitnessGym,
        numOthersManufacturing,
        numOthersManufacturingSpecify,
        numBeautyParlorBarberShop,
        numCooperativeRiceGrowers,
        numOthersCommercial,
        numOthersCommercialSpecify,
        totalNumBirths,
        totalNumDeathsAllCauses,
        totalNumStillBirth,
        totalNumInfantDeaths,
        totalNumEarlyNeonatalDeaths,
        fiveLeadingCausesMortalityCY,
        fiveLeadingMorbidityCY,
        causeCardiovascularDisorder,
        causeCancer,
        causeOldAge,
        causeKidneyFailure,
        causeTB,
        causeFeverFlu,
        causeCough,
        causeAsthma,
        causeHypertension,
        causePTB,
        infantLeadingCausesMortalityCY,
        infantLeadingCausesMorbidityCY,
        infantMortalityCause1,
        infantMortalityCause2,
        infantMortalityCause3,
        infantMortalityNum1,
        infantMortalityNum2,
        infantMortalityNum3,
        infantMorbidityFeverNum,
        infantMorbidityCoughNum,
        infantMorbidityMalnutritionNum,
        infantMorbidityDiarrheaNum,
        infantMorbidityTCPrimaryComplexNum,
        causeEarlyNeonatalDeathsCY,
        causeEarlyNeonatalCause1,
        causeEarlyNeonatalCause2,
        causeEarlyNeonatalCause3,
        causeEarlyNeonatalNum1,
        causeEarlyNeonatalNum2,
        causeEarlyNeonatalNum3,
        causeMaternalDeathsCY,
        causeMaternalCause1,
        causeMaternalCause2,
        causeMaternalCause3,
        causeMaternalNum1,
        causeMaternalNum2,
        causeMaternalNum3,
        healthClinicsHospitalName1,
        healthClinicsHospitalName2,
        healthClinicsHospitalName3,
        healthClinicsHospitalName4,
        healthClinicsHospitalNumGov1,
        healthClinicsHospitalNumGov2,
        healthClinicsHospitalNumGov3,
        healthClinicsHospitalNumGov4,
        healthClinicsHospitalNumPrivate1,
        healthClinicsHospitalNumPrivate2,
        healthClinicsHospitalNumPrivate3,
        healthClinicsHospitalNumPrivate4,
        medicalHealthPersonnelDoctorNumGov,
        medicalHealthPersonnelNurseNumGov,
        medicalHealthPersonnelMidwifeNumGov,
        medicalHealthPersonnelBHWNumGov,
        medicalHealthPersonnelDoctorNumPrivate,
        medicalHealthPersonnelNurseNumPrivate,
        medicalHealthPersonnelMidwifeNumPrivate,
        medicalHealthPersonnelBHWNumPrivate,
        medicalServiceType1,
        medicalServiceType2,
        medicalServiceType3,
        medicalServiceType4,
        medicalServiceFrequency1,
        medicalServiceFrequency2,
        medicalServiceFrequency3,
        medicalServiceFrequency4,
        disposalTrucks,
        disposalOpenPit,
        disposalBurying,
        disposalBurning,
        disposalThrowAnywhere,
        disposalOthersSpecify,
        disposalOthers,
        sourceIncomeCY1,
        sourceIncomeCY2,
        sourceIncomeAmount1CY1,
        sourceIncomeAmount1CY2,
        sourceIncomeAmount2CY1,
        sourceIncomeAmount2CY2,
        sourceIncomeAmount3CY1,
        sourceIncomeAmount3CY2,
        sourceIncomeAmount4CY1,
        sourceIncomeAmount4CY2,
        sourceIncomeAmount5CY1,
        sourceIncomeAmount5CY2,
        sourceIncomeAmount6CY1,
        sourceIncomeAmount6CY2,
        sourceIncomeAmount7CY1,
        sourceIncomeAmount7CY2,
        sourceIncomeAmount8CY1,
        sourceIncomeAmount8CY2,
        sourceIncomeAmount9CY1,
        sourceIncomeAmount9CY2,
        sourceIncomeAmount10CY1,
        sourceIncomeAmount10CY2,
        sourceIncomeAmountTotalCY1,
        sourceIncomeAmountTotalCY2,
        actualExpendituresCY1,
        actualExpendituresCY2,
        actualExpendituresAmount1CY1,
        actualExpendituresAmount1CY2,
        actualExpendituresAmount2CY1,
        actualExpendituresAmount2CY2,
        actualExpendituresAmount3CY1,
        actualExpendituresAmount3CY2,
        actualExpendituresAmountTotalCY1,
        actualExpendituresAmountTotalCY2,
        governanceOwnedFacilities1,
        governanceOwnedFacilities2,
        governanceOwnedFacilities3,
        governanceOwnedFacilities4,
        governanceOwnedFacilities5,
        governanceOwnedFacilities6,
        governanceOwnedFacilities7,
        governanceOwnedFacilities8,
        governanceOwnedFacilities8StateOwnership,
        governanceOwnedFacilities9,
        governanceOwnedFacilities9StateOwnership,
        governanceOwnedFacilities10,
        governanceOwnedFacilities11,
        governanceOwnedFacilities12,
        governanceOwnedFacilities12Specify,
        barangayGovSupportOrgNum1,
        barangayGovSupportOrgNum2,
        barangayGovSupportOrgNum3,
        barangayGovSupportOrgNum4,
        barangayGovSupportOrgNum5,
        barangayGovSupportOrgNum6,
        barangayGovSupportOrgNum7,
        barangayGovSupportOrgNum7Specify,
        barangayGovSupportOrgNum8,
        barangayGovSupportOrgNum8Specify,
        barangayGovSupportOrgNum9,
        barangayGovSupportOrgNum10,
        barangayGovSupportOrgNum11,
        barangayGovSupportOrgNum12,
        signatureOverPrintedName,
        position,
        date1,
        barangayCaptain,
        date2,
    } = req.body;

    const totalMale =
        Number(male1) +
        Number(male2) +
        Number(male3) +
        Number(male4) +
        Number(male5) +
        Number(male6) +
        Number(male7) +
        Number(male8) +
        Number(male9) +
        Number(male10) +
        Number(male11) +
        Number(male12) +
        Number(male13) +
        Number(male14) +
        Number(male15) +
        Number(male16) +
        Number(male17);

    const totalFemale =
        Number(female1) +
        Number(female2) +
        Number(female3) +
        Number(female4) +
        Number(female5) +
        Number(female6) +
        Number(female7) +
        Number(female8) +
        Number(female9) +
        Number(female10) +
        Number(female11) +
        Number(female12) +
        Number(female13) +
        Number(female14) +
        Number(female15) +
        Number(female16) +
        Number(female17);

    await ShortenedBarangayProfile.findOne({
        where: {
            barangayId: user.barangayId,
            typeOfDocument: "Saved",
        },
        order: [["createdAt", "DESC"]],
    }).then((res) => {
        if (res) {
            res.update(
                {
                    totalLandArea: totalLandArea,
                    totalPopulation: totalPopulation,
                    totalPopulationMale: totalPopulationMale,
                    totalPopulationFemale: totalPopulationFemale,
                    totalPopulationBoth:
                        Number(totalPopulationMale) +
                        Number(totalPopulationFemale),
                    male1: male1,
                    male2: male2,
                    male3: male3,
                    male4: male4,
                    male5: male5,
                    male6: male6,
                    male7: male7,
                    male8: male8,
                    male9: male9,
                    male10: male10,
                    male11: male11,
                    male12: male12,
                    male13: male13,
                    male14: male14,
                    male15: male15,
                    male16: male16,
                    male17: male17,
                    male18: male18,
                    male19: male19,
                    male20: male20,
                    female1: female1,
                    female2: female2,
                    female3: female3,
                    female4: female4,
                    female5: female5,
                    female6: female6,
                    female7: female7,
                    female8: female8,
                    female9: female9,
                    female10: female10,
                    female11: female11,
                    female12: female12,
                    female13: female13,
                    female14: female14,
                    female15: female15,
                    female16: female16,
                    female17: female17,
                    female18: female18,
                    female19: female19,
                    female20: female20,
                    both1: both1,
                    both2: both2,
                    both3: both3,
                    both4: both4,
                    both5: both5,
                    both6: both6,
                    both7: both7,
                    both8: both8,
                    both9: both9,
                    both10: both10,
                    both11: both11,
                    both12: both12,
                    both13: both13,
                    both14: both14,
                    both15: both15,
                    both16: both16,
                    both17: both17,
                    both18: both18,
                    both19: both19,
                    both20: both20,
                    totalMale: totalMale,
                    totalFemale: totalFemale,
                    totalBoth: totalMale + totalFemale,
                    totalHouseholdsCY: totalHouseholdsCY,
                    totalHouseholds: totalHouseholds,
                    numBakery: numBakery,
                    numGrocery: numGrocery,
                    numIceCream: numIceCream,
                    numSariSariStore: numSariSariStore,
                    numNativeDelicacies: numNativeDelicacies,
                    numHardwareElectrical: numHardwareElectrical,
                    numSweetPreserves: numSweetPreserves,
                    numConstructionConcrete: numConstructionConcrete,
                    numSitcharon: numSitcharon,
                    numCarJeepPartsSupplies: numCarJeepPartsSupplies,
                    numNoodles: numNoodles,
                    numMotorcyclesBicyclesSupplies:
                        numMotorcyclesBicyclesSupplies,
                    numBalut: numBalut,
                    numAgriculturalEquipmentSupplies:
                        numAgriculturalEquipmentSupplies,
                    numVinegar: numVinegar,
                    numSchoolOfficeSupplies: numSchoolOfficeSupplies,
                    numFishDryingSmoking: numFishDryingSmoking,
                    numPhotoCenterSupplies: numPhotoCenterSupplies,
                    numLaboratories: numLaboratories,
                    numAppliance: numAppliance,
                    numChemicalIndustries: numChemicalIndustries,
                    numJewelryShopStore: numJewelryShopStore,
                    numFeedmills: numFeedmills,
                    numBagsFootwearStore: numBagsFootwearStore,
                    numGarmentEmbroidery: numGarmentEmbroidery,
                    numVideoTapesCenter: numVideoTapesCenter,
                    numFootwearFactories: numFootwearFactories,
                    numBazaars: numBazaars,
                    numTextileMills: numTextileMills,
                    numPrintingPress: numPrintingPress,
                    numBagsWalletFactories: numBagsWalletFactories,
                    numPawnshop: numPawnshop,
                    numFurnitureWooden: numFurnitureWooden,
                    numFurnitureRattan: numFurnitureRattan,
                    numFurnitureBamboo: numFurnitureBamboo,
                    numFurnitureMetal: numFurnitureMetal,
                    numFuneralParlor: numFuneralParlor,
                    numDrugStore: numDrugStore,
                    numPublicMarket: numPublicMarket,
                    numTalipapa: numTalipapa,
                    numCinema: numCinema,
                    numPaperManufacturing: numPaperManufacturing,
                    numCockpit: numCockpit,
                    numCementManufacturing: numCementManufacturing,
                    numFinancialInstitutions: numFinancialInstitutions,
                    numHallowBlocksMaking: numHallowBlocksMaking,
                    numRestaurants: numRestaurants,
                    numMarbleCraft: numMarbleCraft,
                    numRealEstate: numRealEstate,
                    numBlacksmith: numBlacksmith,
                    numNightClubBarMassage: numNightClubBarMassage,
                    numIronMetalCraft: numIronMetalCraft,
                    numMemorialParks: numMemorialParks,
                    numEngineeringWorkMachineShop:
                        numEngineeringWorkMachineShop,
                    numInsurance: numInsurance,
                    numJewelryManufacturingGoldsmith:
                        numJewelryManufacturingGoldsmith,
                    numGasolineStation: numGasolineStation,
                    numCeramicsPottery: numCeramicsPottery,
                    numGeneralServiceContractors: numGeneralServiceContractors,
                    numWoodcraft: numWoodcraft,
                    numArrastreServices: numArrastreServices,
                    numEngraving: numEngraving,
                    numBodyWorkshop: numBodyWorkshop,
                    numFashionAccessories: numFashionAccessories,
                    numFitnessGym: numFitnessGym,
                    numOthersManufacturing: numOthersManufacturing,
                    numOthersManufacturingSpecify:
                        numOthersManufacturingSpecify,
                    numBeautyParlorBarberShop: numBeautyParlorBarberShop,
                    numCooperativeRiceGrowers: numCooperativeRiceGrowers,
                    numOthersCommercial: numOthersCommercial,
                    numOthersCommercialSpecify: numOthersCommercialSpecify,
                    totalNumBirths: totalNumBirths,
                    totalNumDeathsAllCauses: totalNumDeathsAllCauses,
                    totalNumStillBirth: totalNumStillBirth,
                    totalNumInfantDeaths: totalNumInfantDeaths,
                    totalNumEarlyNeonatalDeaths: totalNumEarlyNeonatalDeaths,
                    fiveLeadingCausesMortalityCY: fiveLeadingCausesMortalityCY,
                    fiveLeadingMorbidityCY: fiveLeadingMorbidityCY,
                    causeCardiovascularDisorder: causeCardiovascularDisorder,
                    causeCancer: causeCancer,
                    causeOldAge: causeOldAge,
                    causeKidneyFailure: causeKidneyFailure,
                    causeTB: causeTB,
                    causeFeverFlu: causeFeverFlu,
                    causeCough: causeCough,
                    causeAsthma: causeAsthma,
                    causeHypertension: causeHypertension,
                    causePTB: causePTB,
                    infantLeadingCausesMortalityCY:
                        infantLeadingCausesMortalityCY,
                    infantLeadingCausesMorbidityCY:
                        infantLeadingCausesMorbidityCY,
                    infantMortalityCause1: infantMortalityCause1,
                    infantMortalityCause2: infantMortalityCause2,
                    infantMortalityCause3: infantMortalityCause3,
                    infantMortalityNum1: infantMortalityNum1,
                    infantMortalityNum2: infantMortalityNum2,
                    infantMortalityNum3: infantMortalityNum3,
                    infantMorbidityFeverNum: infantMorbidityFeverNum,
                    infantMorbidityCoughNum: infantMorbidityCoughNum,
                    infantMorbidityMalnutritionNum:
                        infantMorbidityMalnutritionNum,
                    infantMorbidityDiarrheaNum: infantMorbidityDiarrheaNum,
                    infantMorbidityTCPrimaryComplexNum:
                        infantMorbidityTCPrimaryComplexNum,

                    causeEarlyNeonatalDeathsCY: causeEarlyNeonatalDeathsCY,
                    causeEarlyNeonatalCause1: causeEarlyNeonatalCause1,
                    causeEarlyNeonatalCause2: causeEarlyNeonatalCause2,
                    causeEarlyNeonatalCause3: causeEarlyNeonatalCause3,
                    causeEarlyNeonatalNum1: causeEarlyNeonatalNum1,
                    causeEarlyNeonatalNum2: causeEarlyNeonatalNum2,
                    causeEarlyNeonatalNum3: causeEarlyNeonatalNum3,
                    causeMaternalDeathsCY: causeMaternalDeathsCY,
                    causeMaternalCause1: causeMaternalCause1,
                    causeMaternalCause2: causeMaternalCause2,
                    causeMaternalCause3: causeMaternalCause3,
                    causeMaternalNum1: causeMaternalNum1,
                    causeMaternalNum2: causeMaternalNum2,
                    causeMaternalNum3: causeMaternalNum3,
                    healthClinicsHospitalName1: healthClinicsHospitalName1,
                    healthClinicsHospitalName2: healthClinicsHospitalName2,
                    healthClinicsHospitalName3: healthClinicsHospitalName3,
                    healthClinicsHospitalName4: healthClinicsHospitalName4,
                    healthClinicsHospitalNumGov1: healthClinicsHospitalNumGov1,
                    healthClinicsHospitalNumGov2: healthClinicsHospitalNumGov2,
                    healthClinicsHospitalNumGov3: healthClinicsHospitalNumGov3,
                    healthClinicsHospitalNumGov4: healthClinicsHospitalNumGov4,
                    healthClinicsHospitalNumPrivate1:
                        healthClinicsHospitalNumPrivate1,
                    healthClinicsHospitalNumPrivate2:
                        healthClinicsHospitalNumPrivate2,
                    healthClinicsHospitalNumPrivate3:
                        healthClinicsHospitalNumPrivate3,
                    healthClinicsHospitalNumPrivate4:
                        healthClinicsHospitalNumPrivate4,
                    medicalHealthPersonnelDoctorNumGov:
                        medicalHealthPersonnelDoctorNumGov,
                    medicalHealthPersonnelNurseNumGov:
                        medicalHealthPersonnelNurseNumGov,
                    medicalHealthPersonnelMidwifeNumGov:
                        medicalHealthPersonnelMidwifeNumGov,
                    medicalHealthPersonnelBHWNumGov:
                        medicalHealthPersonnelBHWNumGov,
                    medicalHealthPersonnelDoctorNumPrivate:
                        medicalHealthPersonnelDoctorNumPrivate,
                    medicalHealthPersonnelNurseNumPrivate:
                        medicalHealthPersonnelNurseNumPrivate,
                    medicalHealthPersonnelMidwifeNumPrivate:
                        medicalHealthPersonnelMidwifeNumPrivate,
                    medicalHealthPersonnelBHWNumPrivate:
                        medicalHealthPersonnelBHWNumPrivate,
                    medicalServiceType1: medicalServiceType1,
                    medicalServiceType2: medicalServiceType2,
                    medicalServiceType3: medicalServiceType3,
                    medicalServiceType4: medicalServiceType4,
                    medicalServiceFrequency1: medicalServiceFrequency1,
                    medicalServiceFrequency2: medicalServiceFrequency2,
                    medicalServiceFrequency3: medicalServiceFrequency3,
                    medicalServiceFrequency4: medicalServiceFrequency4,
                    disposalTrucks: disposalTrucks,
                    disposalOpenPit: disposalOpenPit,
                    disposalBurying: disposalBurying,
                    disposalBurning: disposalBurning,
                    disposalThrowAnywhere: disposalThrowAnywhere,
                    disposalOthersSpecify: disposalOthersSpecify,
                    disposalOthers: disposalOthers,

                    sourceIncomeCY1: sourceIncomeCY1,
                    sourceIncomeCY2: sourceIncomeCY2,
                    sourceIncomeAmount1CY1: sourceIncomeAmount1CY1,
                    sourceIncomeAmount1CY2: sourceIncomeAmount1CY2,
                    sourceIncomeAmount2CY1: sourceIncomeAmount2CY1,
                    sourceIncomeAmount2CY2: sourceIncomeAmount2CY2,
                    sourceIncomeAmount3CY1: sourceIncomeAmount3CY1,
                    sourceIncomeAmount3CY2: sourceIncomeAmount3CY2,
                    sourceIncomeAmount4CY1: sourceIncomeAmount4CY1,
                    sourceIncomeAmount4CY2: sourceIncomeAmount4CY2,
                    sourceIncomeAmount5CY1: sourceIncomeAmount5CY1,
                    sourceIncomeAmount5CY2: sourceIncomeAmount5CY2,
                    sourceIncomeAmount6CY1: sourceIncomeAmount6CY1,
                    sourceIncomeAmount6CY2: sourceIncomeAmount6CY2,
                    sourceIncomeAmount7CY1: sourceIncomeAmount7CY1,
                    sourceIncomeAmount7CY2: sourceIncomeAmount7CY2,
                    sourceIncomeAmount7CY1: sourceIncomeAmount7CY1,
                    sourceIncomeAmount7CY2: sourceIncomeAmount7CY2,
                    sourceIncomeAmount8CY1: sourceIncomeAmount8CY1,
                    sourceIncomeAmount8CY2: sourceIncomeAmount8CY2,
                    sourceIncomeAmount9CY1: sourceIncomeAmount9CY1,
                    sourceIncomeAmount9CY2: sourceIncomeAmount9CY2,
                    sourceIncomeAmount10CY1: sourceIncomeAmount10CY1,
                    sourceIncomeAmount10CY2: sourceIncomeAmount10CY2,
                    sourceIncomeAmountTotalCY1: sourceIncomeAmountTotalCY1,
                    sourceIncomeAmountTotalCY2: sourceIncomeAmountTotalCY2,
                    actualExpendituresCY1: actualExpendituresCY1,
                    actualExpendituresCY2: actualExpendituresCY2,
                    actualExpendituresAmount1CY1: actualExpendituresAmount1CY1,
                    actualExpendituresAmount1CY2: actualExpendituresAmount1CY2,
                    actualExpendituresAmount2CY1: actualExpendituresAmount2CY1,
                    actualExpendituresAmount2CY2: actualExpendituresAmount2CY2,
                    actualExpendituresAmount3CY1: actualExpendituresAmount3CY1,
                    actualExpendituresAmount3CY2: actualExpendituresAmount3CY2,
                    actualExpendituresAmountTotalCY1:
                        actualExpendituresAmountTotalCY1,
                    actualExpendituresAmountTotalCY2:
                        actualExpendituresAmountTotalCY2,
                    governanceOwnedFacilities1: governanceOwnedFacilities1,
                    governanceOwnedFacilities2: governanceOwnedFacilities2,
                    governanceOwnedFacilities3: governanceOwnedFacilities3,
                    governanceOwnedFacilities4: governanceOwnedFacilities4,
                    governanceOwnedFacilities5: governanceOwnedFacilities5,
                    governanceOwnedFacilities6: governanceOwnedFacilities6,
                    governanceOwnedFacilities7: governanceOwnedFacilities7,
                    governanceOwnedFacilities8: governanceOwnedFacilities8,
                    governanceOwnedFacilities8StateOwnership:
                        governanceOwnedFacilities8StateOwnership,
                    governanceOwnedFacilities9: governanceOwnedFacilities9,
                    governanceOwnedFacilities9StateOwnership:
                        governanceOwnedFacilities9StateOwnership,
                    governanceOwnedFacilities10: governanceOwnedFacilities10,
                    governanceOwnedFacilities11: governanceOwnedFacilities11,
                    governanceOwnedFacilities12: governanceOwnedFacilities12,
                    governanceOwnedFacilities12Specify:
                        governanceOwnedFacilities12Specify,
                    barangayGovSupportOrgNum1: barangayGovSupportOrgNum1,
                    barangayGovSupportOrgNum2: barangayGovSupportOrgNum2,
                    barangayGovSupportOrgNum3: barangayGovSupportOrgNum3,
                    barangayGovSupportOrgNum4: barangayGovSupportOrgNum4,
                    barangayGovSupportOrgNum5: barangayGovSupportOrgNum5,
                    barangayGovSupportOrgNum6: barangayGovSupportOrgNum6,
                    barangayGovSupportOrgNum7: barangayGovSupportOrgNum7,
                    barangayGovSupportOrgNum7Specify:
                        barangayGovSupportOrgNum7Specify,
                    barangayGovSupportOrgNum8: barangayGovSupportOrgNum8,
                    barangayGovSupportOrgNum8Specify:
                        barangayGovSupportOrgNum8Specify,
                    barangayGovSupportOrgNum9: barangayGovSupportOrgNum9,
                    barangayGovSupportOrgNum10: barangayGovSupportOrgNum10,
                    barangayGovSupportOrgNum11: barangayGovSupportOrgNum11,
                    barangayGovSupportOrgNum12: barangayGovSupportOrgNum12,
                    signatureOverPrintedName: signatureOverPrintedName,
                    position: position,
                    date1: date1,
                    barangayCaptain: barangayCaptain,
                    date2: date2,
                },
                {
                    where: {
                        barangayId: user.barangayId,
                        typeOfDocument: "Saved",
                    },
                }
            );
        }
    });

    res.json("SUCCESS");
};

const checkSubmittedBarangayProfile = async (req, res) => {
    // const typeOfDocumentId = await TypeOfDocument.findOne({
    //     where: { barangayId: user.barangayId },
    // });

    const user = res.locals.user;

    const { yearSubmitted } = req.body;

    const brgyProfileShortened = await Submission.findOne({
        attributes: ["yearSubmitted"],
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearSubmitted,
        },
    });

    const isSubmitted = brgyProfileShortened?.yearSubmitted == yearSubmitted;

    res.json(isSubmitted);
};

// const getSubmittedBarangayProfilePageYear = async (req, res) => {
//     const user = res.locals.user;

//     const shortenedBarangayProfile = await ShortenedBarangayProfile.findAll({
//         attributes: ["yearSubmitted"],
//         where: {
//             barangayId: user.barangayId,
//             typeOfDocument: "Submitted",
//         },
//     });

//     res.json(shortenedBarangayProfile);
// };

const getSubmittedBarangayProfilePageYear = async (req, res) => {
    const user = res.locals.user;

    const { yearSubmitted } = req.body;

    const shortenedBarangayProfile = await ShortenedBarangayProfile.findOne({
        attributes: ["yearSubmitted"],
        where: {
            barangayId: user.barangayId,
            typeOfDocument: "Submitted",
            yearSubmitted: yearSubmitted,
        },
    });

    const isSubmitted =
        shortenedBarangayProfile?.yearSubmitted == yearSubmitted;

    res.json(isSubmitted);
};

const getShortenedBarangayProfileUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearSubmitted } = req.body;

    const submissionBarangayProfileUrl = await ShortenedSubmission.findOne({
        attributes: ["documentName", "submissionBarangayProfileUrl"],
        where: { barangayId: user.barangayId, yearSubmitted: yearSubmitted },
    });

    res.json(submissionBarangayProfileUrl);
};

const getAllUpdatedBarangayProfile = async (req, res) => {
    const updatedBarangayProfile = await Submission.findAll({
        where: {
            documentName: {
                [Op.ne]: null,
            },
        },
        // group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });

    return res.json(updatedBarangayProfile);
};

const getAllEncodedAndUpdatedBarangayProfile = async (req, res) => {
    const barangayProfile = await ShortenedSubmission.findAll({
        include: [
            {
                model: Submission,
                required: true,
            },
        ],
        group: ["barangayName", "districtName"],
        order: [["barangayName", "ASC"]],
    });

    return res.json(barangayProfile);
};

const getAllUpdatedBarangayProfileYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const yearSubmitted = await Submission.findAll({
        attributes: ["yearSubmitted"],
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    return res.json(yearSubmitted);
};

const getAllSubmissionYearSubmitted = async (req, res) => {
    const { barangayId } = req.body;

    const actualWasteYearSubmitted = await ActualWastes.findAll({
        attributes: ["yearSubmitted"],
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    const yearSubmitted = await Submission.findAll({
        attributes: ["yearSubmitted"],
        where: { barangayId: barangayId },
        order: [["yearSubmitted", "ASC"]],
    });

    const yearSubmittedArray = yearSubmitted.map((data) => {
        return data.yearSubmitted;
    });
    const actualWasteYearSubmittedArray = actualWasteYearSubmitted.map(
        (data) => {
            return data.yearSubmitted;
        }
    );

    const filteredYearSubmitted = yearSubmittedArray.filter(
        (el) => !actualWasteYearSubmittedArray.includes(el)
    );

    return res.json({ filteredYearSubmitted });
};

const getPopulationCount = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const populationCount = await Submission.findOne({
        attributes: ["populationCount"],
        where: { barangayId: barangayId, yearSubmitted: yearSubmitted },
    });

    return res.json(populationCount);
};

const getSubmissionWithYearSubmitted = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const submission = await Submission.findOne({
        where: { barangayId: barangayId, yearSubmitted: yearSubmitted },
    });

    return res.json(submission);
};

const getAllUpdatedUserBarangayProfileYearSubmitted = async (req, res) => {
    const user = res.locals.user;

    const submission = await Submission.findAll({
        attributes: ["yearSubmitted"],
        order: [["yearSubmitted", "ASC"]],
        where: {
            barangayId: user.barangayId,
        },
    });

    return res.json(submission);
};

const getEncodedBarangayProfleUrl = async (req, res) => {
    const user = res.locals.user;
    const encodedBarangayProfileUrl = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
        },
    });
    return res.json(encodedBarangayProfileUrl);
};

const getUpdatedBarangayProfileUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const selectedBarangay = await ActionSelectedBarangay.findOne({
        where: { userId: user.id },
    });

    const updatedBarangayProfileUrl = await Submission.findOne({
        where: {
            barangayId: selectedBarangay.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(updatedBarangayProfileUrl);
};

const getUpdatedBarangayProfileUrl2 = async (req, res) => {
    const { barangayId, yearSubmitted } = req.body;

    const updatedBarangayProfileUrl = await Submission.findOne({
        where: {
            barangayId: barangayId,
            yearSubmitted: yearSubmitted,
        },
    });

    return res.json(updatedBarangayProfileUrl);
};

const getUpdatedUserBarangayProfileUrl = async (req, res) => {
    const user = res.locals.user;
    const { yearOfSubmission } = req.body;

    const updatedBarangayProfileUrl = await Submission.findOne({
        where: {
            barangayId: user.barangayId,
            yearSubmitted: yearOfSubmission,
        },
    });

    return res.json(updatedBarangayProfileUrl);
};

router.get(
    "/getShortenedBarangayProfile",
    validateUser,
    validate,
    getShortenedBarangayProfile
);
router.get(
    "/getAllShortenedBarangayProfile",
    validateUser,
    validate,
    getAllShortenedBarangayProfile
);
router.put("/updateAction", validateUser, validate, updateAction);
router.put(
    "/updateShortenedBarangayProfile",
    validateUser,
    validate,
    updateShortenedBarangayProfile
);
router.post(
    "/createShortenedBarangayProfile",
    validateUser,
    validate,
    createShortenedBarangayProfile
);
router.post(
    "/updateSubmittedShortenedBarangayProfile",
    validateUser,
    validate,
    updateSubmittedShortenedBarangayProfile
);
router.post(
    "/submitShortenedBarangayProfile",
    validateUser,
    validate,
    submitShortenedBarangayProfile
);
router.put(
    "/updateTypeOfDocument",
    validateUser,
    validate,
    updateTypeOfDocument
);
router.get(
    "/getSavedBarangayProfile",
    validateUser,
    validate,
    getSavedBarangayProfile
);
router.post(
    "/checkSubmittedBarangayProfile",
    validateUser,
    validate,
    checkSubmittedBarangayProfile
);
router.post(
    "/getSubmittedBarangayProfilePageYear",
    validateUser,
    validate,
    getSubmittedBarangayProfilePageYear
);
router.post(
    "/getAllSubmissionYearSubmitted",
    validateUser,
    validate,
    getAllSubmissionYearSubmitted
);
router.post(
    "/getShortenedBarangayProfileUrl",
    validateUser,
    validate,
    getShortenedBarangayProfileUrl
);
router.get(
    "/getAllUpdatedBarangayProfile",
    validateUser,
    validate,
    getAllUpdatedBarangayProfile
);
router.get(
    "/getAllEncodedAndUpdatedBarangayProfile",
    validateUser,
    validate,
    getAllEncodedAndUpdatedBarangayProfile
);
router.post(
    "/getAllUpdatedBarangayProfileYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedBarangayProfileYearSubmitted
);
router.post(
    "/getSubmissionWithYearSubmitted",
    validateUser,
    validate,
    getSubmissionWithYearSubmitted
);
router.get(
    "/getAllUpdatedUserBarangayProfileYearSubmitted",
    validateUser,
    validate,
    getAllUpdatedUserBarangayProfileYearSubmitted
);
router.post("/getAllSubmission", validateUser, validate, getAllSubmission);
router.get("/getAllSubmissions", validateUser, validate, getAllSubmissions);
router.get(
    "/getAllSubmissionUser",
    validateUser,
    validate,
    getAllSubmissionUser
);
router.post(
    "/getUpdatedBarangayProfileUrl",
    validateUser,
    validate,
    getUpdatedBarangayProfileUrl
);
router.post(
    "/getUpdatedBarangayProfileUrl2",
    validateUser,
    validate,
    getUpdatedBarangayProfileUrl2
);
router.post("/getPopulationCount", validateUser, validate, getPopulationCount);
router.post(
    "/getUpdatedUserBarangayProfileUrl",
    validateUser,
    validate,
    getUpdatedUserBarangayProfileUrl
);
router.get(
    "/getEncodedBarangayProfleUrl",
    validateUser,
    validate,
    getEncodedBarangayProfleUrl
);

module.exports = router;
