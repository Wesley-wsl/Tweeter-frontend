import React from "react";

import * as S from "./styles";

const Trends: React.FC = () => {
    return (
        <S.Container>
            <p>Tends for you</p>

            <div>
                <p>#programming</p>
                <p>213k Tweets</p>
            </div>
            <div>
                <p>#devchallenges</p>
                <p>123k Tweets</p>
            </div>
            <div>
                <p>#frontend</p>
                <p>34k Tweets</p>
            </div>
            <div>
                <p>#backend</p>
                <p>30k Tweets</p>
            </div>
            <div>
                <p>#100DaysOfCode</p>
                <p>5k Tweets</p>
            </div>
        </S.Container>
    );
};

export default Trends;
