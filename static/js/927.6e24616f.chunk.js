"use strict";(self.webpackChunkeasy_shop=self.webpackChunkeasy_shop||[]).push([[927],{1412:function(t,e,s){var a=s(184);e.Z=function(t){var e=t.children;return(0,a.jsx)("div",{className:"container",children:e})}},1023:function(t,e,s){s.d(e,{Z:function(){return a.Z}});var a=s(1412)},1927:function(t,e,s){s.r(e),s.d(e,{default:function(){return R}});var a=s(2791),i=s(9434),r=s(5557),c=s(1023),n=s(9869),o=s(885),l=s(1087),d=s(5602),u=s(9325),p=s(4458),_=s(3853),m=s(4373),h={container:"CatalogList_container__uYS7h",titleText:"CatalogList_titleText__UaLIF",styleTitleText:"CatalogList_styleTitleText__ONFw9",styleButtonList:"CatalogList_styleButtonList__qEH0c",arrowButton:"CatalogList_arrowButton__+P7Ar",arrowButtonLeft:"CatalogList_arrowButtonLeft__j-ct8",arrowButtonRight:"CatalogList_arrowButtonRight__r92vr",listCard:"CatalogList_listCard__17Su4",itemCard:"CatalogList_itemCard__2FqCZ",photoLink:"CatalogList_photoLink__ZL7j3",stylePhotoCardWrap:"CatalogList_stylePhotoCardWrap__TSBWX",photoCard:"CatalogList_photoCard__gfWyt",descriptionProductCard:"CatalogList_descriptionProductCard__BXW3e",stylePriceLike:"CatalogList_stylePriceLike__jtuir",priceCard:"CatalogList_priceCard__RRSmU",styleLike:"CatalogList_styleLike__HaQS1",likeCard:"CatalogList_likeCard__RGgr4",nameProductCard:"CatalogList_nameProductCard__qkzq2",sizeCard:"CatalogList_sizeCard__Yjw0h",link:"CatalogList_link__Ge+vB"},f=s(184),x=function(t){var e=t.newCards,s=(0,i.I0)(),r=(0,a.useState)(1),c=(0,o.Z)(r,2),n=c[0],x=c[1],j=(0,i.v9)(u.d8),C=(0,i.v9)(u.Rv);(0,a.useEffect)((function(){s((0,d.bj)(n))}),[s,n]);return(0,f.jsxs)("section",{className:h.container,children:[(0,f.jsx)("h3",{className:h.titleText,children:"VIP-\u041e\u0433\u043e\u043b\u043e\u0448\u0435\u043d\u043d\u044f"}),(0,f.jsxs)("div",{className:h.styleButtonList,children:[n>1&&(0,f.jsx)("div",{className:"".concat(h.arrowButton," ").concat(h.arrowButtonLeft),onClick:function(){n>1&&x(n-1)},children:(0,f.jsx)(m.EY6,{size:64,className:h.arrowlink})}),(0,f.jsx)("ul",{className:h.listCard,children:j.map((function(t){var e=t._id,s=t.mainPhotoUrl,a=t.price,i=t.nameProduct,r=t.description,c=t.section,n=t.category;return(0,f.jsxs)("li",{className:h.itemCard,children:[(0,f.jsx)(l.rU,{to:"/products/".concat(c,"/").concat(n,"/").concat(e),className:h.photoLink,children:(0,f.jsxs)("div",{className:h.stylePhotoCardWrap,children:[(0,f.jsx)("img",{className:h.photoCard,src:s,onError:function(t){return t.target.src=p},alt:""}),(0,f.jsx)("p",{className:h.descriptionProductCard,children:r})]})}),(0,f.jsxs)("div",{className:h.stylePriceLike,children:[(0,f.jsxs)("p",{className:h.priceCard,children:[a,"\u0433\u0440\u043d"]}),(0,f.jsxs)("div",{className:h.styleLike,children:[(0,f.jsx)("p",{className:h.likeCard,children:"7"}),(0,f.jsx)(l.OL,{to:"/favorites",className:h.link,children:(0,f.jsx)(_.$aX,{size:24})})]})]}),(0,f.jsx)(l.rU,{to:"/products/".concat(c,"/").concat(n,"/").concat(e),children:(0,f.jsx)("p",{className:h.nameProductCard,children:i})}),(0,f.jsx)("p",{className:h.sizeCard,children:"36"})]},e)}))}),n<C&&(0,f.jsx)("div",{className:"".concat(h.arrowButton," ").concat(h.arrowButtonRight),onClick:function(){n<C&&x(n+1)},children:(0,f.jsx)(m.kWz,{size:64,className:h.arrowlink})})]}),(0,f.jsxs)("div",{className:h.titleText,children:[(0,f.jsx)("h3",{className:h.styleTitleText,children:"\u041d\u043e\u0432\u0438\u043d\u043a\u0438"}),(0,f.jsx)("h3",{className:h.styleTitleText,children:"\u0417\u043d\u0438\u0436\u043a\u0438"}),(0,f.jsx)("h3",{className:h.styleTitleText,children:"\u0422\u043e\u043f-\u043f\u0440\u043e\u0434\u0430\u0432\u0446\u0456"})]}),(0,f.jsx)("ul",{className:h.listCard,children:e.map((function(t){var e=t.id,s=t.photo,a=t.price,i=t.like,r=t.description,c=t.size;return(0,f.jsxs)("li",{className:h.itemCard,children:[(0,f.jsx)(l.rU,{to:"".concat(e),className:h.stylePhotoCard,children:(0,f.jsx)("img",{className:h.photoCard,src:s,onError:function(t){return t.target.src=p},alt:""})}),(0,f.jsxs)("div",{className:h.stylePriceLike,children:[(0,f.jsxs)("p",{className:h.priceCard,children:[a,"\u0433\u0440\u043d"]}),(0,f.jsxs)("div",{className:h.styleLike,children:[(0,f.jsx)("p",{className:h.likeCard,children:i}),(0,f.jsx)(l.OL,{to:"/favorites",className:h.link,children:(0,f.jsx)(_.$aX,{size:24})})]})]}),(0,f.jsx)(l.rU,{to:"".concat(e),children:(0,f.jsx)("p",{className:h.descriptionCard,children:r})}),(0,f.jsx)("p",{className:h.sizeCard,children:c})]},e)}))})]})},j=JSON.parse('[{"id":1,"photo":"/images/new1_310_430.jpg","price":1599,"like":1,"description":"\u0421\u0442\u0438\u043b\u044c\u043d\u0456 \u043a\u0440\u043e\u0441\u0456\u0432\u043a\u0438 \u0447\u043e\u0440\u043d\u043e\u0433\u043e \u043a\u043e\u043b\u044c\u043e\u0440\u0443","size":[36,37,38,39,40,41]},{"id":2,"photo":"/images/new2_310_430.jpg","price":149,"like":5,"description":"\u0417\u0430\u043a\u043e\u043b\u043a\u0430 \u0448\u043f\u0438\u043b\u044c\u043a\u0430 \u043a\u0440\u0430\u0431 \u043a\u0440\u0430\u0431\u0438\u043a \u043d\u0430 \u0432\u043e\u043b\u043e\u0441\u0441\u044f \u043d\u0430 \u0437\u0430\u0447\u0456\u0441\u043a\u0443 \u0441\u0442\u0438\u043b\u044c\u043d\u0438\u0439 \u043c\u043e\u0434\u043d\u0438\u0439 \u043d\u043e\u0432\u0438\u0439","size":"One size"},{"id":3,"photo":"/images/new3_310_430.jpg","price":3400,"like":3,"description":"\u0423\u043b\u044c\u0442\u0440\u0430\u043b\u0435\u0433\u043a\u0430 \u043f\u0443\u0445\u043e\u0432\u0430 \u043f\u0430\u0440\u043a\u0430 \u0437 \u043a\u0430\u043f\u044e\u0448\u043e\u043d\u043e\u043c uniqlo \u0443\u043b\u044c\u0442\u0440\u0430\u043b\u0430\u0439\u0442 \u043f\u0443\u0445\u043e\u0432\u0438\u043a \u043a\u0443\u0440\u0442\u043a\u0430","size":"36 / S / 44"},{"id":4,"photo":" ","price":25,"like":2,"description":"\u0422\u0440\u0443\u0441\u0438\u043a\u0438 \u0434\u0438\u0442\u044f\u0447\u0456","size":["8 / 128","11 / 146"]},{"id":5,"photo":" ","price":799,"like":10,"description":"\u0411\u0456\u043b\u0430 \u0441\u043e\u0440\u043e\u0447\u043a\u0430 old navy ( gap) \u0443 \u043a\u0432\u0456\u0442\u043e\u0447\u043a\u0443, slim fit!","size":"38 / M / 46"}]'),C="Default_default__z3Wcs",g="Default_defaultTitle__SzAw+",N=s(1413),k=s(7832),L=s.n(k),v={gallery:"Slider_gallery__9ipt9",image:"Slider_image__gyrAv",bullet:"Slider_bullet__y7faz",active:"Slider_active__s-9Wt"},y=s(6662),w=s(5509),P=s(4751),b=[{src:y,alt:"client"},{src:w,alt:"kids"},{src:P,alt:"cosmetics"},{src:P,alt:"store"},{src:s(5823),alt:"man"},{src:s(9941),alt:"men"},{src:s(7241),alt:"beauty"},{src:s(6785),alt:"women"},{src:s(942),alt:"shop-maneken"}].map((function(t){return{original:"".concat(t.src),originalAlt:"".concat(t.alt),originalClass:[v.image],bulletClass:[v.bullet]}})),T={lazyLoad:!0,showThumbnails:!1,showFullscreenButton:!1,showBullets:!0,showPlayButton:!1,slideInterval:4e3,additionalClass:[v.gallery]},z=function(){return(0,f.jsx)("div",{className:v.sliderPart,children:(0,f.jsx)(L(),(0,N.Z)((0,N.Z)({items:b},T),{},{className:v.gallery}))})},B=s(3214),S=function(){var t=(0,i.v9)(n.t2);return(0,f.jsxs)("section",{className:C,children:[!t&&(0,f.jsx)("div",{className:g,children:(0,f.jsx)(B.Z,{text:"\u041f\u0435\u0440\u0448 \u043d\u0456\u0436 \u043f\u043e\u0447\u0430\u0442\u0438 \u0437\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0439\u0442\u0435\u0441\u044f!",textClass:"title"})}),(0,f.jsx)(z,{}),(0,f.jsx)(x,{newCards:j})]})},W="Home_home__SCgQC",Z=function(){var t=(0,i.I0)();return(0,a.useEffect)((function(){var e=new URLSearchParams(window.location.search),s=e.get("accessToken"),a=e.get("refreshToken"),i=e.get("sid");if(s){var c={accessToken:s,refreshToken:a,sid:i};t((0,r.Nq)(c)),localStorage.setItem("easy-shop.authData",JSON.stringify(c))}}),[t]),(0,f.jsx)("section",{className:W,children:(0,f.jsx)(c.Z,{children:(0,f.jsx)(S,{})})})},R=function(){return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(Z,{})})}},9325:function(t,e,s){s.d(e,{Rv:function(){return c},ch:function(){return a},d8:function(){return r},mW:function(){return i}});var a=function(t){return t.products.userProducts},i=function(t){return t.products.userProductsTotalPages},r=function(t){return t.products.vipProducts},c=function(t){return t.products.vipPages}},4458:function(t,e,s){t.exports=s.p+"static/media/no_photo.e1c9f7d877f5eac85cc7.jpg"},7241:function(t,e,s){t.exports=s.p+"static/media/beauty.e401b43d9109f6d25852.jpg"},6662:function(t,e,s){t.exports=s.p+"static/media/client.b58262b405c398abf00e.jpg"},4751:function(t,e,s){t.exports=s.p+"static/media/cosmetics.b2b35a866f11d0069b67.jpg"},5509:function(t,e,s){t.exports=s.p+"static/media/kids.51f3f5dea4eb7c951fa2.jpg"},5823:function(t,e,s){t.exports=s.p+"static/media/man.72db98eb8116530c87a4.jpg"},9941:function(t,e,s){t.exports=s.p+"static/media/men.faad95bbfaa6b630aea0.jpg"},942:function(t,e,s){t.exports=s.p+"static/media/shop-maneken.27f1f2c8eac41ec2eac6.jpg"},6785:function(t,e,s){t.exports=s.p+"static/media/women.a71b2bf5259f89a780ac.jpg"}}]);
//# sourceMappingURL=927.6e24616f.chunk.js.map