import { GetServerSidePropsContext } from "next";

import { getApiClient } from "../services/apiSSR";

export async function ensureAuthentication(ctx: GetServerSidePropsContext) {
    const verifyJwt = await getApiClient(ctx)
        .get("/user/me/verify")
        .then((response: { data: { id: string } }) => response?.data.id)
        .catch(() => false);

    return verifyJwt;
}
