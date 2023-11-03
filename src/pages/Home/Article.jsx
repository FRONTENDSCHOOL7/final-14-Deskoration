import React, { useState, useEffect, useRef } from 'react';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import * as S from './Article.styled';
import Board from '../Board/Board';
import { PostAll } from '../../service/board_service';
import { GetAllPost, GetMyPost } from '../../service/post_service';
const token = sessionStorage.getItem('tempToken');
const tempAccountName = sessionStorage.getItem('tempAccountName');

const Article = () => {
    // const [articles, setArticles] = useState(Array(8).fill({}));
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef(null); // S.Section에 대한 참조 생성

    // const tempAllApi = async token => {
    //     try {
    //         const data = await GetAllPost(token);
    //         console.log('API보기2: ', data);
    //         console.log(
    //             'deskoration: ',
    //             data.posts.filter(post =>
    //                 post.content?.includes('deskoration'),
    //             ),
    //         );
    //     } catch (error) {
    //         console.error('error가 나타나는 중입니다.....');
    //     }
    // };

    // useEffect(() => {
    //     tempAllApi(token);
    // }, []);

    const tempApi = async (accountName, token) => {
        try {
            const result = await GetMyPost(accountName, token);
            console.log('API보기2: ', result);
            const deskoration = result.filter(post =>
                post.content?.includes('"deskoration"'),
            );
            console.log('deskoration: ', deskoration);
            setArticles(deskoration);
        } catch (error) {
            console.error('error');
        }
    };
    console.log('articles', articles);
    useEffect(() => {
        const desk_result = tempApi(tempAccountName, token);
    }, []);

    // useEffect(() => {
    //     PostAll()
    //         .then(data => {
    //             setArticles(data.posts);
    //         })
    //         .catch(error => {
    //             console.error('API 요청 중 오류 발생하는 중: ', error);
    //         });
    // }, []);

    const postImage = articles.map(item => item.image);

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
        // PostAll().then(data => {
        //     setArticles(prevArticles => [...prevArticles, ...data.posts]);
        //     setLoading(false);
        // });

        // PostAll().then(data => {
        //     setArticles(prevArticles => [...prevArticles, ...data.posts]);
        //     setLoading(false);
        // });

        setTimeout(() => {
            setArticles(prevArticles => [
                ...prevArticles,
                ...Array(8).fill({}),
            ]); // 예시로 8개의 게시물을 추가
            setLoading(false);
        }, 1000); // 1초 지연으로 예시
        console.log('스크롤 후 aricles:', articles);
    };

    //////////////////////////////////////////

    // const tempApi = async (accountName, token) => {
    //     try {
    //         const result = await GetMyPost(accountName, token);
    //         console.log('API보기2: ', result);

    //         console.log(
    //             result.filter(post => post.content?.includes('"deskoration"')),
    //         );
    //     } catch (error) {
    //         console.error('error');
    //     }
    // };

    return (
        <>
            <S.Section ref={sectionRef}>
                {articles.map(article => (
                    <Link key={article.id} to={`/board/${article.id}`}>
                        <S.Article src={article.image}></S.Article>
                    </Link>
                ))}
            </S.Section>
            {loading && <div>Loading...</div>}
            <Routes>
                <Route path={'/board/:id'} element={<Board />} />
            </Routes>
        </>
    );
};

export default Article;
