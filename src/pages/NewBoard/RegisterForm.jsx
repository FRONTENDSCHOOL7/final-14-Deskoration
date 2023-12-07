import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import GradientButton from '../../components/GradientButton/GradientButton';
// import { Input, SelectInput } from '../../components/Input/Input';
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
    const showProduct = location.pathname.includes('/detailPost');
    const currentPath = window.location.pathname;
    const defaultProductItem = location.state?.defaultProductItem;
    const defaultProductItemDetail = defaultProductItem?.detail;

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

    const {
        register,
        handleSubmit,
        setFocus,
        setValue,
        control,
        trigger,
        formState: { errors, isSubmitted },
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            category: '책상',
            productName: null,
            price: null,
            store: null,
            link: null,
        },
    });

    const storeInput = useWatch({ name: 'store', control });
    const linkInput = useWatch({
        name: 'link',
        control,
    });

    useEffect(() => {
        if (isSubmitted) {
            trigger(['store', 'link']);
        }
    }, [storeInput, linkInput, isSubmitted, trigger]);

    const submitProduct = data => {
        if (productItems.length <= 6) {
            const itemIndex = productItems.findIndex(
                item => item.detail.id === defaultProductItemDetail?.id,
            );

            const newID = () => Math.random().toString(36).substring(2, 16);

            const newData = {
                category: data.category,
                productName: data.productName,
                price: data.price,
                store: data.store,
                link: data.link,
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
            if (currentPath.includes('/postUpload')) {
                navigate(`/postUpload`);
            } else if (currentPath.includes('/postEdit')) {
                navigate(-1);
            }
        }
    };

    useEffect(() => {
        !showProduct && setFocus('productName');
    }, [setFocus, showProduct]);

    useEffect(() => {
        if (defaultProductItemDetail) {
            setValue('category', defaultProductItemDetail?.category);
            setValue('productName', defaultProductItemDetail?.productName);
            setValue('price', defaultProductItemDetail?.price);
            setValue('store', defaultProductItemDetail?.store);
            setValue('link', defaultProductItemDetail?.link);
        }
    }, [defaultProductItemDetail, setValue]);

    return (
        <S.RegisterForm onSubmit={handleSubmit(submitProduct)}>
            <fieldset>
                /<S.InputLabel htmlFor={'productName'}>상품명</S.InputLabel>
                <S.Input
                    type={'text'}
                    id={'productName'}
                    className={errors.productName ? 'warning' : null}
                    {...register('productName', {
                        required: '필수 정보를 입력하세요.',
                    })}
                />
                {errors.productName && (
                    <WarningMsg msg={errors.productName.message} />
                )}
                <S.InputLabel htmlFor={'price'}>구매가격</S.InputLabel>
                <S.Input
                    type={'number'}
                    id={'price'}
                    className={errors.price ? 'warning' : null}
                    min={0}
                    {...register('price', {
                        required: '필수 정보를 입력하세요.',
                    })}
                    step={10}
                />
                {errors.price && <WarningMsg msg={errors.price.message} />}
                <S.InputLabel htmlFor={'store'}>구매처</S.InputLabel>
                <S.Input
                    type={'text'}
                    id={'store'}
                    className={errors.store ? 'warning' : null}
                    {...register('store', {
                        validate: value => {
                            return !value && !linkInput
                                ? '구매처 또는 구매링크를 입력하세요.'
                                : null;
                        },
                    })}
                />
                {errors.store && <WarningMsg msg={errors.store.message} />}
                <S.InputLabel htmlFor={'link'}>구매링크</S.InputLabel>
                <S.Input
                    type={'url'}
                    id={'link'}
                    className={errors.link ? 'warning' : null}
                    {...register('link', {
                        validate: value => {
                            return !value && !storeInput
                                ? '구매처 또는 구매링크를 입력하세요.'
                                : null;
                        },
                    })}
                />
                {errors.link && <WarningMsg msg={errors.link.message} />}
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
