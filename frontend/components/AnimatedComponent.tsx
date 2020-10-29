import classnames from "classnames";
import { genericAnimationType } from "../types/genericAnimationType";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import styles from "../styles/articleToShow.module.scss";
import { useEffect, useState } from "react";

type AnimatedComponentType = {
    content: string | JSX.Element;
    variant: genericAnimationType;
    initial?: string;
    animate?: string;
    exit?: string;
    animationTime?: number;
    baseClassNames: { readonly [key: string]: boolean };
};

const AnimatedComponent: React.FC<AnimatedComponentType> = ({
    content,
    animate = "animate",
    exit = "exit",
    initial = "initial",
    variant,
    animationTime = 0.5,
    baseClassNames,
}) => {
    const [displayComponent, setDisplayComponent] = useState(true);
    const [contentToShow, setContentToShow] = useState(content);

    const componentStyles = Object.assign(baseClassNames, {
        [styles.animationContainer]: true,
    });

    useEffect(() => {
        setDisplayComponent(false);

        setTimeout(() => {
            setContentToShow(content);
            setDisplayComponent(true);
        }, animationTime * 1000);
    }, [content]);

    return (
        <div className={classnames(componentStyles)}>
            <AnimatePresence>
                {displayComponent && (
                    <motion.h1
                        variants={variant}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        layout
                        className={styles.p}
                    >
                        {contentToShow}
                    </motion.h1>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnimatedComponent;
