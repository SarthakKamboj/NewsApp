import classnames from "classnames";
import { genericAnimationType } from "../types/genericAnimationType";
import {
    AnimatePresence,
    ForwardRefComponent,
    HTMLMotionProps,
} from "framer-motion";
import styles from "../styles/articleToShow.module.scss";
import { useEffect, useState } from "react";
import React from "react";

type AnimatedComponentType = {
    content: string | JSX.Element;
    variant: genericAnimationType;
    initial?: string;
    animate?: string;
    exit?: string;
    animationTime?: number;
    baseClassNames: { readonly [key: string]: boolean };
    dependency: any;
    TypeComponentToDisplay?: ForwardRefComponent<
        HTMLHeadingElement,
        HTMLMotionProps<any>
    >;
};

const AnimatedComponent: React.FC<AnimatedComponentType> = ({
    content,
    dependency,
    animate = "animate",
    exit = "exit",
    initial = "initial",
    variant,
    animationTime = 0.5,
    baseClassNames,
    TypeComponentToDisplay,
}) => {
    const [displayComponent, setDisplayComponent] = useState(false);
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
    }, [dependency]);

    return (
        <div className={classnames(componentStyles)}>
            <AnimatePresence>
                {displayComponent && (
                    <TypeComponentToDisplay
                        variants={variant}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        layout
                        className={styles.p}
                    >
                        {contentToShow}
                    </TypeComponentToDisplay>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnimatedComponent;
