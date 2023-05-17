import React, { useEffect } from "react";
import { useAuthDispatch } from "../../context/auth";
import Axios from "axios";
import useSWR from "swr";

function viewCalajunanDB() {
    const dispatch = useAuthDispatch();

    const { data: tblCompany } = useSWR(
        "http://localhost:3001/tblCompany/getAllTblCompany"
    );

    const { data: tblConSettings } = useSWR(
        "http://localhost:3001/tblConSettings/getAllTblConSettings"
    );

    const { data: tblCustomer } = useSWR(
        "http://localhost:3001/tblCustomer/getAllTblCustomer"
    );

    const { data: tblProducts } = useSWR(
        "http://localhost:3001/tblProducts/getAllTblProducts"
    );

    const { data: tblTransaction } = useSWR(
        "http://localhost:3001/tblTransaction/getAllTblTransaction"
    );

    const { data: tblTruckDetails } = useSWR(
        "http://localhost:3001/tblTruckDetails/getAllTblTruckDetails"
    );

    const { data: tblUser } = useSWR(
        "http://localhost:3001/tblUser/getAllTblUser"
    );

    const { data: tblUserType } = useSWR(
        "http://localhost:3001/tblUserType/getAllTblUserType"
    );

    const { data: tblVehicleType } = useSWR(
        "http://localhost:3001/tblVehicleType/getAllTblVehicleType"
    );

    useEffect(() => {
        dispatch("CHANGE_TITLE", "View Calajunan DB");
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_PATH", "/statistics");
    }, []);

    return (
        <div className="p-4 md:p-8">
            <div>
                <div className="mb-4 max-w-[1000px]">
                    <p>Company</p>
                    <table className="text-sm text-left border md:w-full">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">ID</th>
                                <th className="px-6">COMPANY_NAME</th>
                                <th className="px-6">COMPANY_ADDRESS</th>
                                <th className="px-6">DTI</th>
                                <th className="px-6">PPA_NO</th>
                                <th className="px-6">PPA</th>
                                <th className="px-6">PORT</th>
                                <th className="px-6">SHOW_COMPNAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblCompany?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">{data.ID}</td>
                                        <td className="px-6">
                                            {data.COMPANY_NAME}
                                        </td>
                                        <td className="px-6">
                                            {data.COMPANY_ADDRESS}
                                        </td>
                                        <td className="px-6">{data.DTI}</td>
                                        <td className="px-6">{data.PPA_NO}</td>
                                        <td className="px-6">{data.PPA}</td>
                                        <td className="px-6">{data.PORT}</td>
                                        <td className="px-6">
                                            {data.SHOW_COMPNAME}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 max-w-[1000px]">
                    <p>Con Settings</p>
                    <table className="text-sm text-left border md:w-full">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">id</th>
                                <th className="px-6">portno</th>
                                <th className="px-6">baudstring</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblConSettings?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">{data.id}</td>
                                        <td className="px-6">{data.portno}</td>
                                        <td className="px-6">
                                            {data.baudstring}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 max-w-[1000px]">
                    <p>Customer</p>
                    <table className="text-sm text-left border md:w-full ">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">CustomerID</th>
                                <th className="px-6">Desc</th>
                                <th className="px-6">Suspended</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblCustomer?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">
                                            {data.CustomerID}
                                        </td>
                                        <td className="px-6">{data.Desc}</td>
                                        <td className="px-6">
                                            {data.Suspended}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 max-w-[1000px]">
                    <p>Products</p>
                    <table className="text-sm text-left border md:w-full">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">ProductID</th>
                                <th className="px-6">Desc</th>
                                <th className="px-6">Suspended</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblProducts?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">
                                            {data.ProductID}
                                        </td>
                                        <td className="px-6">{data.Desc}</td>
                                        <td className="px-6">
                                            {data.Suspended}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 overflow-x-auto w-[1000px]">
                    <p>Transaction</p>
                    <table className="text-sm text-left border md:w-full">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">id</th>
                                <th className="px-6">trandate</th>
                                <th className="px-6">ticketno</th>
                                <th className="px-6">customer</th>
                                <th className="px-6">plateno</th>
                                <th className="px-6">weighin</th>
                                <th className="px-6">datetimein</th>
                                <th className="px-6">weighout</th>
                                <th className="px-6">datetimeout</th>
                                <th className="px-6">driver</th>
                                <th className="px-6">weigher</th>
                                <th className="px-6">grosswt</th>
                                <th className="px-6">tarewt</th>
                                <th className="px-6">netwt</th>
                                <th className="px-6">firstprint</th>
                                <th className="px-6">secondprint</th>
                                <th className="px-6">note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblTransaction?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">{data.id}</td>
                                        <td className="px-6">
                                            {data.trandate}
                                        </td>
                                        <td className="px-6">
                                            {data.ticketno}
                                        </td>
                                        <td className="px-6">
                                            {data.customer}
                                        </td>
                                        <td className="px-6">{data.plateno}</td>
                                        <td className="px-6">{data.weighin}</td>
                                        <td className="px-6">
                                            {data.datetimein}
                                        </td>
                                        <td className="px-6">
                                            {data.weighout}
                                        </td>
                                        <td className="px-6">
                                            {data.datetimeout}
                                        </td>
                                        <td className="px-6">{data.driver}</td>
                                        <td className="px-6">{data.weigher}</td>
                                        <td className="px-6">{data.grosswt}</td>
                                        <td className="px-6">{data.tarewt}</td>
                                        <td className="px-6">{data.netwt}</td>
                                        <td className="px-6">
                                            {data.firstprint}
                                        </td>
                                        <td className="px-6">
                                            {data.secondprint}
                                        </td>
                                        <td className="px-6">{data.note}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 overflow-x-auto w-[1000px]">
                    <p>Truck Details</p>
                    <table className="text-sm text-left border md:w-full">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">WT_SLIP_NO</th>
                                <th className="px-6">PPA</th>
                                <th className="px-6">PPA_NO</th>
                                <th className="px-6">COMPANY_NAME</th>
                                <th className="px-6">COMPANY_ADD</th>
                                <th className="px-6">DTI</th>
                                <th className="px-6">DATE</th>
                                <th className="px-6">HOURS</th>
                                <th className="px-6">VEHICLE_TYPE</th>
                                <th className="px-6">PLATE_NO</th>
                                <th className="px-6">VESSEL_NAME</th>
                                <th className="px-6">TRIP_NO</th>
                                <th className="px-6">SCALE_RATE</th>
                                <th className="px-6">VAT</th>
                                <th className="px-6">AMOUNT</th>
                                <th className="px-6">OR_NO</th>
                                <th className="px-6">AXLE1</th>
                                <th className="px-6">AXLE2</th>
                                <th className="px-6">AXLE3</th>
                                <th className="px-6">AXLE4</th>
                                <th className="px-6">AXLE5</th>
                                <th className="px-6">AXLE6</th>
                                <th className="px-6">TOTAL_WEIGHT</th>
                                <th className="px-6">REMARKS</th>
                                <th className="px-6">SCALE_OPERATOR</th>
                                <th className="px-6">DATE_WEIGHTED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblTruckDetails?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">
                                            {data.WT_SLIP_NO}
                                        </td>
                                        <td className="px-6">{data.PPA}</td>
                                        <td className="px-6">{data.PPA_NO}</td>
                                        <td className="px-6">
                                            {data.COMPANY_NAME}
                                        </td>
                                        <td className="px-6">
                                            {data.COMPANY_ADD}
                                        </td>
                                        <td className="px-6">{data.DTI}</td>
                                        <td className="px-6">{data.DATE}</td>
                                        <td className="px-6">{data.HOURS}</td>
                                        <td className="px-6">
                                            {data.VEHICLE_TYPE}
                                        </td>
                                        <td className="px-6">
                                            {data.PLATE_NO}
                                        </td>
                                        <td className="px-6">
                                            {data.VESSEL_NAME}
                                        </td>
                                        <td className="px-6">{data.TRIP_NO}</td>
                                        <td className="px-6">
                                            {data.SCALE_RATE}
                                        </td>
                                        <td className="px-6">{data.VAT}</td>
                                        <td className="px-6">{data.AMOUNT}</td>
                                        <td className="px-6">{data.OR_NO}</td>
                                        <td className="px-6">{data.AXLE1}</td>
                                        <td className="px-6">{data.AXLE2}</td>
                                        <td className="px-6">{data.AXLE3}</td>
                                        <td className="px-6">{data.AXLE4}</td>
                                        <td className="px-6">{data.AXLE5}</td>
                                        <td className="px-6">{data.AXLE6}</td>
                                        <td className="px-6">{data.AXLE2}</td>
                                        <td className="px-6">{data.AXLE3}</td>
                                        <td className="px-6">{data.AXLE4}</td>
                                        <td className="px-6">{data.AXLE5}</td>
                                        <td className="px-6">{data.AXLE6}</td>
                                        <td className="px-6">
                                            {data.TOTAL_WEIGHT}
                                        </td>
                                        <td className="px-6">{data.REMARKS}</td>
                                        <td className="px-6">
                                            {data.SCALE_OPERATOR}
                                        </td>
                                        <td className="px-6">
                                            {data.DATE_WEIGHTED}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 max-w-[1000px]">
                    <p>User</p>
                    <table className="text-sm text-left border md:w-full h-[500px] block overflow-x-hidden overflow-y-auto">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">user_id</th>
                                <th className="px-6">usertype_id</th>
                                <th className="px-6">username</th>
                                <th className="px-6">password</th>
                                <th className="px-6">firstname</th>
                                <th className="px-6">lastname</th>
                                <th className="px-6">initial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblUser?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">{data.user_id}</td>
                                        <td className="px-6">
                                            {data.usertype_id}
                                        </td>
                                        <td className="px-6">
                                            {data.username}
                                        </td>
                                        <td className="px-6">
                                            {data.password}
                                        </td>
                                        <td className="px-6">
                                            {data.firstname}
                                        </td>
                                        <td className="px-6">
                                            {data.lastname}
                                        </td>
                                        <td className="px-6">{data.initial}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 max-w-[1000px]">
                    <p>User Type</p>
                    <table className="text-sm text-left border md:w-full max-h-[500px]">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">usertype_id</th>
                                <th className="px-6">usertype</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblUserType?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">
                                            {data.usertype_id}
                                        </td>
                                        <td className="px-6">
                                            {data.usertype}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 max-w-[1000px]">
                    <p>Vehicle Type</p>
                    <table className="text-sm text-left border md:w-full max-h-[500px]">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase border-b h-11 bg-gray-50">
                            <tr className="select-none removeBorderStyle">
                                <th className="px-6">vid</th>
                                <th className="px-6">vehicle_type</th>
                                <th className="px-6">rate</th>
                                <th className="px-6">vat</th>
                                <th className="px-6">amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tblVehicleType?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="border-b removeBorderStyle h-11"
                                    >
                                        <td className="px-6">{data.vid}</td>
                                        <td className="px-6">
                                            {data.vehicle_type}
                                        </td>
                                        <td className="px-6">{data.rate}</td>
                                        <td className="px-6">{data.vat}</td>
                                        <td className="px-6">{data.amount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default viewCalajunanDB;
