import styles from "../styles/navBar.module.scss";
import InputWrapper from "./InputWrapper";

type NavBarType = {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const NavBar: React.FC<NavBarType> = ({ setQuery }) => {
    return (
        <section className={styles.container}>
            <InputWrapper setQuery={setQuery} />
        </section>
    );
};

export default NavBar;
