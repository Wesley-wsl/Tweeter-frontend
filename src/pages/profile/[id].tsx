import { PersonAdd } from "@styled-icons/ionicons-sharp";
import { GetServerSideProps } from "next";
import Image from "next/image";

import { Button } from "../../components/Button";
import Header from "../../components/Header";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import * as S from "../../styles/pages/Profile";
import { ensureAuthentication } from "../../utils/ensureAuthentication";
import { user } from "../../utils/helper";

export default function Profile() {
    return (
        <NextSEO
            title="Tweeter - Profile"
            description="Page with your profile informations."
        >
            <>
                <Header />
                <S.Container>
                    <S.BackgroundProfile image={user.background} />
                    <S.About>
                        <span className="avatar">
                            <Image
                                width="160"
                                height="160"
                                src={user.avatar}
                                alt="Profile Avatar"
                            />
                        </span>

                        <S.Informations>
                            <div>
                                <div className="top-informations">
                                    <h2>{user.name}</h2>
                                    <p>
                                        <span>{user.followingCount}</span>{" "}
                                        Following
                                    </p>
                                    <p>
                                        <span>{user.followersCount}</span>{" "}
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

                            <S.Description>{user.about_me}</S.Description>
                        </S.Informations>
                    </S.About>

                    <S.Tweets>
                        <S.TweetsFilterProfile>
                            <li className="active">Tweets</li>
                            <li>Tweets &amp; replies</li>
                            <li>Media</li>
                            <li>Likes</li>
                        </S.TweetsFilterProfile>

                        <div>
                            <Tweet />
                            <Tweet />
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
