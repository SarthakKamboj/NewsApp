import styles from "../styles/navBar.module.scss";

type NavBarType = {};

const NavBar: React.FC<NavBarType> = () => {
    return <section className={styles.container}>navbar</section>;
};

export default NavBar;
