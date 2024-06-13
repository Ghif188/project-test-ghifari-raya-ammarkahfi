import { useState, useEffect } from "react";
import "./App.css";
import Logo from "./assets/logo.png";
import axios from "axios";

export type Image = {
  id: number;
  mime: string;
  file_name: string;
  url: string;
};

export type Article = {
  content: string;
  created_at: string;
  deleted_at: string | null;
  id: number;
  medium_image: Image[];
  published_at: string;
  slug: string;
  small_image: Image[];
  title: string;
  updated_at: string;
};

function App() {
  let menus = ["Work", "About", "Services", "Ideas", "Careers", "Contact"];
  let sizes = [10, 20, 50];
  let sorts = ["published_at", "-published_at"];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("-published_at");
  const [isDropSizes, setIsDropSizes] = useState(false);
  const [isDropSorts, setIsDropSorts] = useState(false);
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const url = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortOrder}`;
    axios
      .get(url)
      .then((response) => {
        setArticles(response.data.data);
        setLastPage(response.data.meta.last_page);
        console.log(lastPage);
      })
      .catch((error) => {
        console.error("Error fetching articles: ", error);
      });
  }, [currentPage, pageSize, sortOrder]);

  const pagination = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <div
          key={i}
          className={
            currentPage === i
              ? "bg-[#ED6B32] h-10 w-10 flex justify-center text-white items-center m-1 rounded-md"
              : "m-2"
          }
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </div>
      );
    }
    return pages;
  };

  return (
    <div className="h-screen">
      <div
        id="navbar"
        className="navbar px-40 w-full fixed py-2 flex justify-between items-center z-10 text-white"
      >
        <img src={Logo} className=" w-32" />
        <div className="flex">
          {menus.map((menu) => (
            <div
              key={menu}
              className={
                menu === "Ideas"
                  ? "mx-3 py-3 border-b-2  border-white"
                  : "mx-3 py-3 "
              }
            >
              {menu}
            </div>
          ))}
        </div>
      </div>
      <div className=" items-center justify-center h-3/4 flex bg-[url('./assets/bg-dashboard.jpg')] text-white">
        <div className="text-center">
          <p className="text-5xl">Ideas</p>
          <p className="text-lg">Where all our great things begin</p>
        </div>
      </div>
      <div className="px-40 pt-10">
        <div className="flex justify-between items-center">
          <p>Showing 1-10 of 100</p>
          <div className="flex">
            <div className="flex items-center mr-3">
              <p className="mr-3">Show per page:</p>
              <div className="relative">
                <div
                  className="px-10 py-1 border-2 rounded-full"
                  onClick={() => setIsDropSizes(true)}
                >
                  {pageSize}
                </div>
                {isDropSizes && (
                  <div className="absolute top-10 right-0 bg-white border-2 rounded-lg">
                    {sizes.map((size) => (
                      <div
                        key={size}
                        className="border-b-2 p-2 px-5"
                        onClick={() => {
                          setPageSize(size);
                          setIsDropSizes(false);
                        }}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <p className="mr-3">Sort by:</p>
              <div className="relative">
                <div
                  className="px-10 py-1 border-2 rounded-full"
                  onClick={() => setIsDropSorts(true)}
                >
                  {sortOrder === "published_at" ? "Latest" : "Newest"}
                </div>
                {isDropSorts && (
                  <div className="absolute top-10 right-0 bg-white border-2 rounded-lg">
                    {sorts.map((sort) => (
                      <div
                        key={sort}
                        className="border-b-2 p-2 px-5"
                        onClick={() => {
                          setSortOrder(sort);
                          setIsDropSorts(false);
                        }}
                      >
                        {sort === "published_at" ? "Latest" : "Newest"}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-40 mt-5 grid grid-cols-4 gap-5">
        {articles ? (
          articles.map((article) => (
            <div key={article.id} className=" min-h-fit rounded-lg shadow-md">
              <div
                className={`h-40 bg-black rounded-t-lg bg-no-repeat bg-[url('${article.medium_image[0].url}')]`}
              />
              <div className="p-2">
                <p className=" text-gray-300">{article.published_at}</p>
                <p className=" text-lg">{article.title}</p>
              </div>
            </div>
          ))
        ) : (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-10 pb-10">
        {pagination()}
      </div>
    </div>
  );
}
export default App;
