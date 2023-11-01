import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as S from './Article.styled';
import { PostAll } from '../../service/board_service';

const Article = () => {
    // const [articles, setArticles] = useState(Array(8).fill({}));
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null); // S.Section에 대한 참조 생성

    useEffect(() => {
        PostAll()
            .then(data => {
                setArticles(data.posts);
            })
            .catch(error => {
                console.error('API 요청 중 오류 발생하는 중: ', error);
            });
    }, []);

    const postImage = articles.map(item => item.image);
    console.log('articles:', articles);
    // console.log(postImage);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } =
                sectionRef.current;
            if (scrollTop + clientHeight >= scrollHeight && !loading) {
                loadMoreArticles();
            }
        };

        const sectionElement = sectionRef.current;
        sectionElement.addEventListener('scroll', handleScroll);
        return () => sectionElement.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const loadMoreArticles = () => {
        setLoading(true);
        // 여기서 API 호출이나 다른 데이터 로딩 로직을 추가할 수 있습니다.
        setTimeout(() => {
            setArticles(prevArticles => [
                ...prevArticles,
                ...Array(8).fill({}),
            ]); // 예시로 8개의 게시물을 추가
            setLoading(false);
        }, 1000); // 1초 지연으로 예시
    };

    return (
        <>
            <S.Section ref={sectionRef}>
                {/* {articles.map((article, index) => (
                    <Link key={index} to={'/board'}>
                        <S.Article></S.Article>
                    </Link>
                ))} */}
                {postImage.map(item => (
                    <Link to={'/board'}>
                        <S.Article imageurl={item}></S.Article>
                    </Link>
                ))}
            </S.Section>
            {loading && <div>Loading...</div>}
        </>
    );
};

export default Article;
