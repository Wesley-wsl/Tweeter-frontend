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
            const data = userData.split("\n");
            setUser({
                name: data[1],
                avatar: data[2],
                id: data[3],
            });
            api.defaults.headers["Authorization"] = `Bearer ${data[0]}`;
            return;
        }

        Router.push("/");
    }, []);

    async function signIn(data: ISignInData) {
        setLoadingSignIn(true);
        await api
            .post("/user/login", data)
            .then(response => {
                setCookie(
                    undefined,
                    "tweeter.data",
                    `${response.data.data.token}\n${response.data.data.user.name}\n${response.data.data.user.avatar}\n${response.data.data.user.id}`,
                    {
                        maxAge: 60 * 60 * 1, // 1 hour
                        path: "/",
                    },
                );
                setUser({
                    name: response.data.data.user.name,
                    avatar: `${response.data.data.user.avatar}`,
                    id: response.data.data.user.id,
                });
                toast.success("User logged with success!");
                Router.reload();
            })
            .catch(error =>
                toast.error(
                    error.response.data.error ??
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
