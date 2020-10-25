import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/logo.module.scss";

type LogoType = {};

const Logo: React.FC<LogoType> = ({}) => {
    // const numDaysBack = 7;
    // const [days, setDays] = useState<Date[]>([]);

    // useEffect(() => {
    //     const date = new Date();
    //     const daysArr: Date[] = [];
    //     for (let i = 0; i < numDaysBack; i++) {
    //         daysArr.push(new Date(date.getTime()));
    //         date.setDate(date.getDate() - 1);
    //     }
    //     setDays(daysArr);
    // }, []);

    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                <FontAwesomeIcon
                    icon={"newspaper"}
                    className={styles.logoIcon}
                />
            </div>
        </section>
    );
};

export default Logo;
