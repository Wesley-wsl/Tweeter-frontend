import { yupResolver } from "@hookform/resolvers/yup";
import { PersonFill } from "@styled-icons/bootstrap";
import { ViewHide, ViewShow } from "@styled-icons/zondicons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { IHandleSignUp } from "../../../@types";
import signUpFormSchema from "../../../schemas/signUp";
import api from "../../../services/api";
import ButtonForm from "../ButtonForm";
import Input from "../Input";
import * as S from "../shared";

const SignUpForm: React.FC = () => {
    const [hidePassword, setHidePassword] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IHandleSignUp>({
        resolver: yupResolver(signUpFormSchema),
    });

    const changePasswordMode = () => setHidePassword(!hidePassword);

    const handleSignUp: SubmitHandler<IHandleSignUp> = async data => {
        api.post("/user/", data)
            .then(() => {
                reset();
                toast.success("User created with success.");
            })
            .catch(error =>
                toast.error(
                    error.response.data.error ??
                        "Something went wrong, please try again later.",
                ),
            );
    };

    return (
        <S.FormContainer onSubmit={handleSubmit(handleSignUp)}>
            <span>
                <Image
                    src={"/assets/tweeter.svg"}
                    width="200"
                    height="45"
                    alt="Logo"
                />
            </span>

            <Input
                type="text"
                placeholder="Name"
                {...register("name")}
                error={errors.name}
                maxLength={36}
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
                autoComplete="email"
                placeholder="Email"
                {...register("email")}
                error={errors.email}
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
                autoComplete="current-password"
                error={errors.password}
                maxLength={18}
                {...register("password")}
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
