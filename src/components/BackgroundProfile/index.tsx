import { ImageAdd } from "@styled-icons/boxicons-regular";
import React from "react";
import { useContext, useState } from "react";

import { IBackgroundProfile } from "../../@types";
import Dropzone from "../../components/Dropzone";
import Modal from "../../components/Modal";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./styles";

const BackgroundProfile: React.FC<IBackgroundProfile> = ({
    background,
    userId,
}) => {
    const [showBackgroundModal, setShowBackgroundModal] = useState(false);
    const { user: userAuthenticated } = useContext(AuthContext);

    return (
        <>
            <S.Container
                image={
                    `http://localhost:3333/files/${background}` ??
                    "/background/background.webp"
                }
            >
                {userAuthenticated && userAuthenticated.id === userId && (
                    <div
                        className="changeImage"
                        onClick={() =>
                            setShowBackgroundModal(!showBackgroundModal)
                        }
                    >
                        <ImageAdd width={25} height={25} color={"#fff"} />
                    </div>
                )}
            </S.Container>
            <Modal
                isActive={showBackgroundModal}
                setIsActive={setShowBackgroundModal}
            >
                <Dropzone
                    imageName={"background"}
                    setIsActive={setShowBackgroundModal}
                />
            </Modal>
        </>
    );
};

export default BackgroundProfile;
