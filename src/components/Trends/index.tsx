import { Close } from "@styled-icons/material";
import { motion } from "framer-motion";
import React, { FormEvent } from "react";

import { IShowTrend, ITrends } from "../../@types";
import { useFetch } from "../../hooks/useFetch";
import { fadeInLeft } from "../../utils/variants";
import * as S from "./styles";

const Trends = ({ handleReset, search }: ITrends) => {
    const { data: trends } = useFetch("/tweet/me/trends");

    const onChangeTrend = (e: FormEvent, trend: IShowTrend) => {
        e.preventDefault();
        trend.trend.slice(1) !== search
            ? handleReset("backend", "latest")
            : handleReset("", "latest");
    };

    return (
        <>
            <S.Container
                as={motion.div}
                variants={fadeInLeft}
                initial="hidden"
                animate="enter"
            >
                <p>Trends for you</p>

                {trends &&
                    trends.data.map((trend: IShowTrend, index: number) => (
                        <motion.div
                            animate={
                                trend.trend.slice(1) === search
                                    ? { scale: 1.1, x: 10 }
                                    : { scale: 1, x: 0 }
                            }
                            onClick={e => onChangeTrend(e, trend)}
                            key={index}
                            className={
                                trend.trend.slice(1) === search
                                    ? "trendActive"
                                    : ""
                            }
                            data-testid="trend"
                        >
                            <p>{trend.trend}</p>
                            <p>{trend.tweetsQuantity} Tweets</p>
                            {trend.trend.slice(1) === search && (
                                <S.CloseTrend>
                                    <Close
                                        width={16}
                                        height={16}
                                        aria-label="Close icon to deselect trend."
                                    />
                                </S.CloseTrend>
                            )}
                        </motion.div>
                    ))}
                {!trends?.data[0] && <p>Don&apos;t have trends for you yet.</p>}
            </S.Container>
        </>
    );
};

export default Trends;
