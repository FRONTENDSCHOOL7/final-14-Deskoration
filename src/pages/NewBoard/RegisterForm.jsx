import { useState, useEffect } from 'react';
import { WarningMsg } from '../../components/Input/WarningMsg';
import Input from '../../components/Input/Input';
import * as S from './RegisterForm.styled';

export const RegisterForm = ({
    setShowRegisterForm,
    items,
    setItems,
    data,
    setData,
    offset,
    displayStyle,
}) => {
    const [initialAccess, setInitialAccess] = useState(true);

    //input값을 data에 저장하기
    const handleInputChange = (event, label) => {
        switch (label) {
            case '카테고리':
                setData(prev => ({
                    ...prev,
                    category: event.target.value,
                }));
                break;
            case '상품명':
                setData(prev => ({
                    ...prev,
                    productName: event.target.value,
                }));
                break;
            case '구매가격':
                setData(prev => ({
                    ...prev,
                    price: event.target.value,
                }));
                break;
            case '구매처':
                setData(prev => ({
                    ...prev,
                    store: event.target.value,
                }));
                break;
            case '구매링크':
                setData(prev => ({
                    ...prev,
                    link: event.target.value,
                }));
                break;
            default:
                console.log('에러');
        }
    };

    // submit 함수
    const dataSubmit = event => {
        event.preventDefault();
        setInitialAccess(false);
        // input에 입력 값이 없을 경우 submit이 되지 않는다.
        if (!data.category || !data.productName || !data.price) {
            return;
        } else if (items.length < 5) {
            // Items에 입력한 데이터를 저장
            const newData = {
                ...data,
                id: items.length,
                location: offset,
            };
            setItems(prev => [...prev, newData]);
            // 마커 컴포넌트 렌더링 여부 컨트롤
            setShowRegisterForm(false);
            // data 초기화
            setData(prev => ({
                ...prev,
                id: '',
                location: {},
                category: '',
                productName: '',
                price: '',
                store: '',
                link: '',
            }));
        } else {
            alert('상품은 최대 5개까지 추가할 수 있습니다.');
        }

        setInitialAccess(true);
    };
    return (
        <>
            <S.ProductRegisterForm onSubmit={dataSubmit} style={displayStyle}>
                <fieldset>
                    <Input
                        label="카테고리"
                        value={data.category}
                        fn={event => handleInputChange(event, '카테고리')}
                        warning={
                            !initialAccess && !data.category ? 'warning' : null
                        }
                    />
                    {initialAccess
                        ? null
                        : !data.category && (
                              <WarningMsg msg={'카테고리를 입력하세요'} />
                          )}

                    <Input
                        label="상품명"
                        value={data.productName}
                        fn={event => handleInputChange(event, '상품명')}
                        warning={
                            !initialAccess && !data.productName
                                ? 'warning'
                                : null
                        }
                    />
                    {initialAccess
                        ? null
                        : !data.productName && (
                              <WarningMsg msg={'상품명을 입력하세요'} />
                          )}

                    <Input
                        label="구매가격"
                        value={data.price}
                        fn={event => handleInputChange(event, '구매가격')}
                        warning={
                            !initialAccess && !data.price ? 'warning' : null
                        }
                    />
                    {initialAccess
                        ? null
                        : !data.price && (
                              <WarningMsg msg={'구매가격을 입력하세요'} />
                          )}

                    <Input
                        label="구매처"
                        value={data.store}
                        fn={event => handleInputChange(event, '구매처')}
                        initialAccess={initialAccess}
                    />
                    <Input
                        label="구매링크"
                        value={data.link}
                        fn={event => handleInputChange(event, '구매링크')}
                        initialAccess={initialAccess}
                    />
                </fieldset>

                <S.RegisterButton>등록하기</S.RegisterButton>
            </S.ProductRegisterForm>
        </>
    );
};
