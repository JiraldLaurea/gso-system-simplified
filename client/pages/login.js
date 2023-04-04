import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "../helpers/AuthContext";
import { useAuthDispatch, useAuthState } from "../context/auth";
import { Icon } from "@iconify/react";

function login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);
    const dispatch = useAuthDispatch();
    const router = useRouter();
    const { user, authenticated, loading, isSidebarOpen } = useAuthState();

    const login = async (e) => {
        e.preventDefault();
        const data = { username: username, password: password };

        await Axios.post("http://localhost:3001/user/login", data, {
            withCredentials: true,
        }).then((res) => {
            if (res.data.error) {
                alert(res.data.error);
            } else {
                dispatch("LOGIN", res.data);
                router.push("/");
            }
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-0">
            <form onSubmit={login} className="w-full max-w-sm">
                <p className="mb-6 text-4xl font-semibold">Login</p>
                <p className="mb-1 text-sm text-gray-700">Username</p>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full px-3 py-2 mb-4 border"
                />
                <p className="mb-1 text-sm text-gray-700">Password</p>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-3 py-2 border"
                />

                <button
                    type="submit"
                    className="flex items-center justify-center w-full px-6 py-2 mt-6 text-white transition-colors bg-blue-500 rounded-sm hover:bg-blue-600"
                >
                    <Icon className="w-6 h-6 mr-2" icon="ic:baseline-login" />
                    Login
                    <div className="w-6" />
                </button>
            </form>
        </div>
    );
}

export default login;
