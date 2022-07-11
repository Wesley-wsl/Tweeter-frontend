import { Earth } from "@styled-icons/ionicons-sharp";
import { People } from "@styled-icons/material-rounded";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { IWhoCanSee } from "../../../@types";
import { widget } from "../../../utils/variants";
import { Overlay } from "../../Header/ProfileWidget/styles";
import * as S from "./styles";

const WhoCanSee = ({ setTweetIsPublic }: IWhoCanSee) => {
    const [tweetOptions, setTweetOptions] = useState(false);

    function handleRestriction(isPublic: boolean) {
        setTweetIsPublic(isPublic ? "true" : "false");
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
                            <li onClick={() => handleRestriction(true)}>
                                <Earth
                                    size={20}
                                    color="#000"
                                    aria-label="Earth icon to make this tweet public"
                                />
                                Everyone
                            </li>
                            <li onClick={() => handleRestriction(false)}>
                                <People
                                    size={20}
                                    color="#000"
                                    aria-label="People icon to make this tweet private"
                                />
                                People that follow you
                            </li>
                        </ul>
                    </S.WhoCanSeeOptions>
                )}
            </AnimatePresence>

            {tweetOptions && (
                <Overlay
                    onClick={() => setTweetOptions(false)}
                    data-testid="overlay"
                />
            )}
        </S.Container>
    );
};

export default WhoCanSee;
