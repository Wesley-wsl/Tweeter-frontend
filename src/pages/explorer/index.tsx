import { Search } from "@styled-icons/material-outlined";
import { GetServerSideProps } from "next";

import { Button } from "../../components/Button";
import Header from "../../components/Header";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import * as S from "../../styles/pages/Explorer";
import { TweetsFilterProfile } from "../../styles/pages/Profile";
import { ensureAuthentication } from "../../utils/ensureAuthentication";

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
                    </S.TweetsContainer>
                </S.Container>
            </>
        </NextSEO>
    );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const userId = await ensureAuthentication(ctx);

    if (!userId) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};
