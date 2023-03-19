import styles from "./Input.module.scss";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchAllMyRepos } from "../../redux/slices/Repos/reposAsyncActions";
import { useAppDispatch } from "../../redux/hooks";

interface InputProps {
  // hasError: boolean;
  onSearch: (text: string | null) => void;
}

type FormFields = {
  searchInput: HTMLInputElement;
};

const Input = ({ onSearch }: InputProps) => {
  const [value, setValue] = useState<
    string | number | readonly string[] | undefined
  >(undefined);
  const localValue = localStorage.getItem("search") || "";

  const dispatch = useAppDispatch();

  // если в localStorage есть старое значение из input - оставляем его в стейте
  useEffect(() => {
    if (localValue) {
      setValue(localValue);
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement & FormFields>) => {
    e.preventDefault();

    localStorage.setItem("search", value as string);

    const text = localValue;
    if (
      text.length > 0 &&
      document.activeElement === e.currentTarget.searchInput
    ) {
      onSearch(text);
    }
    dispatch(fetchAllMyRepos({ next: null, prev: null }));
    return;
  };

  return (
    <form onSubmit={handleSearch} autoComplete="off">
      <div className={styles.search}>
        <FaSearch />
        <input
          type="text"
          name="searchInput"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button type="submit" onClick={() => handleSearch}>
          Search
        </button>
      </div>
    </form>
  );
};

export default Input;
