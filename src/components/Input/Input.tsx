import React, { useRef } from "react";

import styles from "./Input.module.scss";
import { FiSearch } from "react-icons/fi";

interface InputProps {
  // hasError: boolean;
  onSearch: (text: string) => void;
}

const Input = ({ onSearch }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputRef.current?.value);

    // if (inputRef.current) {
    //   const text = inputRef.current?.value || "";
    //   console.log(text);
    //   search(text.trim());
    // }
  };

  return (
    <form action="" onSubmit={handleSearch} autoComplete="off">
      <div className={styles.search}>
        <FiSearch />
        <input type="text" name="search__input" ref={inputRef} />
        {/* <div className={styles.error}>{hasError ? "Not found" : ""}</div> */}
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default Input;
