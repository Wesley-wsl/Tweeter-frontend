import { CaretDownFill } from "@styled-icons/bootstrap";
import { AccountCircle, ExitToApp, DarkMode } from "@styled-icons/material";
import Image from "next/image";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./styles";

export const ProfileWidget: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);
    const { user } = useContext(AuthContext);

    function handleLogout() {
        destroyCookie(null, "tweeter.data", {
            path: "/",
        });
        Router.push("/");
    }

    const handleMyProfile = () => Router.push(`/profile/${user?.id}`);

    return (
        <S.Container>
            <div onClick={() => setShowProfile(!showProfile)}>
                <span>
                    <Image
                        src={
                            user && user.avatar != "null"
                                ? user.avatar
                                : "https://pm1.narvii.com/6879/34a567bc12e59a4c20f723a0809f5ad9b6f1df2fr1-736-590v2_hq.jpg"
                        }
                        width="34"
                        height="34"
                        alt="Avatar image"
                    />
                </span>

                <p>{user && user.name}</p>
                <CaretDownFill
                    width={7}
                    height={30}
                    aria-label="Icon arrow down that open profile menu"
                />
            </div>

            {showProfile && (
                <S.Options>
                    <li onClick={handleMyProfile}>
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
