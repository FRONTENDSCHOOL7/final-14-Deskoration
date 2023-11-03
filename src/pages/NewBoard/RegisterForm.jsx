import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';
import GradientButton from '../../components/GradientButton/GradientButton';

import * as S from './RegisterForm.styled';

const RegisterForm = ({
    productItems,
    setProductItems,
    offset,
    trimTextArea,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const editProductItem = location.state?.editProductItem;

    const editProductItemDetail = editProductItem?.detail;

    const formRef = useRef(null);
    const categoryRef = useRef(null);
    const productNameRef = useRef(null);
    const priceRef = useRef(null);
    const storeRef = useRef(null);
    const linkRef = useRef(null);

    const [warnCatagory, setWarnCatagory] = useState(false);
    const [warnProductName, setWarnProductName] = useState(false);
    const [warnPrice, setWarnPrice] = useState(false);

    const submitProduct = event => {
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
        } else if (productItems.length <= 6) {
            const itemIndex = productItems.findIndex(
                item => item.detail.id === editProductItemDetail?.id,
            );

            const newID = () => Math.random().toString(36).substring(2, 16);

            const newData = {
                category: categoryValue,
                productName: productNameValue,
                price: priceValue,
                store: storeRef.current.value,
                link: linkRef.current.value,
                id: editProductItem ? editProductItemDetail.id : newID(),
            };

            if (itemIndex !== -1) {
                const updateProductItems = [...productItems];
                updateProductItems[itemIndex].detail = {
                    ...updateProductItems[itemIndex].detail,
                    ...newData,
                };
                setProductItems(updateProductItems);
            } else {
                setProductItems(prev => [
                    ...prev,
                    {
                        marker: editProductItem
                            ? editProductItem.marker
                            : offset,
                        detail: newData,
                    },
                ]);
            }
            trimTextArea();
            navigate(`/newboard`);
            formRef.current.reset();
        }
    };

    useEffect(() => {
        categoryRef.current.focus();
    }, []);

    useEffect(() => {
        categoryRef.current.value = editProductItemDetail
            ? editProductItemDetail.category
            : null;
        productNameRef.current.value = editProductItemDetail
            ? editProductItemDetail.productName
            : null;
        priceRef.current.value = editProductItemDetail
            ? editProductItemDetail.price
            : null;
        storeRef.current.value = editProductItemDetail
            ? editProductItemDetail.store
            : null;
        linkRef.current.value = editProductItemDetail
            ? editProductItemDetail.link
            : null;
    }, [editProductItemDetail]);

    return (
        <S.RegisterForm ref={formRef} onSubmit={submitProduct}>
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

export default RegisterForm;
