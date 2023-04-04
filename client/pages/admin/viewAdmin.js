import React, { useEffect } from "react";
import { useRouter } from "next/router";
import RequirementsButton from "../../components/RequirementsButton";
import { useAuthDispatch } from "../../context/auth";

function adminView() {
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch("CHANGE_TITLE", "View SWM plan");
        dispatch("HAS_BUTTON_FALSE");
    }, []);

    return (
        <div className="">
            <div className="p-4 md:p-8">
                <div className="flex flex-col gap-2 md:grid md:grid-cols-4">
                    <RequirementsButton
                        path="/admin/viewAdmin/sketch"
                        requirementName="Route sketch"
                        isAdmin
                        iconStyle="eos-icons:route"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/programs"
                        requirementName="Programs"
                        isAdmin
                        iconStyle="carbon:event"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/fundingReq"
                        requirementName="Funding requirements"
                        isAdmin
                        iconStyle="ic:baseline-attach-money"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/memorandumOfAgreement"
                        requirementName="Memorandum of agreement"
                        isAdmin
                        iconStyle="icon-park-solid:agreement"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/junkshop"
                        requirementName="Junkshop"
                        isAdmin
                        iconStyle="mdi:dump-truck"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/businessPermit"
                        requirementName="Business permit"
                        isAdmin
                        iconStyle="fluent:document-text-16-regular"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/executiveOrder"
                        requirementName="Executive order"
                        isAdmin
                        iconStyle="fluent:building-bank-16-filled"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/barangayOrdinance"
                        requirementName="Barangay ordinance"
                        isAdmin
                        iconStyle="vaadin:scale"
                    />
                    <RequirementsButton
                        path="/admin/viewAdmin/viewAll"
                        requirementName="View all"
                        isAdmin
                        iconStyle="ic:baseline-remove-red-eye"
                    />
                </div>
            </div>
        </div>
    );
}

export default adminView;
