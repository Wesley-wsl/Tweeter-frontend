import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { INextSEO } from "../../@types";

export function NextSEO({ title, description, children }: INextSEO) {
    const { pathname } = useRouter();
    const url = `http://localhost:3000${pathname}`;
    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{ title, url }}
            />
            {children}
        </>
    );
}
