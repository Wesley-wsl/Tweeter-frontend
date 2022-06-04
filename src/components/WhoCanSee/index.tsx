import { Earth } from "@styled-icons/ionicons-sharp";
import { People } from "@styled-icons/material-rounded";
import React, { useState } from "react";

import { IWhoCanSee } from "../../@types";
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

            {tweetOptions && (
                <S.WhoCanSeeOptions>
                    <p>Who can see?</p>
                    <p>Choose who can see this Tweet.</p>
                    <ul>
                        <li onClick={handleIsPublic}>
                            <Earth size={20} color="#000" /> Everyone
                        </li>
                        <li onClick={handleIsPrivate}>
                            <People size={20} color="#000" /> People that follow
                            you
                        </li>
                    </ul>
                </S.WhoCanSeeOptions>
            )}

            {tweetOptions && <Overlay onClick={() => setTweetOptions(false)} />}
        </S.Container>
    );
};

export default WhoCanSee;
