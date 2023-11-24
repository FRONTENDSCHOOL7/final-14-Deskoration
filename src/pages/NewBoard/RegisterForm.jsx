import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GradientButton from '../../components/GradientButton/GradientButton';
import { Input, SelectInput } from '../../components/Input/Input';
import { WarningMsg } from '../../components/Input/WarningMsg';

import * as S from './RegisterForm.styled';

const RegisterForm = ({
    productItems,
    setProductItems,
    offset,
    trimTextArea,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { postData } = location.state;

    const showProduct = location.pathname.includes('/detailPost');

    const editMode = location.pathname.includes('/postUpload');

    const defaultProductItem = location.state?.defaultProductItem;

    const defaultProductItemDetail = defaultProductItem?.detail;

    const formRef = useRef(null);
    const categoryRef = useRef(null);
    const productNameRef = useRef(null);
    const priceRef = useRef(null);
    const storeRef = useRef(null);
    const linkRef = useRef(null);

    const [warnCategory, setWarnCategory] = useState(false);
    const [warnProductName, setWarnProductName] = useState(false);
    const [warnPrice, setWarnPrice] = useState(false);
    const options = [
        '책상',
        '의자',
        '모니터',
        '키보드',
        '마우스',
        '스피커',
        '데스크탑',
        '노트북',
        '액세서리',
    ];

    const submitProduct = event => {
        event.preventDefault();

        console.log(id);
        console.log(editMode);

        const categoryValue = categoryRef.current.value;
        const productNameValue = productNameRef.current.value;
        const priceValue = priceRef.current.value;

        // input에 입력 값이 없을 경우 submit이 되지 않는다.
        if (!categoryValue || !productNameValue || !priceValue) {
            !categoryValue ? setWarnCategory(true) : setWarnCategory(false);
            !productNameValue
                ? setWarnProductName(true)
                : setWarnProductName(false);
            !priceValue ? setWarnPrice(true) : setWarnPrice(false);
        } else if (productItems.length <= 6) {
            const itemIndex = productItems.findIndex(
                item => item.detail.id === defaultProductItemDetail?.id,
            );

            const newID = () => Math.random().toString(36).substring(2, 16);

            const newData = {
                category: categoryValue,
                productName: productNameValue,
                price: priceValue,
                store: storeRef.current.value,
                link: linkRef.current.value,
                id: defaultProductItem ? defaultProductItemDetail.id : newID(),
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
                        marker: defaultProductItem
                            ? defaultProductItem.marker
                            : offset,
                        detail: newData,
                    },
                ]);
            }
            trimTextArea();
            // navigate(`/postUpload`);
            if (editMode === true) {
                navigate(`/postUpload`);
            } else if (editMode === false) {
                navigate(`/postEdit/${id}`, { state: { postData } });
            }
            formRef.current.reset();
        }
    };

    useEffect(() => {
        !showProduct && productNameRef.current.focus();
    }, [showProduct]);

    useEffect(() => {
        categoryRef.current.value = defaultProductItemDetail
            ? defaultProductItemDetail.category
            : '책상';
        productNameRef.current.value = defaultProductItemDetail
            ? defaultProductItemDetail.productName
            : null;
        priceRef.current.value = defaultProductItemDetail
            ? defaultProductItemDetail.price
            : null;
        storeRef.current.value = defaultProductItemDetail
            ? defaultProductItemDetail.store
            : null;
        linkRef.current.value = defaultProductItemDetail
            ? defaultProductItemDetail.link
            : null;
    }, [defaultProductItemDetail]);

    return (
        <S.RegisterForm ref={formRef} onSubmit={submitProduct}>
            <fieldset>
                <SelectInput
                    label="카테고리"
                    inputRef={categoryRef}
                    warning={warnCategory}
                    options={options}
                    readonly={showProduct}
                />

                {warnCategory && <WarningMsg msg={'필수 정보를 입력하세요.'} />}

                <Input
                    label="상품명"
                    inputRef={productNameRef}
                    warning={warnProductName}
                    readonly={showProduct}
                />
                {warnProductName && (
                    <WarningMsg msg={'필수 정보를 입력하세요.'} />
                )}

                <Input
                    label="구매가격"
                    type={'number'}
                    inputRef={priceRef}
                    warning={warnPrice}
                    readonly={showProduct}
                    step={100}
                />
                {warnPrice && <WarningMsg msg={'필수 정보를 입력하세요.'} />}

                <Input
                    label="구매처"
                    inputRef={storeRef}
                    readonly={showProduct}
                />
                <Input
                    label="구매링크"
                    type={'url'}
                    inputRef={linkRef}
                    readonly={showProduct}
                />
            </fieldset>
            {!showProduct && (
                <S.RegisterButtonBox>
                    <GradientButton
                        width={'40%'}
                        padding={'12px'}
                        onClick={() => navigate(-1)}
                    >
                        취소하기
                    </GradientButton>
                    <GradientButton gra={'true'} type={'submit'} width={'40%'}>
                        등록하기
                    </GradientButton>
                </S.RegisterButtonBox>
            )}
        </S.RegisterForm>
    );
};

export default RegisterForm;
