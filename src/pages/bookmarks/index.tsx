import { GetServerSideProps } from "next";

import Header from "../../components/Header";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import * as S from "../../styles/pages/Explorer";
import { TweetsFilterProfile } from "../../styles/pages/Profile";
import { ensureAuthentication } from "../../utils/ensureAuthentication";

export default function Bookmarks() {
    return (
        <NextSEO
            title="Tweeter - Bookmarks"
            description="Explore your bookmarks"
        >
            <>
                <Header />
                <S.Container>
                    <TweetsFilterProfile>
                        <li className="active">Tweets</li>
                        <li>Tweets &amp; replies</li>
                        <li>Media</li>
                        <li>Likes</li>
                    </TweetsFilterProfile>

                    <S.TweetsContainer>
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
