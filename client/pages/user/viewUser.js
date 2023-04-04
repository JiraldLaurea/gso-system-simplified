import React, { useEffect } from "react";
import useSWR from "swr";
import RequirementsButton from "../../components/RequirementsButton";
import { useAuthDispatch } from "../../context/auth";

function viewUser() {
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch("CHANGE_TITLE", "View SWM plan");
        dispatch("HAS_BUTTON_FALSE");
    }, []);

    const { data: updatedBarangayProfile } = useSWR(
        "http://localhost:3001/shortenedSubmission/getAllUpdatedUserBarangayProfileYearSubmitted"
    );

    const { data: updatedSketch } = useSWR(
        "http://localhost:3001/sketch/getAllUpdatedUserSketchYearSubmitted"
    );

    const { data: updatedProgram } = useSWR(
        "http://localhost:3001/programs/getAllUpdatedUserProgramsYearSubmitted"
    );

    const { data: updatedFundingReq } = useSWR(
        "http://localhost:3001/fundingReq/getAllUpdatedUserFundingReqYearSubmitted"
    );

    const { data: updatedMoa } = useSWR(
        "http://localhost:3001/moa/getAllUpdatedUserMoaYearSubmitted"
    );

    const { data: updatedJunkshop } = useSWR(
        "http://localhost:3001/junkshop/getAllUpdatedUserJunkshopYearSubmitted"
    );

    const { data: updatedBusinessPermit } = useSWR(
        "http://localhost:3001/businessPermit/getAllUpdatedUserBusinessPermitYearSubmitted"
    );

    const { data: updatedExecutiveOrder } = useSWR(
        "http://localhost:3001/executiveOrder/getAllUpdatedUserExecutiveOrderYearSubmitted"
    );

    const { data: updatedBarangayOrdinance } = useSWR(
        "http://localhost:3001/barangayOrdinance/getAllUpdatedUserBarangayOrdinanceYearSubmitted"
    );

    return (
        <div className="">
            <div className="p-4 md:p-8">
                <div className="flex flex-col gap-2 md:grid md:grid-cols-4">
                    <RequirementsButton
                        requirement={
                            updatedBarangayProfile &&
                            updatedBarangayProfile[0]?.yearSubmitted != null
                        }
                        path="/user/viewUser/barangayProfile"
                        requirementName="Barangay profile"
                        iconStyle="mingcute:profile-line"
                    />
                    <RequirementsButton
                        requirement={updatedSketch?.length != 0}
                        path="/user/viewUser/sketch"
                        requirementName="Route sketch"
                        iconStyle="eos-icons:route"
                    />
                    <RequirementsButton
                        requirement={updatedProgram?.length != 0}
                        path="/user/viewUser/programs"
                        requirementName="Programs"
                        iconStyle="carbon:event"
                    />
                    <RequirementsButton
                        requirement={updatedFundingReq?.length != 0}
                        path="/user/viewUser/fundingReq"
                        requirementName="Funding requirements"
                        iconStyle="ic:baseline-attach-money"
                    />
                    <RequirementsButton
                        requirement={updatedMoa?.length != 0}
                        path="/user/viewUser/memorandumOfAgreement"
                        requirementName="Memorandum of agreement"
                        iconStyle="icon-park-solid:agreement"
                    />
                    <RequirementsButton
                        requirement={updatedJunkshop?.length != 0}
                        path="/user/viewUser/junkshop"
                        requirementName="Junkshop"
                        iconStyle="mdi:dump-truck"
                    />
                    <RequirementsButton
                        requirement={updatedBusinessPermit?.length != 0}
                        path="/user/viewUser/businessPermit"
                        requirementName="Business permit"
                        iconStyle="fluent:document-text-16-regular"
                    />
                    <RequirementsButton
                        requirement={updatedExecutiveOrder?.length != 0}
                        path="/user/viewUser/executiveOrder"
                        requirementName="Executive order"
                        iconStyle="fluent:building-bank-16-filled"
                    />
                    <RequirementsButton
                        requirement={updatedBarangayOrdinance?.length != 0}
                        path="/user/viewUser/barangayOrdinance"
                        requirementName="Barangay ordinance"
                        iconStyle="vaadin:scale"
                    />
                    <RequirementsButton
                        requirement={updatedBusinessPermit?.length != 0}
                        path="/user/viewUser/viewAll"
                        requirementName="View all"
                        iconStyle="ic:baseline-remove-red-eye"
                    />
                </div>
            </div>
        </div>
    );
}

export default viewUser;
