import { faker } from "@faker-js/faker";
import { createContext, useState } from "react";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//STEP 1) CREATE CONTEXT.
const PostContext = createContext();

function ProviderCtx({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );

  const [searchQuery, setSearchQuery] = useState("");

  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
        posts: searchedPosts,
        onAddPost: handleAddPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { ProviderCtx, PostContext, createRandomPost };
