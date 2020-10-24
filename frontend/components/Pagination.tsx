import React, { useRef } from "react";
import classnames from "classnames";
import styles from "../styles/pagination.module.scss";

type PaginationType = {
    groups: number;
    setPaginationGroup: React.Dispatch<React.SetStateAction<number>>;
    paginationNumber: number;
};

const Pagination: React.FC<PaginationType> = ({
    setPaginationGroup,
    groups,
    paginationNumber,
}) => {
    const paginationContainerRef = useRef<HTMLUListElement>(null);
    const liRef = useRef<HTMLLIElement>(null);
    const maxPaginationNumsToShowAtOnce = 5;
    const paginateLiSelected = (idx) => {
        setPaginationGroup(idx);
    };
    return (
        <ul className={styles.container} ref={paginationContainerRef}>
            {Array.from(Array(groups), (e, idx) => {
                if (idx > maxPaginationNumsToShowAtOnce - 1) return;
                return (
                    <li
                        ref={liRef}
                        key={idx}
                        className={classnames({
                            [styles.selectedPaginationGroup]:
                                paginationNumber === idx,
                        })}
                        onClick={() => paginateLiSelected(idx)}
                    >
                        {idx + 1}
                    </li>
                );
            })}
        </ul>
    );
};

export default Pagination;
