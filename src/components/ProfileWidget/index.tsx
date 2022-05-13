import { CaretDownFill } from "@styled-icons/bootstrap";
import { AccountCircle, ExitToApp, DarkMode } from "@styled-icons/material";
import Image from "next/image";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { useState } from "react";
import { useSelector } from "react-redux";

import { IRootState } from "../../@types";
import * as S from "./styles";

export const ProfileWidget: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);
    const { user, avatar } = useSelector((state: IRootState) => state.value);

    function handleLogout() {
        destroyCookie(null, "tweeter-token");
        Router.push("/");
    }

    return (
        <S.Container>
            <div onClick={() => setShowProfile(!showProfile)}>
                <span>
                    <Image
                        src={avatar}
                        width="34"
                        height="34"
                        alt="Avatar image"
                    />
                </span>

                <p>{user.name}</p>
                <CaretDownFill
                    width={7}
                    height={30}
                    aria-label="Icon arrow down that open profile menu"
                />
            </div>

            {showProfile && (
                <S.Options>
                    <li>
                        <AccountCircle width={22} height={22} color="#111" />
                        My profile
                    </li>

                    <hr />
                    <li>
                        <DarkMode width={22} height={22} color="#111" />
                        Dark Mode
                    </li>
                    <hr />
                    <li onClick={handleLogout}>
                        <ExitToApp width={22} height={22} color="red" />
                        Logout
                    </li>
                </S.Options>
            )}
        </S.Container>
    );
};
