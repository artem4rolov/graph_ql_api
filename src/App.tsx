import { useEffect, useState } from "react";
// import { Routes, Route } from "react-router";

import "./App.css";

// const BASE_URL = "https://api.github.com/graphql";

function App() {
  // const [user, setUser] = useState<LocalUser | null>(UserExample);
  // const [loading, setLoading] = useState(false);

  const githubData: any = {
    token: "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",
    username: "artem4rolov",
  };

  const body = `{
    viewer {
      login
      repositories(first: 10, after: null, before: null) {
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
        node {
          id
          name
          commitComments(last: 1) {
            nodes {
              createdAt
            }
          }
          resourcePath
          url
        }
      }
      }
    }
  }`;
  const handleSearch = async (query: string) => {
    // setLoading(true);

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${githubData["token"]}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    }).then((response) => response.json());

    console.log(res);

    // проверяем, что юзер действительно является GithubUser
    // if (isGithubUser(user)) {
    //   setLoading(false);
    //   setUser(extractLocalUser(user));
    // } else {
    //   setLoading(false);
    //   setUser(null);
    // }
  };

  useEffect(() => {
    handleSearch(body);
  }, []);

  return (
    <div className="App">
      <button>fetch</button>
      {/* <Routes>
        <Route path="/" element={<Home search={handleSearch} />} />
        <Route path="/repo/:id" element={<RepoPage />} />
        <Route path="/*" element={<Error />} />
      </Routes> */}
    </div>
  );
}

export default App;
