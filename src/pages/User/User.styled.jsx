import { styled } from 'styled-components';

export const UserContainer = styled.article`
    padding-top: 50px;
`;

export const UserNav = styled.nav`
    ul {
        display: flex;
        justify-content: space-between;

        font-family: 'PreBold';

        li {
            width: 100%;
            text-align: center;

            a {
                position: relative;
                display: block;

                height: 61px;
                border: solid #e3e3e3;
                border-width: 1px 1px 0 1px;
                padding-top: 17px;
                background-color: #f8f9fa;
            }

            /* 로그인 */
            &:first-child {
                a {
                    border-radius: 6px 0 0 0;
                    border-right: none;
                }
                a.active::after {
                    content: '';
                    position: absolute;
                    top: -1px;
                    width: 15px;
                    height: 62px;

                    right: -8px;
                    background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_0c98137b.png);
                    background-size: 283px 246px;
                    background-position: -212px -64px;
                }
            }

            /* 회원가입 */
            &:last-child {
                a {
                    border-radius: 0 6px 0 0;
                    border-left: none;
                }
                a.active::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    width: 15px;
                    height: 62px;

                    left: -8px;
                    background-image: url(https://ssl.pstatic.net/static/nid/login/m_sp_01_login_0c98137b.png);
                    background-size: 283px 246px;
                    background-position: -212px 0;
                }
            }

            .active {
                border-color: #c6c6c6;
                color: #333;
                background-color: #fff;

                z-index: 10;
            }
        }
    }
`;
export const Content = styled.div`
    position: relative;

    border: 1px solid #c6c6c6;
    border-radius: 6px;
    padding: 20px 28px;
    margin-top: -8px;

    background-color: #fff;
    box-shadow: 0 5px 8px 0 rgba(68, 68, 68, 0.04);

    z-index: 5;

    margin-bottom: 50px;
`;

export const SocialLoginContainer = styled.section`
    ul {
        display: flex;
        justify-content: space-around;
    }

    button {
        width: 60px;
        height: 60px;
        border-radius: 15px;
        background: ${props => props.theme.bgSecondary};
    }
`;
