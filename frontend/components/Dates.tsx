import { useEffect, useState } from "react";
import styles from "../styles/dates.module.scss";

type DatesType = {
    setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const Dates: React.FC<DatesType> = ({ setDate }) => {
    const numDaysBack = 7;
    const [days, setDays] = useState<Date[]>([]);

    useEffect(() => {
        const date = new Date();
        const daysArr: Date[] = [];
        for (let i = 0; i < numDaysBack; i++) {
            date.setDate(date.getDate() - 1);
            daysArr.push(new Date(date.getTime()));
        }
        // console.log(daysArr);
        setDays(daysArr);
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                <img src={"logo.png"} alt="Logo" />
            </div>
            <div className={styles.dates}>
                {days.map((day, index) => {
                    const onClickDate = () => {
                        setDate(day);
                    };
                    return (
                        <p
                            key={index}
                            onClick={onClickDate}
                            className={styles.day}
                        >
                            {day.toDateString()}
                        </p>
                    );
                })}
            </div>
        </section>
    );
};

export default Dates;
