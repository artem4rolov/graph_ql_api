import React, { useRef } from "react";

import styles from "./Input.module.scss";
import { FiSearch } from "react-icons/fi";

interface InputProps {
  // hasError: boolean;
  onSearch: (text: string | null) => void;
}

const Input = ({ onSearch }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearch(inputRef.current?.value.trim());
    }
    return;
  };

  return (
    <form action="" onSubmit={handleSearch} autoComplete="off">
      <div className={styles.search}>
        <FiSearch />
        <input
          type="text"
          name="search__input"
          ref={inputRef}
          onInput={handleSearch}
        />
        {/* <div className={styles.error}>{hasError ? "Not found" : ""}</div> */}
        <button type="submit">Search</button>
      </div>
    </form>
  );
};

export default Input;
