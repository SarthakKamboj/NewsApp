import classnames from "classnames";
import { genericAnimationType } from "../types/genericAnimationType";
import {
    AnimatePresence,
    ForwardRefComponent,
    HTMLMotionProps,
} from "framer-motion";
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
    FramerComponentToDisplay?: ForwardRefComponent<
        HTMLHeadingElement,
        HTMLMotionProps<any>
    >;
    styles: {
        readonly [key: string]: string;
    };
};

// This component acts as a wrapper for a Framer Component but with extra overflow properties
// I also created this wrapper to add aspects of modularity and re-usability when creating animations
const AnimatedComponent: React.FC<AnimatedComponentType> = ({
    content,
    dependency,
    animate = "animate",
    exit = "exit",
    initial = "initial",
    variant,
    animationTime = 0.5,
    baseClassNames,
    styles,
    FramerComponentToDisplay,
}) => {
    const [displayComponent, setDisplayComponent] = useState(false);
    const [contentToShow, setContentToShow] = useState(content);

    const componentStyles = Object.assign(baseClassNames, {
        [styles.animationContainer]: true,
    });

    useEffect(() => {
        setDisplayComponent(false);

        // I use setTimeout to give time for the exit animation before rendering the new information
        // This is due to the nature of the AnimatePresence component
        setTimeout(() => {
            setContentToShow(content);
            setDisplayComponent(true);
        }, animationTime * 1000);

        // I declare a separate variable called depencdency rather than
        // using contentToShow because sometimes I want to re-render an
        // animation even though the contentToShow may remain the same
    }, [dependency]);

    return (
        <div className={classnames(componentStyles)}>
            {/* The AnimatePresence component adds exit animation functionalities when 
            combined with a boolean value that control the child component's presence*/}
            <AnimatePresence>
                {displayComponent && (
                    <FramerComponentToDisplay
                        variants={variant}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        layout
                        className={styles.p}
                    >
                        {contentToShow}
                    </FramerComponentToDisplay>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnimatedComponent;
