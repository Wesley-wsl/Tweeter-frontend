import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export function getApiClient(ctx?: GetServerSidePropsContext) {
    const { "tweeter-token": token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: `${
            process.env.NEXT_PUBLIC_API_URL
                ? process.env.NEXT_PUBLIC_API_URL
                : "http://localhost:3333/"
        }`,
    });

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    return api;
}
