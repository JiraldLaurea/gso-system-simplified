import { Icon } from "@iconify/react";
import Axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useAuthDispatch, useAuthState } from "../context/auth";
import Image from "next/image";

function SidebarMobile({ setIsSidebarMobileOpen }) {
    const { user, authenticated, loading, isSidebarOpen } = useAuthState();
    const router = useRouter();
    const dispatch = useAuthDispatch();

    if (!authenticated && !loading) {
        return null;
    }

    const logout = async () => {
        await Axios.get("http://localhost:3001/user/logout");
        dispatch("LOGOUT");
        router.push("/login");
    };

    return (
        <>
            {authenticated && !loading && (
                <div className="fixed top-0 z-20 flex-col w-full h-full pb-3 overflow-auto overflow-x-hidden text-sm text-white bg-gray-800 md:hidden">
                    <div className="flex items-center justify-between px-4 mb-4 border-b border-gray-700 select-none min-h-[56px]">
                        <div
                            onClick={() => router.push("/")}
                            className="flex items-center cursor-pointer"
                        >
                            <div className="p-[6px] mr-1 bg-white rounded-full w-fit">
                                <Icon
                                    icon="bxs:leaf"
                                    className="w-3 h-3 text-gray-800"
                                />
                            </div>
                            <p className="text-base font-medium">GSO System</p>
                        </div>
                        <Icon
                            onClick={setIsSidebarMobileOpen}
                            icon="clarity:close-line"
                            className="p-1 border rounded-full cursor-pointer w-9 h-9"
                        />
                    </div>

                    <div
                        onClick={() => {
                            setIsSidebarMobileOpen();
                            router.push("/");
                        }}
                        className="flex items-center py-3 pl-6 select-none hover:cursor-pointer hover:bg-gray-700"
                    >
                        <Icon
                            className="w-6 h-6 mr-4"
                            icon="ic:baseline-home"
                        />
                        <p>Home</p>
                    </div>

                    {!user?.isAdmin && !loading && (
                        <div
                            onClick={() => {
                                setIsSidebarMobileOpen();
                                router.push("/submit");
                            }}
                            className="flex items-center py-3 pl-6 select-none hover:cursor-pointer hover:bg-gray-700"
                        >
                            <Icon
                                className="w-6 h-6 mr-4"
                                icon="fluent:document-arrow-up-20-filled"
                            />
                            <p>Submit</p>
                        </div>
                    )}

                    {user?.isAdmin && !loading && (
                        <div
                            onClick={() => {
                                setIsSidebarMobileOpen();
                                router.push("/encode");
                            }}
                            className={`flex select-none items-center py-3 pl-6 hover:cursor-pointer hover:bg-gray-700 `}
                        >
                            <Icon
                                className="w-6 h-6 mr-4"
                                icon="fluent:document-arrow-up-20-filled"
                            />
                            <p>Encode</p>
                        </div>
                    )}
                    <div
                        onClick={() => {
                            setIsSidebarMobileOpen();
                            router.push("/announcements");
                        }}
                        className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                    >
                        <Icon className="w-6 h-6 mr-4" icon="mdi:bullhorn" />
                        <p>Announcements</p>
                    </div>
                    <div
                        onClick={() => {
                            setIsSidebarMobileOpen();
                            router.push("/concerns");
                        }}
                        className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                    >
                        <Icon
                            className="w-6 h-6 mr-4"
                            icon="ri:feedback-fill"
                        />
                        <p>Concerns and issues</p>
                    </div>
                    <div
                        onClick={() => {
                            setIsSidebarMobileOpen();
                            router.push("/statistics");
                        }}
                        className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                    >
                        <Icon
                            className="w-6 h-6 mr-4"
                            icon="bxs:pie-chart-alt-2"
                        />
                        <p>Statistics</p>
                    </div>

                    {user?.isAdmin && (
                        <div
                            onClick={() => {
                                setIsSidebarMobileOpen();
                                router.push("/actualWastes");
                            }}
                            className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                        >
                            <Icon className="w-6 h-6 mr-4" icon="mdi:bin" />
                            <p>Actual wastes</p>
                        </div>
                    )}

                    {!loading ? (
                        <>
                            {user?.isAdmin && (
                                <div
                                    onClick={() => {
                                        setIsSidebarMobileOpen();
                                        router.push("/databaseManagement");
                                    }}
                                    className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                                >
                                    <Icon
                                        className="w-6 h-6 mr-4"
                                        icon="mdi:database-cog"
                                    />
                                    <p>Database Management</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center py-3 pl-6 border-gray-300 cursor-default select-none animate-pulse">
                            <div className="w-6 h-5 mr-4 bg-white" />
                            <p>Loading...</p>
                        </div>
                    )}

                    {user?.isAdmin && !loading && (
                        <div
                            onClick={() => {
                                setIsSidebarMobileOpen();
                                router.push("/admin/viewAdmin");
                            }}
                            className={`flex select-none items-center py-3 pl-6 hover:cursor-pointer hover:bg-gray-700 `}
                        >
                            <Icon
                                className="w-6 h-6 mr-4"
                                icon="ic:baseline-remove-red-eye"
                            />
                            <p>View SWM plan</p>
                        </div>
                    )}

                    {!user?.isAdmin && !loading && (
                        <div
                            onClick={() => {
                                setIsSidebarMobileOpen();
                                router.push("/user/viewUser");
                            }}
                            className={`flex select-none items-center py-3 pl-6 hover:cursor-pointer hover:bg-gray-700 `}
                        >
                            <Icon
                                className="w-6 h-6 mr-4"
                                icon="ic:baseline-remove-red-eye"
                            />
                            <p>View SWM plan</p>
                        </div>
                    )}

                    <hr className="my-4 border-gray-700" />

                    <div
                        onClick={logout}
                        className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                    >
                        <Icon
                            className="w-6 h-6 mr-4"
                            icon="ic:twotone-logout"
                        />
                        <p>Logout</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default SidebarMobile;
