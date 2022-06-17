import { CaretDownFill } from "@styled-icons/bootstrap";
import { AccountCircle, ExitToApp, DarkMode } from "@styled-icons/material";
import Image from "next/image";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/Theme";
import { API_BASE_URL } from "../../utils/constants";
import * as S from "./styles";

export const ProfileWidget: React.FC = () => {
    const [showProfile, setShowProfile] = useState(false);
    const { user } = useContext(AuthContext);
    const { toggleTheme } = useContext(ThemeContext);

    function handleTheme() {
        toggleTheme();
        setShowProfile(false);
    }

    function handleLogout() {
        setShowProfile(false);
        destroyCookie(null, "tweeter.data", {
            path: "/",
        });
        Router.push("/");
    }

    const handleMyProfile = () => {
        setShowProfile(false);
        Router.push(`/profile/${user?.id}`);
    };

    return (
        <>
            <S.Container>
                <div onClick={() => setShowProfile(!showProfile)}>
                    <span>
                        <Image
                            src={
                                user && user.avatar != "null"
                                    ? `${API_BASE_URL}/files/${user.avatar}`
                                    : "/background/background.webp"
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
                            <AccountCircle width={22} height={22} />
                            My profile
                        </li>

                        <hr />
                        <li onClick={handleTheme}>
                            <DarkMode width={22} height={22} />
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
            {showProfile && <S.Overlay onClick={() => setShowProfile(false)} />}
        </>
    );
};
