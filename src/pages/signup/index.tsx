import { GetServerSideProps } from "next";

import CustomBackground from "../../components/CustomBackground";
import SignUpForm from "../../components/Form/SignUpForm";
import NextSEO from "../../components/NextSEO";
import { ensureAuthentication } from "../../utils/ensureAuthentication";

export default function SignUp() {
    return (
        <NextSEO
            title="Tweeter - Sign Up"
            description="Page for register an account in Tweeter"
        >
            <CustomBackground image={"/background/background.webp"}>
                <SignUpForm />
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
