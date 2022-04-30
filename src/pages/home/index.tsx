import Header from "../../components/Header";
import NextSEO from "../../components/NextSEO";
import Trends from "../../components/Trends";
import Tweet from "../../components/Tweet";
import WhoFollow from "../../components/WhoFollow";
import WriteTweet from "../../components/WriteTweet";
import * as S from "../../styles/pages/Home";

export default function Home() {
    return (
        <NextSEO
            title="Tweeter - Home"
            description="Homepage with tweets destinate to your profile"
        >
            <>
                <Header />
                <S.Container>
                    <S.Tweets>
                        <WriteTweet />
                        <Tweet />
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
