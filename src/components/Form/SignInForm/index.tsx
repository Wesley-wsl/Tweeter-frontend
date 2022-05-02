import { yupResolver } from "@hookform/resolvers/yup";
import { PersonFill } from "@styled-icons/bootstrap";
import { ViewShow, ViewHide } from "@styled-icons/zondicons";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { IHandleSignIn } from "../../../@types";
import signInFormSchema from "../../../schemas/signIn";
import api from "../../../services/api";
import ButtonForm from "../ButtonForm";
import Input from "../Input";
import * as S from "../shared";

const SignInForm: React.FC = () => {
    const [hidePassword, setHidePassword] = useState(true);

    const changePasswordMode = () => setHidePassword(!hidePassword);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IHandleSignIn>({
        resolver: yupResolver(signInFormSchema),
    });

    const handleSignIn: SubmitHandler<IHandleSignIn> = data => {
        api.post("/user/login", data)
            .then(response => {
                setCookie(
                    undefined,
                    "tweeter-token",
                    response.data.data.token,
                    {
                        maxAge: 60 * 60 * 1, // 1 hour
                    },
                );
                toast.success("Successfully logged in");
                Router.push(`/profile/${response.data.data.user.id}`);
            })
            .catch(error =>
                toast.error(
                    error.response.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    };

    return (
        <S.FormContainer onSubmit={handleSubmit(handleSignIn)}>
            <span>
                <Image
                    src={"/assets/tweeter.svg"}
                    width="200"
                    height="45"
                    alt="Logo"
                />
            </span>
            <Input
                type="email"
                placeholder="Email"
                error={errors.email}
                {...register("email")}
                autoComplete="email"
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
                error={errors.password}
                {...register("password")}
                maxLength={18}
                autoComplete="current-password"
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
