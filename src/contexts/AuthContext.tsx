import Router from "next/router";
import { setCookie, parseCookies } from "nookies";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IAuthContext, IChildren, ISignInData, IUser } from "../@types";
import api from "../services/api";

export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: IChildren) {
    const [loadingSignIn, setLoadingSignIn] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const { "tweeter.data": userData } = parseCookies();

        if (userData) {
            const { user, token } = JSON.parse(userData);
            setUser(user);
            api.defaults.headers["Authorization"] = `Bearer ${token}`;
            return;
        }

        Router.push("/");
    }, []);

    async function signIn(data: ISignInData) {
        setLoadingSignIn(true);
        await api
            .post("/user/login", data)
            .then(response => {
                const { token, user } = response.data.data;
                const userData = {
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                    },
                };

                setCookie(undefined, "tweeter.data", JSON.stringify(userData), {
                    maxAge: 60 * 60 * 24, // 24 hours
                    path: "/",
                });
                setUser(userData.user);
                api.defaults.headers["Authorization"] = `Bearer ${token}`;
                toast.success("User logged with success!");
                Router.push(`/profile/${user.id}`);
            })
            .catch(error =>
                toast.error(
                    error.response?.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
        setLoadingSignIn(false);
    }

    return (
        <AuthContext.Provider value={{ signIn, loadingSignIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
