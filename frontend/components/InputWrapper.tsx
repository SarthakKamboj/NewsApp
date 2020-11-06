import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { useRef, useState } from "react";
import styles from "../styles/inputWrapper.module.scss";

type InputWrapperType = {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const InputWrapper: React.FC<InputWrapperType> = ({ setQuery }) => {
    const inputRef = useRef<HTMLInputElement>();
    const [inputVal, setInputVal] = useState<string>("");
    const searchOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setQuery(inputVal);
    };
    const clearClick = () => {
        setInputVal("");
        setQuery("");
    };
    return (
        <section className={styles.container}>
            <form className={styles.inputContainer}>
                <input
                    placeholder={"Search"}
                    type={"text"}
                    ref={inputRef}
                    onChange={(e) => setInputVal(e.target.value)}
                    value={inputVal}
                    className={classnames({
                        [styles.input]: true,
                    })}
                />

                <button onClick={searchOnClick} className={styles.search}>
                    <FontAwesomeIcon icon={"search"} />
                </button>
            </form>
            <h4 className={styles.clear} onClick={clearClick}>
                Clear Search
            </h4>
        </section>
    );
};

export default InputWrapper;
