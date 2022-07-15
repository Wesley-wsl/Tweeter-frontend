import { Search } from "@styled-icons/material-outlined";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import { FormEvent, useEffect, useState } from "react";

import { IAuthor, IFilterOptions, ITweet } from "../../@types";
import { Button } from "../../components/Button";
import FilterTweets from "../../components/FilterTweets";
import FollowCard from "../../components/FollowCard";
import LittleLoading from "../../components/LittleLoading";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import * as S from "../../styles/pages/Explorer";
import { ensureAuthentication } from "../../utils/ensureAuthentication";
import { fadeInUp } from "../../utils/variants";

export default function Explorer() {
    const [search, setSearch] = useState("");
    const {
        isEndPage,
        ref,
        scrollLoading,
        tweets,
        mutateTweets,
        filter,
        users,
        handleReset,
    } = useInfiniteScroll(`/tweet`);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        handleReset(search, filter);
    };

    useEffect(() => {
        handleReset("", "top");
    }, []);

    useEffect(() => {
        setSearch("");
    }, [filter]);

    return (
        <NextSEO title="Tweeter - Explore" description="Explore tweets">
            <S.Container>
                <FilterTweets
                    filter={filter}
                    handleReset={handleReset}
                    options={[
                        IFilterOptions.TOP,
                        IFilterOptions.LATEST,
                        IFilterOptions.PEOPLE,
                        IFilterOptions.MEDIA,
                    ]}
                />

                <S.TweetsContainer>
                    <S.Search
                        onSubmit={(e: FormEvent<Element>) => handleSearch(e)}
                        as={motion.form}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="enter"
                    >
                        <Search
                            width={25}
                            height={25}
                            color="#BDBDBD"
                            aria-label="A search icon to search for a tweet."
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={({ target }) => setSearch(target.value)}
                            value={search}
                        />
                        <Button
                            title="Search"
                            color={"#2D9CDB"}
                            type="submit"
                            data-cy="search-button"
                        />
                    </S.Search>
                    {filter !== "people" ? (
                        tweets?.map((data: ITweet[]) => {
                            return data.map((tweet: ITweet, index: number) => (
                                <Tweet
                                    data={tweet}
                                    key={index}
                                    mutateTweets={mutateTweets}
                                />
                            ));
                        })
                    ) : (
                        <S.Cards
                            as={motion.div}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="enter"
                            exit="exit"
                        >
                            {users.map((data: IAuthor, index: number) => (
                                <FollowCard data={data} key={index} />
                            ))}
                        </S.Cards>
                    )}

                    {!isEndPage && !scrollLoading && <div ref={ref} />}
                    {scrollLoading && <LittleLoading />}
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
