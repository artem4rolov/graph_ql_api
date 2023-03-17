import React, { useRef } from "react";

interface SearchProps {
  // hasError: boolean;
  search: (text: string) => void;
}

const Home = ({ search }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(`query {
      repository(owner:"octocat", name:"Hello-World") {
        issues(last:20, states:CLOSED) {
          edges {
            node {
              title
              url
              labels(first:5) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }`);

    // if (inputRef.current) {
    //   const text = inputRef.current?.value || "";
    //   console.log(text);
    //   search(text.trim());
    // }
  };

  return (
    <div className="Home">
      <form action="" onSubmit={handleSearch} autoComplete="off">
        <div>
          {/* <SearchIcon /> */}
          <input type="text" name="search__input" ref={inputRef} />
          {/* <div className={styles.error}>{hasError ? "Not found" : ""}</div> */}
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
