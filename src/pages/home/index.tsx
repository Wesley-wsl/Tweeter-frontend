import { GetServerSideProps } from "next";
import { useEffect } from "react";

import { ITweet } from "../../@types";
import Header from "../../components/Header";
import LittleLoading from "../../components/LittleLoading";
import { Loading } from "../../components/Loading";
import NextSEO from "../../components/NextSEO";
import Trends from "../../components/Trends";
import Tweet from "../../components/Tweet";
import WhoFollow from "../../components/WhoFollow";
import WriteTweet from "../../components/WriteTweet";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import * as S from "../../styles/pages/Home";
import { ensureAuthentication } from "../../utils/ensureAuthentication";

export default function Home() {
    const { isEndPage, ref, scrollLoading, tweets, handleFilter, setTweets } =
        useInfiniteScroll(`/tweet`);

    useEffect(() => {
        handleFilter("latest");
    }, []);

    if (!tweets) return <Loading />;

    return (
        <NextSEO
            title="Tweeter - Home"
            description="Home page with tweets destinate to your profile"
        >
            <>
                <Header />
                <S.Container>
                    <S.Tweets>
                        <WriteTweet setTweets={setTweets} />
                        <div>
                            {tweets.map((data: ITweet, index: number) => (
                                <Tweet data={data} key={index} />
                            ))}
                            {!isEndPage && <div ref={ref} />}
                            {scrollLoading && <LittleLoading color="#000" />}
                        </div>
                    </S.Tweets>

                    <S.Aside>
                        <Trends />
                        <WhoFollow />
                    </S.Aside>
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
