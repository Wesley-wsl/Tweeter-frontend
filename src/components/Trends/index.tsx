import { Close } from "@styled-icons/material";
import { motion } from "framer-motion";
import React from "react";

import { IShowTrend, ITrends } from "../../@types";
import { useFetch } from "../../hooks/useFetch";
import { fadeInLeft } from "../../utils/variants";
import LittleLoading from "../LittleLoading";
import * as S from "./styles";

const Trends = ({ handleSearch, search }: ITrends) => {
    const { data: trends } = useFetch("/tweet/me/trends");

    return (
        <>
            <S.Container
                as={motion.div}
                variants={fadeInLeft}
                initial="hidden"
                animate="enter"
            >
                <p>Trends for you</p>

                {trends ? (
                    trends.data.map((trend: IShowTrend, index: number) => (
                        <motion.div
                            animate={
                                trend.trend.slice(1) === search
                                    ? { scale: 1.1, x: 10 }
                                    : { scale: 1, x: 0 }
                            }
                            onClick={e =>
                                trend.trend.slice(1) !== search
                                    ? handleSearch(e, trend.trend.slice(1))
                                    : handleSearch(e, "")
                            }
                            key={index}
                            className={
                                trend.trend.slice(1) === search
                                    ? "trendActive"
                                    : ""
                            }
                        >
                            <p>{trend.trend}</p>
                            <p>{trend.tweetsQuantity} Tweets</p>
                            {trend.trend.slice(1) === search && (
                                <S.CloseTrend>
                                    <Close width={16} height={16} />
                                </S.CloseTrend>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <S.LoadingContainer>
                        <LittleLoading color="#000" />
                    </S.LoadingContainer>
                )}
            </S.Container>
        </>
    );
};

export default Trends;
