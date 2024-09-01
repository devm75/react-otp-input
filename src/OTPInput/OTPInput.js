import React, { useEffect, useRef, useState } from "react";
import styles from "./OTPInput.module.css";
import { paste } from "@testing-library/user-event/dist/paste";
export const OTPInput = () => {
    const [code, setCode] = useState(Array(6).fill(""));
    const regex = /^[0-9]+$/;

    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        console.log(value);
        // test value for regex

        if (regex.test(value)) {
            let newCode = [...code];
            newCode[index] = value;
            if (index < 5) {
                inputsRef.current[index + 1].focus();
            }
            setCode(newCode);
        } else {
            e.target.value = "";
        }
    };

    const handlePaste = (e) => {
        const pasteText = e.clipboardData.getData("text").slice(0, 6);
        const pasteArray = pasteText.split("").filter((ele) => regex.test(ele));
        let newCode = [...code];
        if (pasteArray.length) {
            pasteArray.forEach((char, index) => {
                newCode[index] = char;
            })

            setCode(newCode);
            inputsRef.current[pasteArray.length - 1].focus();
        }


    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (index === 0 && !code[index]) return;

            if (!code[index]) {
                inputsRef.current[index - 1].focus();
                console.log("I ran too");
            } else {
                // do what you do usually

                e.target.value = "";
                setCode((prev) =>
                    prev.map((ele, idx) => {
                        if (idx === index) {
                            return "";
                        } else return ele;
                    })
                );
            }
        }
    };

    useEffect(() => {

        inputsRef.current[0].focus()
    }, [])

    return (
        <div className={styles["outer-container"]} onPaste={handlePaste}>
            <h1>React Simple OTP input</h1>
            {code.map((ele, index) => (
                <input
                    key={index}
                    className={styles["input-box"]}
                    type="text"
                    maxLength={1}
                    ref={(ele) => {
                        inputsRef.current[index] = ele;
                    }}
                    value={ele}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
};
