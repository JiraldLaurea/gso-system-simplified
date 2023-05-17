import React, { useEffect } from "react";
import useSWR from "swr";

function ShortenedBarangayProfilePage1({
    values,
    totalPopulationCount,
    setTotalPopulationCount,
    handleChange,
}) {
    const totalMale =
        Number(values.male1) +
        Number(values.male2) +
        Number(values.male3) +
        Number(values.male4) +
        Number(values.male5) +
        Number(values.male6) +
        Number(values.male7) +
        Number(values.male8) +
        Number(values.male9) +
        Number(values.male10) +
        Number(values.male11) +
        Number(values.male12) +
        Number(values.male13) +
        Number(values.male14) +
        Number(values.male15) +
        Number(values.male16) +
        Number(values.male17);

    const totalFemale =
        Number(values.female1) +
        Number(values.female2) +
        Number(values.female3) +
        Number(values.female4) +
        Number(values.female5) +
        Number(values.female6) +
        Number(values.female7) +
        Number(values.female8) +
        Number(values.female9) +
        Number(values.female10) +
        Number(values.female11) +
        Number(values.female12) +
        Number(values.female13) +
        Number(values.female14) +
        Number(values.female15) +
        Number(values.female16) +
        Number(values.female17);

    useEffect(() => {
        setTotalPopulationCount(
            Number(values.totalPopulationMale) +
                Number(values.totalPopulationFemale)
        );
    }, [values]);

    const { data, error, isValidating } = useSWR(
        "http://localhost:3001/user/me"
    );

    const { data: selectedBarangay } = useSWR(
        "http://localhost:3001/barangay/getSelectedBarangay"
    );

    return (
        <div>
            <div className="font-bold text-center ">
                <p>BARANGAY PROFILE</p>
                <p>OF</p>
                <p>
                    BARANGAY{" "}
                    {data?.isAdmin
                        ? selectedBarangay?.selectedBarangay?.toUpperCase()
                        : data?.barangayName?.toUpperCase()}
                </p>
            </div>
            <div className="flex items-center justify-between mb-6 font-bold">
                <p>
                    District:{" "}
                    {data?.isAdmin
                        ? selectedBarangay?.selectedDistrict?.toUpperCase()
                        : data?.districtName?.toUpperCase()}
                </p>
            </div>
            <div className="font-bold">
                <p>I. GENERAL INFORMATION</p>
                <div>
                    <p className="ml-4">
                        C. Total Land Area:
                        <input
                            value={values.totalLandArea}
                            name="totalLandArea"
                            onChange={handleChange}
                            type="text"
                            className="w-16 ml-2 font-normal text-center border-b border-black focus:outline-none"
                        />
                        <span className="font-normal">
                            &#40; Source: City Assessor's Office/CPDO &#41;
                        </span>
                    </p>
                </div>

                <div>
                    <p className="ml-4">D. Population:</p>
                    <div className="ml-8 font-normal">
                        <span>
                            <span className="">
                                1. Total Population &#40;
                                <input
                                    value={values.totalPopulation}
                                    name="totalPopulation"
                                    onChange={handleChange}
                                    type="text"
                                    className="font-normal text-center border-b border-black w-14 focus:outline-none"
                                />
                                &#41;
                            </span>
                            <span className="ml-2">
                                Male
                                <input
                                    value={values.totalPopulationMale}
                                    name="totalPopulationMale"
                                    onChange={handleChange}
                                    type="number"
                                    className="w-20 ml-1 mr-2 font-normal text-center border-b border-black focus:outline-none"
                                />
                            </span>
                            <span>
                                Female
                                <input
                                    value={values.totalPopulationFemale}
                                    name="totalPopulationFemale"
                                    onChange={handleChange}
                                    type="number"
                                    className="w-20 ml-1 mr-2 font-normal text-center border-b border-black focus:outline-none"
                                />
                            </span>
                            <span>
                                Both Sexes
                                <input
                                    readOnly
                                    value={
                                        !null
                                            ? Number(
                                                  values.totalPopulationMale
                                              ) +
                                              Number(
                                                  values.totalPopulationFemale
                                              )
                                            : 0
                                    }
                                    name="totalPopulationBoth"
                                    type="number"
                                    className="w-20 text-center cursor-default focus:outline-none"
                                />
                            </span>
                        </span>
                        <p>2. Age and Sex Distribution:</p>
                    </div>

                    <div>
                        <table className="w-full mt-2 text-xs border">
                            <thead>
                                <tr>
                                    <th className="border-r"></th>
                                    <th>Male</th>
                                    <th className="border-x">Female</th>
                                    <th>Both Sexes</th>
                                    <th className="w-10 border-x"></th>
                                    <th>Male</th>
                                    <th className="border-x">Female</th>
                                    <th>Both Sexes</th>
                                </tr>
                            </thead>
                            <tbody className="font-normal text-center ">
                                <tr>
                                    <td className="font-bold border-t">
                                        Under 1 year
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male1}
                                            name="male1"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female1}
                                            name="female1"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                Number(values.male1) +
                                                Number(values.female1)
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t "></td>
                                    <td className="border-t border-x"></td>
                                    <td className="border-t "></td>
                                    <td className="border-t border-l"></td>
                                </tr>
                                <tr>
                                    <td className="border-t">1-4</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male2}
                                            name="male2"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female2}
                                            name="female2"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male2) +
                                                      Number(values.female2)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">40-44</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male3}
                                            name="male3"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female3}
                                            name="female3"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male3) +
                                                      Number(values.female3)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t">5-9</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male4}
                                            name="male4"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female4}
                                            name="female4"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male4) +
                                                      Number(values.female4)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">45-49</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male5}
                                            name="male5"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female5}
                                            name="female5"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male5) +
                                                      Number(values.female5)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t">10-14</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male6}
                                            name="male6"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female6}
                                            name="female6"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male6) +
                                                      Number(values.female6)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">50-54</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male7}
                                            name="male7"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female7}
                                            name="female7"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male7) +
                                                      Number(values.female7)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t">15-19</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male8}
                                            name="male8"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female8}
                                            name="female8"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male8) +
                                                      Number(values.female8)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">55-59</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male9}
                                            name="male9"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female9}
                                            name="female9"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male9) +
                                                      Number(values.female9)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t">20-24</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male10}
                                            name="male10"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female10}
                                            name="female10"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male10) +
                                                      Number(values.female10)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">60-69</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male11}
                                            name="male11"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female11}
                                            name="female11"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male11) +
                                                      Number(values.female11)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t">25-29</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male12}
                                            name="male12"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female12}
                                            name="female12"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male12) +
                                                      Number(values.female12)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">70-74</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male13}
                                            name="male13"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female13}
                                            name="female13"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male13) +
                                                      Number(values.female13)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t">30-34</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male14}
                                            name="male14"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female14}
                                            name="female14"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male14) +
                                                      Number(values.female14)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">75-79</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male15}
                                            name="male15"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female15}
                                            name="female15"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male15) +
                                                      Number(values.female15)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t">35-39</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male16}
                                            name="male16"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female16}
                                            name="female16"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male16) +
                                                      Number(values.female16)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">80-above</td>
                                    <td className="border-t border-x">
                                        <input
                                            value={values.male17}
                                            name="male17"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            value={values.female17}
                                            name="female17"
                                            onChange={handleChange}
                                            type="number"
                                            className="w-full text-center focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? Number(values.male17) +
                                                      Number(values.female17)
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t"></td>
                                    <td className="border-t border-x"></td>
                                    <td className="border-t "></td>
                                    <td className="border-t border-x"></td>
                                    <td className="font-bold border-t">
                                        Total
                                    </td>
                                    <td className="border-t border-x">
                                        <input
                                            readOnly
                                            value={!null ? totalMale : 0}
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t ">
                                        <input
                                            readOnly
                                            value={!null ? totalFemale : 0}
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                    <td className="border-t border-l">
                                        <input
                                            readOnly
                                            value={
                                                !null
                                                    ? totalMale + totalFemale
                                                    : 0
                                            }
                                            type="number"
                                            className="w-full text-center cursor-default focus:outline-none"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p className="mt-2">
                            E. Total Number of Households
                            <span className="ml-2 font-normal">
                                &#40;
                                <input
                                    value={values.totalHouseholdsCY}
                                    name="totalHouseholdsCY"
                                    onChange={handleChange}
                                    type="text"
                                    className="text-center border-b border-black w-14 focus:outline-none"
                                />
                                &#41;
                                <input
                                    value={values.totalHouseholds}
                                    name="totalHouseholds"
                                    onChange={handleChange}
                                    type="number"
                                    className="w-16 ml-2 text-center border-b border-black focus:outline-none"
                                />
                            </span>
                        </p>
                    </div>
                </div>

                <p className="mt-4">C. Industry</p>
                <div className="flex items-center ml-4">
                    <p className="">C.1 Manufacturing Industry</p>
                    <p className="ml-32">C.2 Commercial Establishment</p>
                </div>
                <table className="w-full mt-2 text-xs border">
                    <thead>
                        <tr className="text-center">
                            <th className="w-[210.05px]">Manufacturing</th>
                            <th className="border-x">Number</th>
                            <th className="border-r w-[220.59px]"></th>
                            <th>Number</th>
                        </tr>
                    </thead>
                    <tbody className="font-normal">
                        <tr className="border-t">
                            <td className="pl-2">Bakery/Bakeshop</td>
                            <td className="border-x">
                                <input
                                    name="numBakery"
                                    value={values?.numBakery}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Grocery</td>
                            <td>
                                <input
                                    name="numGrocery"
                                    value={values?.numGrocery}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Ice cream/Icedrops</td>
                            <td className="border-x">
                                <input
                                    name="numIceCream"
                                    value={values?.numIceCream}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Sari-sari store</td>
                            <td>
                                <input
                                    name="numSariSariStore"
                                    value={values?.numSariSariStore}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Native Delicacies</td>
                            <td className="border-x">
                                <input
                                    name="numNativeDelicacies"
                                    value={values?.numNativeDelicacies}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Hardware and Electrical Supplies
                            </td>
                            <td>
                                <input
                                    name="numHardwareElectrical"
                                    value={values?.numHardwareElectrical}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Sweet Preserves</td>
                            <td className="border-x">
                                <input
                                    name="numSweetPreserves"
                                    value={values?.numSweetPreserves}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Construction and Concrete Products
                            </td>
                            <td>
                                <input
                                    name="numConstructionConcrete"
                                    value={values?.numConstructionConcrete}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Sitcharon</td>
                            <td className="border-x">
                                <input
                                    name="numSitcharon"
                                    value={values?.numSitcharon}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Car/Jeep Parts and Supplies
                            </td>
                            <td>
                                <input
                                    name="numCarJeepPartsSupplies"
                                    value={values?.numCarJeepPartsSupplies}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Noodles</td>
                            <td className="border-x">
                                <input
                                    name="numNoodles"
                                    value={values?.numNoodles}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Motorcycles and Bicycles Supplies
                            </td>
                            <td>
                                <input
                                    name="numMotorcyclesBicyclesSupplies"
                                    value={
                                        values?.numMotorcyclesBicyclesSupplies
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Balut</td>
                            <td className="border-x">
                                <input
                                    name="numBalut"
                                    value={values?.numBalut}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Agricultural Equipment and Suppplies
                            </td>
                            <td>
                                <input
                                    name="numAgriculturalEquipmentSupplies"
                                    value={
                                        values?.numAgriculturalEquipmentSupplies
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Vinegar</td>
                            <td className="border-x">
                                <input
                                    name="numVinegar"
                                    value={values?.numVinegar}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                School and office Supplies
                            </td>
                            <td>
                                <input
                                    name="numSchoolOfficeSupplies"
                                    value={values?.numSchoolOfficeSupplies}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Fish Drying and Smoking</td>
                            <td className="border-x">
                                <input
                                    name="numFishDryingSmoking"
                                    value={values?.numFishDryingSmoking}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Photo Center and Supplies
                            </td>
                            <td>
                                <input
                                    name="numPhotoCenterSupplies"
                                    value={values?.numPhotoCenterSupplies}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Laboratories</td>
                            <td className="border-x">
                                <input
                                    name="numLaboratories"
                                    value={values?.numLaboratories}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Appliance</td>
                            <td>
                                <input
                                    name="numAppliance"
                                    value={values?.numAppliance}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Chemical Industries</td>
                            <td className="border-x">
                                <input
                                    name="numChemicalIndustries"
                                    value={values?.numChemicalIndustries}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Jewelry Shop and Store
                            </td>
                            <td>
                                <input
                                    name="numJewelryShopStore"
                                    value={values?.numJewelryShopStore}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Feedmills</td>
                            <td className="border-x">
                                <input
                                    name="numFeedmills"
                                    value={values?.numFeedmills}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Bags and Footwear Store
                            </td>
                            <td>
                                <input
                                    name="numBagsFootwearStore"
                                    value={values?.numBagsFootwearStore}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Garment Embroidery</td>
                            <td className="border-x">
                                <input
                                    name="numGarmentEmbroidery"
                                    value={values?.numGarmentEmbroidery}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Video, DVD Tapes Center/Internet Cafe
                            </td>
                            <td>
                                <input
                                    name="numVideoTapesCenter"
                                    value={values?.numVideoTapesCenter}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Footwear Factories</td>
                            <td className="border-x">
                                <input
                                    name="numFootwearFactories"
                                    value={values?.numFootwearFactories}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Bazaars and Gift Shop
                            </td>
                            <td>
                                <input
                                    name="numBazaars"
                                    value={values?.numBazaars}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Textile mills</td>
                            <td className="border-x">
                                <input
                                    name="numTextileMills"
                                    value={values?.numTextileMills}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Printing Press</td>
                            <td>
                                <input
                                    name="numPrintingPress"
                                    value={values?.numPrintingPress}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Bags/wallet Factories</td>
                            <td className="border-x">
                                <input
                                    name="numBagsWalletFactories"
                                    value={values?.numBagsWalletFactories}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Pawnshop</td>
                            <td>
                                <input
                                    name="numPawnshop"
                                    value={values?.numPawnshop}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">
                                Furniture Factory &#40;Wooden&#41;
                            </td>
                            <td className="border-x">
                                <input
                                    name="numFurnitureWooden"
                                    value={values?.numFurnitureWooden}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Funeral Parlor</td>
                            <td>
                                <input
                                    name="numFuneralParlor"
                                    value={values?.numFuneralParlor}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">&#40;Rattan&#41;</td>
                            <td className="border-x">
                                <input
                                    name="numFurnitureRattan"
                                    value={values?.numFurnitureRattan}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Drug Store</td>
                            <td>
                                <input
                                    name="numDrugStore"
                                    value={values?.numDrugStore}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">&#40;Bamboo&#41;</td>
                            <td className="border-x">
                                <input
                                    name="numFurnitureBamboo"
                                    value={values?.numFurnitureBamboo}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Public Market</td>
                            <td>
                                <input
                                    name="numPublicMarket"
                                    value={values?.numPublicMarket}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">&#40;Metal&#41;</td>
                            <td className="border-x">
                                <input
                                    name="numFurnitureMetal"
                                    value={values?.numFurnitureMetal}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Talipapa</td>
                            <td>
                                <input
                                    name="numTalipapa"
                                    value={values?.numTalipapa}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2"></td>
                            <td className="border-x"></td>
                            <td className="pl-2 border-r">Cinema</td>
                            <td>
                                <input
                                    name="numCinema"
                                    value={values?.numCinema}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Paper Manufacturing</td>
                            <td className="border-x">
                                <input
                                    name="numPaperManufacturing"
                                    value={values?.numPaperManufacturing}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Cockpit</td>
                            <td>
                                <input
                                    name="numCockpit"
                                    value={values?.numCockpit}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Cement Manufacturing</td>
                            <td className="border-x">
                                <input
                                    name="numCementManufacturing"
                                    value={values?.numCementManufacturing}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Financial Institutions
                            </td>
                            <td>
                                <input
                                    name="numFinancialInstitutions"
                                    value={values?.numFinancialInstitutions}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Hallow Blocks Making</td>
                            <td className="border-x">
                                <input
                                    name="numHallowBlocksMaking"
                                    value={values?.numHallowBlocksMaking}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Restaurants/Carinderia
                            </td>
                            <td>
                                <input
                                    name="numRestaurants"
                                    value={values?.numRestaurants}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Marble Craft</td>
                            <td className="border-x">
                                <input
                                    name="numMarbleCraft"
                                    value={values?.numMarbleCraft}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Real Estate</td>
                            <td>
                                <input
                                    name="numRealEstate"
                                    value={values?.numRealEstate}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Blacksmith</td>
                            <td className="border-x">
                                <input
                                    name="numBlacksmith"
                                    value={values?.numBlacksmith}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Night Club/Bar and Massage Clinics
                            </td>
                            <td>
                                <input
                                    name="numNightClubBarMassage"
                                    value={values?.numNightClubBarMassage}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Iron and Metal Craft</td>
                            <td className="border-x">
                                <input
                                    name="numIronMetalCraft"
                                    value={values?.numIronMetalCraft}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Memorial Parks</td>
                            <td>
                                <input
                                    name="numMemorialParks"
                                    value={values?.numMemorialParks}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">
                                Engineering Work Machine Shop
                            </td>
                            <td className="border-x">
                                <input
                                    name="numEngineeringWorkMachineShop"
                                    value={
                                        values?.numEngineeringWorkMachineShop
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Insurance/Dealer in Securities
                            </td>
                            <td>
                                <input
                                    name="numInsurance"
                                    value={values?.numInsurance}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">
                                Jewelry Manufacturing and Goldsmith
                            </td>
                            <td className="border-x">
                                <input
                                    name="numJewelryManufacturingGoldsmith"
                                    value={
                                        values?.numJewelryManufacturingGoldsmith
                                    }
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Gasoline Station</td>
                            <td>
                                <input
                                    name="numGasolineStation"
                                    value={values?.numGasolineStation}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Ceramics Pottery</td>
                            <td className="border-x">
                                <input
                                    name="numCeramicsPottery"
                                    value={values?.numCeramicsPottery}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                General Service/Contractors
                            </td>
                            <td>
                                <input
                                    name="numGeneralServiceContractors"
                                    value={values?.numGeneralServiceContractors}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Woodcraft</td>
                            <td className="border-x">
                                <input
                                    name="numWoodcraft"
                                    value={values?.numWoodcraft}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Arrastre Services</td>
                            <td>
                                <input
                                    name="numArrastreServices"
                                    value={values?.numArrastreServices}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Engraving</td>
                            <td className="border-x">
                                <input
                                    name="numEngraving"
                                    value={values?.numEngraving}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Body Workshop/Physical
                            </td>
                            <td>
                                <input
                                    name="numBodyWorkshop"
                                    value={values?.numBodyWorkshop}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="pl-2">Fashion Accessories</td>
                            <td className="border-x">
                                <input
                                    name="numFashionAccessories"
                                    value={values?.numFashionAccessories}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">Fitness Gym</td>
                            <td>
                                <input
                                    name="numFitnessGym"
                                    value={values?.numFitnessGym}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">
                                Others: &#40;Pls. Specify&#41;{" "}
                                <input
                                    name="numOthersManufacturingSpecify"
                                    value={
                                        values?.numOthersManufacturingSpecify
                                    }
                                    type="text"
                                    className="w-full focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="border-x">
                                <input
                                    name="numOthersManufacturing"
                                    value={values?.numOthersManufacturing}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Beauty Parlor/Barber Shop
                            </td>
                            <td>
                                <input
                                    name="numBeautyParlorBarberShop"
                                    value={values?.numBeautyParlorBarberShop}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="pl-2">Cooperative Rice Growers</td>
                            <td className="border-x">
                                <input
                                    name="numCooperativeRiceGrowers"
                                    value={values?.numCooperativeRiceGrowers}
                                    type="number"
                                    className="w-full text-center focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td className="pl-2 border-r">
                                Others: &#40;Pls. Specify&#41;
                                <input
                                    name="numOthersCommercialSpecify"
                                    value={values?.numOthersCommercialSpecify}
                                    type="text"
                                    className="w-full focus:outline-none"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    name="numOthersCommercial"
                                    value={values?.numOthersCommercial}
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

export default ShortenedBarangayProfilePage1;
