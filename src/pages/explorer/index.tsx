import { Search } from "@styled-icons/material-outlined";

import { Button } from "../../components/Button";
import Header from "../../components/Header";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import * as S from "../../styles/pages/Explorer";
import { TweetsFilterProfile } from "../../styles/pages/Profile";

export default function Explorer() {
    return (
        <NextSEO title="Tweeter - Explore" description="Explore tweets">
            <>
                <Header />
                <S.Container>
                    <TweetsFilterProfile>
                        <li className="active">Top</li>
                        <li>Latest</li>
                        <li>People</li>
                        <li>Media</li>
                    </TweetsFilterProfile>

                    <S.TweetsContainer>
                        <S.Search>
                            <Search width={25} height={25} color="#BDBDBD" />
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="Search"
                            />
                            <Button title="Search" />
                        </S.Search>
                        <Tweet />
                        <Tweet />
                        <Tweet />
                    </S.TweetsContainer>
                </S.Container>
            </>
        </NextSEO>
    );
}
