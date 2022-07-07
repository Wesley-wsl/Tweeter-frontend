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
        handleFilter,
        setTweets,
        filter,
        users,
        handleSearch,
    } = useInfiniteScroll(`/tweet`);

    useEffect(() => {
        handleFilter("top");
    }, []);

    useEffect(() => {
        setSearch("");
    }, [filter]);

    return (
        <NextSEO title="Tweeter - Explore" description="Explore tweets">
            <S.Container>
                <FilterTweets
                    filter={filter}
                    handleFilter={handleFilter}
                    options={[
                        IFilterOptions.TOP,
                        IFilterOptions.LATEST,
                        IFilterOptions.PEOPLE,
                        IFilterOptions.MEDIA,
                    ]}
                />

                <S.TweetsContainer>
                    <S.Search
                        onSubmit={(e: FormEvent<Element>) =>
                            handleSearch(e, search)
                        }
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
                        />
                    </S.Search>
                    {filter !== "people" ? (
                        tweets.map((data: ITweet, index: number) => (
                            <Tweet
                                data={data}
                                key={index}
                                setTweets={setTweets}
                            />
                        ))
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
