import Main from "../components/Main";
import { NextSEO } from "../components/NextSEO";

export default function Home() {
    return (
        <NextSEO title="Nextjs SEO - Boilerplate" description="A boilerplate.">
            <Main />
        </NextSEO>
    );
}
