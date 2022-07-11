import { GetServerSideProps } from "next";
import { useEffect } from "react";

import { ITweet } from "../../@types";
import LittleLoading from "../../components/LittleLoading";
import NextSEO from "../../components/NextSEO";
import Trends from "../../components/Trends";
import Tweet from "../../components/Tweet";
import WhoFollow from "../../components/WhoFollow";
import WriteTweet from "../../components/WriteTweet";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import * as S from "../../styles/pages/Home";
import { ensureAuthentication } from "../../utils/ensureAuthentication";

export default function Home() {
    const {
        isEndPage,
        ref,
        scrollLoading,
        tweets,
        handleReset,
        setTweets,
        search,
    } = useInfiniteScroll(`/tweet`);

    useEffect(() => {
        handleReset("", "latest");
    }, []);

    return (
        <NextSEO
            title="Tweeter - Home"
            description="Home page with tweets destinate to your profile"
        >
            <S.Container>
                <S.Tweets>
                    <WriteTweet handleReset={handleReset} />
                    <div>
                        {tweets.map((data: ITweet, index: number) => (
                            <Tweet
                                data={data}
                                key={index}
                                setTweets={setTweets}
                            />
                        ))}
                        {!isEndPage && <div ref={ref} />}
                        {scrollLoading && <LittleLoading color="#000" />}
                    </div>
                </S.Tweets>

                <S.Aside>
                    <Trends handleReset={handleReset} search={search} />
                    <WhoFollow />
                </S.Aside>
            </S.Container>
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
