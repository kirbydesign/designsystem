"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[8996],{38996:($e,f,n)=>{n.r(f),n.d(f,{ExamplesRoutingModule:()=>He});var h=n(86499),R=n(55779),w=n(563),L=n(19963),D=n(49267),A=n(17513),H=n(67855),N=n(51123),$=n(68683),B=n(65499),G=n(13879),K=n(62009),V=n(23817),U=n(15),Y=n(97777),t=n(54438),z=n(35519),d=n(60177),k=n(19539),C=n(15739);function X(e,s){1&e&&t.nrm(0,"div")}function _(e,s){if(1&e&&(t.j41(0,"div",1),t.nrm(1,"div",2),t.j41(2,"div",3),t.DNE(3,X,1,0,"div",4),t.k0s()()),2&e){const i=t.XpG();t.xc7("--keyboard-height",i.keyboardHeight+"px"),t.R7$(2),t.AVh("keyboard-showing",i.keyboardIsShowing),t.R7$(),t.Y8G("ngForOf",i.keys)}}let W=(()=>{var e;class s{constructor(o){this.windowRef=o,this.showDummyKeyboard=!!this.windowRef.nativeWindow.sessionStorage.getItem("kirby-cookbook-show-dummy-keyboard"),this.keyboardIsShowing=!1,this.keyCount=40,this.setKeyboardSize()}get keys(){return Array(this.keyCount).fill("")}setKeyboardSize(){const r=this.windowRef.nativeWindow.matchMedia(`(min-width: ${Y.DesignTokenHelper.breakpoints.medium})`).matches?"tablet":"phone",m=this.windowRef.nativeWindow.matchMedia("(orientation: landscape)").matches?"landscape":"portrait";this.keyboardHeight={tablet:{portrait:408,landscape:434},phone:{portrait:290,landscape:200}}[r][m],this.keyCount=4*("phone"===r?7:10)}_onKeyboardDidShow(o){this.keyboardHeight=o.detail.keyboardHeight,this.keyboardIsShowing=!0}_onKeyboardDidHide(){this.keyboardIsShowing=!1}_onToggleDummyKeyboard(o){this.showDummyKeyboard=o}_onInputFocus(o){if(this.showDummyKeyboard&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName)){const a=new CustomEvent("ionKeyboardDidShow",{detail:{keyboardHeight:this.keyboardHeight}});setTimeout(()=>this.windowRef.nativeWindow.dispatchEvent(a),100)}}_onInputFocusOut(o){if(this.showDummyKeyboard&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName)){const a=new CustomEvent("ionKeyboardDidHide");this.windowRef.nativeWindow.dispatchEvent(a)}}_onWindowResize(){this.showDummyKeyboard&&this.setKeyboardSize()}}return(e=s).\u0275fac=function(o){return new(o||e)(t.rXU(z.W))},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-examples"]],hostBindings:function(o,a){1&o&&t.bIt("ionKeyboardDidShow",function(m){return a._onKeyboardDidShow(m)},!1,t.tSv)("ionKeyboardDidHide",function(){return a._onKeyboardDidHide()},!1,t.tSv)("kirbyToggleDummyKeyboard",function(m){return a._onToggleDummyKeyboard(m.detail)},!1,t.tSv)("focusin",function(m){return a._onInputFocus(m.target)},!1,t.EBC)("focusout",function(m){return a._onInputFocusOut(m.target)},!1,t.EBC)("resize",function(){return a._onWindowResize()},!1,t.tSv)},decls:3,vars:1,consts:[["class","dummy-keyboard",3,"--keyboard-height",4,"ngIf"],[1,"dummy-keyboard"],[1,"top"],[1,"bg"],[4,"ngFor","ngForOf"]],template:function(o,a){1&o&&(t.DNE(0,_,4,5,"div",0),t.j41(1,"kirby-app"),t.nrm(2,"kirby-router-outlet"),t.k0s()),2&o&&t.Y8G("ngIf",a.showDummyKeyboard)},dependencies:[d.Sq,d.bT,k.Z,C.Cs],styles:['@charset "UTF-8";.dummy-keyboard[_ngcontent-%COMP%]{position:absolute;width:100%;bottom:0;z-index:99999;pointer-events:none;overflow:hidden;height:var(--keyboard-height)}.dummy-keyboard[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%], .dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%}.dummy-keyboard[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]{background-color:transparent;border-top:1px dashed var(--kirby-semi-dark);z-index:1}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%]{opacity:.9;background-color:var(--kirby-medium);transition:transform .15s ease-out;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;grid-gap:16px;padding:16px;transform:translateY(100%)}@media (min-width: 768px){.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%]{grid-template-columns:repeat(10,1fr)}}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{background-color:var(--kirby-white);border-radius:4px;box-shadow:0 2px var(--kirby-semi-dark);display:flex;align-items:center;justify-content:center;font-size:18px}@media (max-width: 767px){.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(16):before{content:"K"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(17):before{content:"I"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(18):before{content:"R"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(19):before{content:"B"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(20):before{content:"Y"}}@media (min-width: 768px){.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(23):before{content:"K"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(24):before{content:"I"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(25):before{content:"R"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(26):before{content:"B"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(27):before{content:"Y"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(28):before{content:"\\a9"}}.dummy-keyboard[_ngcontent-%COMP%]   .bg.keyboard-showing[_ngcontent-%COMP%]{transform:translateY(0);transition:transform .25s ease-out 1ms}']}),s})();var J=n(60167),Q=n(43535);let Z=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-fonts-example"]],decls:10,vars:0,consts:[[1,"kirby-text-large"],[1,"kirby-text-xsmall"],[1,"kirby-text-xxsmall"]],template:function(o,a){1&o&&(t.j41(0,"h1"),t.EFF(1,"Heading 1"),t.k0s(),t.j41(2,"h2"),t.EFF(3,"Heading 2"),t.k0s(),t.j41(4,"p",0),t.EFF(5,"Kirby-text-large"),t.k0s(),t.j41(6,"p",1),t.EFF(7,"xsmall text"),t.k0s(),t.j41(8,"p",2),t.EFF(9,"xxsmall text"),t.k0s())},encapsulation:2}),s})();var q=n(64911),tt=n(88351),et=n(9645),nt=n(28169),ot=n(98299),it=n(58956),at=n(80306),st=n(55650),rt=n(50217),mt=n(12529),lt=n(31305),dt=n(22539),pt=n(91435),ct=n(35022),ht=n(32737),gt=n(33082),ut=n(99080),bt=n(40041),yt=n(23579),xt=n(69780),vt=n(98988),ft=n(53903);let kt=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-list-example"]],decls:2,vars:0,template:function(o,a){1&o&&(t.j41(0,"kirby-app"),t.nrm(1,"kirby-router-outlet"),t.k0s())},dependencies:[k.Z,C.Cs],styles:["[_nghost-%COMP%]{padding:2px;width:100%;background:var(--kirby-background-color);height:100%;display:block}hr[_ngcontent-%COMP%]{visibility:hidden}h2[_ngcontent-%COMP%]{margin-top:40px}.footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;width:100%;padding:16px}.footer[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}"]}),s})();var Ct=n(57671),Et=n(46692);let Mt=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-list-example"]],decls:8,vars:0,template:function(o,a){1&o&&(t.j41(0,"div")(1,"h2"),t.EFF(2,"List with items and section"),t.k0s(),t.nrm(3,"cookbook-list-experimental-items-example"),t.k0s(),t.j41(4,"div")(5,"h2"),t.EFF(6,"List with sliding items"),t.k0s(),t.nrm(7,"cookbook-list-experimental-sliding-items-example"),t.k0s())},dependencies:[Ct.s,Et.m],styles:[".rounded[_ngcontent-%COMP%]{border-radius:16px;overflow:hidden}.shadow[_ngcontent-%COMP%]{box-shadow:0 1px 24px #1c1c1c0a}.first-item-padding[_ngcontent-%COMP%] >   :first-child{--item-padding-top: 8px}.last-item-padding[_ngcontent-%COMP%] >   :last-child{--item-padding-bottom: 8px}.first-item[_ngcontent-%COMP%]{border-top-left-radius:16px;border-top-right-radius:16px;overflow:hidden}.first-item[_ngcontent-%COMP%] >   :first-child{--item-padding-top: 8px}.last-item[_ngcontent-%COMP%]{border-bottom-left-radius:16px;border-bottom-right-radius:16px;overflow:hidden}.last-item[_ngcontent-%COMP%] >   :last-child{--item-padding-bottom: 8px}[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:center;flex-grow:1;height:100%;background:var(--kirby-background-color);gap:24px;padding-top:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{width:min(100%,768px)}"]}),s})();var Pt=n(34823),Ot=n(94747),Tt=n(50753),Ft=n(50751),St=n(8075),jt=n(72123),It=n(94891),E=n(74505),M=n(76816),Rt=n(25531),wt=n(43765),Lt=n(83741),Dt=n(43511),b=n(35348),y=n(35043),P=n(28287),O=n(75797);let Ht=(()=>{var e;class s{}return(e=s).template='\x3c!-- This container is only needed due to layout of larger screen sizes --\x3e\n<div class="container">\n  <div class="app-header">\n    \x3c!-- Hidden on small screen sizes--\x3e\n    <kirby-avatar size="sm" overlay="true" text="Logo" class="logo"></kirby-avatar>\n  </div>\n\n  <kirby-tab-bar>\n    <kirby-tab-button routerLink="overview">\n      <kirby-icon name="overview-outline"></kirby-icon>\n      Overview\n    </kirby-tab-button>\n\n    <kirby-tab-button routerLink="transfer">\n      <kirby-icon name="swap"></kirby-icon>\n      Transfer\n    </kirby-tab-button>\n\n    <kirby-tab-button routerLink="inbox">\n      <kirby-icon name="inbox-outline"></kirby-icon>\n      Inbox\n      <kirby-badge themeColor="danger">1</kirby-badge>\n    </kirby-tab-button>\n\n    <kirby-tab-button routerLink="menu">\n      <kirby-icon name="menu-no-decoration"></kirby-icon>\n      Menu\n    </kirby-tab-button>\n  </kirby-tab-bar>\n</div>',e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-fixed-footer-tabs-example"]],decls:18,vars:0,consts:[[1,"container"],[1,"app-header"],["size","sm","overlay","true","text","Logo",1,"logo"],["routerLink","overview"],["name","overview-outline"],["routerLink","transfer"],["name","swap"],["routerLink","inbox"],["name","inbox-outline"],["themeColor","danger"],["routerLink","menu"],["name","menu-no-decoration"]],template:function(o,a){1&o&&(t.j41(0,"div",0)(1,"div",1),t.nrm(2,"kirby-avatar",2),t.k0s(),t.j41(3,"kirby-tab-bar")(4,"kirby-tab-button",3),t.nrm(5,"kirby-icon",4),t.EFF(6," Overview "),t.k0s(),t.j41(7,"kirby-tab-button",5),t.nrm(8,"kirby-icon",6),t.EFF(9," Transfer "),t.k0s(),t.j41(10,"kirby-tab-button",7),t.nrm(11,"kirby-icon",8),t.EFF(12," Inbox "),t.j41(13,"kirby-badge",9),t.EFF(14,"1"),t.k0s()(),t.j41(15,"kirby-tab-button",10),t.nrm(16,"kirby-icon",11),t.EFF(17," Menu "),t.k0s()()())},dependencies:[h.Wk,b.OW,b.RN,y.Rl,P.f,O.n],styles:["[_nghost-%COMP%]{display:block;background:var(--kirby-background-color);height:100%}.logo[_ngcontent-%COMP%]{display:none}@media (min-width: 992px){.logo[_ngcontent-%COMP%]{display:block}}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}.app-header[_ngcontent-%COMP%]{margin:0 auto;max-width:1024px}kirby-tab-bar[_ngcontent-%COMP%]{--kirby-tab-bar-max-width: 1024px}"]}),s})();var Nt=n(80956),$t=n(62243),Bt=n(39357),Gt=n(80295),Kt=n(17464),Vt=n(66791),Ut=n(73299),Yt=n(70571),l=n(91365),x=n(81365),v=n(29756),zt=n(12090),Xt=n(57808);const _t=e=>({"kirby-text-bold":e});function Wt(e,s){if(1&e&&(t.j41(0,"span",5),t.EFF(1),t.k0s()),2&e){const i=s.$implicit;t.R7$(),t.SpI(" ",i," ")}}function Jt(e,s){if(1&e&&(t.j41(0,"p",10),t.EFF(1),t.k0s()),2&e){const i=t.XpG().$implicit;t.R7$(),t.JRh(i.ownerName)}}function Qt(e,s){if(1&e&&(t.j41(0,"kirby-item",6)(1,"kirby-label")(2,"h3",7),t.EFF(3),t.k0s(),t.DNE(4,Jt,2,1,"p",8),t.k0s(),t.nrm(5,"kirby-toggle",9),t.k0s()),2&e){const i=s.$implicit,o=s.isSubItem;t.R7$(2),t.Y8G("ngClass",t.eq3(3,_t,!o)),t.R7$(),t.JRh(i.title),t.R7$(),t.Y8G("ngIf",!i.isOwnAccount)}}let Zt=(()=>{var e;class s{constructor(){this.items=[{title:"1",ownerName:"xyz",isOwnAccount:!1,shadowAccounts:[{title:"1a"},{title:"1b"},{title:"1c"},{title:"1d"},{title:"1e"},{title:"1f"}]},{title:"2"},{title:"3"},{title:"4",ownerName:"John",isOwnAccount:!0,shadowAccounts:[{title:"4a"}]},{title:"5",isOwnAccount:!0,shadowAccounts:[{title:"5a"}]}],this.headerTexts=["skjul/vis","flyt"]}doReorderItem(o){o.complete(this.items)}doReorderShadowAccount(o){o.complete(o.parentItem.shadowAccounts)}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-reorder-list-example"]],decls:6,vars:2,consts:[["title","Reorder"],[1,"section-header"],["class","kirby-text-small-light",4,"ngFor","ngForOf"],["subItemsName","shadowAccounts",3,"itemReorder","subItemReorder","items"],["reorderable","true",4,"kirbyListItemTemplate"],[1,"kirby-text-small-light"],["reorderable","true"],[3,"ngClass"],["detail","",4,"ngIf"],["slot","end","checked","true"],["detail",""]],template:function(o,a){1&o&&(t.j41(0,"kirby-page",0)(1,"kirby-page-content")(2,"header",1),t.DNE(3,Wt,2,1,"span",2),t.k0s(),t.j41(4,"kirby-reorder-list",3),t.bIt("itemReorder",function(m){return a.doReorderItem(m)})("subItemReorder",function(m){return a.doReorderShadowAccount(m)}),t.DNE(5,Qt,6,5,"kirby-item",4),t.k0s()()()),2&o&&(t.R7$(3),t.Y8G("ngForOf",a.headerTexts),t.R7$(),t.Y8G("items",a.items))},dependencies:[d.YU,d.Sq,d.bT,l.H1,l.Uu,x.JA,x.UF,v.bx,zt.N,Xt.a],styles:[".section-header[_ngcontent-%COMP%]{padding:0 16px 8px 8px;display:flex;justify-content:flex-end}.section-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-left:16px}"]}),s})();var qt=n(98245),te=n(84923),ee=n(99955),g=n(98990),p=n(16564);function ne(e,s){if(1&e&&(t.j41(0,"kirby-card",2),t.nrm(1,"kirby-card-header",3),t.j41(2,"div",4),t.EFF(3),t.k0s()()),2&e){const i=s.$implicit;t.Y8G("hasPadding",!0),t.R7$(),t.Y8G("title",i.title)("subtitle",i.subtitle),t.R7$(2),t.SpI(" ",i.cardContent," ")}}let oe=(()=>{var e;class s{constructor(){this.slides=[...Array(9).keys()].map(o=>({title:`Slide ${o+1}`,subtitle:`Subtitle ${o+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],[3,"hasPadding",4,"kirbySlide"],[3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(o,a){1&o&&(t.j41(0,"kirby-slides",0),t.DNE(1,ne,4,4,"kirby-card",1),t.k0s()),2&o&&t.Y8G("slides",a.slides)("title","Title")("showNavigation",!0)},dependencies:[g.ib,g.lM,p.yb,p.F7],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding:16px;box-sizing:border-box}@media (min-width: 768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{font-size:12px;color:var(--kirby-semi-dark);text-transform:uppercase;margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]}),s})();var T=n(57017),F=n(47008);function ie(e,s){if(1&e&&(t.j41(0,"kirby-card",5),t.nrm(1,"kirby-card-header",6),t.j41(2,"div"),t.EFF(3),t.k0s()()),2&e){const i=s.$implicit;t.Y8G("hasPadding",!0),t.R7$(),t.Y8G("title",i.title)("subtitle",i.subtitle),t.R7$(2),t.JRh(i.cardContent)}}let ae=(()=>{var e;class s{constructor(o){this.toastController=o,this.config={slidesPerView:1.1,breakpoints:{768:{centeredSlides:!1,slidesPerView:2,slidesPerGroup:1}}},this.slides=[...Array(9).keys()].map(a=>({title:`Slide ${a+1}`,subtitle:`Subtitle ${a+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}getDataFromActiveSlide(o){this.toastController.showToast({message:`Changed to ${o.slide.title}`,messageType:"success",durationInMs:1e3})}showAll(){this.toastController.showToast({message:"See all... (your handler here)",messageType:"success",durationInMs:2e3})}}return(e=s).\u0275fac=function(o){return new(o||e)(t.rXU(T.K))},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:7,vars:4,consts:[["slidesInstance",""],[3,"slideChange","slidesOptions","slides","showNavigation","title"],[3,"hasPadding",4,"kirbySlide"],["kirby-button","","attentionLevel","3","size","xs",3,"click"],["kirby-button","",2,"display","block","margin","24px auto 0",3,"click"],[3,"hasPadding"],[3,"title","subtitle"]],template:function(o,a){if(1&o){const r=t.RV6();t.j41(0,"kirby-slides",1,0),t.bIt("slideChange",function(u){return t.eBV(r),t.Njj(a.getDataFromActiveSlide(u))}),t.DNE(2,ie,4,4,"kirby-card",2),t.j41(3,"button",3),t.bIt("click",function(){return t.eBV(r),t.Njj(a.showAll())}),t.EFF(4,"See all"),t.k0s()(),t.j41(5,"button",4),t.bIt("click",function(){t.eBV(r);const u=t.sdS(1);return t.Njj(u.slideTo(3))}),t.EFF(6," Activate slide no. 4\n"),t.k0s()}2&o&&t.Y8G("slidesOptions",a.config)("slides",a.slides)("showNavigation",!0)("title","Title")},dependencies:[g.ib,g.lM,p.yb,p.F7,F.Q],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding:16px;box-sizing:border-box}@media (min-width: 768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{font-size:12px;color:var(--kirby-semi-dark);text-transform:uppercase;margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]}),s})();var se=n(57123),re=n(90107),me=n(7673),le=n(50589),de=n(21697);const pe=()=>({fixed:!0});function ce(e,s){if(1&e){const i=t.RV6();t.j41(0,"kirby-page-actions")(1,"button",4),t.bIt("click",function(){t.eBV(i);const a=t.XpG();return t.Njj(a.onCogSelect())}),t.nrm(2,"kirby-icon",5),t.k0s(),t.j41(3,"button",4),t.bIt("click",function(){t.eBV(i);const a=t.XpG();return t.Njj(a.onMoreSelect())}),t.nrm(4,"kirby-icon",6),t.k0s()()}}function he(e,s){if(1&e){const i=t.RV6();t.j41(0,"button",4),t.bIt("click",function(){t.eBV(i);const a=t.XpG();return t.Njj(a.navigateToTransferSub())}),t.EFF(1," Go to transfer sub "),t.k0s()}}function ge(e,s){if(1&e){const i=t.RV6();t.j41(0,"kirby-fab-sheet",7),t.nrm(1,"kirby-icon",8),t.j41(2,"kirby-action-sheet",9),t.bIt("itemSelect",function(a){t.eBV(i);const r=t.XpG();return t.Njj(r.onItemSelect(a))}),t.k0s()()}if(2&e){const i=t.XpG();t.R7$(2),t.Y8G("items",i.items)}}let c=(()=>{var e;class s{constructor(o,a,r,m){this.route=o,this.router=a,this.cdr=r,this.toastController=m,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}],this.showSubNavigation=!1}ngOnInit(){this.showSubNavigation="transfer"===this.route.snapshot.parent.routeConfig.path,setTimeout(()=>{this.title=(0,me.of)(this.route.snapshot.data.title),this.cdr.detectChanges()},300)}onItemSelect(o){this.toastController.showToast({message:`Item selected: ${o.text}`,messageType:"success",durationInMs:1500})}navigateToTransferSub(){this.router.navigate(["sub"],{relativeTo:this.route})}onCogSelect(){this.toastController.showToast({message:"Cog clicked...",messageType:"success",durationInMs:1500})}onMoreSelect(){this.toastController.showToast({message:"More menu clicked...",messageType:"success",durationInMs:1500})}}return(e=s).\u0275fac=function(o){return new(o||e)(t.rXU(h.nX),t.rXU(h.Ix),t.rXU(t.gRc),t.rXU(T.K))},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:20,vars:6,consts:[[3,"title"],[4,"kirbyPageActions"],["kirby-button","",3,"click",4,"ngIf"],["horizontalAlignment","right",4,"kirbyPageContent"],["kirby-button","",3,"click"],["name","cog"],["name","more"],["horizontalAlignment","right"],["name","write-message"],["header","Your action sheet header","subheader","Your action sheet subheader",3,"itemSelect","items"]],template:function(o,a){1&o&&(t.j41(0,"kirby-page",0),t.nI1(1,"async"),t.DNE(2,ce,5,0,"kirby-page-actions",1),t.j41(3,"kirby-page-content")(4,"p"),t.EFF(5," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(6,"p"),t.EFF(7," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(8,"p"),t.EFF(9," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(10,"p"),t.EFF(11," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(12,"p"),t.EFF(13," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(14,"p"),t.EFF(15," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(16,"p"),t.EFF(17," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.DNE(18,he,2,0,"button",2),t.k0s(),t.DNE(19,ge,3,1,"kirby-fab-sheet",3),t.k0s()),2&o&&(t.Y8G("title",t.bMT(1,3,a.title)),t.R7$(18),t.Y8G("ngIf",a.showSubNavigation),t.R7$(),t.Y8G("kirbyPageContent",t.lJ4(5,pe)))},dependencies:[d.bT,l.H1,l.cr,l.eR,l.Uu,l.wH,y.Rl,le.U,de.vL,F.Q,d.Jj],encapsulation:2}),s})();function ue(e,s){if(1&e&&(t.j41(0,"kirby-item",3)(1,"h3"),t.EFF(2),t.k0s()()),2&e){const i=s.$implicit;t.Y8G("disclosure","arrow-more"),t.R7$(2),t.JRh(i)}}let S=(()=>{var e;class s{constructor(){this.menuItems=["Overview","Transfer","Inbox","Settings","About"]}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:4,vars:2,consts:[[3,"title"],[3,"items"],[3,"disclosure",4,"kirbyListItemTemplate"],[3,"disclosure"]],template:function(o,a){1&o&&(t.j41(0,"kirby-page",0)(1,"kirby-page-content")(2,"kirby-list",1),t.DNE(3,ue,3,2,"kirby-item",2),t.k0s()()()),2&o&&(t.Y8G("title","Menu"),t.R7$(2),t.Y8G("items",a.menuItems))},dependencies:[l.H1,l.Uu,x.JA,v.sB,v.bx],encapsulation:2}),s})(),be=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-tabs-example"]],decls:18,vars:0,consts:[[1,"container"],[1,"app-header"],["size","sm","overlay","true","text","Logo",1,"logo"],["routerLink","overview"],["name","overview-outline"],["routerLink","transfer"],["name","swap"],["routerLink","inbox"],["name","inbox-outline"],["themeColor","danger"],["routerLink","menu"],["name","menu-no-decoration"]],template:function(o,a){1&o&&(t.j41(0,"div",0)(1,"div",1),t.nrm(2,"kirby-avatar",2),t.k0s(),t.j41(3,"kirby-tab-bar")(4,"kirby-tab-button",3),t.nrm(5,"kirby-icon",4),t.EFF(6," Overview "),t.k0s(),t.j41(7,"kirby-tab-button",5),t.nrm(8,"kirby-icon",6),t.EFF(9," Transfer "),t.k0s(),t.j41(10,"kirby-tab-button",7),t.nrm(11,"kirby-icon",8),t.EFF(12," Inbox "),t.j41(13,"kirby-badge",9),t.EFF(14,"1"),t.k0s()(),t.j41(15,"kirby-tab-button",10),t.nrm(16,"kirby-icon",11),t.EFF(17," Menu "),t.k0s()()())},dependencies:[h.Wk,b.OW,b.RN,y.Rl,P.f,O.n],styles:["[_nghost-%COMP%]{display:block;background:var(--kirby-background-color);height:100%}.logo[_ngcontent-%COMP%]{display:none}@media (min-width: 992px){.logo[_ngcontent-%COMP%]{display:block}}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}.app-header[_ngcontent-%COMP%]{margin:0 auto;max-width:1024px}kirby-tab-bar[_ngcontent-%COMP%]{--kirby-tab-bar-max-width: 1024px}"]}),s})();var ye=n(7387),xe=n(83747),ve=n(71595),fe=n(94988),ke=n(13743),Ce=n(75973),Ee=n(72066),Me=n(73853),Pe=n(84749),Oe=n(52556),Te=n(70900),Fe=n(71613),Se=n(80505),j=n(71397),je=n(97064),Ie=n(54976),I=n(34607),Re=n(81560),we=n(26005);function Le(e,s){if(1&e&&(t.j41(0,"kirby-card",2),t.nrm(1,"kirby-card-header",3),t.j41(2,"div",4),t.EFF(3),t.k0s()()),2&e){const i=s.$implicit;t.Y8G("hasPadding",!0),t.R7$(),t.Y8G("title",i.title)("subtitle",i.subtitle),t.R7$(2),t.SpI(" ",i.cardContent," ")}}const Ae=[{path:"",component:W,children:[{path:"page",children:[{path:"",redirectTo:"simple",pathMatch:"full"},{path:"simple",component:Gt.P},{path:"alignment-toolbar-title",component:Lt.u},{path:"fit-heading",component:Dt.E},{path:"fixed",component:$t.d},{path:"fixed-footer",component:Ht,children:[{path:"",redirectTo:"overview",pathMatch:"full"},{path:"overview",component:Nt.x,data:{title:"Overview"}},{path:"transfer",children:[{path:"",component:c,data:{title:"Transfer"}},{path:"sub",component:c,data:{title:"Transfer Sub"}}]},{path:"inbox",component:c,data:{title:"Inbox"}},{path:"menu",component:S}]},{path:"custom-title",component:wt.i},{path:"advanced",component:Rt.D},{path:"tab-navigation",component:Kt.F},{path:"pull-to-refresh",component:ke.i},{path:"content-width",component:Bt.C},{path:"header-and-action-group",component:Oe.U},{path:"header-and-emphasized-action-group",component:Te.Y},{path:"header-and-custom-actions",component:Fe.$},{path:"header-and-interactive-title",component:Se.z}]},{path:"tabs",component:be,children:[{path:"",redirectTo:"overview",pathMatch:"full"},{path:"overview",component:c,data:{title:"Overview"}},{path:"transfer",children:[{path:"",component:c,data:{title:"Transfer"}},{path:"sub",component:c,data:{title:"Transfer Sub"}}]},{path:"inbox",component:c,data:{title:"Inbox"}},{path:"menu",component:S}]},{path:"reorder-list",component:Zt},{path:"modal",component:St.b},{path:"modal-advanced",component:Ie.T},{path:"modal-simple",component:je.J},{path:"modal-component",component:we.K},{path:"modal-alert",component:Re.h},{path:"modal-route",component:I.I,children:[{path:"page1",outlet:"modal",component:E.Q,data:{modalConfig:{size:"large",flavor:"drawer"}}},{path:"page2",outlet:"modal",component:M.H}]},{path:"modal-route-with-url-param/:id",component:I.I,children:[{path:"page1",outlet:"modal",component:E.Q},{path:"page2",outlet:"modal",component:M.H}]},{path:"modal-v2",children:[{path:"fullscreen",component:jt.MT},{path:"drawer",component:It.cp},{path:"nested",component:Pe.xy}]},{path:"form-field",children:[{path:"",component:nt.u},{path:"date",component:q.E},{path:"date-native",component:tt.B},{path:"decimal-mask",component:et.L}]},{path:"experimental",loadChildren:()=>Promise.resolve().then(n.bind(n,71030)).then(e=>e.ExperimentalExamplesModule)}]},{path:"item",component:mt.n},{path:"item-sliding",component:dt.V},{path:"item-group",component:lt.G},{path:"section-header",component:qt.A},{path:"button",component:N.e},{path:"slide-button",component:ee.l},{path:"card",component:G._},{path:"list",component:kt,children:[{path:"",pathMatch:"full",redirectTo:"with-items"},{path:"with-items",component:ht.K},{path:"with-selectable-items",component:vt.U},{path:"with-colored-items",component:ct.w},{path:"with-sections-and-colored-items",component:yt.r},{path:"with-header-and-footer",component:gt.V},{path:"with-sections",component:bt.I},{path:"with-items-no-dividers",component:ut.F},{path:"with-stand-alone",component:ft.n},{path:"with-sections-and-stand-alone",component:xt.C}]},{path:"list-swipe",component:Tt.k},{path:"list-no-shape",component:Ot.Q},{path:"list-load-on-demand",component:Pt.C},{path:"list-experimental",component:Mt},{path:"chart",component:K.H},{path:"grid",component:ot.C},{path:"grid-layout-single-container",component:st.j},{path:"grid-layout-multiple-containers",component:at.e},{path:"grid-layout-extended",component:it.n},{path:"virtual-scroll-list",component:fe.W},{path:"avatar",component:A.r},{path:"fonts",component:Z},{path:"spinner",component:se.L},{path:"loading-overlay",component:Ft.Y},{path:"action-sheet",component:L.p},{path:"alert",component:D._},{path:"segmented-control",component:te.V},{path:"badge",component:H.Z},{path:"flag",component:Q.K},{path:"icon",component:rt.L},{path:"checkbox",component:V.$},{path:"toast",component:ye.x},{path:"toggle",component:ve.g},{path:"calendar",component:B.S},{path:"calendar-card",component:$.u},{path:"empty-state",component:U.o},{path:"fab-sheet",component:J.u},{path:"dropdown",component:Ce.j},{path:"progress-circle",component:Vt.V},{path:"toggle-button",component:xe.m},{path:"slides",component:oe},{path:"slides-height",component:(()=>{var e;class s{constructor(){this.lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus leo quis libero posuere auctor. Quisque ornare lectus finibus tellus sollicitudin, et blandit quam semper. Ut sed lacus eget dui blandit consequat. Nam commodo sit amet augue vel dapibus. Mauris tincidunt nulla eget porttitor euismod. Ut at massa massa. Curabitur suscipit ullamcorper felis, vitae tincidunt eros varius in. Duis et tellus eu turpis varius dictum. Mauris mattis posuere ligula nec pharetra. Vestibulum a augue at nulla elementum fringilla. Duis vehicula finibus turpis, vel dignissim magna ullamcorper vitae. Nam vel elit orci.",this.randomIntegerBetween=(o,a)=>Math.floor(Math.random()*(o-a+1)+a),this.slides=[...Array(9).keys()].map(o=>({title:`Slide ${o+1}`,subtitle:`Subtitle ${o+1}`,cardContent:this.lorem.split(" ").slice(0,this.randomIntegerBetween(6,12)).join(" ")}))}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],["slideStretchHeight","",3,"hasPadding",4,"kirbySlide"],["slideStretchHeight","",3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(o,a){1&o&&(t.j41(0,"kirby-slides",0),t.DNE(1,Le,4,4,"kirby-card",1),t.k0s()),2&o&&t.Y8G("slides",a.slides)("title","Title")("showNavigation",!0)},dependencies:[g.ib,g.lM,p.yb,p.F7,p.xM],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding:16px;box-sizing:border-box}@media (min-width: 768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{font-size:12px;color:var(--kirby-semi-dark);text-transform:uppercase;margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]}),s})()},{path:"slides-advanced",component:ae},{path:"accordion",component:w.k},{path:"radio",component:Ut.F},{path:"range",component:Yt.V},{path:"link",component:pt.e},{path:"styling-HTML-lists",component:re.Q},{path:"data-table",component:Ee.W},{path:"menu",component:j.j},{path:"header",component:Me.h},{path:"menu",component:j.j}];let He=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.$C({type:e}),e.\u0275inj=t.G2t({imports:[h.iI.forChild(Ae),R.m,h.iI]}),s})()}}]);