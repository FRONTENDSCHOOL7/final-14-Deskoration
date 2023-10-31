import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GradientButton from '../../components/GradientButton/GradientButton';
import Input from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
import * as S from './RegisterForm.styled';

export const RegisterForm = ({ items, setItems, offset }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const editItem = location.state?.editItem;

    const formRef = useRef(null);
    const categoryRef = useRef(null);
    const productNameRef = useRef(null);
    const priceRef = useRef(null);
    const storeRef = useRef(null);
    const linkRef = useRef(null);

    const [warnCatagory, setWarnCatagory] = useState(false);
    const [warnProductName, setWarnProductName] = useState(false);
    const [warnPrice, setWarnPrice] = useState(false);

    // submit 함수
    const dataSubmit = event => {
        event.preventDefault();

        const categoryValue = categoryRef.current.value;
        const productNameValue = productNameRef.current.value;
        const priceValue = priceRef.current.value;

        // input에 입력 값이 없을 경우 submit이 되지 않는다.
        if (!categoryValue || !productNameValue || !priceValue) {
            !categoryValue ? setWarnCatagory(true) : setWarnCatagory(false);
            !productNameValue
                ? setWarnProductName(true)
                : setWarnProductName(false);
            !priceValue ? setWarnPrice(true) : setWarnPrice(false);
        } else if (items.length <= 6) {
            const itemIndex = items.findIndex(item => item.id === editItem?.id);

            const newID = () => Math.random().toString(36).substring(2, 16);

            const newData = {
                category: categoryValue,
                productName: productNameValue,
                price: priceValue,
                store: storeRef.current.value,
                link: linkRef.current.value,
                id: editItem ? editItem.id : newID(),
                location: offset,
            };

            if (itemIndex !== -1) {
                const updatedData = [...items];
                updatedData[itemIndex] = {
                    ...updatedData[itemIndex],
                    ...newData,
                };
                setItems(updatedData);
            } else {
                setItems(prev => [...prev, newData]);
            }

            navigate(`/newboard`);
            formRef.current.reset();
        }
    };

    useEffect(() => {
        categoryRef.current.focus();
    }, []);

    useEffect(() => {
        categoryRef.current.value = editItem ? editItem.category : null;
        productNameRef.current.value = editItem ? editItem.productName : null;
        priceRef.current.value = editItem ? editItem.price : null;
        storeRef.current.value = editItem ? editItem.store : null;
        linkRef.current.value = editItem ? editItem.link : null;
    }, [editItem]);

    return (
        <S.RegisterForm ref={formRef} onSubmit={dataSubmit}>
            <fieldset>
                <Input
                    label="카테고리"
                    inputRef={categoryRef}
                    warning={warnCatagory}
                />
                {warnCatagory && <WarningMsg msg={'필수 정보를 입력하세요.'} />}

                <Input
                    label="상품명"
                    inputRef={productNameRef}
                    warning={warnProductName}
                />
                {warnProductName && (
                    <WarningMsg msg={'필수 정보를 입력하세요.'} />
                )}

                <Input
                    label="구매가격"
                    inputRef={priceRef}
                    warning={warnPrice}
                />
                {warnPrice && <WarningMsg msg={'필수 정보를 입력하세요.'} />}

                <Input label="구매처" inputRef={storeRef} />
                <Input label="구매링크" inputRef={linkRef} />
            </fieldset>
            <S.RegisterButtonBox>
                <GradientButton
                    width={'40%'}
                    padding={'12px'}
                    onClick={() => navigate(`/newboard`)}
                >
                    취소하기
                </GradientButton>
                <GradientButton gra={'true'} type={'submit'} width={'40%'}>
                    등록하기
                </GradientButton>
            </S.RegisterButtonBox>
        </S.RegisterForm>
    );
};
