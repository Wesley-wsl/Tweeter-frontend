import { PersonAdd } from "@styled-icons/ionicons-sharp";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { ITweet, IUserData } from "../../@types";
import AvatarProfile from "../../components/AvatarProfile";
import BackgroundProfile from "../../components/BackgroundProfile";
import { Button } from "../../components/Button";
import Header from "../../components/Header";
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
    const { isEndPage, ref, scrollLoading, tweets, handleFilter, filter } =
        useInfiniteScroll(`/tweet/${id}`);

    if (!user || !tweets) return <Loading />;

    return (
        <NextSEO
            title="Tweeter - Profile"
            description="Page with your profile informations."
        >
            <>
                <Header />
                <S.Container>
                    <BackgroundProfile
                        background={user.data.background}
                        userId={user.data.id}
                    />
                    <S.About>
                        <AvatarProfile
                            avatar={user.data.avatar}
                            userId={user.data.id}
                        />

                        <S.Informations>
                            <div>
                                <div className="top-informations">
                                    <h2>{user.data.name}</h2>
                                    <p>
                                        <span>{user.data.followingCount}</span>{" "}
                                        Following
                                    </p>
                                    <p>
                                        <span>{user.data.followersCount}</span>{" "}
                                        Followers
                                    </p>
                                </div>

                                <Button
                                    title="Follow"
                                    iconLeft={
                                        <PersonAdd
                                            width={12}
                                            height={12}
                                            aria-label="Person add icon"
                                        />
                                    }
                                />
                            </div>
                            <S.Description>
                                {user.data.about_me.length !== 0
                                    ? user.data.about_me
                                    : "Nothing about me. :/"}
                            </S.Description>
                        </S.Informations>
                    </S.About>

                    <S.Tweets>
                        <S.TweetsFilterProfile>
                            <li
                                className={`${filter === "" ? "active" : ""}`}
                                onClick={() => handleFilter("")}
                            >
                                Tweets
                            </li>
                            <li
                                className={`${
                                    filter === "media" ? "active" : ""
                                }`}
                                onClick={() => handleFilter("media")}
                            >
                                Media
                            </li>
                            <li
                                className={`${
                                    filter === "likes" ? "active" : ""
                                }`}
                                onClick={() => handleFilter("likes")}
                            >
                                Likes
                            </li>
                        </S.TweetsFilterProfile>

                        <div>
                            {tweets &&
                                tweets.map((data: ITweet, index: number) => (
                                    <Tweet data={data} key={index} />
                                ))}
                            {!isEndPage && <div ref={ref} />}
                            {scrollLoading && <LittleLoading color="#000" />}
                        </div>
                    </S.Tweets>
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
