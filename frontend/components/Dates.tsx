import { useEffect, useState } from "react";
import styles from "../styles/dates.module.scss";

type DatesType = {};

const Dates: React.FC<DatesType> = () => {
    // const days = [
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    //     "Sunday",
    // ];

    const numDaysBack = 7;
    const [days, setDays] = useState<Date[]>([]);

    useEffect(() => {
        const date = new Date();
        const daysArr: Date[] = [];
        for (let i = 0; i < numDaysBack; i++) {
            date.setDate(date.getDate() - 1);
            daysArr.push(new Date(date.getTime()));
        }
        console.log(daysArr);
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
                        alert(day);
                    };
                    return (
                        <p
                            key={index}
                            onClick={onClickDate}
                            className={styles.day}
                        >
                            {day.toDateString()}
                            {/* {day.toLocaleString()} */}
                        </p>
                    );
                })}
            </div>
        </section>
    );
};

export default Dates;
