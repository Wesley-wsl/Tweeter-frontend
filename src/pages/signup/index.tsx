import CustomBackground from "../../components/CustomBackground";
import SignUpForm from "../../components/Form/SignUpForm";
import NextSEO from "../../components/NextSEO";

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
