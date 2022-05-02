import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

import CustomBackground from "../components/CustomBackground";
import SignInForm from "../components/Form/SignInForm";
import NextSEO from "../components/NextSEO";

export default function SignIn() {
    return (
        <NextSEO
            title="Tweeter - Sign In"
            description="Sign In page for enter in tweeter with your account"
        >
            <CustomBackground image={"/background/background.webp"}>
                <SignInForm />
            </CustomBackground>
        </NextSEO>
    );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const { "tweeter-token": token } = parseCookies(ctx);

    if (token) {
        return {
            redirect: {
                destination: "/home",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};
