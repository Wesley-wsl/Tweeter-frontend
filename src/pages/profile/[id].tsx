import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { IFilterOptions, ITweet, IUserData } from "../../@types";
import AboutProfile from "../../components/AboutProfile";
import BackgroundProfile from "../../components/BackgroundProfile";
import FilterTweets from "../../components/FilterTweets";
import LittleLoading from "../../components/LittleLoading";
import { Loading } from "../../components/Loading";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import { useFetch } from "../../hooks/useFetch";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import * as S from "../../styles/pages/Profile";
import { ensureAuthentication } from "../../utils/ensureAuthentication";

export default function Profile() {
    const router = useRouter();
    const { id } = router.query;
    const { data: user }: IUserData = useFetch(`/user/${id}`);
    const {
        isEndPage,
        ref,
        scrollLoading,
        tweets,
        handleFilter,
        filter,
        setTweets,
        handleReset,
    } = useInfiniteScroll(`/tweet/${id}`);

    useEffect(() => {
        handleReset();
    }, [id]);

    if (!user || !tweets) return <Loading />;

    return (
        <NextSEO
            title="Tweeter - Profile"
            description="Page with your profile informations."
        >
            <S.Container>
                <BackgroundProfile
                    background={user.data.background}
                    userId={user.data.id}
                />
                <AboutProfile userInformations={user.data} />
                <S.Tweets>
                    <FilterTweets
                        filter={filter}
                        handleFilter={handleFilter}
                        options={[
                            IFilterOptions.TWEETS,
                            IFilterOptions.MEDIA,
                            IFilterOptions.LIKES,
                        ]}
                    />

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
                        {!isEndPage && (
                            <div
                                style={{
                                    marginBottom: "50rem",
                                }}
                            />
                        )}
                    </div>
                </S.Tweets>
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
