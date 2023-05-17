import React, { useEffect } from "react";
import useSWR from "swr";
import { Icon } from "@iconify/react";

function ShortenedBarangayProfilePage3({
    values,
    totalPopulationCount,
    setTotalPopulationCount,
    handleChange,
    handleChangeBoolean,
}) {
    const { data, error, isValidating } = useSWR(
        "http://localhost:3001/user/me"
    );

    const sourceIncomeAmountTotalCY1 =
        Number(values?.sourceIncomeAmount1CY1) +
        Number(values?.sourceIncomeAmount2CY1) +
        Number(values?.sourceIncomeAmount3CY1) +
        Number(values?.sourceIncomeAmount4CY1) +
        Number(values?.sourceIncomeAmount5CY1) +
        Number(values?.sourceIncomeAmount6CY1) +
        Number(values?.sourceIncomeAmount7CY1) +
        Number(values?.sourceIncomeAmount8CY1) +
        Number(values?.sourceIncomeAmount9CY1) +
        Number(values?.sourceIncomeAmount10CY1);

    const sourceIncomeAmountTotalCY2 =
        Number(values?.sourceIncomeAmount1CY2) +
        Number(values?.sourceIncomeAmount2CY2) +
        Number(values?.sourceIncomeAmount3CY2) +
        Number(values?.sourceIncomeAmount4CY2) +
        Number(values?.sourceIncomeAmount5CY2) +
        Number(values?.sourceIncomeAmount6CY2) +
        Number(values?.sourceIncomeAmount7CY2) +
        Number(values?.sourceIncomeAmount8CY2) +
        Number(values?.sourceIncomeAmount9CY2) +
        Number(values?.sourceIncomeAmount10CY2);

    const actualExpendituresAmountTotalCY1 =
        Number(values?.actualExpendituresAmount1CY1) +
        Number(values?.actualExpendituresAmount2CY1) +
        Number(values?.actualExpendituresAmount3CY1);

    const actualExpendituresAmountTotalCY2 =
        Number(values?.actualExpendituresAmount1CY2) +
        Number(values?.actualExpendituresAmount2CY2) +
        Number(values?.actualExpendituresAmount3CY2);

    return (
        <div>
            <p className="mb-2 font-bold">A. Barangay Income</p>

            <table className="w-full mb-4 text-xs border">
                <thead className="font-bold text-center ">
                    <tr>
                        <th rowSpan={2}>Source of Income</th>
                        <th colSpan={2} className="w-32 border-b border-l">
                            Amount
                        </th>
                    </tr>
                    <tr>
                        <th className="border-x">
                            CY
                            <input
                                name="sourceIncomeCY1"
                                value={values?.sourceIncomeCY1}
                                type="number"
                                className="w-16 ml-1 text-center border-b border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </th>
                        <th>
                            CY
                            <input
                                name="sourceIncomeCY2"
                                value={values?.sourceIncomeCY2}
                                type="number"
                                className="w-16 ml-1 text-center border-b border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t">
                        <td className="pl-2">1. 10&#37; RPTs</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount1CY1"
                                value={values?.sourceIncomeAmount1CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount1CY2"
                                value={values?.sourceIncomeAmount1CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">2. Revenue</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount2CY1"
                                value={values?.sourceIncomeAmount2CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount2CY2"
                                value={values?.sourceIncomeAmount2CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">3. Aid to Barangay</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount3CY1"
                                value={values?.sourceIncomeAmount3CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount3CY2"
                                value={values?.sourceIncomeAmount3CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-8">a. Municipal/City</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount4CY1"
                                value={values?.sourceIncomeAmount4CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount4CY2"
                                value={values?.sourceIncomeAmount4CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-8">b. Provincial</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount5CY1"
                                value={values?.sourceIncomeAmount5CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount5CY2"
                                value={values?.sourceIncomeAmount5CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-8">c. National</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount6CY1"
                                value={values?.sourceIncomeAmount6CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount6CY2"
                                value={values?.sourceIncomeAmount6CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">4. Interest Income</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount7CY1"
                                value={values?.sourceIncomeAmount7CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount7CY2"
                                value={values?.sourceIncomeAmount7CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">5. Contribution</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount8CY1"
                                value={values?.sourceIncomeAmount8CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount8CY2"
                                value={values?.sourceIncomeAmount8CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">6. Others - Collection</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount9CY1"
                                value={values?.sourceIncomeAmount9CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount9CY2"
                                value={values?.sourceIncomeAmount9CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">7. Others - Rent Income</td>
                        <td className="border-x">
                            <input
                                name="sourceIncomeAmount10CY1"
                                value={values?.sourceIncomeAmount10CY1}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="sourceIncomeAmount10CY2"
                                value={values?.sourceIncomeAmount10CY2}
                                type="number"
                                className="w-full pr-2 text-right border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="font-bold border-t">
                        <td className="pl-8 text-center">TOTAL</td>
                        <td className="border-x">
                            <input
                                readOnly
                                name="sourceIncomeAmountTotalCY1"
                                value={sourceIncomeAmountTotalCY1}
                                type="number"
                                className="w-full pr-2 text-right border-black cursor-default focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                readOnly
                                name="sourceIncomeAmountTotalCY2"
                                value={sourceIncomeAmountTotalCY2}
                                type="number"
                                className="w-full pr-2 text-right border-black cursor-default focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <p className="mb-2 font-bold">B. Barangay Actual Expenditures</p>
            <table className="w-full text-xs border">
                <thead className="font-bold text-center">
                    <tr>
                        <th rowSpan={2} className="border-r">
                            Actual Expenditures
                        </th>
                        <th colSpan={2} className="border-b">
                            Amount
                        </th>
                    </tr>
                    <tr>
                        <th className="border-r">
                            CY
                            <input
                                name="actualExpendituresCY1"
                                value={values?.actualExpendituresCY1}
                                type="number"
                                className="w-16 ml-1 text-center border-b border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </th>
                        <th>
                            CY
                            <input
                                name="actualExpendituresCY2"
                                value={values?.actualExpendituresCY2}
                                type="number"
                                className="w-16 ml-1 text-center border-b border-black focus:outline-none"
                                onChange={handleChange}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t">
                        <td className="pl-2">1. Personal Services</td>
                        <td className="border-x">
                            <input
                                name="actualExpendituresAmount1CY1"
                                value={values?.actualExpendituresAmount1CY1}
                                type="number"
                                className="w-full pr-2 text-right focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="actualExpendituresAmount1CY2"
                                value={values?.actualExpendituresAmount1CY2}
                                type="number"
                                className="w-full pr-2 text-right focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">
                            2. Maintenance &amp; other Operating Expenses
                        </td>
                        <td className="border-x">
                            <input
                                name="actualExpendituresAmount2CY1"
                                value={values?.actualExpendituresAmount2CY1}
                                type="number"
                                className="w-full pr-2 text-right focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="actualExpendituresAmount2CY2"
                                value={values?.actualExpendituresAmount2CY2}
                                type="number"
                                className="w-full pr-2 text-right focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2">3. Capital Outlay</td>
                        <td className="border-x">
                            <input
                                name="actualExpendituresAmount3CY1"
                                value={values?.actualExpendituresAmount3CY1}
                                type="number"
                                className="w-full pr-2 text-right focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="actualExpendituresAmount3CY2"
                                value={values?.actualExpendituresAmount3CY2}
                                type="number"
                                className="w-full pr-2 text-right focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="font-bold border-t">
                        <td className="text-center">TOTAL</td>
                        <td className="border-x">
                            <input
                                readOnly
                                name="actualExpendituresAmountTotalCY1"
                                value={actualExpendituresAmountTotalCY1}
                                type="number"
                                className="w-full pr-2 text-right cursor-default focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                readOnly
                                name="actualExpendituresAmountTotalCY2"
                                value={actualExpendituresAmountTotalCY2}
                                type="number"
                                className="w-full pr-2 text-right cursor-default focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <p className="mt-4 mb-2 font-bold">
                C. Governance Owned Facilities &#40;Pls. Check&#41;
            </p>
            <div>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities1"
                        value={values?.governanceOwnedFacilities1}
                        checked={values?.governanceOwnedFacilities1}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities1
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Barangay Hall/Multipurpose Center
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities2"
                        value={values?.governanceOwnedFacilities2}
                        checked={values?.governanceOwnedFacilities2}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities2
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Brgy. Tanod Outpost
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities3"
                        value={values?.governanceOwnedFacilities3}
                        checked={values?.governanceOwnedFacilities3}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities3
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Barangay Public Market/Talipapa
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities4"
                        value={values?.governanceOwnedFacilities4}
                        checked={values?.governanceOwnedFacilities4}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities4
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Multipurpose Pavement
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities5"
                        value={values?.governanceOwnedFacilities5}
                        checked={values?.governanceOwnedFacilities5}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities5
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Barangay Library/Reading Center
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities6"
                        value={values?.governanceOwnedFacilities6}
                        checked={values?.governanceOwnedFacilities6}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities6
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Agricultural Equipment &#40;i,e., baby cano, etc.&#41;
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities7"
                        value={values?.governanceOwnedFacilities7}
                        checked={values?.governanceOwnedFacilities7}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities7
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Agricultural Produce Collection and Buying Station
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities8"
                        value={values?.governanceOwnedFacilities8}
                        checked={values?.governanceOwnedFacilities8}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities8
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Public Cemetery &#40;state ownership&#41;
                    <input
                        name="governanceOwnedFacilities8StateOwnership"
                        value={values?.governanceOwnedFacilities8StateOwnership}
                        type="text"
                        className="w-40 ml-2 border-b border-black focus:outline-none"
                        onChange={handleChange}
                    />
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities9"
                        value={values?.governanceOwnedFacilities9}
                        checked={values?.governanceOwnedFacilities9}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities9
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Private Ownership &#40;state ownership&#41;
                    <input
                        name="governanceOwnedFacilities9StateOwnership"
                        value={values?.governanceOwnedFacilities9StateOwnership}
                        type="text"
                        className="w-40 ml-2 border-b border-black focus:outline-none"
                        onChange={handleChange}
                    />
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities10"
                        value={values?.governanceOwnedFacilities10}
                        checked={values?.governanceOwnedFacilities10}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities10
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Day Care Center
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities11"
                        value={values?.governanceOwnedFacilities11}
                        checked={values?.governanceOwnedFacilities11}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities11
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Covered Gym
                </p>
                <p className="flex items-center">
                    <input
                        name="governanceOwnedFacilities12"
                        value={values?.governanceOwnedFacilities12}
                        checked={values?.governanceOwnedFacilities12}
                        type="checkbox"
                        className={`w-4 h-4 border-2 rounded-sm appearance-none focus:outline-none ${
                            values?.governanceOwnedFacilities12
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-400"
                        }`}
                        onChange={handleChangeBoolean}
                    />
                    <Icon
                        onClick={handleChangeBoolean}
                        icon="ic:baseline-check"
                        className="relative pointer-events-none w-4 h-4 mr-[-12px] text-white select-none right-4"
                    />
                    Others, specify:
                    <input
                        name="governanceOwnedFacilities12Specify"
                        value={values?.governanceOwnedFacilities12Specify}
                        type="text"
                        className="ml-2 border-b border-black w-52 focus:outline-none"
                        onChange={handleChange}
                    />
                </p>
            </div>

            <p className="mt-4 mb-2 font-bold">
                D. Barangay Government Support Organizations
            </p>
            <table className="w-full text-xs border">
                <thead className="font-bold text-center">
                    <tr>
                        <th className="w-1/2 border-r">Name</th>
                        <th>Number of Members</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t">
                        <td className="pl-2 border-r">Lupong Tagapamayapa</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum1"
                                value={values?.barangayGovSupportOrgNum1}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">
                            Barangay Development Council
                        </td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum2"
                                value={values?.barangayGovSupportOrgNum2}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">
                            Brgy. Disaster Coordinating Council
                        </td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum3"
                                value={values?.barangayGovSupportOrgNum3}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">Sangguniang Kabataan</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum4"
                                value={values?.barangayGovSupportOrgNum4}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">Tanod Brigade</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum5"
                                value={values?.barangayGovSupportOrgNum5}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">Fire Brigade</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum6"
                                value={values?.barangayGovSupportOrgNum6}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">
                            NGO/PO &#40;pls. Specify&#41;
                            <input
                                name="barangayGovSupportOrgNum7Specify"
                                value={values?.barangayGovSupportOrgNum7Specify}
                                type="text"
                                className="w-full focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum7"
                                value={values?.barangayGovSupportOrgNum7}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">
                            Others &#40;specify&#41;
                            <input
                                name="barangayGovSupportOrgNum8Specify"
                                value={values?.barangayGovSupportOrgNum8Specify}
                                type="text"
                                className="w-full focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum8"
                                value={values?.barangayGovSupportOrgNum8}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">BNC</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum9"
                                value={values?.barangayGovSupportOrgNum9}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">BCPC</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum10"
                                value={values?.barangayGovSupportOrgNum10}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">BADAC</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum11"
                                value={values?.barangayGovSupportOrgNum11}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr className="border-t">
                        <td className="pl-2 border-r">BPOC</td>
                        <td>
                            <input
                                name="barangayGovSupportOrgNum12"
                                value={values?.barangayGovSupportOrgNum12}
                                type="number"
                                className="w-full text-center focus:outline-none"
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ShortenedBarangayProfilePage3;
