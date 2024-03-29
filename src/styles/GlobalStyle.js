import { createGlobalStyle } from 'styled-components';

import PreRegular from '../assets/fonts/Pretendard-Regular.otf';
import PreBold from '../assets/fonts/Pretendard-Bold.otf';

const GlobalStyle = createGlobalStyle`
  @font-face {
        font-family: 'PreRegular';
        font-style: normal;
        src: url(${PreRegular}) format('opentype');
  }
	@font-face {
        font-family: 'PreBold';
        font-style: normal;
        src: url(${PreBold}) format('opentype');
  }

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
*{
  box-sizing: border-box;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
button{
	font-family: inherit;
  cursor: pointer;
	padding: 0;
	border: none;
	background: none;
}

a{
  text-decoration: none;
	color: inherit;
}

html{
	font-size:14px;
}

body{
	font-family:"PreRegular";
	background-color: #f6f6f6;
}

input{
	outline: none;
  border: none;
}


svg, img{
	vertical-align: top;
}

*::-webkit-scrollbar {
	width: 7px;
	height: 5px;
}

*::-webkit-scrollbar-thumb {
	background-color: #888;
	border-radius: 10px;
}

*::-webkit-scrollbar-thumb:hover {
	background-color: #555;
}

*::-webkit-scrollbar-track {
	background-color: #f5f5f5;
	border-radius: 10px;
}
`;

export default GlobalStyle;
