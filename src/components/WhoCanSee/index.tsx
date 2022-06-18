import { Earth } from "@styled-icons/ionicons-sharp";
import { People } from "@styled-icons/material-rounded";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { IWhoCanSee } from "../../@types";
import { widget } from "../../utils/variants";
import { Overlay } from "../ProfileWidget/styles";
import * as S from "./styles";

const WhoCanSee = ({ setTweetIsPublic }: IWhoCanSee) => {
    const [tweetOptions, setTweetOptions] = useState(false);

    function handleIsPublic() {
        setTweetIsPublic("true");
        setTweetOptions(!tweetOptions);
    }

    function handleIsPrivate() {
        setTweetIsPublic("false");
        setTweetOptions(!tweetOptions);
    }

    return (
        <S.Container>
            <p onClick={() => setTweetOptions(!tweetOptions)}>
                Everyone can see?
            </p>
            <AnimatePresence exitBeforeEnter>
                {tweetOptions && (
                    <S.WhoCanSeeOptions
                        as={motion.div}
                        variants={widget}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <p>Who can see?</p>
                        <p>Choose who can see this Tweet.</p>
                        <ul>
                            <li onClick={handleIsPublic}>
                                <Earth size={20} color="#000" /> Everyone
                            </li>
                            <li onClick={handleIsPrivate}>
                                <People size={20} color="#000" /> People that
                                follow you
                            </li>
                        </ul>
                    </S.WhoCanSeeOptions>
                )}
            </AnimatePresence>

            {tweetOptions && <Overlay onClick={() => setTweetOptions(false)} />}
        </S.Container>
    );
};

export default WhoCanSee;
