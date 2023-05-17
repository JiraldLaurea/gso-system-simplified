import React, { useEffect } from "react";
import useSWR from "swr";

function ShortenedBarangayProfilePage2({
    values,
    totalPopulationCount,
    setTotalPopulationCount,
    handleChange,
}) {
    const { data, error, isValidating } = useSWR(
        "http://localhost:3001/user/me"
    );
    const childTotalUnderOneYearNum =
        Number(values?.childSUUnderOneYearNum) +
        Number(values?.childModUUnderOneYearNum) +
        Number(values?.childMildUUnderOneYearNum);

    const childTotalUnderOneYearPercent =
        Number(
            values?.childSUUnderOneYearPercent?.toString().replace(/%/g, "")
        ) +
        Number(
            values?.childModUUnderOneYearPercent?.toString().replace(/%/g, "")
        ) +
        Number(
            values?.childMildUUnderOneYearPercent?.toString().replace(/%/g, "")
        );

    const childTotalOneToFourYearsNum =
        Number(values?.childSUOneToFourYearsNum) +
        Number(values?.childModUOneToFourYearsNum) +
        Number(values?.childMildUOneToFourYearsNum);

    const childTotalOneToFourYearsPercent =
        Number(
            values.childSUOneToFourYearsPercent?.toString().replace(/%/g, "")
        ) +
        Number(
            values.childModUOneToFourYearsPercent?.toString().replace(/%/g, "")
        ) +
        Number(
            values.childMildUOneToFourYearsPercent?.toString().replace(/%/g, "")
        );

    const childTotalFiveToSixYearsNum =
        Number(values?.childSUFiveToSixYearsNum) +
        Number(values?.childModUFiveToSixYearsNum) +
        Number(values?.childMildUFiveToSixYearsNum);

    const childTotalFiveToSixYearsPercent =
        Number(
            values.childSUFiveToSixYearsPercent?.toString().replace(/%/g, "")
        ) +
        Number(
            values.childModUFiveToSixYearsPercent?.toString().replace(/%/g, "")
        ) +
        Number(
            values.childMildUFiveToSixYearsPercent?.toString().replace(/%/g, "")
        );

    const childTotalTotalNum =
        Number(values?.childSUTotalNum) +
        Number(values?.childModUTotalNum) +
        Number(values?.childMildUTotalNum);

    const childTotalPercent =
        Number(values.childSUPercent?.toString().replace(/%/g, "")) +
        Number(values.childModUPercent?.toString().replace(/%/g, "")) +
        Number(values.childMildUPercent?.toString().replace(/%/g, ""));

    return (
        <div>
            <div className="font-bold">
                <p>A. Health</p>
                <p className="ml-4">A.1 Health Status</p>
                <table className="w-full max-w-xl ml-4 text-xs font-normal">
                    <tbody>
                        <tr>
                            <td>A.1.1 Total Number of Births</td>
                            <td>
                                <input
                                    name="totalNumBirths"
                                    value={values?.totalNumBirths}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                A.1.2 Total Number of Deaths &#40;All
                                Causes&#41;
                            </td>
                            <td>
                                <input
                                    name="totalNumDeathsAllCauses"
                                    value={values?.totalNumDeathsAllCauses}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>A.1.3 Total Number of Still Birth</td>
                            <td>
                                <input
                                    name="totalNumStillBirth"
                                    value={values?.totalNumStillBirth}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>A.1.4 Total Number of Infant Deaths</td>
                            <td>
                                <input
                                    name="totalNumInfantDeaths"
                                    value={values?.totalNumInfantDeaths}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                A.1.5 Total Number of Early Neonatal Deaths
                                &#40;0-6 days&#41;
                            </td>
                            <td>
                                <input
                                    name="totalNumEarlyNeonatalDeaths"
                                    value={values?.totalNumEarlyNeonatalDeaths}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-4 font-bold">
                <span className="mr-4">
                    A.1.6 Five Leading Causes of Mortality, CY
                    <input
                        name="fiveLeadingCausesMortalityCY"
                        value={values?.fiveLeadingCausesMortalityCY}
                        type="text"
                        className="w-10 font-normal text-center border-b border-black focus:outline-none"
                        onChange={handleChange}
                    />
                </span>
                <span>
                    A.1.7 Five Leading Morbidity, CY
                    <input
                        name="fiveLeadingMorbidityCY"
                        value={values?.fiveLeadingMorbidityCY}
                        type="text"
                        className="w-10 font-normal text-center border-b border-black focus:outline-none"
                        onChange={handleChange}
                    />
                </span>
            </div>

            <div className="flex justify-between mt-4">
                <table className="w-full max-w-xs text-xs border">
                    <thead className="font-bol">
                        <tr>
                            <th className="border-r">Causes</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="px-2 border-r">
                                Cardiovascular Disorder
                            </td>
                            <td>
                                <input
                                    name="causeCardiovascularDisorder"
                                    value={values?.causeCardiovascularDisorder}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">Cancer</td>
                            <td>
                                <input
                                    name="causeCancer"
                                    value={values?.causeCancer}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">Old age</td>
                            <td>
                                <input
                                    name="causeOldAge"
                                    value={values?.causeOldAge}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">Kidney Failure</td>
                            <td>
                                <input
                                    name="causeKidneyFailure"
                                    value={values?.causeKidneyFailure}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">TB</td>
                            <td>
                                <input
                                    name="causeTB"
                                    value={values?.causeTB}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="w-full max-w-xs text-xs border">
                    <thead className="font-bol">
                        <tr>
                            <th className="border-r">Causes</th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="px-2 border-r">Fever/Flu</td>
                            <td>
                                <input
                                    name="causeFeverFlu"
                                    value={values?.causeFeverFlu}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">Cough</td>
                            <td>
                                <input
                                    name="causeCough"
                                    value={values?.causeCough}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">Asthma</td>
                            <td>
                                <input
                                    name="causeAsthma"
                                    value={values?.causeAsthma}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">Hypertension</td>
                            <td>
                                <input
                                    name="causeHypertension"
                                    value={values?.causeHypertension}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="px-2 border-r">PTB</td>
                            <td>
                                <input
                                    name="causePTB"
                                    value={values?.causePTB}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between mt-4 mb-2 font-bold">
                <div className="w-full max-w-xs">
                    <div className="mb-2">
                        <p>
                            A.1.9 Five Leading Causes of Infant Mortality,&nbsp;
                            CY
                            <input
                                name="infantLeadingCausesMortalityCY"
                                value={values?.infantLeadingCausesMortalityCY}
                                type="number"
                                className="w-16 font-normal text-center border-b border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <table className="w-full text-xs border ">
                        <thead className="font-bold">
                            <tr>
                                <th className="border-r">Causes</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody className="font-normal">
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="infantMortalityCause1"
                                        value={values?.infantMortalityCause1}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="infantMortalityNum1"
                                        value={values?.infantMortalityNum1}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="infantMortalityCause2"
                                        value={values?.infantMortalityCause2}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="infantMortalityNum2"
                                        value={values?.infantMortalityNum2}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="infantMortalityCause3"
                                        value={values?.infantMortalityCause3}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="infantMortalityNum3"
                                        value={values?.infantMortalityNum3}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full max-w-xs">
                    <div className="mb-2">
                        <p>
                            A.1.10 Five Leading Causes of Infant Morbidity, CY
                            <input
                                name="infantLeadingCausesMorbidityCY"
                                value={values?.infantLeadingCausesMorbidityCY}
                                type="number"
                                className="w-16 font-normal text-center border-b border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <table className="w-full text-xs border">
                        <thead className="font-bold">
                            <tr>
                                <th className="border-r">Causes</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody className="font-normal">
                            <tr className="border-t">
                                <td className="pl-2 border-r">Fever</td>
                                <td>
                                    <input
                                        name="infantMorbidityFeverNum"
                                        value={values?.infantMorbidityFeverNum}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="pl-2 border-r">Cough</td>
                                <td>
                                    <input
                                        name="infantMorbidityCoughNum"
                                        value={values?.infantMorbidityCoughNum}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="pl-2 border-r">Malnutrition</td>
                                <td>
                                    <input
                                        name="infantMorbidityMalnutritionNum"
                                        value={
                                            values?.infantMorbidityMalnutritionNum
                                        }
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="pl-2 border-r">Diarrhea</td>
                                <td>
                                    <input
                                        name="infantMorbidityDiarrheaNum"
                                        value={
                                            values?.infantMorbidityDiarrheaNum
                                        }
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="pl-2 border-r">
                                    T/C primary complex
                                </td>
                                <td>
                                    <input
                                        name="infantMorbidityTCPrimaryComplexNum"
                                        value={
                                            values?.infantMorbidityTCPrimaryComplexNum
                                        }
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex justify-between">
                <div className="max-w-xs">
                    <p className="mb-2 font-bold">
                        A.1.11 Five Leading Causes of Early Neonatal Deaths
                        &#40;0-6 days&#41;, CY
                        <input
                            name="causeEarlyNeonatalDeathsCY"
                            value={values?.causeEarlyNeonatalDeathsCY}
                            type="number"
                            className="w-16 font-normal text-center border-b border-black focus:outline-none"
                            onChange={handleChange}
                        />
                    </p>
                    <table className="w-full text-xs border">
                        <thead className="font-bold">
                            <tr>
                                <th className="border-r">Causes</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="causeEarlyNeonatalCause1"
                                        value={values?.causeEarlyNeonatalCause1}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="causeEarlyNeonatalNum1"
                                        value={values?.causeEarlyNeonatalNum1}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="causeEarlyNeonatalCause2"
                                        value={values?.causeEarlyNeonatalCause2}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="causeEarlyNeonatalNum2"
                                        value={values?.causeEarlyNeonatalNum2}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="causeEarlyNeonatalCause3"
                                        value={values?.causeEarlyNeonatalCause3}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="causeEarlyNeonatalNum3"
                                        value={values?.causeEarlyNeonatalNum3}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full max-w-xs">
                    <p className="font-bold mb-7">
                        A.1.12 Causes of Maternal Deaths, CY
                        <input
                            name="causeMaternalDeathsCY"
                            value={values?.causeMaternalDeathsCY}
                            type="number"
                            className="w-16 font-normal text-center border-b border-black focus:outline-none"
                            onChange={handleChange}
                        />
                    </p>
                    <table className="w-full text-xs border">
                        <thead className="font-bold">
                            <tr>
                                <th className="border-r">Causes</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="causeMaternalCause1"
                                        value={values?.causeMaternalCause1}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="causeMaternalNum1"
                                        value={values?.causeMaternalNum1}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="causeMaternalCause2"
                                        value={values?.causeMaternalCause2}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="causeMaternalNum2"
                                        value={values?.causeMaternalNum2}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="border-t">
                                <td className="border-r">
                                    <input
                                        name="causeMaternalCause3"
                                        value={values?.causeMaternalCause3}
                                        type="text"
                                        className="w-full pl-2 focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="causeMaternalNum3"
                                        value={values?.causeMaternalNum3}
                                        type="number"
                                        className="w-full text-center focus:outline-none"
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <p className="mt-4 font-bold">
                    A.2 Health Facilities and Services
                </p>
                <p className="mb-2 ml-4 font-bold">
                    A.2.1 Medical/Health Facilities, Services and Personnel
                </p>
                <table className="w-full text-xs border">
                    <thead className="font-bold">
                        <tr>
                            <th rowSpan={2} className="w-16 border-r">
                                Name of Health/Clinics/Hospital
                            </th>
                            <th colSpan={2} className="border-b ">
                                Number
                            </th>
                            <th rowSpan={2} className="w-20 border-x">
                                Type of Medical Health Personnel
                            </th>
                            <th colSpan={2} className="w-16 border-b border-r">
                                Number
                            </th>
                            <th colSpan={2} className="">
                                Services Rendered
                            </th>
                        </tr>
                        <tr>
                            <th className="w-12 border-r">Gov't</th>
                            <th className="w-12">Private</th>
                            <th className="w-12">Gov't</th>
                            <th className="w-12 border-x">Private</th>
                            <th className="border-r ">Type</th>
                            <th>Frequency</th>
                        </tr>
                    </thead>
                    <tbody className="font-normal">
                        <tr className="border-t">
                            <td>
                                <input
                                    name="healthClinicsHospitalName1"
                                    value={values?.healthClinicsHospitalName1}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="healthClinicsHospitalNumGov1"
                                    value={values?.healthClinicsHospitalNumGov1}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="healthClinicsHospitalNumPrivate1"
                                    value={
                                        values?.healthClinicsHospitalNumPrivate1
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-x">Doctor</td>
                            <td>
                                <input
                                    name="medicalHealthPersonnelDoctorNumGov"
                                    value={
                                        values?.medicalHealthPersonnelDoctorNumGov
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="medicalHealthPersonnelDoctorNumPrivate"
                                    value={
                                        values?.medicalHealthPersonnelDoctorNumPrivate
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-r">
                                <input
                                    name="medicalServiceType1"
                                    value={values?.medicalServiceType1}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="medicalServiceFrequency1"
                                    value={values?.medicalServiceFrequency1}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td>
                                <input
                                    name="healthClinicsHospitalName2"
                                    value={values?.healthClinicsHospitalName2}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="healthClinicsHospitalNumGov2"
                                    value={values?.healthClinicsHospitalNumGov2}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="healthClinicsHospitalNumPrivate2"
                                    value={
                                        values?.healthClinicsHospitalNumPrivate2
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-x">Nurse</td>
                            <td>
                                <input
                                    name="medicalHealthPersonnelNurseNumGov"
                                    value={
                                        values?.medicalHealthPersonnelNurseNumGov
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="medicalHealthPersonnelNurseNumPrivate"
                                    value={
                                        values?.medicalHealthPersonnelNurseNumPrivate
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-r">
                                <input
                                    name="medicalServiceType2"
                                    value={values?.medicalServiceType2}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="medicalServiceFrequency2"
                                    value={values?.medicalServiceFrequency2}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td>
                                <input
                                    name="healthClinicsHospitalName3"
                                    value={values?.healthClinicsHospitalName3}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="healthClinicsHospitalNumGov3"
                                    value={values?.healthClinicsHospitalNumGov3}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="healthClinicsHospitalNumPrivate3"
                                    value={
                                        values?.healthClinicsHospitalNumPrivate3
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-x">Midwife</td>
                            <td>
                                <input
                                    name="medicalHealthPersonnelMidwifeNumGov"
                                    value={
                                        values?.medicalHealthPersonnelMidwifeNumGov
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="medicalHealthPersonnelMidwifeNumPrivate"
                                    value={
                                        values?.medicalHealthPersonnelMidwifeNumPrivate
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-r">
                                <input
                                    name="medicalServiceType3"
                                    value={values?.medicalServiceType3}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="medicalServiceFrequency3"
                                    value={values?.medicalServiceFrequency3}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td>
                                <input
                                    name="healthClinicsHospitalName4"
                                    value={values?.healthClinicsHospitalName4}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="healthClinicsHospitalNumGov4"
                                    value={values?.healthClinicsHospitalNumGov4}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="healthClinicsHospitalNumPrivate4"
                                    value={
                                        values?.healthClinicsHospitalNumPrivate4
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-x">BHW</td>
                            <td>
                                <input
                                    name="medicalHealthPersonnelBHWNumGov"
                                    value={
                                        values?.medicalHealthPersonnelBHWNumGov
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="medicalHealthPersonnelBHWNumPrivate"
                                    value={
                                        values?.medicalHealthPersonnelBHWNumPrivate
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-r">
                                <input
                                    name="medicalServiceType4"
                                    value={values?.medicalServiceType4}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="medicalServiceFrequency4"
                                    value={values?.medicalServiceFrequency4}
                                    type="text"
                                    className="w-full pl-2 focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="w-full max-w-xs mt-4">
                <p className="mb-2 font-bold">
                    A.4 Disposal System of Garbage/Solid Waste
                </p>
                <table className="w-full text-xs border">
                    <thead className="font-bold text-center">
                        <tr>
                            <td className="border-r">DISPOSAL System</td>
                            <td className="w-20">No. of household</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="pl-2 border-r">
                                1. Collected by trucks &#40;Office of Public
                                Services&#41;
                            </td>
                            <td>
                                <input
                                    name="disposalTrucks"
                                    value={values?.disposalTrucks}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2 border-r">2. Open Pit</td>
                            <td>
                                <input
                                    name="disposalOpenPit"
                                    value={values?.disposalOpenPit}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2 border-r">3. Burying</td>
                            <td>
                                <input
                                    name="disposalBurying"
                                    value={values?.disposalBurying}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2 border-r">4. Burning</td>
                            <td>
                                <input
                                    name="disposalBurning"
                                    value={values?.disposalBurning}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2 border-r">5. Throw Anywhere</td>
                            <td>
                                <input
                                    name="disposalThrowAnywhere"
                                    value={values?.disposalThrowAnywhere}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2 border-r">
                                6. Others &#40;specify&#41;
                                <input
                                    name="disposalOthersSpecify"
                                    value={values?.disposalOthersSpecify}
                                    type="text"
                                    className="w-full focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="disposalOthers"
                                    value={values?.disposalOthers}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShortenedBarangayProfilePage2;
