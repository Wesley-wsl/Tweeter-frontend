import { GetServerSideProps } from "next";
import { Key, useContext } from "react";

import { IFilterOptions, ITweet } from "../../@types";
import FilterTweets from "../../components/FilterTweets";
import LittleLoading from "../../components/LittleLoading";
import { Loading } from "../../components/Loading";
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
        handleFilter,
        setTweets,
        ref,
        isEndPage,
        scrollLoading,
    } = useInfiniteScroll(`user/${user?.id}/bookmarks`);

    if (!bookmarks) return <Loading />;

    return (
        <NextSEO
            title="Tweeter - Bookmarks"
            description="Explore your bookmarks"
        >
            <S.Container>
                <FilterTweets
                    filter={filter}
                    handleFilter={handleFilter}
                    options={[
                        IFilterOptions.TWEETS,
                        IFilterOptions.MEDIA,
                        IFilterOptions.LIKES,
                    ]}
                />

                <S.TweetsContainer>
                    {bookmarks.length !== 0 &&
                        bookmarks.map((data: ITweet, index: Key) => (
                            <Tweet
                                data={data}
                                key={index}
                                setTweets={setTweets}
                            />
                        ))}
                    {!isEndPage && <div ref={ref} />}
                    {scrollLoading && <LittleLoading color="#000" />}
                    {!isEndPage && (
                        <div
                            style={{
                                marginBottom: "50rem",
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
