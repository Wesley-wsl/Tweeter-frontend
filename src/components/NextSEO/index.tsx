import { motion } from "framer-motion";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { INextSEO } from "../../@types";
import { overlay, pageTransition } from "../../utils/variants";

const NextSEO: React.FC<INextSEO> = ({
    title,
    description,
    children,
    opacityTransition,
}) => {
    const { pathname } = useRouter();
    const url = `http://localhost:3000${pathname}`;

    return (
        <motion.div
            variants={opacityTransition ? overlay : pageTransition}
            initial="hidden"
            animate="visible"
            exit={opacityTransition ? "hidden" : "exit"}
            transition={{ type: "linear" }}
        >
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{ title, url }}
            />
            {children}
        </motion.div>
    );
};

export default NextSEO;
