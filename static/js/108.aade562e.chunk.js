"use strict";(self.webpackChunkeasy_shop=self.webpackChunkeasy_shop||[]).push([[108,682],{2682:function(e,a,t){t.r(a),t.d(a,{default:function(){return _}});var s=t(885),r=t(2791),n=t(9434),c=t(3287),i=t(5602),o=t(9325),l=t(9869),u="SelectorProducts_listCard__SJrXZ",d=t(184),_=function(e){var a=e.currentButton,t=e.currentPage,_=(0,n.I0)(),h=(0,r.useState)(!1),m=(0,s.Z)(h,2),f=m[0],p=m[1],g=(0,n.v9)(o.Oc),v=(0,n.v9)(l.Vg);(0,r.useEffect)((function(){_((0,i.y5)({page:t,selectorName:a}))}),[_,t,a,f]);var x=function(e){var a=g.find((function(a){return a._id===e}));return!!a&&a.userLikes.includes(v)},k=function(e){p(e)};return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)("ul",{className:u,children:g.map((function(e){return(0,d.jsx)(c.Z,{_id:e._id,userId:v,mainPhotoUrl:e.mainPhotoUrl,price:e.price,likes:e.userLikes.length?e.userLikes.length:0,userLike:x(e._id),isLiked:f,handleLike:k,nameProduct:e.nameProduct,owner:e.owner,description:e.description,size:e.size,section:e.section,category:e.category,vip:e.vip,sale:e.sale},e._id)}))})})}},1412:function(e,a,t){var s=t(184);a.Z=function(e){var a=e.children;return(0,s.jsx)("div",{className:"container",children:a})}},1023:function(e,a,t){t.d(a,{Z:function(){return s.Z}});var s=t(1412)},990:function(e,a,t){t.d(a,{Z:function(){return P}});var s=t(885),r=t(2791),n=t(9434),c=t(8644),i=t(188),o=t(4737),l=t(2951),u=t(3214),d=t(1632),_=t(9806),h="MessageWindow_messageWindow__uRdd8",m="MessageWindow_dismissButton__SLD4U",f="MessageWindow_boo__YcpDh",p="MessageWindow_face__YrZvM",g="MessageWindow_shadow__dHQj9",v="MessageWindow_confirmButtons__sF71C",x="MessageWindow_ButtonsBlock__+USC0",k="MessageWindow_btnYes__-yYz3",j="MessageWindow_btnNo__lIEXL",b=t(184);function P(e){var a=e.text,t=e.onDismiss,P=e.confirmButtons,C=e.onConfirm,N=(0,n.I0)(),y=(0,r.useState)(!0),w=(0,s.Z)(y,2),L=w[0],I=w[1];if((0,r.useEffect)((function(){if(I(!0),!P){var e=setTimeout((function(){I(!1),N((0,l.AT)()),N((0,c.k7)()),N((0,i.nv)()),N((0,o.Z$)())}),5e3);return function(){return clearTimeout(e)}}}),[a,N,P]),!L)return null;var S=function(e){I(!1),"function"===typeof C&&C(e)};return(0,b.jsxs)("div",{className:h,children:[!P&&(0,b.jsx)("button",{className:m,onClick:function(){I(!1),"function"===typeof t&&t(),N((0,l.AT)()),N((0,c.k7)()),N((0,i.nv)()),N((0,o.Z$)())},children:(0,b.jsx)(_.G,{icon:d.NBC,size:"lg"})}),(0,b.jsx)("div",{className:f,children:(0,b.jsx)("div",{className:p,id:"face"})}),(0,b.jsx)("div",{className:g}),P?(0,b.jsxs)("div",{className:v,children:[(0,b.jsx)(u.Z,{text:a,textClass:"textMessageBtn"}),(0,b.jsxs)("div",{className:x,children:[(0,b.jsx)("button",{className:k,onClick:function(){return S("yes")},children:"\u0422\u0430\u043a"}),(0,b.jsx)("button",{className:j,onClick:function(){return S("no")},children:"\u041d\u0456"})]})]}):(0,b.jsx)(u.Z,{text:a,textClass:"textMessage"})]})}},5310:function(e,a,t){t.d(a,{Z:function(){return u}});t(2791);var s="Pagination_paginationSection__1F1CP",r="Pagination_pagesSet__2tGzL",n="Pagination_pageBox__Ti6uC",c="Pagination_active__yaPsQ",i="Pagination_btnLeft__Gnp4s",o="Pagination_btnRight__O85qW",l=t(184),u=function(e){var a=e.totalPages,t=e.currentPage,u=e.onPageChange;return(0,l.jsxs)("div",{className:s,children:[(0,l.jsx)("button",{className:"".concat(i," ").concat(n),onClick:function(){return u(t-1)},disabled:1===t,children:"<"}),(0,l.jsx)("div",{className:r,children:function(){var e=[],s=Math.max(1,t-2),r=Math.min(a,t+2);t<=2&&(r=Math.min(5,a)),t>=a-2&&(s=Math.max(a-4,1));for(var n=s;n<=r;n++)e.push(n);return e}().map((function(e){return(0,l.jsx)("button",{onClick:function(){return u(e)},className:t===e?c:n,children:e},e)}))}),(0,l.jsx)("button",{className:"".concat(o," ").concat(n),onClick:function(){return u(t+1)},disabled:t===a,children:">"})]})}},3287:function(e,a,t){t.d(a,{Z:function(){return j}});var s=t(5861),r=t(885),n=t(4687),c=t.n(n),i=t(2791),o=t(9434),l=t(1087),u=t(9505),d=t(9869),_="SizeHovered_groupHovering__gXRI2",h=t(184),m=function(e){var a=e.sizes,t=e.activeSize,s=null!==t&&void 0!==a[t]?a[t][0].value:[];return(0,h.jsx)("div",{className:_,children:s.length>1?s.map((function(e){return Object.entries(e)[0].join(": ")})).join(" / "):null})},f=t(422),p=t(3214),g=t(4458),v=t(3853),x=t(8785),k={itemCard:"ProductItem_itemCard__xUEhb",photoLink:"ProductItem_photoLink__Y5Dsa",photoCard:"ProductItem_photoCard__6ocdl",overlayLabel:"ProductItem_overlayLabel__h-wko",label:"ProductItem_label__mtTag",styleDescriptionProductCardBox:"ProductItem_styleDescriptionProductCardBox__ycSR3",styleDescriptionProductCard:"ProductItem_styleDescriptionProductCard__yCwUX",descriptionProductCard:"ProductItem_descriptionProductCard__yOzL7",stylePriceLike:"ProductItem_stylePriceLike__QzHTI",stylePrice:"ProductItem_stylePrice__8k+90",oldPriceCard:"ProductItem_oldPriceCard__uzdUY",newPriceCard:"ProductItem_newPriceCard__gCQ7A",priceCard:"ProductItem_priceCard__nb2y+",styleLike:"ProductItem_styleLike__EgsqI",liked:"ProductItem_liked__Dnddi",active:"ProductItem_active__p-95Y",likeCard:"ProductItem_likeCard__9FnPv",styleSizeCard:"ProductItem_styleSizeCard__DbAy3",separator:"ProductItem_separator__su5Ku",sizeName:"ProductItem_sizeName__C+glV",hoveredSize:"ProductItem_hoveredSize__WMEJd",link:"ProductItem_link__2Lu+d"},j=function(e){var a=e._id,t=e.userId,n=e.mainPhotoUrl,_=e.price,j=e.likes,b=e.userLike,P=e.isLiked,C=e.handleLike,N=e.nameProduct,y=e.owner,w=e.description,L=e.size,I=e.section,S=e.category,z=e.vip,Z=e.sale,M=(0,x.a)(I,S),U=Object.values(M),B=(0,r.Z)(U,2),T=B[0],W=B[1],E=(0,o.I0)(),R=(0,o.v9)(d.t2),D=(0,i.useState)(null),V=(0,r.Z)(D,2),F=V[0],O=V[1],Y=(0,i.useState)(!1),Q=(0,r.Z)(Y,2),X=Q[0],q=Q[1],A=_*(100-Z)/100,H=function(){var e=(0,s.Z)(c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(R){e.next=4;break}return q(!0),O("\u0421\u043f\u043e\u0447\u0430\u0442\u043a\u0443 \u0437\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0439\u0442\u0435\u0441\u044f!"),e.abrupt("return");case 4:if(y!==t){e.next=6;break}return e.abrupt("return");case 6:return e.next=8,E((0,u.Ns)({productId:a}));case 8:C(!P);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=(0,i.useState)(null),G=(0,r.Z)(J,2),K=G[0],$=G[1],ee=function(e,a){$(e)},ae=function(){$(null)};return(0,h.jsxs)("li",{className:k.itemCard,children:[(0,h.jsxs)(l.rU,{to:"/product/".concat(T,"/").concat(W,"/").concat(a),className:k.photoLink,children:[(0,h.jsx)("img",{className:k.photoCard,src:n,onError:function(e){return e.target.src=g},alt:"\u0444\u043e\u0442\u043e \u0442\u043e\u0432\u0430\u0440\u0443"}),(0,h.jsxs)("div",{className:k.overlayLabel,children:["\u0422\u0430\u043a"===z&&(0,h.jsx)("div",{className:k.label,children:(0,h.jsx)("span",{children:"Vip"})}),Z>0&&(0,h.jsx)("div",{className:k.label,children:(0,h.jsxs)("span",{children:[Z,"%"]})})]}),(0,h.jsx)("div",{className:k.styleDescriptionProductCardBox}),(0,h.jsx)("div",{className:k.styleDescriptionProductCard,children:(0,h.jsx)("p",{className:k.descriptionProductCard,children:function(){if(w.length>90){var e=w.substring(0,90);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("span",{children:[e," "]}),(0,h.jsx)("br",{}),(0,h.jsx)("span",{children:". . ."})]})}return w}()})})]}),(0,h.jsxs)("div",{className:k.stylePriceLike,children:[(0,h.jsx)("div",{className:k.stylePrice,children:Z?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("p",{className:k.oldPriceCard,children:[_,"\u0433\u0440\u043d"]}),(0,h.jsxs)("p",{className:k.newPriceCard,children:[A,"\u0433\u0440\u043d"]})]}):(0,h.jsxs)("p",{className:k.priceCard,children:[_,"\u0433\u0440\u043d"]})}),(0,h.jsxs)("div",{className:k.styleLike,onClick:H,children:[(0,h.jsx)("p",{className:k.likeCard,children:j}),(0,h.jsx)(v.$aX,{size:24,className:"".concat(b?k.active:k.liked)})]})]}),(0,h.jsx)("div",{className:k.linkWrapper,children:(0,h.jsx)(l.rU,{to:"/products/".concat(T,"/").concat(W,"/").concat(a),children:(0,h.jsx)("div",{style:{justifyContent:"flex-start"},children:(0,h.jsx)(p.Z,{text:N,textClass:"nameProductCard"})})})}),(0,h.jsx)("div",{className:k.styleSizeCard,onMouseEnter:ee,onMouseLeave:ae,children:L.map((function(e,a){var t,s,r,n;return"One size"===(null===(t=e[0])||void 0===t?void 0:t.name)||"\u0406\u043d\u0448\u0438\u0439"===(null===(s=e[0])||void 0===s?void 0:s.name)?(0,h.jsxs)("div",{className:k.sizeItem,children:[a>0&&(0,h.jsx)("span",{className:k.separator,children:" / "}),(0,h.jsx)(p.Z,{text:null===(r=e[0])||void 0===r?void 0:r.name,textClass:"after-title-bigger"})]},a):(0,h.jsxs)("div",{className:k.sizeItem,onMouseEnter:function(e){return ee(a)},onMouseLeave:ae,children:[a>0&&(0,h.jsx)("span",{className:k.separator,children:" / "}),(0,h.jsx)("span",{className:k.sizeName,children:null===(n=e[0])||void 0===n?void 0:n.name}),K===a&&(0,h.jsx)("div",{className:k.hoveredSize,children:(0,h.jsx)(m,{activeSize:K,sizes:L})})]},a)}))}),X&&(0,h.jsx)(f.Z,{text:F,onDismiss:function(){q(!1),O(null)}})]})}},8785:function(e,a,t){function s(e,a){var t="",s="";switch(e){case"\u0416\u0456\u043d\u043a\u0430\u043c":t="women";break;case"\u0427\u043e\u043b\u043e\u0432\u0456\u043a\u0430\u043c":t="men";break;case"\u0414\u0438\u0442\u044f\u0447\u0456 \u0442\u043e\u0432\u0430\u0440\u0438":t="children";break;case"\u041a\u0440\u0430\u0441\u0430 \u0442\u0430 \u0437\u0434\u043e\u0440\u043e\u0432'\u044f":t="beauty&health";break;default:t=e}if("\u0427\u043e\u043b\u043e\u0432\u0456\u043a\u0430\u043c"===e)switch(a){case"\u0412\u0435\u0440\u0445\u043d\u0456\u0439 \u043e\u0434\u044f\u0433":s="outerwear";break;case"\u041f\u0456\u0434\u0436\u0430\u043a\u0438 \u0456 \u043a\u043e\u0441\u0442\u044e\u043c\u0438":s="jackets & suits";break;case"\u041a\u043e\u0444\u0442\u0438 \u0442\u0430 \u0441\u0432\u0435\u0442\u0440\u0438":s="coats & tops";break;case"\u0421\u043e\u0440\u043e\u0447\u043a\u0438 \u0442\u0430 \u0442\u0435\u043d\u0456\u0441\u043a\u0438":s="shirts & t-shirts";break;case"\u0424\u0443\u0442\u0431\u043e\u043b\u043a\u0438 \u0442\u0430 \u043c\u0430\u0439\u043a\u0438":s="t-shirts & tank tops";break;case"\u041d\u0438\u0436\u043d\u044f \u0431\u0456\u043b\u0438\u0437\u043d\u0430":s="underwear";break;case"\u0412\u0437\u0443\u0442\u0442\u044f":s="shoes";break;case"\u0410\u043a\u0441\u0435\u0441\u0443\u0430\u0440\u0438":s="accessories";break;case"\u0421\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u0438\u0439 \u043e\u0434\u044f\u0433":s="sportswear";break;case"\u041e\u0434\u044f\u0433 \u0434\u043b\u044f \u0434\u043e\u043c\u0443 \u0442\u0430 \u0441\u043d\u0443":s="clothing for home and sleep";break;case"\u0421\u043f\u0435\u0446\u043e\u0434\u044f\u0433":s="special clothing";break;case"\u0422\u0430\u043a\u0442\u0438\u0447\u043d\u0438\u0439 \u043e\u0434\u044f\u0433":s="tactical clothing";break;case"\u0428\u0442\u0430\u043d\u0438 \u0442\u0430 \u0448\u043e\u0440\u0442\u0438":s="pants and shorts";break;default:s=a}if("\u0416\u0456\u043d\u043a\u0430\u043c"===e)switch(a){case"\u0412\u0435\u0440\u0445\u043d\u0456\u0439 \u043e\u0434\u044f\u0433":s="outerwear";break;case"\u041f\u043b\u0430\u0442\u0442\u044f":s="dresses";break;case"\u0421\u043f\u0456\u0434\u043d\u0438\u0446\u0456":s="skirts";break;case"\u041c\u0430\u0439\u043a\u0438 \u0456 \u0444\u0443\u0442\u0431\u043e\u043b\u043a\u0438":s="t-shirts and t-shirts";break;case"\u0421\u043e\u0440\u043e\u0447\u043a\u0438 \u0442\u0430 \u0431\u043b\u0443\u0437\u0438":s="shirts and blouses";break;case"Coats":s="\u0421\u0432\u0435\u0442\u0440\u0438";break;case"\u041d\u0438\u0436\u043d\u044f \u0431\u0456\u043b\u0438\u0437\u043d\u0430":s="underwear";break;case"\u0410\u043a\u0441\u0435\u0441\u0443\u0430\u0440\u0438":s="accessories";break;case"\u0406\u043d\u0448\u0456 \u0440\u0435\u0447\u0456":s="other things";break;case"\u0421\u043f\u043e\u0440\u0442\u0438\u0432\u043d\u0438\u0439 \u043e\u0434\u044f\u0433":s="sportswear";break;case"\u041a\u043e\u0441\u0442\u044e\u043c\u0438":s="suits";break;case"\u041a\u043e\u043c\u0431\u0456\u043d\u0435\u0437\u043e\u043d\u0438":s="overalls";break;case"\u041e\u0434\u044f\u0433 \u0434\u043b\u044f \u0434\u043e\u043c\u0443 \u0442\u0430 \u0441\u043d\u0443":s="clothes for home and sleep";break;case"\u0421\u043f\u0435\u0446\u043e\u0434\u044f\u0433":s="special clothes";break;case"\u0414\u043b\u044f \u0432\u0430\u0433\u0456\u0442\u043d\u0438\u0445":s="for pregnant women";break;case"\u0412\u0437\u0443\u0442\u0442\u044f":s="shoes";break;case"\u0428\u0442\u0430\u043d\u0438 \u0442\u0430 \u0448\u043e\u0440\u0442\u0438":s="pants and shorts";break;default:s=a}if("\u0414\u0438\u0442\u044f\u0447\u0456 \u0442\u043e\u0432\u0430\u0440\u0438"===e)switch(a){case"\u0414\u0438\u0442\u044f\u0447\u0430 \u043a\u0456\u043c\u043d\u0430\u0442\u0430":s="children's room";break;case"\u0422\u043e\u0432\u0430\u0440\u0438 \u0434\u043b\u044f \u043c\u0430\u043c":s="products for mothers";break;case"\u0425\u0430\u0440\u0447\u0443\u0432\u0430\u043d\u043d\u044f \u0456 \u0433\u043e\u0434\u0443\u0432\u0430\u043d\u043d\u044f":s="food and feeding";break;case"\u0429\u043e\u0434\u0435\u043d\u043d\u0438\u0439 \u0434\u043e\u0433\u043b\u044f\u0434":s="daily care";break;case"\u041a\u043e\u043b\u044f\u0441\u043a\u0438 \u0442\u0430 \u0430\u0432\u0442\u043e\u043a\u0440\u0456\u0441\u043b\u0430":s="strollers and car seats";break;case"\u0414\u0438\u0442\u044f\u0447\u0456 \u0456\u0433\u0440\u0430\u0448\u043a\u0438":s="children's toys";break;case"\u0414\u0438\u0442\u044f\u0447\u0438\u0439 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442":s="children's transport";break;case"\u0422\u043e\u0432\u0430\u0440\u0438 \u0434\u043b\u044f \u0442\u0432\u043e\u0440\u0447\u043e\u0441\u0442\u0456":s="products for creativity";break;case"\u0410\u043a\u0442\u0438\u0432\u043d\u0438\u0439 \u0432\u0456\u0434\u043f\u043e\u0447\u0438\u043d\u043e\u043a":s="active recreation";break;default:s=a}if("\u041a\u0440\u0430\u0441\u0430 \u0442\u0430 \u0437\u0434\u043e\u0440\u043e\u0432'\u044f"===e)switch(a){case"\u0427\u043e\u043b\u043e\u0432\u0456\u0447\u0430 \u043a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430":s="men's cosmetics";break;case"\u0410\u043a\u0441\u0435\u0441\u0443\u0430\u0440\u0438 \u0434\u043b\u044f \u043a\u0440\u0430\u0441\u0438":s="beauty accessories";break;case"\u0414\u0435\u043a\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u0430 \u043a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430":s="decorative cosmetics";break;case"\u041f\u0430\u0440\u0444\u0443\u043c\u0438":s="perfume";break;case"\u041c\u0430\u043d\u0456\u043a\u044e\u0440 \u0456 \u043f\u0435\u0434\u0438\u043a\u044e\u0440":s="manicure and pedicure";break;case"\u041a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430 \u0434\u043b\u044f \u0432\u043e\u043b\u043e\u0441\u0441\u044f":s="hair cosmetics";break;case"\u041a\u043e\u0441\u043c\u0435\u0442\u0438\u043a\u0430 \u0434\u043b\u044f \u043e\u0431\u043b\u0438\u0447\u0447\u044f":s="face cosmetics";break;case"\u0422\u0456\u043b\u043e \u0456 \u0432\u0430\u043d\u043d\u0430":s="body and bath";break;case"\u0414\u043e\u0433\u043b\u044f\u0434 \u0437\u0430 \u0441\u043e\u0431\u043e\u044e":s="self-care";break;case"\u0422\u0435\u0445\u043d\u0456\u043a\u0430 \u0434\u043b\u044f \u043a\u0440\u0430\u0441\u0438":s="techniques for beauty";break;case"\u041f\u043e\u0434\u0430\u0440\u0443\u043d\u043a\u043e\u0432\u0456 \u043d\u0430\u0431\u043e\u0440\u0438":s="gift sets";break;case"\u0414\u0435\u0437\u0456\u043d\u0444\u0456\u043a\u0443\u044e\u0447\u0438 \u0437\u0430\u0441\u043e\u0431\u0438":s="disinfectants";break;case"\u041c\u0435\u0434\u0438\u0447\u043d\u0456 \u043f\u0440\u0438\u043b\u0430\u0434\u0438":s="medical devices";break;case"\u0414\u043e\u043c\u0430\u0448\u043d\u044f \u0430\u043f\u0442\u0435\u043a\u0430":s="home pharmacy";break;case"\u041e\u043f\u0442\u0438\u043a\u0430":s="optics";break;default:s=a}return{categoryName:t,subCategoryName:s}}t.d(a,{a:function(){return s}})},7108:function(e,a,t){t.r(a),t.d(a,{default:function(){return ne}});var s=t(2791),r=t(9434),n=t(7689),c=t(9505),i=t(4737),o=t(5619),l=t(990),u=t(1023),d=t(9869),_=t(885),h=t(9325),m=t(4805),f=t(3287),p=t(5310),g=t(5602),v=t(3853),x="VipProducts_container__5mQdY",k="VipProducts_styleButtonList__VzfFC",j="VipProducts_arrowButton__MaX5a",b="VipProducts_arrowButtonLeft__8Bhjx",P="VipProducts_arrowButtonRight__krUJC",C="VipProducts_arrowlinkRigth__MGJzq",N="VipProducts_arrowlinkLeft__or1it",y="VipProducts_listCard__U0Oud",w=t(184),L=function(){var e=(0,r.I0)(),a=(0,n.TH)(),t=(0,n.s0)(),c=(0,s.useState)(1),i=(0,_.Z)(c,2),o=i[0],l=i[1],u=(0,s.useState)("vip"),L=(0,_.Z)(u,2),I=L[0],S=L[1],z=(0,s.useState)(!1),Z=(0,_.Z)(z,2),M=Z[0],U=Z[1],B=(0,r.v9)(h.d8),T=(0,r.v9)(h.Rv),W=(0,r.v9)(d.Vg),E=(0,m.useMediaQuery)({minWidth:1280});(0,s.useEffect)((function(){var e=new URLSearchParams(a.search),t=e.get("category"),s=e.get("page");s&&t&&"vip"!==t||s&&t&&"vip"===t&&(l(Number(s)),S(t))}),[a.search]),(0,s.useEffect)((function(){e((0,g.bj)(o))}),[e,o,M]),(0,s.useEffect)((function(){"vip"===new URLSearchParams(window.location.search).get("category")&&V()}),[B]);var R=function(e){var a=B.find((function(a){return a._id===e}));return!!a&&a.userLikes.includes(W)},D=function(e){U(e)},V=function(){window.scrollTo({top:0,behavior:"smooth"})},F=function(e){var s=new URLSearchParams(a.search);s.set("category",e.category),s.set("page",e.page);var r="?".concat(s.toString());t(r)};return(0,w.jsxs)("section",{className:x,children:[(0,w.jsxs)("div",{className:k,children:[E&&(0,w.jsx)(w.Fragment,{children:o>1&&(0,w.jsx)("div",{className:"".concat(j," ").concat(b),onClick:function(){o>1&&(l(o-1),F({category:I,page:o-1}))},children:(0,w.jsx)(v.YFh,{size:60,strokeWidth:1,className:N})})}),(0,w.jsx)("ul",{className:y,children:B.map((function(e){return(0,w.jsx)(f.Z,{_id:e._id,userId:W,mainPhotoUrl:e.mainPhotoUrl,price:e.price,likes:e.userLikes.length?e.userLikes.length:0,userLike:R(e._id),isLiked:M,handleLike:D,nameProduct:e.nameProduct,owner:e.owner,description:e.description,size:e.size,section:e.section,category:e.category,vip:e.vip,sale:e.sale},e._id)}))}),E&&(0,w.jsx)(w.Fragment,{children:o<T&&(0,w.jsx)("div",{className:"".concat(j," ").concat(P),onClick:function(){o<T&&(l(o+1),F({category:I,page:o+1}))},children:(0,w.jsx)(v.Tfp,{size:60,strokeWidth:1,className:C})})})]}),(0,w.jsx)("div",{children:!E&&(0,w.jsx)("div",{children:(0,w.jsx)(p.Z,{totalPages:T,currentPage:o,onPageChange:function(e){l(e),F({category:I,page:e})}})})})]})},I=t(2682),S=t(3214),z="Catalog_container__t+E7g",Z="Catalog_styleWrapButton__QKS+7",M="Catalog_button__Rfu5q",U="Catalog_active__rNS7+",B="Catalog_buttonAdvice__K4F0Q",T=function(){var e=(0,s.useRef)(),a=(0,n.TH)(),t=(0,n.s0)(),c=(0,r.v9)(h.nE),i=(0,r.v9)(h.Oc),o=(0,s.useState)("new"),l=(0,_.Z)(o,2),u=l[0],d=l[1],m=(0,s.useState)(1),f=(0,_.Z)(m,2),g=f[0],v=f[1];(0,s.useEffect)((function(){var e=new URLSearchParams(a.search),t=e.get("category"),s=e.get("page");s&&t&&"vip"===t||s&&t&&"vip"!==t&&(v(Number(s)),d(t))}),[a.search]),(0,s.useEffect)((function(){var e=new URLSearchParams(window.location.search).get("category");"new"!==e&&"sale"!==e&&"advice"!==e||j()}),[i]);var x=function(e){d(e),v(1),k({category:e,page:1})},k=function(e){var s=new URLSearchParams(a.search);s.set("category",e.category),s.set("page",e.page);var r="?".concat(s.toString());t(r)},j=function(){e.current.scrollIntoView({behavior:"smooth"})};return(0,w.jsxs)("section",{className:z,children:[(0,w.jsx)(S.Z,{text:"VIP-\u041e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f",textClass:"catalogTitle"}),(0,w.jsx)(L,{}),(0,w.jsxs)("div",{className:Z,ref:e,children:[(0,w.jsx)("button",{className:"new"===u?"".concat(M," ").concat(U):M,onClick:function(){return x("new")},children:"\u041d\u043e\u0432\u0438\u043d\u043a\u0438"}),(0,w.jsx)("button",{className:"sale"===u?"".concat(M," ").concat(U):M,onClick:function(){return x("sale")},children:"\u0417\u043d\u0438\u0436\u043a\u0438"}),(0,w.jsx)("button",{className:"advice"===u?"".concat(M," ").concat(U," ").concat(B):"".concat(M," ").concat(B),onClick:function(){return x("advice")},children:"\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0456"})]}),(0,w.jsx)(I.default,{currentButton:u,currentPage:g}),(0,w.jsx)(p.Z,{totalPages:c,currentPage:g,onPageChange:function(e){v(e),k({category:u,page:e})}})]})},W=t(4713),E=t(6745),R=t(1238),D=t(241),V="Carusel_container__muIIM",F="Carusel_imageBox__jus7U",O="Carusel_image__UmREs",Y="Carusel_currentImage__wYnU-",Q="Carusel_pagination__euD8G",X="Carusel_paginationBox__DUL0X",q="Carusel_paginationDot__kfFV5",A="Carusel_arrowButton__b9L7K",H="Carusel_arrowlinkRigth__9OP--",J="Carusel_arrowlinkLeft__cgOSi",G="Carusel_arrowButtonLeft__e+uyT",K="Carusel_arrowButtonRight__NhbWJ",$=[W,E,R,D],ee=function(){var e=(0,s.useState)(0),a=(0,_.Z)(e,2),t=a[0],r=a[1];(0,s.useEffect)((function(){var e=setInterval((function(){r((t+1)%$.length)}),1e4);return function(){clearInterval(e)}}),[t]);var n=function(e){!function(e){r(e)}(e)};return(0,w.jsx)("div",{className:V,children:(0,w.jsxs)("div",{className:F,children:[(0,w.jsx)("div",{className:"".concat(A," ").concat(G),onClick:function(){r((t-1+$.length)%$.length)},children:(0,w.jsx)(v.YFh,{size:60,strokeWidth:1,className:J})}),$.map((function(e,a){return(0,w.jsx)("img",{className:"".concat(O," ").concat(a===t?Y:""),src:e,alt:"Carousel",style:{zIndex:a===t?1:0}},a)})),(0,w.jsx)("div",{className:"".concat(A," ").concat(K),onClick:function(){r((t+1)%$.length)},children:(0,w.jsx)(v.Tfp,{size:60,strokeWidth:1,className:H})}),(0,w.jsx)("div",{className:Q,children:(0,w.jsx)("div",{className:X,children:$.map((function(e,a){return(0,w.jsx)("div",{onClick:function(){return n(a)},style:{opacity:a===t?1:.3},className:q},a)}))})})]})})},ae=t(4681),te={defaultTitle:"Default_defaultTitle__SzAw+"},se=function(){var e=(0,r.v9)(d.t2),a=(0,ae.Z)().width<768;return(0,w.jsxs)("section",{className:te.default,children:[!e&&(0,w.jsx)("div",{className:te.defaultTitle,children:(0,w.jsx)(S.Z,{text:"\u041f\u0435\u0440\u0448 \u043d\u0456\u0436 \u043f\u043e\u0447\u0430\u0442\u0438 \u0437\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0439\u0442\u0435\u0441\u044f!",textClass:"catalogTitle"})}),!a&&(0,w.jsx)(w.Fragment,{children:(0,w.jsx)(ee,{})}),(0,w.jsx)(T,{})]})},re=function(){var e,a=(0,r.I0)(),t=(0,r.v9)(o.Ph),d=(0,n.s0)();return e="https://ydovzhyk.github.io/easy-shop/",(0,s.useEffect)((function(){var t=new URLSearchParams(window.location.search),s=t.get("message"),r=t.get("accessToken"),n=t.get("refreshToken"),o=t.get("sid");if(r){var l={accessToken:r,refreshToken:n,sid:o};a((0,c.Nq)(l)),localStorage.setItem("easy-shop.authData",JSON.stringify(l)),window.location.assign(e)}s&&(a((0,i.wj)(s)),setTimeout((function(){window.location.assign(e)}),5e3))}),[a,d,e]),(0,w.jsxs)(u.Z,{children:[(0,w.jsx)(se,{}),t&&(0,w.jsx)(l.Z,{text:t})]})},ne=function(){return(0,w.jsx)(w.Fragment,{children:(0,w.jsx)(re,{})})}},4713:function(e,a,t){e.exports=t.p+"static/media/slide-1.cdeff54d52800e44b4a2.jpg"},6745:function(e,a,t){e.exports=t.p+"static/media/slide-2.ccd04c49103c0c7b7742.jpg"},1238:function(e,a,t){e.exports=t.p+"static/media/slide-3.c489cbc1211acbfb2273.jpg"},241:function(e,a,t){e.exports=t.p+"static/media/slide-4.4c0d2cdd73a73363bd83.jpg"},4458:function(e,a,t){e.exports=t.p+"static/media/no_photo.e1c9f7d877f5eac85cc7.jpg"}}]);
//# sourceMappingURL=108.aade562e.chunk.js.map