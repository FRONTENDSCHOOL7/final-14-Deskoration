import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GradientButton from '../../components/GradientButton/GradientButton';
import { Input, SelectInput } from '../../components/Input/Input';
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

    // submit 함수
    const dataSubmit = event => {
        event.preventDefault();

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
                location: editItem ? editItem.location : offset,
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
        categoryRef.current.value = editItem ? editItem.category : '책상';
        productNameRef.current.value = editItem ? editItem.productName : null;
        priceRef.current.value = editItem ? editItem.price : null;
        storeRef.current.value = editItem ? editItem.store : null;
        linkRef.current.value = editItem ? editItem.link : null;
    }, [editItem]);

    return (
        <S.RegisterForm ref={formRef} onSubmit={dataSubmit}>
            <fieldset>
                <SelectInput
                    label="카테고리"
                    inputRef={categoryRef}
                    warning={warnCategory}
                    options={options}
                />

                {warnCategory && <WarningMsg msg={'필수 정보를 입력하세요.'} />}

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
                    type={'number'}
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
