import { genericAnimationType } from "../types/genericAnimationType";

export const animationTime = 0.8;

const titleYChange = 500;
export const titleVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        y: titleYChange,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        opacity: 0,
        y: titleYChange,
        transition: {
            duration: animationTime,
        },
    },
};

const authorChangeX = -120;
export const authorVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        x: authorChangeX,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        opacity: 0,
        x: authorChangeX,
        transition: {
            duration: animationTime,
        },
    },
};

const nameChangeY = -120;
export const baseNameVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        y: nameChangeY,
        transition: {
            duration: animationTime,
        },
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
        opacity: 0,
        y: nameChangeY,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
};

const descriptionYChange = -200;
export const descriptionVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        y: descriptionYChange,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
        opacity: 0,
        y: descriptionYChange,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
};

const thumbnailChangeX = 1500;
export const thumbnailVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        x: thumbnailChangeX,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        x: thumbnailChangeX,
        transition: {
            duration: animationTime,
        },
    },
};

export const linkVariant: genericAnimationType = {
    initial: {
        scale: 0,
    },
    animate: {
        scale: 1,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
        scale: 0,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
};

const dateChangeX = -120;
export const dateVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        x: dateChangeX,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: animationTime,
        },
    },
    exit: {
        opacity: 0,
        x: dateChangeX,
        transition: {
            duration: animationTime,
        },
    },
};

export const noArticleSelectedVariant: genericAnimationType = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: animationTime,
            type: "tween",
        },
    },
};
