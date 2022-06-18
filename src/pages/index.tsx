import { GetServerSideProps } from "next";

import CustomBackground from "../components/CustomBackground";
import SignInForm from "../components/Form/SignInForm";
import NextSEO from "../components/NextSEO";
import { ensureAuthentication } from "../utils/ensureAuthentication";

export default function SignIn() {
    return (
        <NextSEO
            title="Tweeter - Sign In"
            description="Sign In page for enter in tweeter with your account"
            opacityTransition
        >
            <CustomBackground image={"/background/background.webp"}>
                <SignInForm />
            </CustomBackground>
        </NextSEO>
    );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const userId = await ensureAuthentication(ctx);

    if (userId) {
        return {
            redirect: {
                destination: `/profile/${userId}`,
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
