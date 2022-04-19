import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { INextSEO } from "../../@types";

const NextSEO: React.FC<INextSEO> = ({ title, description, children }) => {
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
};

export default NextSEO;
