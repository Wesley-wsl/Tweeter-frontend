import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSWRConfig } from "swr";

import { IDropzone } from "../../@types";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import { Loading } from "../Loading";
import * as S from "./styles";

const Dropzone: React.FC<IDropzone> = ({ imageName, setIsActive }) => {
    const { user, setUser } = useContext(AuthContext);
    const [isLoadingUpload, setIsLoadingUpload] = useState(false);
    const { mutate } = useSWRConfig();

    const onDropAccepted = async (file: File[]) => {
        const inputFile = file[0];

        const formData = new FormData();
        formData.append(imageName, inputFile);
        setIsLoadingUpload(true);
        await api
            .put(`/user/${user?.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(response => {
                setUser({
                    avatar: response.data.user.avatar,
                    id: response.data.user.id,
                    name: response.data.user.name,
                });
                mutate(`/user/${user?.id}`);
            });
        setIsLoadingUpload(false);
        setIsActive && setIsActive(false);
    };

    const { getRootProps, getInputProps, isDragReject, isDragActive } =
        useDropzone({
            maxFiles: 1,
            maxSize: 7 * 1000 * 1000,
            accept: {
                "image/png": [".png"],
                "image/jpg": [".jpg"],
                "image/jpeg": [".jpeg"],
            },
            onDropAccepted,
        });

    if (isLoadingUpload) return <Loading />;

    return (
        <>
            <S.Container
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
            >
                <div className="dropzone__container">
                    <input {...getInputProps()} />

                    {isDragReject ? (
                        <p className="error">
                            File not supported, drag and drop one file jpg, png
                            or jpeg. Maximum size: 7MB
                        </p>
                    ) : (
                        <p>
                            Drag and drop one file here, or click here to select
                            file
                        </p>
                    )}
                </div>
            </S.Container>
        </>
    );
};

export default Dropzone;
