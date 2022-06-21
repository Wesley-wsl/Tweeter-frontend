export const modal = {
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        scale: 0,
        y: "-100vh",
    },
};

export const overlay = {
    visible: {
        opacity: 1,
    },
    hidden: {
        opacity: 0,
    },
};

export const widget = {
    visible: {
        opacity: 1,
        scale: 1,
    },
    hidden: {
        opacity: 0,
        scale: 0,
    },
};

export const pageTransition = {
    hidden: { opacity: 0, x: -200, y: 0 },
    visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { type: "linear", duration: 0.7 },
    },
    exit: { opacity: 0, x: 200, y: -20 },
};

export const fadeInUp = {
    hidden: {
        y: 60,
        opacity: 0,
    },
    enter: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.9,
        },
    },
};

export const fadeInScroll = {
    hidden: {
        y: 60,
        opacity: 0,
    },
    enter: {
        y: 0,
        opacity: 1,
    },
};

export const fadeInLeft = {
    hidden: {
        x: 60,
        opacity: 0,
    },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
};

export const fadeInRight = {
    hidden: {
        x: -60,
        opacity: 0,
    },
    enter: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
};

export const menuMobile = {
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
    },
    hidden: {
        opacity: 1,
        scale: 0,
        x: "-100vh",
    },
};

export const optionMobile = {
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
    },
    hidden: {
        opacity: 1,
        scale: 0,
        x: "-100vh",
    },
};
