import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Article from "../Article";
import "./index.css";

function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  // 게시글 리스트 가져오기
  const getArticles = useCallback(() => {
    axios
      .get("http://localhost:3001/articles")
      .then((success) => {
        setArticles([...success.data]);
        setError(null);
      })
      .catch((error) => {
        console.error("게시글 리스트 로딩 실패:", error);
        setError(
          "게시글 목록을 불러오는데 실패했습니다. 서버가 실행중인지 확인해주세요.",
        );
      });
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2 style={{ color: "red" }}>오류 발생</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul className={"ArticleList"} style={{ listStyle: "none", padding: 0 }}>
      {articles.map((item) => (
        <li key={item.id}>
          <Link
            to={`/view/${item.id}`}
            style={{ textDecoration: "none", color: "initial" }}
          >
            <Article {...item} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
