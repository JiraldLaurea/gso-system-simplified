import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useAuthDispatch, useAuthState } from "../context/auth";
import BackButton from "./BackButton";
import SidebarMobile from "./SidebarMobile";

function Navbar({ userData }) {
    const {
        user,
        authenticated,
        loading,
        isSidebarOpen,
        navbarTitle,
        hasButton,
        routePath,
    } = useAuthState();
    const router = useRouter();
    const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);
    const dispatch = useAuthDispatch();

    return (
        <>
            {authenticated && !loading && (
                <>
                    <div
                        className={`sticky top-0 hidden md:flex items-center pl-4 pr-6 border-b z-10 h-14 bg-gray-50 select-none ${
                            isSidebarOpen
                                ? "justify-between"
                                : "justify-between"
                        }`}
                    >
                        {!isSidebarOpen && (
                            <div className="flex items-center">
                                <div
                                    onClick={() => dispatch("OPEN_SIDEBAR")}
                                    className="hidden p-2 rounded-full cursor-pointer md:block active:bg-gray-200"
                                >
                                    <Icon
                                        icon="ic:baseline-menu"
                                        className="w-6 h-6"
                                    />
                                </div>
                                {hasButton && (
                                    <div
                                        onClick={() => router.push(routePath)}
                                        className="p-2 mx-2 text-gray-600 rounded-full cursor-pointer hover:bg-gray-200"
                                    >
                                        <Icon
                                            icon="bx:arrow-back"
                                            className="w-6 h-6"
                                        />
                                    </div>
                                )}
                                <h1 className="text-lg font-semibold">
                                    {navbarTitle}
                                </h1>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <div className="flex items-center">
                                {hasButton && (
                                    <div
                                        onClick={() => router.push(routePath)}
                                        className="p-2 mr-2 text-gray-600 rounded-full cursor-pointer hover:bg-gray-200"
                                    >
                                        <Icon
                                            icon="bx:arrow-back"
                                            className="w-6 h-6"
                                        />
                                    </div>
                                )}
                                <h1 className="text-lg font-semibold">
                                    {navbarTitle}
                                </h1>
                            </div>
                        )}

                        <div className="flex items-center py-1 pl-1 pr-4 border rounded-full cursor-pointer select-none">
                            <Avatar
                                name={user?.username}
                                size={32}
                                textSizeRatio={2}
                                className="mr-2 rounded-full "
                            />
                            <p className="">{user?.username}</p>
                            <p>
                                &nbsp;|&nbsp;
                                {user?.barangayName
                                    ? user?.barangayName
                                    : "GSO"}
                            </p>
                        </div>
                    </div>

                    <div
                        className={`sticky top-0 flex md:hidden items-center px-2 border-b z-10 h-14 bg-gray-50 select-none justify-between`}
                    >
                        <div
                            onClick={() => setIsSidebarMobileOpen(true)}
                            className="p-2 mr-[9px] md:hidden rounded-full cursor-pointer active:bg-gray-200"
                        >
                            <Icon icon="ic:baseline-menu" className="w-6 h-6" />
                        </div>
                        <div className="flex items-center py-1 pl-1 pr-4 border rounded-full cursor-pointer select-none">
                            <Avatar
                                name={user?.username}
                                size={32}
                                textSizeRatio={2}
                                className="mr-2 rounded-full "
                            />
                            <p className="">{user?.username}</p>
                            <p>
                                &nbsp;|&nbsp;
                                {user?.barangayName
                                    ? user?.barangayName
                                    : "GSO"}
                            </p>
                        </div>
                    </div>
                </>
            )}
            {isSidebarMobileOpen && (
                <SidebarMobile
                    setIsSidebarMobileOpen={() => setIsSidebarMobileOpen(false)}
                />
            )}
        </>
    );
}

export default Navbar;
