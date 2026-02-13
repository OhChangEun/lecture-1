import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import './index.css';
import BasicTemplates from '../../templates/BasicTemplates';
import CodeBlock from '../../components/markdowns/CodeBlock';

function ViewPage(props) {
  const { id } = useParams();
  const [article, setArticle] = useState(false);
  const [error, setError] = useState(null);

  // 게시글 가져오기
  const getArticle = useCallback(id => {
    axios.get('http://localhost:3001/articles/' + id)
      .then(success => {
        setArticle(success.data);
        setError(null);
      })
      .catch(error => {
        console.error('게시글 로딩 실패:', error);
        setError('게시글을 불러오는데 실패했습니다. 서버가 실행중인지 확인해주세요.');
      });
  }, []);

  useEffect(() => {
    getArticle(id);
  }, [getArticle, id]);

  if (error) {
    return (
      <BasicTemplates>
        <div className={'ViewPage'}>
          <h1 style={{ color: 'red' }}>오류 발생</h1>
          <p>{error}</p>
        </div>
      </BasicTemplates>
    );
  }

  return article ? (
    <BasicTemplates>
      <div className={'ViewPage'}>
        <h1 className={'ViewPage__title'}>{article.title}</h1>
        <img className={'ViewPage__image'} src={article.image} alt="thumnail" />
        <div className={'ViewPage__content'}>
          <ReactMarkdown components={{ code: CodeBlock }}>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </BasicTemplates>
  ) : (
    <h1>loading...</h1>
  );
}

export default ViewPage;
