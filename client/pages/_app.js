import "../styles/globals.css";
// import { AuthContext, AuthProvider } from "../helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthProvider, useAuthDispatch, useAuthState } from "../context/auth";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Axios from "axios";
import { SWRConfig } from "swr";

Axios.defaults.withCredentials = true;

const fetcher = async (...args) =>
    await Axios.get(...args).then((res) => res.data);

function MyApp({ Component, pageProps, userData }) {
    const { loading } = useAuthState();
    const router = useRouter();
    const { pathname } = useRouter();
    const authRoutes = ["/login"];
    const authRoute = authRoutes.includes(pathname);

    return (
        <SWRConfig value={{ fetcher }}>
            <AuthProvider>
                <div className="flex">
                    {!authRoute && <Sidebar />}
                    <div className="flex flex-col flex-grow">
                        {!authRoute && <Navbar />}
                        <Component {...pageProps} />
                    </div>
                </div>
            </AuthProvider>
        </SWRConfig>
    );
}

export default MyApp;
