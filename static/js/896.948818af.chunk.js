"use strict";(self.webpackChunkeasy_shop=self.webpackChunkeasy_shop||[]).push([[896],{990:function(e,s,a){a.d(s,{Z:function(){return v}});var t=a(885),c=a(2791),n=a(9434),r=a(8644),i=a(188),o=a(4737),u=a(3214),l=a(1632),d=a(9806),_="MessageWindow_messageWindow__uRdd8",h="MessageWindow_dismissButton__SLD4U",f="MessageWindow_boo__YcpDh",m="MessageWindow_face__YrZvM",k="MessageWindow_shadow__dHQj9",x="MessageWindow_confirmButtons__sF71C",g="MessageWindow_ButtonsBlock__+USC0",p="MessageWindow_btnYes__-yYz3",b="MessageWindow_btnNo__lIEXL",j=a(184);function v(e){var s=e.text,a=e.onDismiss,v=e.confirmButtons,N=e.onConfirm,C=(0,n.I0)(),P=(0,c.useState)(!0),w=(0,t.Z)(P,2),y=w[0],I=w[1];if((0,c.useEffect)((function(){if(I(!0),!v){var e=setTimeout((function(){I(!1),C((0,r.k7)()),C((0,i.nv)()),C((0,o.Z$)())}),5e3);return function(){return clearTimeout(e)}}}),[s,C,v]),!y)return null;var L=function(e){I(!1),"function"===typeof N&&N(e)};return(0,j.jsxs)("div",{className:_,children:[!v&&(0,j.jsx)("button",{className:h,onClick:function(){I(!1),"function"===typeof a&&a(),C((0,r.k7)()),C((0,i.nv)()),C((0,o.Z$)())},children:(0,j.jsx)(d.G,{icon:l.NBC,size:"lg"})}),(0,j.jsx)("div",{className:f,children:(0,j.jsx)("div",{className:m,id:"face"})}),(0,j.jsx)("div",{className:k}),v?(0,j.jsxs)("div",{className:x,children:[(0,j.jsx)(u.Z,{text:s,textClass:"textMessageBtn"}),(0,j.jsxs)("div",{className:g,children:[(0,j.jsx)("button",{className:p,onClick:function(){return L("yes")},children:"\u0422\u0430\u043a"}),(0,j.jsx)("button",{className:b,onClick:function(){return L("no")},children:"\u041d\u0456"})]})]}):(0,j.jsx)(u.Z,{text:s,textClass:"textMessage"})]})}},9800:function(e,s,a){a.d(s,{Z:function(){return L}});var t=a(5861),c=a(885),n=a(4687),r=a.n(n),i=a(2791),o=a(9434),u=a(1087),l=a(5557),d=a(4458),_=a(3214),h=a(3853);var f="ProductItem_itemCard__xUEhb",m="ProductItem_photoLink__Y5Dsa",k="ProductItem_stylePhotoCardWrap__Ebdnt",x="ProductItem_photoCard__6ocdl",g="ProductItem_descriptionProductCard__yOzL7",p="ProductItem_stylePriceLike__QzHTI",b="ProductItem_priceCard__nb2y+",j="ProductItem_styleLike__EgsqI",v="ProductItem_liked__Dnddi",N="ProductItem_active__p-95Y",C="ProductItem_likeCard__9FnPv",P="ProductItem_nameProductCard__Jj9Bv",w="ProductItem_styleSizeCard__DbAy3",y="ProductItem_separator__su5Ku",I=a(184),L=function(e){var s=e._id,a=e.mainPhotoUrl,n=e.price,L=e.likes,Z=e.userLike,z=e.isLiked,B=e.handleLike,S=e.nameProduct,M=e.description,W=e.size,U=function(e,s){var a="",t="";switch(e){case"\u0416\u0456\u043d\u043a\u0430\u043c":a="women";break;case"\u0427\u043e\u043b\u043e\u0432\u0456\u043a\u0430\u043c":a="men";break;case"\u0414\u0438\u0442\u044f\u0447\u0456 \u0442\u043e\u0432\u0430\u0440\u0438":a="children";break;case"\u041a\u0440\u0430\u0441\u0430 \u0442\u0430 \u0437\u0434\u043e\u0440\u043e\u0432'\u044f":a="beauty&health";break;default:a=e}if("\u0427\u043e\u043b\u043e\u0432\u0456\u043a\u0430\u043c"===e)switch(s){case"\u0412\u0435\u0440\u0445\u043d\u0456\u0439 \u043e\u0434\u044f\u0433":t="outerwear";break;case"\u041f\u0456\u0434\u0436\u0430\u043a\u0438 \u0456 \u043a\u043e\u0441\u0442\u044e\u043c\u0438":t="jackets & suits";break;case"\u041a\u043e\u0444\u0442\u0438 \u0442\u0430 \u0441\u0432\u0435\u0442\u0440\u0438":t="coats & tops";break;case"\u0421\u043e\u0440\u043e\u0447\u043a\u0438 \u0442\u0430 \u0442\u0435\u043d\u0456\u0441\u043a\u0438":t="shirts & t-shirts";break;case"\u0424\u0443\u0442\u0431\u043e\u043b\u043a\u0438 \u0442\u0430 \u043c\u0430\u0439\u043a\u0438":t="t-shirts & tank tops";break;case"\u041d\u0438\u0436\u043d\u044f \u0431\u0456\u043b\u0438\u0437\u043d\u0430":t="underwear";break;case"\u0412\u0437\u0443\u0442\u0442\u044f":t="shoes";break;case"\u0410\u043a\u0441\u0435\u0441\u0443\u0430\u0440\u0438":t="accessories";break;case"\u0421\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u0438\u0439 \u043e\u0434\u044f\u0433":t="sportswear";break;case"\u041e\u0434\u044f\u0433 \u0434\u043b\u044f \u0434\u043e\u043c\u0443 \u0442\u0430 \u0441\u043d\u0443":t="clothing for home and sleep";break;case"\u0421\u043f\u0435\u0446\u043e\u0434\u044f\u0433":t="special clothing";break;case"\u0422\u0430\u043a\u0442\u0438\u0447\u043d\u0438\u0439 \u043e\u0434\u044f\u0433":t="tactical clothing";break;case"\u0428\u0442\u0430\u043d\u0438 \u0442\u0430 \u0448\u043e\u0440\u0442\u0438":t="pants and shorts";break;default:t=s}if("\u0416\u0456\u043d\u043a\u0430\u043c"===e)switch(s){case"\u0412\u0435\u0440\u0445\u043d\u0456\u0439 \u043e\u0434\u044f\u0433":t="outerwear";break;case"\u041f\u043b\u0430\u0442\u0442\u044f":t="dresses";break;case"\u0421\u043f\u0456\u0434\u043d\u0438\u0446\u0456":t="skirts";break;case"\u041c\u0430\u0439\u043a\u0438 \u0456 \u0444\u0443\u0442\u0431\u043e\u043b\u043a\u0438":t="t-shirts and t-shirts";break;case"\u0421\u043e\u0440\u043e\u0447\u043a\u0438 \u0442\u0430 \u0431\u043b\u0443\u0437\u0438":t="shirts and blouses";break;case"Coats":t="\u0421\u0432\u0435\u0442\u0440\u0438";break;case"\u041d\u0438\u0436\u043d\u044f \u0431\u0456\u043b\u0438\u0437\u043d\u0430":t="underwear";break;case"\u0410\u043a\u0441\u0435\u0441\u0443\u0430\u0440\u0438":t="accessories";break;case"\u0406\u043d\u0448\u0456 \u0440\u0435\u0447\u0456":t="other things";break;case"\u0421\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u0438\u0439 \u043e\u0434\u044f\u0433":t="sportswear";break;case"\u041a\u043e\u0441\u0442\u044e\u043c\u0438":t="suits";break;case"\u041a\u043e\u043c\u0431\u0456\u043d\u0435\u0437\u043e\u043d\u0438":t="overalls";break;case"\u041e\u0434\u044f\u0433 \u0434\u043b\u044f \u0434\u043e\u043c\u0443 \u0442\u0430 \u0441\u043d\u0443":t="clothes for home and sleep";break;case"\u0421\u043f\u0435\u0446\u043e\u0434\u044f\u0433":t="special clothes";break;case"\u0414\u043b\u044f \u0432\u0430\u0433\u0456\u0442\u043d\u0438\u0445":t="for pregnant women";break;case"\u0412\u0437\u0443\u0442\u0442\u044f":t="shoes";break;case"\u0428\u0442\u0430\u043d\u0438 \u0442\u0430 \u0448\u043e\u0440\u0442\u0438":t="pants and shorts";break;default:t=s}if("\u0414\u0438\u0442\u044f\u0447\u0456 \u0442\u043e\u0432\u0430\u0440\u0438"===e)switch(s){case"\u0414\u0438\u0442\u044f\u0447\u0430 \u043a\u0456\u043c\u043d\u0430\u0442\u0430":t="children's room";break;case"\u0422\u043e\u0432\u0430\u0440\u0438 \u0434\u043b\u044f \u043c\u0430\u043c":t="products for mothers";break;case"\u0425\u0430\u0440\u0447\u0443\u0432\u0430\u043d\u043d\u044f \u0456 \u0433\u043e\u0434\u0443\u0432\u0430\u043d\u043d\u044f":t="food and feeding";break;case"\u0429\u043e\u0434\u0435\u043d\u043d\u0438\u0439 \u0434\u043e\u0433\u043b\u044f\u0434":t="daily care";break;case"\u041a\u043e\u043b\u044f\u0441\u043a\u0438 \u0442\u0430 \u0430\u0432\u0442\u043e\u043a\u0440\u0456\u0441\u043b\u0430":t="strollers and car seats";break;case"\u0414\u0438\u0442\u044f\u0447\u0456 \u0456\u0433\u0440\u0430\u0448\u043a\u0438":t="children's toys";break;case"\u0414\u0438\u0442\u044f\u0447\u0438\u0439 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442":t="children's transport";break;case"\u0422\u043e\u0432\u0430\u0440\u0438 \u0434\u043b\u044f \u0442\u0432\u043e\u0440\u0447\u043e\u0441\u0442\u0456":t="products for creativity";break;case"\u0410\u043a\u0442\u0438\u0432\u043d\u0438\u0439 \u0432\u0456\u0434\u043f\u043e\u0447\u0438\u043d\u043e\u043a":t="active recreation";break;default:t=s}if("\u041a\u0440\u0430\u0441\u0430 \u0442\u0430 \u0437\u0434\u043e\u0440\u043e\u0432'\u044f"===e)switch(s){case"\u0427\u043e\u043b\u043e\u0432\u0456\u0447\u0430 \u043a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430":t="men's cosmetics";break;case"\u0410\u043a\u0441\u0435\u0441\u0443\u0430\u0440\u0438 \u0434\u043b\u044f \u043a\u0440\u0430\u0441\u0438":t="beauty accessories";break;case"\u0414\u0435\u043a\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u0430 \u043a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430":t="decorative cosmetics";break;case"\u041f\u0430\u0440\u0444\u0443\u043c\u0438":t="perfume";break;case"\u041c\u0430\u043d\u0456\u043a\u044e\u0440 \u0456 \u043f\u0435\u0434\u0438\u043a\u044e\u0440":t="manicure and pedicure";break;case"\u041a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430 \u0434\u043b\u044f \u0432\u043e\u043b\u043e\u0441\u0441\u044f":t="hair cosmetics";break;case"\u041a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430 \u0434\u043b\u044f \u043e\u0431\u043b\u0438\u0447\u0447\u044f":t="face cosmetics";break;case"\u0422\u0456\u043b\u043e \u0456 \u0432\u0430\u043d\u043d\u0430":t="body and bath";break;case"\u0414\u043e\u0433\u043b\u044f\u0434 \u0437\u0430 \u0441\u043e\u0431\u043e\u044e":t="self-care";break;case"\u0422\u0435\u0445\u043d\u0456\u043a\u0430 \u0434\u043b\u044f \u043a\u0440\u0430\u0441\u0438":t="techniques for beauty";break;case"\u041f\u043e\u0434\u0430\u0440\u0443\u043d\u043a\u043e\u0432\u0456 \u043d\u0430\u0431\u043e\u0440\u0438":t="gift sets";break;case"\u0414\u0435\u0437\u0456\u043d\u0444\u0456\u043a\u0443\u044e\u0447\u0438 \u0437\u0430\u0441\u043e\u0431\u0438":t="disinfectants";break;case"\u041c\u0435\u0434\u0438\u0447\u043d\u0456 \u043f\u0440\u0438\u043b\u0430\u0434\u0438":t="medical devices";break;case"\u0414\u043e\u043c\u0430\u0448\u043d\u044f \u0430\u043f\u0442\u0435\u043a\u0430":t="home pharmacy";break;case"\u041e\u043f\u0442\u0438\u043a\u0430":t="optics";break;default:t=s}return{categoryName:a,subCategoryName:t}}(e.section,e.category),T=Object.values(U),D=(0,c.Z)(T,2),E=D[0],R=D[1],F=(0,o.I0)(),V=function(){var e=(0,t.Z)(r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F((0,l.Ns)({productId:s}));case 2:B(!z);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,I.jsxs)("li",{className:f,children:[(0,I.jsx)(u.rU,{to:"/products/".concat(E,"/").concat(R,"/").concat(s),className:m,children:(0,I.jsxs)("div",{className:k,children:[(0,I.jsx)("img",{className:x,src:a,onError:function(e){return e.target.src=d},alt:""}),(0,I.jsx)("p",{className:g,children:M})]})}),(0,I.jsxs)("div",{className:p,children:[(0,I.jsxs)("p",{className:b,children:[n,"\u0433\u0440\u043d"]}),(0,I.jsxs)("div",{className:j,onClick:V,children:[(0,I.jsx)("p",{className:C,children:L}),(0,I.jsx)(h.$aX,{size:24,className:"".concat(Z?N:v)})]})]}),(0,I.jsx)(u.rU,{to:"/products/".concat(E,"/").concat(R,"/").concat(s),children:(0,I.jsx)("p",{className:P,children:S})}),(0,I.jsx)("div",{className:w,children:W.map((function(e,s){return(0,I.jsxs)(i.Fragment,{children:[s>0&&(0,I.jsx)("span",{className:y,children:" / "}),(0,I.jsx)(_.Z,{text:e[0].name,textClass:"after-title-bigger"})]},s)}))})]})}},4896:function(e,s,a){a.r(s),a.d(s,{default:function(){return de}});var t=a(2791),c=a(9434),n=a(7689),r=a(5557),i=a(4737),o=a(5619),u=a(990),l=a(1023),d=a(9869),_=a(885),h=a(4805),f=a(9800),m="Pagination_paginationSection__1F1CP",k="Pagination_pagesSet__2tGzL",x="Pagination_pageBox__Ti6uC",g="Pagination_active__yaPsQ",p="Pagination_btnLeft__Gnp4s",b="Pagination_btnRight__O85qW",j=a(184),v=function(e){var s=e.totalPages,a=e.currentPage,t=e.onPageChange;return(0,j.jsxs)("div",{className:m,children:[(0,j.jsx)("button",{className:"".concat(p," ").concat(x),onClick:function(){return t(a-1)},disabled:1===a,children:"<"}),(0,j.jsx)("div",{className:k,children:function(){var e=[],t=Math.max(1,a-2),c=Math.min(s,a+2);a<=2&&(c=Math.min(5,s)),a>=s-2&&(t=Math.max(s-4,1));for(var n=t;n<=c;n++)e.push(n);return e}().map((function(e){return(0,j.jsx)("button",{onClick:function(){return t(e)},className:a===e?g:x,children:e},e)}))}),(0,j.jsx)("button",{className:"".concat(b," ").concat(x),onClick:function(){return t(a+1)},disabled:a===s,children:">"})]})},N=a(5602),C=a(9325),P=a(3853),w="VipProducts_arrowButton__MaX5a",y="VipProducts_styleButtonList__VzfFC",I="VipProducts_arrowButtonLeft__8Bhjx",L="VipProducts_arrowButtonRight__krUJC",Z="VipProducts_arrowlinkRigth__MGJzq",z="VipProducts_arrowlinkLeft__or1it",B="VipProducts_listCard__U0Oud",S=function(){var e=(0,c.I0)(),s=(0,t.useState)(1),a=(0,_.Z)(s,2),n=a[0],r=a[1],i=(0,c.v9)(C.d8),o=(0,c.v9)(C.Rv),u=(0,h.useMediaQuery)({minWidth:1280}),l=(0,c.v9)(d.Vg),m=(0,t.useState)(!1),k=(0,_.Z)(m,2),x=k[0],g=k[1];(0,t.useEffect)((function(){e((0,N.bj)(n))}),[e,n,x]);var p=function(e){var s=i.find((function(s){return s._id===e}));return!!s&&s.userLikes.includes(l)},b=function(e){g(e)},S=function(){window.scrollTo({top:0,behavior:"smooth"})};return(0,j.jsxs)("div",{children:[(0,j.jsxs)("div",{className:y,children:[u&&(0,j.jsx)(j.Fragment,{children:n>1&&(0,j.jsx)("div",{className:"".concat(w," ").concat(I),onClick:function(){n>1&&r(n-1)},children:(0,j.jsx)(P.YFh,{size:60,strokeWidth:1,className:z})})}),(0,j.jsx)("ul",{className:B,children:i.map((function(e){return(0,j.jsx)(f.Z,{_id:e._id,mainPhotoUrl:e.mainPhotoUrl,price:e.price,likes:e.userLikes.length?e.userLikes.length:0,userLike:p(e._id),isLiked:x,handleLike:b,nameProduct:e.nameProduct,description:e.description,size:e.size,section:e.section,category:e.category},e._id)}))}),u&&(0,j.jsx)(j.Fragment,{children:n<o&&(0,j.jsx)("div",{className:"".concat(w," ").concat(L),onClick:function(){n<o&&r(n+1)},children:(0,j.jsx)(P.Tfp,{size:60,strokeWidth:1,className:Z})})})]}),(0,j.jsx)("div",{children:!u&&(0,j.jsx)("div",{children:(0,j.jsx)(v,{totalPages:o,currentPage:n,onPageChange:function(e){r(e),S()}})})})]})},M="SelectorProducts_listCard__SJrXZ",W=function(e){var s=e.activeButton,a=e.activeNewRef,n=(0,c.I0)(),r=(0,t.useState)(1),i=(0,_.Z)(r,2),o=i[0],u=i[1],l=(0,t.useState)("new"),d=(0,_.Z)(l,2),h=d[0],m=d[1],k=(0,c.v9)(C.Oc),x=(0,c.v9)(C.nE);(0,t.useEffect)((function(){n((0,N.y5)({page:o,selectorName:h}))}),[n,o,h]),(0,t.useEffect)((function(){s!==h&&(u(1),m(s))}),[s,o,h]);var g=function(){a.current.scrollIntoView({behavior:"smooth"})};return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("ul",{className:M,children:k.map((function(e){return(0,j.jsx)(f.Z,{_id:e._id,mainPhotoUrl:e.mainPhotoUrl,price:e.price,likes:e.userLikes.length?e.userLikes.length:0,nameProduct:e.nameProduct,description:e.description,size:e.size,section:e.section,category:e.category},e._id)}))}),(0,j.jsx)(v,{totalPages:x,currentPage:o,onPageChange:function(e){u(e),g()}})]})},U=a(3214),T="Catalog_container__t+E7g",D="Catalog_styleWrapButton__QKS+7",E="Catalog_button__Rfu5q",R="Catalog_active__rNS7+",F=function(){var e=(0,t.useRef)(),s=(0,t.useState)("new"),a=(0,_.Z)(s,2),c=a[0],n=a[1],r=function(e){n(e)};return(0,j.jsxs)("section",{className:T,children:[(0,j.jsx)(U.Z,{text:"VIP-\u041e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f",textClass:"catalogTitle"}),(0,j.jsx)(S,{}),(0,j.jsxs)("div",{className:D,ref:e,children:[(0,j.jsx)("button",{className:"new"===c?"".concat(E," ").concat(R):E,onClick:function(){return r("new")},children:"\u041d\u043e\u0432\u0438\u043d\u043a\u0438"}),(0,j.jsx)("button",{className:"sale"===c?"".concat(E," ").concat(R):E,onClick:function(){return r("sale")},children:"\u0417\u043d\u0438\u0436\u043a\u0438"}),(0,j.jsx)("button",{className:"advice"===c?"".concat(E," ").concat(R):E,onClick:function(){return r("advice")},children:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0456"})]}),(0,j.jsx)(W,{activeButton:c,activeNewRef:e})]})},V=a(4713),Y=a(6745),O=a(1238),q=a(241),J="Carusel_container__muIIM",G="Carusel_imageBox__jus7U",Q="Carusel_image__UmREs",X="Carusel_currentImage__wYnU-",H="Carusel_pagination__euD8G",K="Carusel_paginationBox__DUL0X",$="Carusel_paginationDot__kfFV5",A="Carusel_arrowButton__b9L7K",ee="Carusel_arrowlinkRigth__9OP--",se="Carusel_arrowlinkLeft__cgOSi",ae="Carusel_arrowButtonLeft__e+uyT",te="Carusel_arrowButtonRight__NhbWJ",ce=[V,Y,O,q],ne=function(){var e=(0,t.useState)(0),s=(0,_.Z)(e,2),a=s[0],c=s[1];(0,t.useEffect)((function(){var e=setInterval((function(){c((a+1)%ce.length)}),1e4);return function(){clearInterval(e)}}),[a]);var n=function(e){!function(e){c(e)}(e)};return(0,j.jsx)("div",{className:J,children:(0,j.jsxs)("div",{className:G,children:[(0,j.jsx)("div",{className:"".concat(A," ").concat(ae),onClick:function(){c((a-1+ce.length)%ce.length)},children:(0,j.jsx)(P.YFh,{size:60,strokeWidth:1,className:se})}),ce.map((function(e,s){return(0,j.jsx)("img",{className:"".concat(Q," ").concat(s===a?X:""),src:e,alt:"Carousel",style:{zIndex:s===a?1:0}},s)})),(0,j.jsx)("div",{className:"".concat(A," ").concat(te),onClick:function(){c((a+1)%ce.length)},children:(0,j.jsx)(P.Tfp,{size:60,strokeWidth:1,className:ee})}),(0,j.jsx)("div",{className:H,children:(0,j.jsx)("div",{className:K,children:ce.map((function(e,s){return(0,j.jsx)("div",{onClick:function(){return n(s)},style:{opacity:s===a?1:.3},className:$},s)}))})})]})})},re="Default_default__z3Wcs",ie="Default_defaultTitle__SzAw+",oe=function(){var e=(0,c.v9)(d.t2);return(0,j.jsxs)("section",{className:re,children:[!e&&(0,j.jsx)("div",{className:ie,children:(0,j.jsx)(U.Z,{text:"\u041f\u0435\u0440\u0448 \u043d\u0456\u0436 \u043f\u043e\u0447\u0430\u0442\u0438 \u0437\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0439\u0442\u0435\u0441\u044f!",textClass:"catalogTitle"})}),(0,j.jsx)(ne,{}),(0,j.jsx)(F,{})]})},ue={imgDesktop:"Home_imgDesktop__nsaId"},le=function(){var e,s=(0,c.I0)(),a=(0,c.v9)(o.Ph),d=(0,n.s0)();return e="https://ydovzhyk.github.io/easy-shop/",(0,t.useEffect)((function(){var a=new URLSearchParams(window.location.search),t=a.get("message"),c=a.get("accessToken"),n=a.get("refreshToken"),o=a.get("sid");if(c){var u={accessToken:c,refreshToken:n,sid:o};s((0,r.Nq)(u)),localStorage.setItem("easy-shop.authData",JSON.stringify(u)),window.location.assign(e)}t&&(s((0,i.wj)(t)),setTimeout((function(){window.location.assign(e)}),5e3))}),[s,d,e]),(0,j.jsx)("section",{className:ue.home,children:(0,j.jsxs)(l.Z,{children:[(0,j.jsx)(oe,{}),a&&(0,j.jsx)(u.Z,{text:a})]})})},de=function(){return(0,j.jsx)(j.Fragment,{children:(0,j.jsx)(le,{})})}},4713:function(e,s,a){e.exports=a.p+"static/media/slide-1.cdeff54d52800e44b4a2.jpg"},6745:function(e,s,a){e.exports=a.p+"static/media/slide-2.ccd04c49103c0c7b7742.jpg"},1238:function(e,s,a){e.exports=a.p+"static/media/slide-3.c489cbc1211acbfb2273.jpg"},241:function(e,s,a){e.exports=a.p+"static/media/slide-4.4c0d2cdd73a73363bd83.jpg"},4458:function(e,s,a){e.exports=a.p+"static/media/no_photo.e1c9f7d877f5eac85cc7.jpg"}}]);
//# sourceMappingURL=896.948818af.chunk.js.map