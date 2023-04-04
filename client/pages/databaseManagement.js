import Axios from "axios";
import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import BarangayTable from "../components/BarangayTable";
import SubmissionTable from "../components/SubmissionTable";
import UserTable from "../components/UserTable";
import { useAuthState } from "../context/auth";
import { AuthContext } from "../helpers/AuthContext";
import useSWR from "swr";
import { useAuthDispatch } from "../context/auth";

function databaseManagement({ userData }) {
    const [searchValue, setSearchvalue] = useState("");
    const [inputValue, setInputvalue] = useState("");
    const [selectedDatabase, setSelectedDatabase] = useState("Barangay");
    const { authState, setAuthState } = useContext(AuthContext);
    const { user, authenticated, loading } = useAuthState();
    const dispatch = useAuthDispatch();

    useEffect(() => {
        dispatch("CHANGE_TITLE", "Database management");
        dispatch("HAS_BUTTON_FALSE");
    }, []);

    const { data: submissions, isValidating: isValidatingSubmissions } = useSWR(
        "http://localhost:3001/submission/all"
    );

    const { data: barangays } = useSWR(
        "http://localhost:3001/barangay/getAllBarangays"
    );

    const { data: users } = useSWR("http://localhost:3001/user");

    const { data: userBarangays } = useSWR(
        "http://localhost:3001/user/barangay"
    );

    const router = useRouter();

    const filteredSubmissions = submissions?.filter((submission) => {
        return submission.barangayName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
    });

    const filteredBarangays = barangays?.filter((barangay) => {
        return barangay.barangayName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
    });

    const filteredUsers = users?.filter((user) => {
        return user.username.toLowerCase().includes(searchValue.toLowerCase());
    });

    const debouncedSearch = useCallback(
        debounce((nextValue) => {
            console.log("Function called");
            setSearchvalue(nextValue);
        }, 500),
        []
    );

    const handleInputChange = (e) => {
        const nextValue = e.target.value;
        setInputvalue(nextValue);
        debouncedSearch(nextValue);
    };

    return (
        <div className="">
            {user?.isAdmin && !loading && (
                <div className="p-4 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-6 text-sm font-medium">
                            <button
                                onClick={() => setSelectedDatabase("Barangay")}
                                className={`${
                                    selectedDatabase == "Barangay"
                                        ? "border-b-2 border-blue-500 pb-2 text-blue-600"
                                        : "text-gray-600 border-b-2 border-white pb-2"
                                }`}
                            >
                                Barangay
                            </button>
                            <button
                                onClick={() => setSelectedDatabase("User")}
                                className={`${
                                    selectedDatabase == "User"
                                        ? "border-b-2 border-blue-500 pb-2 text-blue-600"
                                        : "text-gray-600 border-b-2 border-white pb-2"
                                }`}
                            >
                                User
                            </button>
                        </div>
                        <div className="items-center hidden space-x-2 md:flex">
                            {selectedDatabase == "Submissions" && (
                                <input
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border"
                                    type="text"
                                    placeholder="Search by barangay"
                                />
                            )}

                            {selectedDatabase == "Barangay" && (
                                <input
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border"
                                    type="text"
                                    placeholder="Search by barangay"
                                />
                            )}

                            {selectedDatabase == "User" && (
                                <input
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    className="px-3 py-2 border"
                                    type="text"
                                    placeholder="Search by username"
                                />
                            )}
                        </div>
                    </div>

                    {selectedDatabase == "Barangay" && submissions && (
                        <BarangayTable filteredBarangays={filteredBarangays} />
                    )}

                    {selectedDatabase == "User" && (
                        <UserTable
                            filteredUsers={filteredUsers}
                            userBarangays={userBarangays}
                        />
                    )}
                </div>
            )}

            {!user?.isAdmin && !loading && (
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)]">
                    <p className="mb-4">
                        You are not authorized to access this page.
                    </p>
                    <button
                        onClick={() => router.push("/login")}
                        className="px-6 py-1 text-white bg-blue-500"
                    >
                        Go to login
                    </button>
                </div>
            )}
        </div>
    );
}

export default databaseManagement;

export const getServerSideProps = async (context) => {
    const data = await fetch("http://localhost:3001/user/me", {
        headers: { Cookie: context.req.headers.cookie },
    }).then((res) => res.json());

    // Fires when no user is currently logged in
    if (data.error) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        };
    }

    // Fires when user is not an admin
    if (data.isAdmin == false) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    return {
        props: {
            userData: data,
        },
    };
};
