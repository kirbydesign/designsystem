"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[8105],{28105:(Vt,m,t)=>{t.r(m),t.d(m,{ExamplesRoutingModule:()=>Ut});var l=t(28610),x=t(58877),i=t(14289),v=t(93300),g=t(21689),r=t(5807),f=t(2469),y=t(46045),A=t(49618),E=t(87220),T=t(19906),Z=t(10680),M=t(39426),W=t(20814),C=t(99910),F=t(87877),H=t(31861),o=t(94650);let U=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=o.Xpm({type:n,selectors:[["cookbook-fonts-example"]],decls:10,vars:0,consts:[[1,"kirby-text-large"],[1,"kirby-text-xsmall"],[1,"kirby-text-xxsmall"]],template:function(e,jt){1&e&&(o.TgZ(0,"h1"),o._uU(1,"Heading 1"),o.qZA(),o.TgZ(2,"h2"),o._uU(3,"Heading 2"),o.qZA(),o.TgZ(4,"p",0),o._uU(5,"Kirby-text-large"),o.qZA(),o.TgZ(6,"p",1),o._uU(7,"xsmall text"),o.qZA(),o.TgZ(8,"p",2),o._uU(9,"xxsmall text"),o.qZA())},encapsulation:2}),n})();var V=t(76929),j=t(4459),B=t(6472),D=t(80081),K=t(4832),R=t(19706),P=t(2887),Q=t(63729),S=t(46662),X=t(88020),z=t(75139),I=t(96392),N=t(83173),J=t(36755),L=t(75168),Y=t(63910),$=t(11446),u=t(68251),G=t(5871),O=t(44257),b=t(55309),k=t(52538),w=t(29547),q=t(63397),_=t(92069),tt=t(76409),ot=t(18900),c=t(66201),d=t(62660),h=t(31238),nt=t(26500),at=t(97220),et=t(59423),pt=t(27943),mt=t(48709),lt=t(83939),ct=t(45439),dt=t(78490),ht=t(50101),st=t(59570),xt=t(28056),it=t(12867),vt=t(98151),gt=t(48001),rt=t(88374),ft=t(26534),yt=t(48593),At=t(22876),a=t(16334),Et=t(24680),Tt=t(55244),Zt=t(89270),Mt=t(68851),s=t(78050),Wt=t(64755),Ct=t(89907),Ft=t(95531);const Ht=[{path:"",component:C.k,children:[{path:"page",children:[{path:"",redirectTo:"simple",pathMatch:"full"},{path:"simple",component:dt.D},{path:"alignment-toolbar-title",component:et.j},{path:"fit-heading",component:pt.t},{path:"fixed",component:ct.X},{path:"fixed-footer",component:mt.u,children:[{path:"",redirectTo:"dashboard",pathMatch:"full"},{path:"dashboard",component:lt.q,data:{title:"Dashboard"}},{path:"account",children:[{path:"",component:a.W,data:{title:"Account"}},{path:"sub",component:a.W,data:{title:"Account Sub"}}]},{path:"inbox",component:a.W,data:{title:"Inbox"}}]},{path:"custom-title",component:at.q},{path:"advanced",component:nt._},{path:"pull-to-refresh",component:Wt.i}]},{path:"tabs",component:Et.c,children:[{path:"",redirectTo:"dashboard",pathMatch:"full"},{path:"dashboard",component:a.W,data:{title:"Dashboard"}},{path:"account",children:[{path:"",component:a.W,data:{title:"Account"}},{path:"sub",component:a.W,data:{title:"Account Sub"}}]},{path:"inbox",component:a.W,data:{title:"Inbox"}}]},{path:"reorder-list",component:it.r},{path:"modal",component:c.Q,children:[{path:"page1",outlet:"modal",component:d.V},{path:"page2",outlet:"modal",component:h.F}]},{path:"modal-route-with-url-param/:id",component:c.Q,children:[{path:"page1",outlet:"modal",component:d.V},{path:"page2",outlet:"modal",component:h.F}]},{path:"form-field",children:[{path:"",component:B.p},{path:"date",component:V.c},{path:"decimal-mask",component:j.h}]},{path:"experimental",loadChildren:()=>Promise.resolve().then(t.bind(t,1022)).then(n=>n.ExperimentalExamplesModule)}]},{path:"item",component:S.b},{path:"item-sliding",component:z.b},{path:"item-group",component:X.A},{path:"section-header",component:vt.s},{path:"button",component:y.k},{path:"slide-button",component:rt.t},{path:"card",component:T.x},{path:"list",component:k.y,children:[{path:"",redirectTo:"with-items-no"},{path:"with-dividers",component:J.A},{path:"with-selectable-items",component:O.f},{path:"with-colored-items",component:N.$},{path:"with-sections-and-colored-items",component:u.B},{path:"with-header-and-footer",component:L.d},{path:"with-sections",component:$.N},{path:"with-items-no-dividers",component:Y.u},{path:"with-stand-alone",component:b.k},{path:"with-sections-and-stand-alone",component:G._}]},{path:"list-swipe",component:tt.x},{path:"list-no-shape",component:_.H},{path:"list-load-on-demand",component:q.v},{path:"list-experimental",component:w.t},{path:"chart",component:Z.e},{path:"grid",component:D.E},{path:"grid-layout-single-container",component:P.n},{path:"grid-layout-multiple-containers",component:R.M},{path:"grid-layout-extended",component:K.W},{path:"virtual-scroll-list",component:s.P},{path:"avatar",component:r.W},{path:"fonts",component:U},{path:"spinner",component:yt.V},{path:"loading-overlay",component:ot.h},{path:"action-sheet",component:v.o},{path:"alert",component:g.k},{path:"segmented-control",component:gt.d},{path:"badge",component:f.j},{path:"flag",component:H.Q},{path:"icon",component:Q.x},{path:"checkbox",component:M.K},{path:"toast",component:Tt.N},{path:"toggle",component:Mt.H},{path:"calendar",component:E.H},{path:"calendar-card",component:A.K},{path:"empty-state",component:W.s},{path:"fab-sheet",component:F.u},{path:"dropdown",component:Ct.X},{path:"progress-circle",component:ht.Z},{path:"toggle-button",component:Zt.K},{path:"slides",component:ft.A},{path:"accordion",component:i.D},{path:"radio",component:st.V},{path:"range",component:xt.c},{path:"link",component:I.V},{path:"styling-HTML-lists",component:At.v},{path:"data-table",component:Ft.j}];let Ut=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.oAB({type:n}),n.\u0275inj=o.cJS({imports:[l.Bz.forChild(Ht),x.Y,l.Bz]}),n})()}}]);