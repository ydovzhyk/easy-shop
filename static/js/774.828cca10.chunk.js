"use strict";(self.webpackChunkeasy_shop=self.webpackChunkeasy_shop||[]).push([[774],{4387:function(e,a,t){t.d(a,{Z:function(){return u}});var s=t(1413),n=t(4925),l=t(458),r={photoAvatar:"Avatar_photoAvatar__y+tns",photo:"Avatar_photo__VHgBi"},i=t(184),o=["src","alt","avatarClass","width","heigth"],c=function(e){var a=e.src,t=e.alt,c=e.avatarClass,u=e.width,d=e.heigth,m=(0,n.Z)(e,o);return a?(0,i.jsx)("img",(0,s.Z)({src:a,alt:t,className:r[c],width:u,height:d},m)):(0,i.jsx)(l.WCB,{className:r[c]})};c.defaultProps={alt:"avatar",avatarClass:"",width:72,height:72};var u=c},6774:function(e,a,t){t.r(a),t.d(a,{default:function(){return V}});var s=t(1413),n=t(5861),l=t(885),r=t(4687),i=t.n(r),o=t(9434),c=t(1134),u=t(2791),d=t(1087),m=t(5557),h=t(8704),x=t(9869),f=t(4737),v=t(1023),_=t(4387),g=t(3214),N=t(422),j="ChangePhoto_changePhotoWrapper__0zEXF",Z="ChangePhoto_avatarframe__ZAqFK",C="ChangePhoto_avatar__Zl7lA",p="ChangePhoto_changePhoto__wG8dI",b=t(4838),y=t(184),S=function(e){var a=e.register,t=e.isFormSubmitted,s=e.onChangeAvatar,n=(0,o.v9)(x.Dm),r=(0,u.useState)(n),i=(0,l.Z)(r,2),c=i[0],d=i[1],m=(0,u.useState)(n),h=(0,l.Z)(m,2),f=h[0],v=h[1],S=(0,u.useState)(""),w=(0,l.Z)(S,2),P=w[0],F=w[1];(0,u.useEffect)((function(){f&&(d(f),s(f))}),[f,s]),(0,u.useEffect)((function(){t&&(d(n),v(n))}),[t,n]);return(0,y.jsxs)("div",{className:j,children:[(0,y.jsx)("div",{className:Z,children:(0,y.jsx)("div",{className:C,children:(0,y.jsx)(_.Z,{src:c,avatarClass:"photo"})})}),(0,y.jsxs)("div",{className:p,children:[(0,y.jsx)("label",{children:"\u0417\u043c\u0456\u043d\u0438 \u0444\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0456\u043b\u044e"}),(0,y.jsx)(g.Z,{textClass:"text",text:"\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u043a\u0432\u0430\u0434\u0440\u0430\u0442\u043d\u0435 \u0444\u043e\u0442\u043e \u043d\u0435 \u0431\u0456\u043b\u044c\u0448\u0435 \u043d\u0456\u0436 75 \u043a\u0431"}),(0,y.jsx)(b.Z,{register:a,name:"avatar",multiple:!1,single:!0,label:"\u0417\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0438\u0442\u0438",accept:"image/png, image/jpeg",onChange:function(e){var a=e.target.files[0];if(a.size>75e3)F("\u0420\u043e\u0437\u043c\u0456\u0440 \u0444\u0430\u0439\u043b\u0443 \u043f\u0435\u0440\u0435\u0432\u0438\u0449\u0443\u0454 \u0434\u043e\u043f\u0443\u0441\u0442\u0438\u043c\u0438\u0439 \u0440\u043e\u0437\u043c\u0456\u0440");else{var t=new FileReader;t.onload=function(){var e=t.result;v(e)},t.readAsDataURL(a)}}})]}),P&&(0,y.jsx)(N.Z,{text:P,onDismiss:function(){F("")}})]})},w=t(4834),P=t(6146),F=t(6091),M=t(990),E=["\u0411\u0430\u0440\u0438\u0448\u0456\u0432\u043a\u0430","\u0411\u0456\u043b\u0430 \u0426\u0435\u0440\u043a\u0432\u0430","\u0411\u043e\u0440\u0438\u0441\u043f\u0456\u043b\u044c","\u0411\u043e\u0433\u0443\u0441\u043b\u0430\u0432","\u0411\u043e\u044f\u0440\u043a\u0430","\u0411\u0440\u043e\u0432\u0430\u0440\u0438","\u0411\u0443\u0447\u0430","\u0412\u0430\u0441\u0438\u043b\u044c\u043a\u0456\u0432","\u0412\u0456\u043d\u043d\u0438\u0446\u044f","\u0412\u0438\u0448\u043d\u0435\u0432\u0435","\u0412\u0438\u0448\u0433\u043e\u0440\u043e\u0434","\u0413\u0430\u0439\u0441\u0438\u043d","\u0413\u043e\u0440\u043e\u0434\u0438\u0449\u0435","\u0413\u0440\u0435\u0431\u0456\u043d\u043a\u0430","\u0414\u043d\u0456\u043f\u0440\u043e","\u0414\u0443\u0431\u043d\u043e","\u0416\u0430\u0448\u043a\u0456\u0432","\u0416\u0438\u0442\u043e\u043c\u0438\u0440","\u0417\u0434\u043e\u043b\u0431\u0443\u043d\u0456\u0432","\u0406\u0432\u0430\u043d\u043a\u0456\u0432","\u0406\u0440\u043f\u0456\u043d\u044c","\u041a\u0430\u043b\u0438\u043d\u0456\u0432\u043a\u0430","\u041a\u0430\u043c'\u044f\u043d\u0435\u0446\u044c-\u041f\u043e\u0434\u0456\u043b\u044c\u0441\u044c\u043a\u0438\u0439","\u041a\u0430\u043c'\u044f\u043d\u0441\u044c\u043a\u0435","\u041a\u0430\u043d\u0456\u0432","\u041a\u0438\u0457\u0432","\u041a\u043e\u0432\u0435\u043b\u044c","\u041a\u043e\u043b\u043e\u043c\u0438\u044f","\u041a\u043e\u0440\u043e\u0441\u0442\u0435\u043d\u044c"],k="MySettings_mysetwrapper__BHTR0",A="MySettings_partwrapper__MqeVB",B="MySettings_form__AfKLm",W="MySettings_partFrame__lTA+n",Q="MySettings_btnLight__i5fL9",D="MySettings_buttonFrame__VGinq",L="MySettings_aboutChangeProfile__EwPNC",V=function(){var e=(0,o.I0)(),a=(0,o.v9)(x.PR),t=(0,o.v9)(x.Dm),r=(0,o.v9)(x.Lc),_=(0,u.useState)(t),N=(0,l.Z)(_,2),j=N[0],Z=N[1],C=(0,u.useState)(!1),p=(0,l.Z)(C,2),b=p[0],V=p[1],q=(0,u.useState)(""),I=(0,l.Z)(q,2),Y=I[0],z=I[1],R=a||{},T=R.secondName,U=R.firstName,K=R.surName,G=R.tel,H=R.email,X=R.cityName,$=R.streetName,J=R.houseNamber,O=R.sex,ee=R.about,ae=(0,c.cI)({defaultValues:{secondName:T||"",firstName:U||"",surName:K||"",tel:G||"",email:H||"",cityName:X||"\u041a\u0438\u0457\u0432",streetName:$||"",houseNamber:J||"",sex:O||"",about:ee||""}}),te=ae.control,se=ae.register,ne=ae.handleSubmit,le=ae.watch,re=function(){var a=(0,n.Z)(i().mark((function a(t,s){var n;return i().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s.preventDefault(),n={secondName:t.secondName,firstName:t.firstName,surName:t.surName,email:t.email,tel:t.tel,userAvatar:j,cityName:void 0!==t.cityName.value?t.cityName.value:"",streetName:t.streetName,houseNamber:t.houseNamber,sex:void 0!==t.sex.value?t.sex.value:"",about:t.about},a.next=4,e((0,m.d2)(n));case 4:return a.next=6,e((0,m.Nq)());case 6:V(!0);case 7:case"end":return a.stop()}}),a)})));return function(e,t){return a.apply(this,arguments)}}(),ie=le("email");return(0,u.useEffect)((function(){z(r)}),[r]),(0,u.useEffect)((function(){e((0,f.yj)(ie))}),[e,ie]),(0,y.jsx)(v.Z,{children:(0,y.jsxs)("section",{className:k,children:[(0,y.jsx)(g.Z,{textClass:"title",text:"\u041c\u043e\u0457 \u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f"}),(0,y.jsxs)("form",{className:B,onSubmit:ne(re),children:[(0,y.jsx)(S,{register:se,isFormSubmitted:b,onChangeAvatar:function(e){Z(e)}}),(0,y.jsxs)("div",{className:A,children:[(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"secondName",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(P.Z,(0,s.Z)({className:"changeProfile",value:n,control:te,handleChange:t},h.E.secondName))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u0406\u043c'\u044f",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"firstName",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(P.Z,(0,s.Z)({className:"changeProfile",value:n,control:te,handleChange:t},h.E.firstName))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u041f\u043e \u0431\u0430\u0442\u044c\u043a\u043e\u0432\u0456",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"surName",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(P.Z,(0,s.Z)({className:"changeProfile",value:n,control:te,handleChange:t},h.E.surName))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"Email*",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"email",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(P.Z,(0,s.Z)((0,s.Z)({className:"changeProfile"},se("email")),{},{value:n,control:te,handleChange:t},h.E.email))}}),(0,y.jsx)(g.Z,{text:"\u041d\u0435 \u0434\u043e\u0434\u0430\u0432\u0430\u0439\u0442\u0435 email \u043d\u0430 mail.ru, mail.ua, yandex.ru, list.ru, inbox.ru, bk.ru, vk.ru, ok.ru",textClass:"second-text"}),(0,y.jsx)("div",{className:D,children:(0,y.jsx)(d.rU,{className:Q,to:"/email-verification",email:H,children:"\u041f\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438"})})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"tel",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(P.Z,(0,s.Z)({className:"changeProfile",value:n,control:te,handleChange:t},h.E.tel))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u041c\u0456\u0441\u0442\u043e",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"cityName",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(F.Z,(0,s.Z)((0,s.Z)({value:n,handleChange:t,className:"changeProfile",name:"cityName"},h.E.cityName),{},{options:E,defaultValue:X,placeholder:X}))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u0412\u0443\u043b\u0438\u0446\u044f",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"streetName",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(P.Z,(0,s.Z)({className:"changeProfile",value:n,control:te,handleChange:t},h.E.streetName))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u041d\u043e\u043c\u0435\u0440 \u0431\u0443\u0434\u0438\u043d\u043a\u0443",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"houseNamber",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(P.Z,(0,s.Z)({className:"changeProfile",value:n,control:te,handleChange:t},h.E.houseNamber))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u0421\u0442\u0430\u0442\u044c",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"sex",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)(F.Z,(0,s.Z)((0,s.Z)({value:n,handleChange:t,className:"changeProfile",name:"sex"},h.E.sex),{},{options:["\u0427\u043e\u043b\u043e\u0432\u0456\u043a","\u0416\u0456\u043d\u043a\u0430","\u0406\u043d\u0448\u0435"],defaultValue:O,placeholder:O}))}})]}),(0,y.jsxs)("div",{className:W,children:[(0,y.jsx)(g.Z,{text:"\u041f\u0440\u043e \u0441\u0435\u0431\u0435",textClass:"lable-form"}),(0,y.jsx)(c.Qr,{control:te,name:"about",render:function(e){var a=e.field,t=a.onChange,n=a.value;return(0,y.jsx)("textarea",(0,s.Z)((0,s.Z)({className:L,value:n,control:te,onChange:t},h.E.about),{},{rows:1,cols:240}))}})]})]}),(0,y.jsx)("div",{className:D,children:(0,y.jsx)(w.Z,{text:"\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438",btnClass:"btnLight"})})]}),Y&&(0,y.jsx)(M.Z,{text:"".concat(r),onDismiss:function(){z("")}})]})})}},4838:function(e,a,t){t.d(a,{Z:function(){return i}});var s=t(1413),n=(t(2791),"FormInputFile_box__BUrw5"),l="FormInputFile_label__9Bdge",r=t(184);function i(e){var a=e.register,t=e.name,i=e.multiple,o=e.single,c=e.label,u=e.onChange;return(0,r.jsxs)("div",{className:n,children:[(0,r.jsx)("label",{htmlFor:t,className:l,children:c}),(0,r.jsx)("input",(0,s.Z)((0,s.Z)((0,s.Z)((0,s.Z)({type:"file",id:t,accept:"image/png, image/jpeg",style:{display:"none"}},a(t)),i?{multiple:!0}:{}),o?{multiple:!1}:{}),{},{onChange:function(e){u&&u(e)}}))]})}},990:function(e,a,t){t.d(a,{Z:function(){return C}});var s=t(885),n=t(2791),l=t(9434),r=t(8644),i=t(188),o=t(4737),c=t(3214),u=t(1632),d=t(9806),m="MessageWindow_messageWindow__uRdd8",h="MessageWindow_dismissButton__SLD4U",x="MessageWindow_boo__YcpDh",f="MessageWindow_face__YrZvM",v="MessageWindow_shadow__dHQj9",_="MessageWindow_confirmButtons__sF71C",g="MessageWindow_ButtonsBlock__+USC0",N="MessageWindow_btnYes__-yYz3",j="MessageWindow_btnNo__lIEXL",Z=t(184);function C(e){var a=e.text,t=e.onDismiss,C=e.confirmButtons,p=e.onConfirm,b=(0,l.I0)(),y=(0,n.useState)(!0),S=(0,s.Z)(y,2),w=S[0],P=S[1];if((0,n.useEffect)((function(){if(P(!0),!C){var e=setTimeout((function(){P(!1),b((0,r.k7)()),b((0,i.nv)()),b((0,o.Z$)())}),5e3);return function(){return clearTimeout(e)}}}),[a,b,C]),!w)return null;var F=function(e){P(!1),"function"===typeof p&&p(e)};return(0,Z.jsxs)("div",{className:m,children:[!C&&(0,Z.jsx)("button",{className:h,onClick:function(){P(!1),"function"===typeof t&&t(),b((0,r.k7)()),b((0,i.nv)()),b((0,o.Z$)())},children:(0,Z.jsx)(d.G,{icon:u.NBC,size:"lg"})}),(0,Z.jsx)("div",{className:x,children:(0,Z.jsx)("div",{className:f,id:"face"})}),(0,Z.jsx)("div",{className:v}),C?(0,Z.jsxs)("div",{className:_,children:[(0,Z.jsx)(c.Z,{text:a,textClass:"textMessageBtn"}),(0,Z.jsxs)("div",{className:g,children:[(0,Z.jsx)("button",{className:N,onClick:function(){return F("yes")},children:"\u0422\u0430\u043a"}),(0,Z.jsx)("button",{className:j,onClick:function(){return F("no")},children:"\u041d\u0456"})]})]}):(0,Z.jsx)(c.Z,{text:a,textClass:"textMessage"})]})}},6091:function(e,a,t){t.d(a,{Z:function(){return o}});var s=t(1413),n=(t(2791),t(7497)),l={label:"SelectField_label__Y87wK",headerLabel:"SelectField_headerLabel__4409s",select:"SelectField_select__bwshq",headerSelect:"SelectField_headerSelect__V-FA+",addProduct:"SelectField_addProduct__NX8YD",vip:"SelectField_vip__T0M33",changeProfile:"SelectField_changeProfile__33cVK"},r=t(184),i={placeholder:function(e){return(0,s.Z)((0,s.Z)({},e),{},{fontSize:"16px",color:"var(--second-text-color)",pointerEvents:"none"})}},o=function(e){var a=e.name,t=e.value,s=e.handleChange,o=e.placeholder,c=e.required,u=e.options,d=e.className,m=e.defaultValue,h=d?"".concat(l.label," ").concat(l[d]):"".concat(l.label),x=d?"".concat(l.select," ").concat(l[d]):"".concat(l.select);return(0,r.jsx)("label",{className:h,children:(0,r.jsx)(n.ZP,{classNamePrefix:"custom-select",className:x,name:a,value:t,onChange:s,defaultValue:m,placeholder:o,required:c,options:u.map((function(e){return{value:e,label:e}})),styles:i})})}}}]);
//# sourceMappingURL=774.828cca10.chunk.js.map