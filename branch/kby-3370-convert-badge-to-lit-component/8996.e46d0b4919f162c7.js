"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[8996],{38996:(Ne,k,n)=>{n.r(k),n.d(k,{ExamplesRoutingModule:()=>He});var u=n(22694),D=n(43485),y=n(81443),A=n(563),H=n(19963),L=n(49267),N=n(17513),$=n(67855),B=n(51123),G=n(68683),K=n(65499),V=n(13879),Y=n(62009),z=n(23817),U=n(15),_=n(19402),t=n(93953),X=n(35519),d=n(60177),E=n(19539),M=n(15739);function W(e,s){1&e&&t.nrm(0,"div")}function J(e,s){if(1&e&&(t.j41(0,"div",1),t.nrm(1,"div",2),t.j41(2,"div",3),t.DNE(3,W,1,0,"div",4),t.k0s()()),2&e){const a=t.XpG();t.xc7("--keyboard-height",a.keyboardHeight+"px"),t.R7$(2),t.AVh("keyboard-showing",a.keyboardIsShowing),t.R7$(),t.Y8G("ngForOf",a.keys)}}let Q=(()=>{var e;class s{constructor(o){this.windowRef=o,this.showDummyKeyboard=!!this.windowRef.nativeWindow.sessionStorage.getItem("kirby-cookbook-show-dummy-keyboard"),this.keyboardIsShowing=!1,this.keyCount=40,this.setKeyboardSize()}get keys(){return Array(this.keyCount).fill("")}setKeyboardSize(){const r=this.windowRef.nativeWindow.matchMedia(`(min-width: ${_.Q.breakpoints.medium})`).matches?"tablet":"phone",m=this.windowRef.nativeWindow.matchMedia("(orientation: landscape)").matches?"landscape":"portrait";this.keyboardHeight={tablet:{portrait:408,landscape:434},phone:{portrait:290,landscape:200}}[r][m],this.keyCount=4*("phone"===r?7:10)}_onKeyboardDidShow(o){this.keyboardHeight=o.detail.keyboardHeight,this.keyboardIsShowing=!0}_onKeyboardDidHide(){this.keyboardIsShowing=!1}_onToggleDummyKeyboard(o){this.showDummyKeyboard=o}_onInputFocus(o){if(this.showDummyKeyboard&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName)){const i=new CustomEvent("ionKeyboardDidShow",{detail:{keyboardHeight:this.keyboardHeight}});setTimeout(()=>this.windowRef.nativeWindow.dispatchEvent(i),100)}}_onInputFocusOut(o){if(this.showDummyKeyboard&&("INPUT"===o.tagName||"TEXTAREA"===o.tagName)){const i=new CustomEvent("ionKeyboardDidHide");this.windowRef.nativeWindow.dispatchEvent(i)}}_onWindowResize(){this.showDummyKeyboard&&this.setKeyboardSize()}}return(e=s).\u0275fac=function(o){return new(o||e)(t.rXU(X.W))},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-examples"]],hostBindings:function(o,i){1&o&&t.bIt("ionKeyboardDidShow",function(m){return i._onKeyboardDidShow(m)},!1,t.tSv)("ionKeyboardDidHide",function(){return i._onKeyboardDidHide()},!1,t.tSv)("kirbyToggleDummyKeyboard",function(m){return i._onToggleDummyKeyboard(m.detail)},!1,t.tSv)("focusin",function(m){return i._onInputFocus(m.target)},!1,t.EBC)("focusout",function(m){return i._onInputFocusOut(m.target)},!1,t.EBC)("resize",function(){return i._onWindowResize()},!1,t.tSv)},decls:3,vars:1,consts:[["class","dummy-keyboard",3,"--keyboard-height",4,"ngIf"],[1,"dummy-keyboard"],[1,"top"],[1,"bg"],[4,"ngFor","ngForOf"]],template:function(o,i){1&o&&(t.DNE(0,J,4,5,"div",0),t.j41(1,"kirby-app"),t.nrm(2,"kirby-router-outlet"),t.k0s()),2&o&&t.Y8G("ngIf",i.showDummyKeyboard)},dependencies:[d.Sq,d.bT,E.Z,M.Cs],styles:['@charset "UTF-8";.dummy-keyboard[_ngcontent-%COMP%]{position:absolute;width:100%;bottom:0;z-index:99999;pointer-events:none;overflow:hidden;height:var(--keyboard-height)}.dummy-keyboard[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%], .dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%]{position:absolute;height:100%;width:100%}.dummy-keyboard[_ngcontent-%COMP%]   .top[_ngcontent-%COMP%]{background-color:transparent;border-top:1px dashed var(--kirby-semi-dark);z-index:1}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%]{opacity:.9;background-color:var(--kirby-medium);transition:transform .15s ease-out;display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;grid-gap:16px;padding:16px;transform:translateY(100%)}@media (min-width: 768px){.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%]{grid-template-columns:repeat(10,1fr)}}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{background-color:var(--kirby-white);border-radius:4px;box-shadow:0 2px var(--kirby-semi-dark);display:flex;align-items:center;justify-content:center;font-size:18px}@media (max-width: 767px){.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(16):before{content:"K"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(17):before{content:"I"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(18):before{content:"R"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(19):before{content:"B"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(20):before{content:"Y"}}@media (min-width: 768px){.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(23):before{content:"K"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(24):before{content:"I"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(25):before{content:"R"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(26):before{content:"B"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(27):before{content:"Y"}.dummy-keyboard[_ngcontent-%COMP%]   .bg[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]:nth-child(28):before{content:"\\a9"}}.dummy-keyboard[_ngcontent-%COMP%]   .bg.keyboard-showing[_ngcontent-%COMP%]{transform:translateY(0);transition:transform .25s ease-out 1ms}']}),s})();var Z=n(60167),q=n(43535);let tt=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-fonts-example"]],decls:10,vars:0,consts:[[1,"kirby-text-large"],[1,"kirby-text-xsmall"],[1,"kirby-text-xxsmall"]],template:function(o,i){1&o&&(t.j41(0,"h1"),t.EFF(1,"Heading 1"),t.k0s(),t.j41(2,"h2"),t.EFF(3,"Heading 2"),t.k0s(),t.j41(4,"p",0),t.EFF(5,"Kirby-text-large"),t.k0s(),t.j41(6,"p",1),t.EFF(7,"xsmall text"),t.k0s(),t.j41(8,"p",2),t.EFF(9,"xxsmall text"),t.k0s())},encapsulation:2}),s})();var et=n(64911),nt=n(88351),ot=n(9645),at=n(28169),it=n(98299),st=n(58956),rt=n(80306),mt=n(55650),lt=n(50217),dt=n(12529),pt=n(31305),ct=n(22539),ht=n(91435),gt=n(35022),ut=n(32737),bt=n(33082),yt=n(99080),xt=n(40041),vt=n(23579),ft=n(69780),Ct=n(98988),kt=n(53903);let Et=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-list-example"]],decls:2,vars:0,template:function(o,i){1&o&&(t.j41(0,"kirby-app"),t.nrm(1,"kirby-router-outlet"),t.k0s())},dependencies:[E.Z,M.Cs],styles:["[_nghost-%COMP%]{padding:2px;width:100%;background:var(--kirby-background-color);height:100%;display:block}hr[_ngcontent-%COMP%]{visibility:hidden}h2[_ngcontent-%COMP%]{margin-top:40px}.footer[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;width:100%;padding:16px}.footer[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}"]}),s})();var Mt=n(57671),Ot=n(46692);let Pt=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-list-example"]],decls:8,vars:0,template:function(o,i){1&o&&(t.j41(0,"div")(1,"h2"),t.EFF(2,"List with items and section"),t.k0s(),t.nrm(3,"cookbook-list-experimental-items-example"),t.k0s(),t.j41(4,"div")(5,"h2"),t.EFF(6,"List with sliding items"),t.k0s(),t.nrm(7,"cookbook-list-experimental-sliding-items-example"),t.k0s())},dependencies:[Mt.s,Ot.m],styles:[".rounded[_ngcontent-%COMP%]{border-radius:16px;overflow:hidden}.shadow[_ngcontent-%COMP%]{box-shadow:0 1px 24px #1c1c1c0a}.first-item-padding[_ngcontent-%COMP%] >   :first-child{--item-padding-top: 8px}.last-item-padding[_ngcontent-%COMP%] >   :last-child{--item-padding-bottom: 8px}.first-item[_ngcontent-%COMP%]{border-top-left-radius:16px;border-top-right-radius:16px;overflow:hidden}.first-item[_ngcontent-%COMP%] >   :first-child{--item-padding-top: 8px}.last-item[_ngcontent-%COMP%]{border-bottom-left-radius:16px;border-bottom-right-radius:16px;overflow:hidden}.last-item[_ngcontent-%COMP%] >   :last-child{--item-padding-bottom: 8px}[_nghost-%COMP%]{display:flex;flex-direction:column;align-items:center;flex-grow:1;height:100%;background:var(--kirby-background-color);gap:24px;padding-top:16px}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{width:min(100%,768px)}"]}),s})();var Ft=n(34823),Tt=n(94747),St=n(50753),jt=n(50751),Rt=n(8075),O=n(74505),P=n(76816),It=n(25531),wt=n(43765),Dt=n(83741),At=n(43511),b=n(35348),x=n(35043),F=n(28287),T=n(75797);let Lt=(()=>{var e;class s{}return(e=s).template='\x3c!-- This container is only needed due to layout of larger screen sizes --\x3e\n<div class="container">\n  <div class="app-header">\n    \x3c!-- Hidden on small screen sizes--\x3e\n    <kirby-avatar size="sm" overlay="true" text="Logo" class="logo"></kirby-avatar>\n  </div>\n\n  <kirby-tab-bar>\n    <kirby-tab-button tab="overview">\n      <kirby-icon name="overview-outline"></kirby-icon>\n      Overview\n    </kirby-tab-button>\n\n    <kirby-tab-button tab="transfer">\n      <kirby-icon name="swap"></kirby-icon>\n      Transfer\n    </kirby-tab-button>\n\n    <kirby-tab-button tab="inbox">\n      <kirby-icon name="inbox-outline"></kirby-icon>\n      Inbox\n      <kirby-badge themeColor="danger">1</kirby-badge>\n    </kirby-tab-button>\n\n    <kirby-tab-button tab="menu">\n      <kirby-icon name="menu-no-decoration"></kirby-icon>\n      Menu\n    </kirby-tab-button>\n  </kirby-tab-bar>\n</div>',e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-fixed-footer-tabs-example"]],decls:18,vars:0,consts:[[1,"container"],[1,"app-header"],["size","sm","overlay","true","text","Logo",1,"logo"],["tab","overview"],["name","overview-outline"],["tab","transfer"],["name","swap"],["tab","inbox"],["name","inbox-outline"],["themeColor","danger"],["tab","menu"],["name","menu-no-decoration"]],template:function(o,i){1&o&&(t.j41(0,"div",0)(1,"div",1),t.nrm(2,"kirby-avatar",2),t.k0s(),t.j41(3,"kirby-tab-bar")(4,"kirby-tab-button",3),t.nrm(5,"kirby-icon",4),t.EFF(6," Overview "),t.k0s(),t.j41(7,"kirby-tab-button",5),t.nrm(8,"kirby-icon",6),t.EFF(9," Transfer "),t.k0s(),t.j41(10,"kirby-tab-button",7),t.nrm(11,"kirby-icon",8),t.EFF(12," Inbox "),t.j41(13,"kirby-badge",9),t.EFF(14,"1"),t.k0s()(),t.j41(15,"kirby-tab-button",10),t.nrm(16,"kirby-icon",11),t.EFF(17," Menu "),t.k0s()()())},dependencies:[b.OW,b.RN,x.Rl,F.f,T.n],styles:["[_nghost-%COMP%]{display:block;background:var(--kirby-background-color);height:100%}.logo[_ngcontent-%COMP%]{display:none}@media (min-width: 992px){.logo[_ngcontent-%COMP%]{display:block}}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}.app-header[_ngcontent-%COMP%]{margin:0 auto;max-width:1024px}kirby-tab-bar[_ngcontent-%COMP%]{--kirby-tab-bar-max-width: 1024px}"]}),s})();var Nt=n(80956),$t=n(62243),Bt=n(39357),Gt=n(80295),Kt=n(17464),Vt=n(66791),Yt=n(73299),zt=n(70571),l=n(91365),v=n(81365),f=n(29756),Ut=n(12090),_t=n(57808);const Xt=e=>({"kirby-text-bold":e});function Wt(e,s){if(1&e&&(t.j41(0,"span",5),t.EFF(1),t.k0s()),2&e){const a=s.$implicit;t.R7$(),t.SpI(" ",a," ")}}function Jt(e,s){if(1&e&&(t.j41(0,"p",10),t.EFF(1),t.k0s()),2&e){const a=t.XpG().$implicit;t.R7$(),t.JRh(a.ownerName)}}function Qt(e,s){if(1&e&&(t.j41(0,"kirby-item",6)(1,"kirby-label")(2,"h3",7),t.EFF(3),t.k0s(),t.DNE(4,Jt,2,1,"p",8),t.k0s(),t.nrm(5,"kirby-toggle",9),t.k0s()),2&e){const a=s.$implicit,o=s.isSubItem;t.R7$(2),t.Y8G("ngClass",t.eq3(5,Xt,!o)),t.R7$(),t.JRh(a.title),t.R7$(),t.Y8G("ngIf",!a.isOwnAccount),t.R7$(),t.Y8G("checked",!0),t.BMQ("aria-label","hide or show account "+a.title)}}let Zt=(()=>{var e;class s{constructor(){this.items=[{title:"1",ownerName:"xyz",isOwnAccount:!1,shadowAccounts:[{title:"1a"},{title:"1b"},{title:"1c"},{title:"1d"},{title:"1e"},{title:"1f"}]},{title:"2"},{title:"3"},{title:"4",ownerName:"John",isOwnAccount:!0,shadowAccounts:[{title:"4a"}]},{title:"5",isOwnAccount:!0,shadowAccounts:[{title:"5a"}]}],this.headerTexts=["hide/show","move"]}doReorderItem(o){o.complete(this.items)}doReorderShadowAccount(o){o.complete(o.parentItem.shadowAccounts)}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-reorder-list-example"]],decls:6,vars:2,consts:[["title","Reorder"],[1,"section-header"],["class","kirby-text-small-light",4,"ngFor","ngForOf"],["subItemsName","shadowAccounts",3,"itemReorder","subItemReorder","items"],["reorderable","true",4,"kirbyListItemTemplate"],[1,"kirby-text-small-light"],["reorderable","true"],[3,"ngClass"],["detail","",4,"ngIf"],["slot","end",3,"checked"],["detail",""]],template:function(o,i){1&o&&(t.j41(0,"kirby-page",0)(1,"kirby-page-content")(2,"header",1),t.DNE(3,Wt,2,1,"span",2),t.k0s(),t.j41(4,"kirby-reorder-list",3),t.bIt("itemReorder",function(m){return i.doReorderItem(m)})("subItemReorder",function(m){return i.doReorderShadowAccount(m)}),t.DNE(5,Qt,6,7,"kirby-item",4),t.k0s()()()),2&o&&(t.R7$(3),t.Y8G("ngForOf",i.headerTexts),t.R7$(),t.Y8G("items",i.items))},dependencies:[d.YU,d.Sq,d.bT,l.H1,l.Uu,v.JA,v.UF,f.bx,Ut.N,_t.a],styles:[".section-header[_ngcontent-%COMP%]{padding:0 16px 8px 8px;display:flex;justify-content:flex-end}.section-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding-left:16px}"]}),s})();var qt=n(98245),te=n(84923),ee=n(99955),h=n(98990),p=n(16564);function ne(e,s){if(1&e&&(t.j41(0,"kirby-card",2),t.nrm(1,"kirby-card-header",3),t.j41(2,"div",4),t.EFF(3),t.k0s()()),2&e){const a=s.$implicit;t.Y8G("hasPadding",!0),t.R7$(),t.Y8G("title",a.title)("subtitle",a.subtitle),t.R7$(2),t.SpI(" ",a.cardContent," ")}}let oe=(()=>{var e;class s{constructor(){this.slides=[...Array(9).keys()].map(o=>({title:`Slide ${o+1}`,subtitle:`Subtitle ${o+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],[3,"hasPadding",4,"kirbySlide"],[3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(o,i){1&o&&(t.j41(0,"kirby-slides",0),t.DNE(1,ne,4,4,"kirby-card",1),t.k0s()),2&o&&t.Y8G("slides",i.slides)("title","Title")("showNavigation",!0)},dependencies:[h.ib,h.lM,p.yb,p.F7],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding:16px;box-sizing:border-box}@media (min-width: 768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{font-size:12px;color:var(--kirby-semi-dark);text-transform:uppercase;margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]}),s})();var S=n(57017),j=n(47008);function ae(e,s){if(1&e&&(t.j41(0,"kirby-card",5),t.nrm(1,"kirby-card-header",6),t.j41(2,"div"),t.EFF(3),t.k0s()()),2&e){const a=s.$implicit;t.Y8G("hasPadding",!0),t.R7$(),t.Y8G("title",a.title)("subtitle",a.subtitle),t.R7$(2),t.JRh(a.cardContent)}}let ie=(()=>{var e;class s{constructor(o){this.toastController=o,this.config={slidesPerView:1.1,breakpoints:{768:{centeredSlides:!1,slidesPerView:2,slidesPerGroup:1}}},this.slides=[...Array(9).keys()].map(i=>({title:`Slide ${i+1}`,subtitle:`Subtitle ${i+1}`,cardContent:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}))}getDataFromActiveSlide(o){this.toastController.showToast({message:`Changed to ${o.slide.title}`,messageType:"success",durationInMs:1e3})}showAll(){this.toastController.showToast({message:"See all... (your handler here)",messageType:"success",durationInMs:2e3})}}return(e=s).\u0275fac=function(o){return new(o||e)(t.rXU(S.K))},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:7,vars:4,consts:[["slidesInstance",""],[3,"slideChange","slidesOptions","slides","showNavigation","title"],[3,"hasPadding",4,"kirbySlide"],["kirby-button","","attentionLevel","3","size","xs",3,"click"],["kirby-button","",2,"display","block","margin","24px auto 0",3,"click"],[3,"hasPadding"],[3,"title","subtitle"]],template:function(o,i){if(1&o){const r=t.RV6();t.j41(0,"kirby-slides",1,0),t.bIt("slideChange",function(g){return t.eBV(r),t.Njj(i.getDataFromActiveSlide(g))}),t.DNE(2,ae,4,4,"kirby-card",2),t.j41(3,"button",3),t.bIt("click",function(){return t.eBV(r),t.Njj(i.showAll())}),t.EFF(4,"See all"),t.k0s()(),t.j41(5,"button",4),t.bIt("click",function(){t.eBV(r);const g=t.sdS(1);return t.Njj(g.slideTo(3))}),t.EFF(6," Activate slide no. 4\n"),t.k0s()}2&o&&t.Y8G("slidesOptions",i.config)("slides",i.slides)("showNavigation",!0)("title","Title")},dependencies:[h.ib,h.lM,p.yb,p.F7,j.Q],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding:16px;box-sizing:border-box}@media (min-width: 768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{font-size:12px;color:var(--kirby-semi-dark);text-transform:uppercase;margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]}),s})();var se=n(57123),re=n(90107),me=n(7673),le=n(50589);const de=()=>({fixed:!0});function pe(e,s){if(1&e){const a=t.RV6();t.j41(0,"kirby-page-actions")(1,"button",4),t.bIt("click",function(){t.eBV(a);const i=t.XpG();return t.Njj(i.onCogSelect())}),t.nrm(2,"kirby-icon",5),t.k0s(),t.j41(3,"button",4),t.bIt("click",function(){t.eBV(a);const i=t.XpG();return t.Njj(i.onMoreSelect())}),t.nrm(4,"kirby-icon",6),t.k0s()()}}function ce(e,s){if(1&e){const a=t.RV6();t.j41(0,"button",4),t.bIt("click",function(){t.eBV(a);const i=t.XpG();return t.Njj(i.navigateToTransferSub())}),t.EFF(1," Go to transfer sub "),t.k0s()}}function he(e,s){if(1&e){const a=t.RV6();t.j41(0,"kirby-fab-sheet",7),t.nrm(1,"kirby-icon",8),t.j41(2,"kirby-action-sheet",9),t.bIt("itemSelect",function(i){t.eBV(a);const r=t.XpG();return t.Njj(r.onItemSelect(i))}),t.k0s()()}if(2&e){const a=t.XpG();t.R7$(2),t.Y8G("items",a.items)}}let c=(()=>{var e;class s{constructor(o,i,r,m){this.route=o,this.router=i,this.cdr=r,this.toastController=m,this.items=[{id:"1",text:"Option 1"},{id:"2",text:"Option 2"},{id:"3",text:"Option 3"}],this.showSubNavigation=!1}ngOnInit(){this.showSubNavigation="transfer"===this.route.snapshot.parent.routeConfig.path,setTimeout(()=>{this.title=(0,me.of)(this.route.snapshot.data.title),this.cdr.detectChanges()},300)}onItemSelect(o){this.toastController.showToast({message:`Item selected: ${o.text}`,messageType:"success",durationInMs:1500})}navigateToTransferSub(){this.router.navigate(["sub"],{relativeTo:this.route})}onCogSelect(){this.toastController.showToast({message:"Cog clicked...",messageType:"success",durationInMs:1500})}onMoreSelect(){this.toastController.showToast({message:"More menu clicked...",messageType:"success",durationInMs:1500})}}return(e=s).\u0275fac=function(o){return new(o||e)(t.rXU(u.nX),t.rXU(u.Ix),t.rXU(t.gRc),t.rXU(S.K))},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:20,vars:6,consts:[[3,"title"],[4,"kirbyPageActions"],["kirby-button","",3,"click",4,"ngIf"],["horizontalAlignment","right",4,"kirbyPageContent"],["kirby-button","",3,"click"],["name","cog"],["name","more"],["horizontalAlignment","right"],["name","write-message"],["header","Your action sheet header","subheader","Your action sheet subheader",3,"itemSelect","items"]],template:function(o,i){1&o&&(t.j41(0,"kirby-page",0),t.nI1(1,"async"),t.DNE(2,pe,5,0,"kirby-page-actions",1),t.j41(3,"kirby-page-content")(4,"p"),t.EFF(5," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(6,"p"),t.EFF(7," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(8,"p"),t.EFF(9," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(10,"p"),t.EFF(11," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(12,"p"),t.EFF(13," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(14,"p"),t.EFF(15," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.j41(16,"p"),t.EFF(17," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt error minus odit officia officiis quo tempora ut velit voluptate. Aliquid ea, earum facilis hic in libero obcaecati odit quia soluta! "),t.k0s(),t.DNE(18,ce,2,0,"button",2),t.k0s(),t.DNE(19,he,3,1,"kirby-fab-sheet",3),t.k0s()),2&o&&(t.Y8G("title",t.bMT(1,3,i.title)),t.R7$(18),t.Y8G("ngIf",i.showSubNavigation),t.R7$(),t.Y8G("kirbyPageContent",t.lJ4(5,de)))},dependencies:[d.bT,l.H1,l.cr,l.eR,l.Uu,l.wH,x.Rl,le.U,y.vL,j.Q,d.Jj],encapsulation:2}),s})();function ge(e,s){if(1&e&&(t.j41(0,"kirby-item",3)(1,"h3"),t.EFF(2),t.k0s()()),2&e){const a=s.$implicit;t.Y8G("disclosure","arrow-more"),t.R7$(2),t.JRh(a)}}let R=(()=>{var e;class s{constructor(){this.menuItems=["Overview","Transfer","Inbox","Settings","About"]}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:4,vars:2,consts:[[3,"title"],[3,"items"],[3,"disclosure",4,"kirbyListItemTemplate"],[3,"disclosure"]],template:function(o,i){1&o&&(t.j41(0,"kirby-page",0)(1,"kirby-page-content")(2,"kirby-list",1),t.DNE(3,ge,3,2,"kirby-item",2),t.k0s()()()),2&o&&(t.Y8G("title","Menu"),t.R7$(2),t.Y8G("items",i.menuItems))},dependencies:[l.H1,l.Uu,v.JA,f.sB,f.bx],encapsulation:2}),s})(),ue=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["cookbook-tabs-example"]],decls:18,vars:0,consts:[[1,"container"],[1,"app-header"],["size","sm","overlay","true","text","Logo",1,"logo"],["tab","overview"],["name","overview-outline"],["tab","transfer"],["name","swap"],["tab","inbox"],["name","inbox-outline"],["themeColor","danger"],["tab","menu"],["name","menu-no-decoration"]],template:function(o,i){1&o&&(t.j41(0,"div",0)(1,"div",1),t.nrm(2,"kirby-avatar",2),t.k0s(),t.j41(3,"kirby-tab-bar")(4,"kirby-tab-button",3),t.nrm(5,"kirby-icon",4),t.EFF(6," Overview "),t.k0s(),t.j41(7,"kirby-tab-button",5),t.nrm(8,"kirby-icon",6),t.EFF(9," Transfer "),t.k0s(),t.j41(10,"kirby-tab-button",7),t.nrm(11,"kirby-icon",8),t.EFF(12," Inbox "),t.j41(13,"kirby-badge",9),t.EFF(14,"1"),t.k0s()(),t.j41(15,"kirby-tab-button",10),t.nrm(16,"kirby-icon",11),t.EFF(17," Menu "),t.k0s()()())},dependencies:[b.OW,b.RN,x.Rl,F.f,T.n],styles:["[_nghost-%COMP%]{display:block;background:var(--kirby-background-color);height:100%}.logo[_ngcontent-%COMP%]{display:none}@media (min-width: 992px){.logo[_ngcontent-%COMP%]{display:block}}.container[_ngcontent-%COMP%]{max-width:1280px;margin:0 auto}.app-header[_ngcontent-%COMP%]{margin:0 auto;max-width:1024px}kirby-tab-bar[_ngcontent-%COMP%]{--kirby-tab-bar-max-width: 1024px}"]}),s})();var be=n(7387),ye=n(83747),xe=n(71595),ve=n(94988),fe=n(13743),Ce=n(75973),ke=n(72066),Ee=n(73853),Me=n(52556),Oe=n(70900),Pe=n(71613),Fe=n(80505),I=n(71397),Te=n(97064),Se=n(54976),w=n(34607),je=n(81560),C=n(43999),Re=n(3745),Ie=n(26005);function we(e,s){if(1&e&&(t.j41(0,"kirby-card",2),t.nrm(1,"kirby-card-header",3),t.j41(2,"div",4),t.EFF(3),t.k0s()()),2&e){const a=s.$implicit;t.Y8G("hasPadding",!0),t.R7$(),t.Y8G("title",a.title)("subtitle",a.subtitle),t.R7$(2),t.SpI(" ",a.cardContent," ")}}const Ae=[{path:"",component:Q,children:[{path:"page",children:[{path:"",redirectTo:"simple",pathMatch:"full"},{path:"simple",component:Gt.P},{path:"alignment-toolbar-title",component:Dt.u},{path:"fit-heading",component:At.E},{path:"fixed",component:$t.d},{path:"fixed-footer",component:Lt,children:[{path:"",redirectTo:"overview",pathMatch:"full"},{path:"overview",component:Nt.x,data:{title:"Overview"}},{path:"transfer",children:[{path:"",component:c,data:{title:"Transfer"}},{path:"sub",component:c,data:{title:"Transfer Sub"}}]},{path:"inbox",component:c,data:{title:"Inbox"}},{path:"menu",component:R}]},{path:"custom-title",component:wt.i},{path:"advanced",component:It.D},{path:"tab-navigation",component:Kt.F},{path:"pull-to-refresh",component:fe.i},{path:"content-width",component:Bt.C},{path:"header-and-action-group",component:Me.U},{path:"header-and-emphasized-action-group",component:Oe.Y},{path:"header-and-custom-actions",component:Pe.$},{path:"header-and-interactive-title",component:Fe.z}]},{path:"tabs",component:ue,children:[{path:"",redirectTo:"overview",pathMatch:"full"},{path:"overview",component:c,data:{title:"Overview"}},{path:"transfer",children:[{path:"",component:c,data:{title:"Transfer"}},{path:"sub",component:c,data:{title:"Transfer Sub"}}]},{path:"inbox",component:c,data:{title:"Inbox"}},{path:"menu",component:R}]},{path:"reorder-list",component:Zt},{path:"modal",component:Rt.b},{path:"modal-advanced",component:Se.T},{path:"modal-simple",component:Te.J},{path:"modal-component",component:Ie.K},{path:"modal-alert",component:je.h},{path:"modal-with-guard",component:C.O,data:{step:2,nextRoute:"../modal-with-guard-open"}},{path:"modal-with-guard-open",component:C.O,canDeactivate:[y.fz],data:{step:3}},{path:"modal-route-with-guard",component:C.O,data:{step:2,nextRoute:["./",{outlets:{modal:["page1"]}}]},children:[{path:"page1",outlet:"modal",component:Re.x,canDeactivate:[y.fz]}]},{path:"modal-route",component:w.I,children:[{path:"page1",outlet:"modal",component:O.Q,data:{modalConfig:{size:"large",flavor:"drawer"}}},{path:"page2",outlet:"modal",component:P.H}]},{path:"modal-route-with-url-param/:id",component:w.I,children:[{path:"page1",outlet:"modal",component:O.Q},{path:"page2",outlet:"modal",component:P.H}]},{path:"form-field",children:[{path:"",component:at.u},{path:"date",component:et.E},{path:"date-native",component:nt.B},{path:"decimal-mask",component:ot.L}]}]},{path:"item",component:dt.n},{path:"item-sliding",component:ct.V},{path:"item-group",component:pt.G},{path:"section-header",component:qt.A},{path:"button",component:B.e},{path:"slide-button",component:ee.l},{path:"card",component:V._},{path:"list",component:Et,children:[{path:"",pathMatch:"full",redirectTo:"with-items"},{path:"with-items",component:ut.K},{path:"with-selectable-items",component:Ct.U},{path:"with-colored-items",component:gt.w},{path:"with-sections-and-colored-items",component:vt.r},{path:"with-header-and-footer",component:bt.V},{path:"with-sections",component:xt.I},{path:"with-items-no-dividers",component:yt.F},{path:"with-stand-alone",component:kt.n},{path:"with-sections-and-stand-alone",component:ft.C}]},{path:"list-swipe",component:St.k},{path:"list-no-shape",component:Tt.Q},{path:"list-load-on-demand",component:Ft.C},{path:"list-experimental",component:Pt},{path:"chart",component:Y.H},{path:"grid",component:it.C},{path:"grid-layout-single-container",component:mt.j},{path:"grid-layout-multiple-containers",component:rt.e},{path:"grid-layout-extended",component:st.n},{path:"virtual-scroll-list",component:ve.W},{path:"avatar",component:N.r},{path:"fonts",component:tt},{path:"spinner",component:se.L},{path:"loading-overlay",component:jt.Y},{path:"action-sheet",component:H.p},{path:"alert",component:L._},{path:"segmented-control",component:te.V},{path:"badge",component:$.Z},{path:"flag",component:q.K},{path:"icon",component:lt.L},{path:"checkbox",component:z.$},{path:"toast",component:be.x},{path:"toggle",component:xe.g},{path:"calendar",component:K.S},{path:"calendar-card",component:G.u},{path:"empty-state",component:U.o},{path:"fab-sheet",component:Z.u},{path:"dropdown",component:Ce.j},{path:"progress-circle",component:Vt.V},{path:"toggle-button",component:ye.m},{path:"slides",component:oe},{path:"slides-height",component:(()=>{var e;class s{constructor(){this.lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus leo quis libero posuere auctor. Quisque ornare lectus finibus tellus sollicitudin, et blandit quam semper. Ut sed lacus eget dui blandit consequat. Nam commodo sit amet augue vel dapibus. Mauris tincidunt nulla eget porttitor euismod. Ut at massa massa. Curabitur suscipit ullamcorper felis, vitae tincidunt eros varius in. Duis et tellus eu turpis varius dictum. Mauris mattis posuere ligula nec pharetra. Vestibulum a augue at nulla elementum fringilla. Duis vehicula finibus turpis, vel dignissim magna ullamcorper vitae. Nam vel elit orci.",this.randomIntegerBetween=(o,i)=>Math.floor(Math.random()*(o-i+1)+i),this.slides=[...Array(9).keys()].map(o=>({title:`Slide ${o+1}`,subtitle:`Subtitle ${o+1}`,cardContent:this.lorem.split(" ").slice(0,this.randomIntegerBetween(6,12)).join(" ")}))}}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["ng-component"]],decls:2,vars:3,consts:[[3,"slides","title","showNavigation"],["slideStretchHeight","",3,"hasPadding",4,"kirbySlide"],["slideStretchHeight","",3,"hasPadding"],[3,"title","subtitle"],[1,"card-content"]],template:function(o,i){1&o&&(t.j41(0,"kirby-slides",0),t.DNE(1,we,4,4,"kirby-card",1),t.k0s()),2&o&&t.Y8G("slides",i.slides)("title","Title")("showNavigation",!0)},dependencies:[h.ib,h.lM,p.yb,p.F7,p.xM],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow-x:hidden;background:var(--kirby-background-color);padding:16px;box-sizing:border-box}@media (min-width: 768px){[_nghost-%COMP%]{padding:32px}}[_nghost-%COMP%]   h2[_ngcontent-%COMP%]:not(:first-child){margin-top:32px}[_nghost-%COMP%]   h3[_ngcontent-%COMP%]{font-size:12px;color:var(--kirby-semi-dark);text-transform:uppercase;margin-top:12px;margin-bottom:4px}[_nghost-%COMP%]{--padding-start: 16px;--padding-end: 16px}kirby-card[_ngcontent-%COMP%]{justify-content:start}"]}),s})()},{path:"slides-advanced",component:ie},{path:"accordion",component:A.k},{path:"radio",component:Yt.F},{path:"range",component:zt.V},{path:"link",component:ht.e},{path:"styling-HTML-lists",component:re.Q},{path:"data-table",component:ke.W},{path:"menu",component:I.j},{path:"header",component:Ee.h},{path:"menu",component:I.j}];let He=(()=>{var e;class s{}return(e=s).\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.$C({type:e}),e.\u0275inj=t.G2t({imports:[u.iI.forChild(Ae),D.m,u.iI]}),s})()}}]);