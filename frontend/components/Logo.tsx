import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/logo.module.scss";

const Logo: React.FC<{}> = () => {
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
