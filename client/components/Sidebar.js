import { Icon } from "@iconify/react";
import Axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useAuthDispatch, useAuthState } from "../context/auth";

function Sidebar() {
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
            {authenticated && !loading && isSidebarOpen && (
                <div className="flex-col sticky top-0 h-screen bg-gray-800 text-white text-sm min-w-[240px] pb-3 overflow-auto overflow-x-hidden hidden md:flex">
                    <div className="flex items-center pl-4 pr-6 mb-4 border-b border-gray-700 select-none min-h-[56px]">
                        <div
                            onClick={() => dispatch("CLOSE_SIDEBAR")}
                            className="p-2 mr-[9px] rounded-full cursor-pointer active:bg-gray-700"
                        >
                            <Icon
                                icon="ic:baseline-menu"
                                className="w-6 h-6 text-white"
                            />
                        </div>
                        <div
                            onClick={() => router.push("/")}
                            className="flex items-center cursor-pointer"
                        >
                            <img
                                width="30"
                                height="30"
                                src="/gso_logo.png"
                                className="mr-2"
                            />
                            <p className="text-base font-medium">
                                GSO{" "}
                                <sup className="text-[10px] text-gray-300">
                                    Iloilo
                                </sup>
                            </p>
                        </div>
                    </div>

                    <div
                        onClick={() => router.push("/")}
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
                            onClick={() => router.push("/submit")}
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
                        onClick={() => router.push("/announcements")}
                        className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                    >
                        <Icon className="w-6 h-6 mr-4" icon="mdi:bullhorn" />
                        <p>Announcements</p>
                    </div>
                    <div
                        onClick={() => router.push("/concerns")}
                        className="flex items-center py-3 pl-6 border-gray-300 select-none hover:cursor-pointer hover:bg-gray-700"
                    >
                        <Icon
                            className="w-6 h-6 mr-4"
                            icon="ri:feedback-fill"
                        />
                        <p>Concerns and issues</p>
                    </div>
                    <div
                        onClick={() => router.push("/statistics")}
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
                            onClick={() => router.push("/actualWastes")}
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
                                    onClick={() =>
                                        router.push("/databaseManagement")
                                    }
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

export default Sidebar;
