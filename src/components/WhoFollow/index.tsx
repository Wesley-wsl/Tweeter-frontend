import { motion } from "framer-motion";

import { useFetch } from "../../hooks/useFetch";
import { fadeInLeft } from "../../utils/variants";
import PersonToFollow from "../PersonToFollow";
import * as S from "./styles";

const WhoFollow: React.FC = () => {
    const { data: whoFollow } = useFetch("/user/me/whofollow");

    return (
        <S.Container
            as={motion.div}
            variants={fadeInLeft}
            initial="hidden"
            animate="enter"
        >
            <p>Who to follow</p>
            <S.WhoFollow>
                {whoFollow?.data[0] && (
                    <PersonToFollow data={whoFollow.data[0]} />
                )}
                {whoFollow?.data[1] && (
                    <PersonToFollow data={whoFollow.data[1]} />
                )}
                {!whoFollow?.data[0] && <p>Nobody to indicate</p>}
            </S.WhoFollow>
        </S.Container>
    );
};

export default WhoFollow;
