import { PersonAdd } from "@styled-icons/ionicons-sharp";
import Image from "next/image";

import { Button } from "../../components/Button";
import Header from "../../components/Header";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import * as S from "../../styles/pages/Profile";

export default function Profile() {
    return (
        <NextSEO
            title="Tweeter - Profile"
            description="Page with your profile informations."
        >
            <>
                <Header />
                <S.Container>
                    <S.BackgroundProfile
                        image={"/background/background.webp"}
                    />
                    <S.About>
                        <span className="avatar">
                            <Image
                                width="160"
                                height="160"
                                src="/background/akishino.webp"
                                alt="Profile Avatar"
                            />
                        </span>

                        <S.Informations>
                            <div>
                                <div className="top-informations">
                                    <h2>Aki Shino</h2>
                                    <p>
                                        <span>2,495</span> Following
                                    </p>
                                    <p>
                                        <span>10.98K</span> Followers
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
                                Photographer e Filmmaker based in Copenhagen,
                                Denmarrk.
                            </S.Description>
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
