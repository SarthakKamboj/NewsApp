import { Variant, Variants } from "framer-motion";

export interface genericAnimationType extends Variants {
    initial?: Variant;
    animate?: Variant;
    exit?: Variant;
}
