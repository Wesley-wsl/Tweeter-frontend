import { PersonFill } from "@styled-icons/bootstrap";
import { ViewShow, ViewHide } from "@styled-icons/zondicons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ButtonForm from "../ButtonForm";
import Input from "../Input";
import * as S from "../shared";

const SignInForm: React.FC = () => {
    const [hidePassword, setHidePassword] = useState(true);

    const changePasswordMode = () => setHidePassword(!hidePassword);

    return (
        <S.FormContainer>
            <Image
                src={"/assets/tweeter.svg"}
                width="200"
                height="90"
                alt="Logo"
            />
            <Input
                type="email"
                placeholder="Email"
                IconRight={
                    <PersonFill
                        width="20"
                        color={"#2F80ED"}
                        aria-label="Person icon for field email"
                        className="formIcon"
                    />
                }
            />
            <Input
                type={hidePassword ? "password" : "text"}
                placeholder="Password"
                IconRight={
                    hidePassword ? (
                        <ViewShow
                            width="20"
                            color={"#2F80ED"}
                            aria-label="View Show Icon that indicate password hide"
                            className="formIcon"
                            onClick={changePasswordMode}
                        />
                    ) : (
                        <ViewHide
                            width="20"
                            color={"#2F80ED"}
                            aria-label="View Hide Icon that indicate password not hide"
                            className="formIcon"
                            onClick={changePasswordMode}
                        />
                    )
                }
            />
            <ButtonForm title="Sign In" />
            <p>
                <Link href="/signup">
                    Don&apos; t have an account? register here
                </Link>
            </p>
        </S.FormContainer>
    );
};

export default SignInForm;
