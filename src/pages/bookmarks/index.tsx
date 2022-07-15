import { GetServerSideProps } from "next";
import { useContext } from "react";

import { IFilterOptions, ITweet } from "../../@types";
import FilterTweets from "../../components/FilterTweets";
import LittleLoading from "../../components/LittleLoading";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import { AuthContext } from "../../contexts/AuthContext";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import * as S from "../../styles/pages/Explorer";
import { ensureAuthentication } from "../../utils/ensureAuthentication";

export default function Bookmarks() {
    const { user } = useContext(AuthContext);
    const {
        tweets: bookmarks,
        filter,
        handleReset,
        mutateTweets,
        ref,
        isEndPage,
        scrollLoading,
    } = useInfiniteScroll(`user/${user?.id}/bookmarks`);

    return (
        <NextSEO
            title="Tweeter - Bookmarks"
            description="Explore your bookmarks"
        >
            <S.Container>
                <FilterTweets
                    filter={filter}
                    handleReset={handleReset}
                    options={[
                        IFilterOptions.TWEETS,
                        IFilterOptions.MEDIA,
                        IFilterOptions.LIKES,
                    ]}
                />

                <S.TweetsContainer>
                    {bookmarks?.map((data: ITweet[]) => {
                        return data.map((bookmark, index: number) => (
                            <Tweet
                                data={bookmark}
                                key={index}
                                mutateTweets={mutateTweets}
                            />
                        ));
                    })}
                    {!isEndPage && !scrollLoading && <div ref={ref} />}
                    {scrollLoading && <LittleLoading />}
                    {!isEndPage && (
                        <div
                            style={{
                                marginBottom: "57rem",
                            }}
                        />
                    )}
                </S.TweetsContainer>
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
