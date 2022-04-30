import Header from "../../components/Header";
import NextSEO from "../../components/NextSEO";
import Tweet from "../../components/Tweet";
import * as S from "../../styles/pages/Explorer";
import { TweetsFilterProfile } from "../../styles/pages/Profile";

export default function Bookmarks() {
    return (
        <NextSEO
            title="Tweeter - Bookmarks"
            description="Explore your bookmarks"
        >
            <>
                <Header />
                <S.Container>
                    <TweetsFilterProfile>
                        <li className="active">Tweets</li>
                        <li>Tweets &amp; replies</li>
                        <li>Media</li>
                        <li>Likes</li>
                    </TweetsFilterProfile>

                    <S.TweetsContainer>
                        <Tweet />
                        <Tweet />
                        <Tweet />
                    </S.TweetsContainer>
                </S.Container>
            </>
        </NextSEO>
    );
}
