import { PersonFill } from "@styled-icons/bootstrap";
import { ViewHide, ViewShow } from "@styled-icons/zondicons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ButtonForm from "../ButtonForm";
import Input from "../Input";
import * as S from "../shared";

const SignUpForm: React.FC = () => {
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
                type="text"
                placeholder="Name"
                IconRight={
                    <PersonFill
                        width="20"
                        color={"#2F80ED"}
                        aria-label="Person Icon"
                        className="formIcon"
                    />
                }
            />
            <Input
                type="email"
                placeholder="Email"
                IconRight={
                    <PersonFill
                        width="20"
                        color={"#2F80ED"}
                        aria-label="Person Icon"
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
                            aria-label="View Show Icon"
                            className="formIcon"
                            onClick={changePasswordMode}
                        />
                    ) : (
                        <ViewHide
                            width="20"
                            color={"#2F80ED"}
                            aria-label="View Show Icon"
                            className="formIcon"
                            onClick={changePasswordMode}
                        />
                    )
                }
            />
            <ButtonForm title="Sign Up" />
            <p>
                <Link href="/">Already have an account? sign in here</Link>
            </p>
        </S.FormContainer>
    );
};

export default SignUpForm;
