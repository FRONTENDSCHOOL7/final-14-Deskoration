import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';

import AddMap from './AddMap/AddMap';
import { Input, SelectInput } from '../../components/Input/Input';

import * as S from './RegisterForm.styled';
import GradientButton from '../../components/GradientButton/GradientButton';

const RegisterForm = ({
    productItems,
    setProductItems,
    offset,
    trimTextArea,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = window.location.pathname;
    const editProductItem = location.state?.editProduct;
    const editProductItemDetail = editProductItem?.detail;

    const [searchKeyword, setSearchKeyword] = useState(
        editProductItemDetail?.store?.name,
    );
    const [selectedPlace, setSelectedPlace] = useState(
        editProductItemDetail?.store,
    );

    const {
        register,
        handleSubmit,
        setFocus,
        setValue,
        setError,
        clearErrors,
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

    useEffect(() => {
        if (isSubmitted) {
            trigger(['store', 'link']);
        }
    }, [storeInput, linkInput, isSubmitted, trigger]);

    useEffect(() => {
        setFocus('productName');
    }, [setFocus]);

    useEffect(() => {
        if (editProductItemDetail) {
            setValue('category', editProductItemDetail?.category);
            setValue('productName', editProductItemDetail?.productName);
            setValue('price', editProductItemDetail?.price);
            setValue('store', editProductItemDetail?.store?.name);
            setValue('link', editProductItemDetail?.link);
        }
    }, [editProductItemDetail, setValue]);

    const submitProduct = data => {
        if (productItems.length <= 6) {
            const itemIndex = productItems.findIndex(
                item => item.detail.id === editProductItemDetail?.id,
            );

            const newID = () => Math.random().toString(36).substring(2, 16);

            const newData = {
                category: data.category,
                productName: data.productName,
                price: data.price,
                store: selectedPlace,
                link: data.link,
                id: editProductItemDetail ? editProductItemDetail.id : newID(),
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
                        marker: editProductItemDetail
                            ? editProductItemDetail.marker
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

    const storeValid = value => {
        if (!value && !linkInput) {
            return '구매처 또는 구매링크를 입력하세요.';
        } else if (!selectedPlace) {
            return '구매 장소를 선택해주세요.';
        } else {
            // 다른 조건에 맞으면 null을 리턴
            return null;
        }
    };

    const handleSelectedPlace = data => {
        // data는 AddMap 컴포넌트에서 전달한 선택한 장소의 정보
        const nullData = data === null;
        setSelectedPlace(data);

        nullData
            ? setError('store', { message: '구매 장소를 선택해주세요.' })
            : clearErrors('store');
    };

    // 새로운 검색할 때 지도는 사라지고 검색 결과 목록
    const hadleStoreInput = e => {
        setSearchKeyword(e.target.value);
        // selectedPlace가 null이 아닐 때만 setSelectedPlace(null) 호출
        if (selectedPlace !== null) {
            setSelectedPlace(null);
        }
    };

    return (
        <S.RegisterForm onSubmit={handleSubmit(submitProduct)}>
            <fieldset>
                <SelectInput
                    label={'카테고리'}
                    id={'category'}
                    error={errors.category}
                    selectOptions={options}
                    register={register}
                    registerOptions={{
                        required: '카테고리를 입력하세요.',
                    }}
                />
                <Input
                    label={'상품명'}
                    id={'productName'}
                    error={errors.productName}
                    register={register}
                    registerOptions={{
                        required: '상품명을 입력하세요.',
                    }}
                />
                <Input
                    type={'number'}
                    label={'구매가격'}
                    id={'price'}
                    error={errors.price}
                    register={register}
                    registerOptions={{
                        required: '구매 가격을 입력하세요.',
                        min: 0,
                    }}
                    step={10}
                />
                {!linkInput && (
                    <>
                        <Input
                            label={'구매처'}
                            id={'store'}
                            error={errors.store}
                            placeholder="장소를 검색하세요"
                            register={register}
                            registerOptions={{
                                validate: storeValid,
                                onChange: e => hadleStoreInput(e),
                            }}
                        />
                        <AddMap
                            searchKeyword={searchKeyword}
                            selectedPlace={selectedPlace}
                            handleSelectedPlace={handleSelectedPlace}
                        />
                    </>
                )}
                {!storeInput && (
                    <Input
                        type={'url'}
                        label={'구매링크'}
                        id={'link'}
                        error={errors.link}
                        register={register}
                        registerOptions={{
                            validate: value => {
                                return !value && !storeInput
                                    ? '구매처 또는 구매링크를 입력하세요.'
                                    : null;
                            },
                        }}
                    />
                )}
            </fieldset>

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
        </S.RegisterForm>
    );
};

export default RegisterForm;
