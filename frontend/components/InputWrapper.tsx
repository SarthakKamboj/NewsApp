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
    const searchOnClick = () => {
        setQuery(inputVal.replace(" ", "-"));
    };
    const clearClick = () => {
        setInputVal("");
        setQuery("");
    };
    return (
        <section className={styles.container}>
            <div className={styles.inputContainer}>
                <input
                    placeholder={"Search"}
                    type={"text"}
                    ref={inputRef}
                    onChange={(e) => setInputVal(e.target.value)}
                    value={inputVal}
                    className={classnames({
                        [styles.input]: true,
                        [styles.inputActive]: inputVal?.length > 0,
                    })}
                />

                <div className={styles.search}>
                    <FontAwesomeIcon onClick={searchOnClick} icon={"search"} />
                </div>
            </div>
            <h4 className={styles.clear} onClick={clearClick}>
                Clear Search
            </h4>
        </section>
    );
};

export default InputWrapper;
