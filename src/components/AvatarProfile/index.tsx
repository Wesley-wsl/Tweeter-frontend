import { ImageAdd } from "@styled-icons/boxicons-regular";
import Image from "next/image";
import React, { useContext, useState } from "react";

import { IAvatarProfile } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import Dropzone from "../Dropzone";
import Modal from "../Modal";
import * as S from "./styles";

const AvatarProfile: React.FC<IAvatarProfile> = ({ avatar, userId }) => {
    const [showModal, setShowModal] = useState(false);
    const { user: userAuthenticated } = useContext(AuthContext);

    const handleShowModal = () => setShowModal(!showModal);
    return (
        <>
            <S.Container>
                <Image
                    width="160"
                    height="160"
                    src={
                        `http://localhost:3333/files/${avatar}` ??
                        "/background/background.webp"
                    }
                    alt="Profile Avatar"
                />
                {userAuthenticated && userAuthenticated.id === userId && (
                    <div className="changeImage" onClick={handleShowModal}>
                        <ImageAdd width={25} height={25} color={"#fff"} />
                    </div>
                )}
            </S.Container>
            <Modal isActive={showModal} setIsActive={setShowModal}>
                <Dropzone imageName="avatar" setIsActive={setShowModal} />
            </Modal>
        </>
    );
};

export default AvatarProfile;
