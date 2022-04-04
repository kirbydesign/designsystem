!function(){"use strict";function n(n,t){return function(n){if(Array.isArray(n))return n}(n)||function(n,t){var e=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null==e)return;var o,i,r=[],u=!0,a=!1;try{for(e=e.call(n);!(u=(o=e.next()).done)&&(r.push(o.value),!t||r.length!==t);u=!0);}catch(c){a=!0,i=c}finally{try{u||null==e.return||e.return()}finally{if(a)throw i}}return r}(n,t)||e(n,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(n){return function(n){if(Array.isArray(n))return o(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||e(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(n,t){if(n){if("string"==typeof n)return o(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);return"Object"===e&&n.constructor&&(e=n.constructor.name),"Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(n,t):void 0}}function o(n,t){(null==t||t>n.length)&&(t=n.length);for(var e=0,o=new Array(t);e<t;e++)o[e]=n[e];return o}function i(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function r(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function u(n,t,e){return t&&r(n.prototype,t),e&&r(n,e),n}(self.webpackChunkdesignsystem=self.webpackChunkdesignsystem||[]).push([[5204],{35204:function(e,o,r){r.r(o),r.d(o,{ComponentStatusModule:function(){return Nn}});var a,c=r(2694),s=r(38583),l=r(92859),m=r(80529),g=r(91841),p=r(26215),d=r(59193),f=r(25917),h=r(35758),b=r(88002),y=r(28049),C=r(7703),v=r(94612),O=r(27716),_=r(5304),x=r(65552),P=((a=P||(P={})).underConsideration="Under consideration",a.notCurrentlyPlanned="Not currently planned",a.planned="Planned",a.inProgress="In progress",a.ready="Ready",P),T=function(){return(n=T||(T={})).underConsideration="Under consideration",n.notCurrentlyPlanned="Not currently planned",n.planned="Planned",n.inProgress="In development",n.ready="Ready",T;var n}(),Z=function(){return(n=Z||(Z={}))[n.Ready=0]="Ready",n[n["In development"]=1]="In development",n[n.Planned=2]="Planned",n[n["Under consideration"]=3]="Under consideration",n[n["Not currently planned"]=4]="Not currently planned",Z;var n}(),k=r(33018),M=r(10255),I=r(26687),A=r(27334);function U(n,t){if(1&n&&(k.TgZ(0,"p"),k._uU(1," Current milestone: "),k.TgZ(2,"a",1),k._uU(3),k.qZA(),k.qZA()),2&n){var e=t.ngIf;k.xp6(2),k.Q6J("href",e.html_url,k.LSH),k.xp6(1),k.Oqu(e.title)}}function N(n,t){1&n&&(k.TgZ(0,"div",19),k._UZ(1,"ion-icon",20),k._uU(2," Couldn't fetch component status from GitHub. The status shown below might not be up-to-date.\n"),k.qZA())}function q(n,t){1&n&&k.GkF(0)}function w(n,t){1&n&&k.GkF(0)}var S=function(n){return{$implicit:n,cssClass:"subcomponent"}};function J(n,t){if(1&n&&(k.ynx(0),k.YNc(1,w,1,0,"ng-container",23),k.BQk()),2&n){var e=t.$implicit;k.oxw(3);var o=k.MAs(49);k.xp6(1),k.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",k.VKq(2,S,e))}}var Q=function(n){return{$implicit:n,cssClass:"component"}};function Y(n,t){if(1&n&&(k.ynx(0),k.TgZ(1,"tbody"),k.YNc(2,q,1,0,"ng-container",23),k.YNc(3,J,2,4,"ng-container",22),k.qZA(),k.BQk()),2&n){var e=t.$implicit;k.oxw(2);var o=k.MAs(49);k.xp6(2),k.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",k.VKq(3,Q,e)),k.xp6(1),k.Q6J("ngForOf",e.children)}}function G(n,t){if(1&n&&(k.TgZ(0,"table",21),k.TgZ(1,"thead"),k.TgZ(2,"tr"),k.TgZ(3,"th"),k._uU(4,"Component"),k.qZA(),k.TgZ(5,"th"),k._uU(6,"UX"),k.qZA(),k.TgZ(7,"th"),k._uU(8,"Code"),k.qZA(),k.qZA(),k.qZA(),k.YNc(9,Y,4,5,"ng-container",22),k.ALo(10,"async"),k.qZA()),2&n){var e=k.oxw();k.xp6(9),k.Q6J("ngForOf",k.lcZ(10,1,e.items$))}}function E(n,t){if(1&n){var e=k.EpF();k.TgZ(0,"ion-icon",26),k.NdJ("click",function(){return k.CHM(e),k.oxw(),k.MAs(1).classList.toggle("expanded")}),k.qZA()}if(2&n){k.oxw();var o=k.MAs(1);k.Q6J("name",o.classList.contains("expanded")?"folder-open":"folder")}}function $(n,t){1&n&&k.GkF(0)}function F(n,t){1&n&&k.GkF(0)}function L(n,t){1&n&&k.GkF(0)}function j(n,t){1&n&&k.GkF(0)}var z=function(n){return{$implicit:n}},B=function(n,t){return{$implicit:n,cssClass:t}};function W(n,t){if(1&n&&(k.TgZ(0,"tr",null,24),k.TgZ(2,"td"),k.YNc(3,E,1,1,"ion-icon",25),k.YNc(4,$,1,0,"ng-container",23),k.qZA(),k.TgZ(5,"td"),k.YNc(6,F,1,0,"ng-container",23),k.qZA(),k.TgZ(7,"td"),k.YNc(8,L,1,0,"ng-container",23),k.qZA(),k.qZA(),k.YNc(9,j,1,0,"ng-container",23)),2&n){var e=t.$implicit,o=t.cssClass,i=k.oxw(),r=k.MAs(53),u=k.MAs(57),a=k.MAs(55),c=k.MAs(51);k.Tol(o),k.ekj("someday-maybe",i.isUnderConsiderationOrNotPlanned(e))("has-enhancements",e.code.enhancements),k.xp6(2),k.Tol(o),k.xp6(1),k.Q6J("ngIf",(null==e.children?null:e.children.length)>0),k.xp6(1),k.Q6J("ngTemplateOutlet",r)("ngTemplateOutletContext",k.VKq(17,z,e)),k.xp6(2),k.Q6J("ngTemplateOutlet",u)("ngTemplateOutletContext",k.VKq(19,z,e.ux)),k.xp6(2),k.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",k.VKq(21,z,e.code)),k.xp6(1),k.Q6J("ngTemplateOutlet",c)("ngTemplateOutletContext",k.WLB(23,B,e,o))}}function K(n,t){1&n&&k.GkF(0)}function V(n,t){1&n&&k.GkF(0)}function H(n,t){if(1&n&&(k.TgZ(0,"tr"),k.TgZ(1,"td"),k.TgZ(2,"kirby-badge",28),k._uU(3,"vNext"),k.qZA(),k._uU(4),k.qZA(),k.TgZ(5,"td"),k.YNc(6,K,1,0,"ng-container",23),k.qZA(),k.TgZ(7,"td"),k.YNc(8,V,1,0,"ng-container",23),k.qZA(),k.qZA()),2&n){var e=t.$implicit,o=k.oxw().cssClass,i=k.oxw(),r=k.MAs(57),u=k.MAs(55);k.Gre("enhancement enhancement-",o,""),k.ekj("someday-maybe",i.isUnderConsiderationOrNotPlanned(e)),k.xp6(4),k.hij(" ",e.title," "),k.xp6(2),k.Q6J("ngTemplateOutlet",r)("ngTemplateOutletContext",k.VKq(10,z,e.ux)),k.xp6(2),k.Q6J("ngTemplateOutlet",u)("ngTemplateOutletContext",k.VKq(12,z,e.code))}}function R(n,t){1&n&&k.YNc(0,H,9,14,"tr",27),2&n&&k.Q6J("ngForOf",t.$implicit.code.enhancements)}function X(n,t){1&n&&k.GkF(0)}function D(n,t){if(1&n&&(k.TgZ(0,"a",30),k._uU(1),k.YNc(2,X,1,0,"ng-container",23),k.qZA()),2&n){var e=k.oxw().$implicit;k.oxw();var o=k.MAs(59);k.MGl("routerLink","../../",null==e.code?null:e.code.cookbookUrl,""),k.xp6(1),k.hij(" ",e.title," "),k.xp6(1),k.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",k.VKq(4,z,null==e.code?null:e.code.version))}}function nn(n,t){if(1&n&&(k.ynx(0),k._UZ(1,"span",31),k.BQk()),2&n){var e=k.oxw().$implicit;k.xp6(1),k.Q6J("innerHTML",e.title,k.oJD)}}function tn(n,t){if(1&n&&(k.YNc(0,D,3,6,"a",29),k.YNc(1,nn,2,1,"ng-container",2)),2&n){var e=t.$implicit;k.Q6J("ngIf",null==e.code?null:e.code.cookbookUrl),k.xp6(1),k.Q6J("ngIf",!(null!=e.code&&e.code.cookbookUrl))}}function en(n,t){1&n&&k.GkF(0)}function on(n,t){1&n&&k._UZ(0,"ion-icon",34)}function rn(n,t){if(1&n&&(k.TgZ(0,"a",1),k._uU(1),k.YNc(2,on,1,0,"ion-icon",33),k.qZA()),2&n){var e=k.oxw().$implicit,o=k.oxw();k.Q6J("href",o.getGithubIssueUrl(e.githubIssueNo),k.LSH),k.xp6(1),k.hij(" ",null==e?null:e.status," "),k.xp6(1),k.Q6J("ngIf",null==e?null:e.githubIssueNo)}}function un(n,t){if(1&n&&(k.TgZ(0,"span"),k._uU(1),k.qZA()),2&n){var e=k.oxw().$implicit;k.xp6(1),k.hij(" ",null==e?null:e.status," ")}}function an(n,t){1&n&&k.GkF(0)}function cn(n,t){if(1&n&&(k.YNc(0,en,1,0,"ng-container",23),k.YNc(1,rn,3,3,"a",32),k.YNc(2,un,2,1,"span",2),k.YNc(3,an,1,0,"ng-container",23)),2&n){var e=t.$implicit;k.oxw();var o=k.MAs(63),i=k.MAs(59);k.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",k.VKq(6,z,null==e?null:e.status)),k.xp6(1),k.Q6J("ngIf",null==e?null:e.githubIssueNo),k.xp6(1),k.Q6J("ngIf",!(null!=e&&e.githubIssueNo)),k.xp6(1),k.Q6J("ngTemplateOutlet",i)("ngTemplateOutletContext",k.VKq(8,z,null==e?null:e.version))}}function sn(n,t){1&n&&k.GkF(0)}function ln(n,t){1&n&&k._UZ(0,"ion-icon",34)}function mn(n,t){if(1&n&&(k.TgZ(0,"a",1),k._uU(1),k.YNc(2,ln,1,0,"ion-icon",33),k.qZA()),2&n){var e=k.oxw().$implicit;k.Q6J("href",null==e?null:e.wireFrameUrl,k.LSH),k.xp6(1),k.hij(" ",null==e?null:e.status," "),k.xp6(1),k.Q6J("ngIf",null==e?null:e.wireFrameUrl)}}function gn(n,t){if(1&n&&(k.ynx(0),k._uU(1),k.BQk()),2&n){var e=k.oxw().$implicit;k.xp6(1),k.hij(" ",null==e?null:e.status," ")}}function pn(n,t){1&n&&k.GkF(0)}function dn(n,t){if(1&n&&(k.YNc(0,sn,1,0,"ng-container",23),k.YNc(1,mn,3,3,"a",32),k.YNc(2,gn,2,1,"ng-container",2),k.YNc(3,pn,1,0,"ng-container",23)),2&n){var e=t.$implicit;k.oxw();var o=k.MAs(61),i=k.MAs(59);k.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",k.VKq(6,z,null==e?null:e.status)),k.xp6(1),k.Q6J("ngIf",null==e?null:e.wireFrameUrl),k.xp6(1),k.Q6J("ngIf",!(null!=e&&e.wireFrameUrl)),k.xp6(1),k.Q6J("ngTemplateOutlet",i)("ngTemplateOutletContext",k.VKq(8,z,null==e?null:e.version))}}function fn(n,t){if(1&n&&(k.ynx(0),k.TgZ(1,"kirby-badge",35),k._uU(2),k.ALo(3,"number"),k.qZA(),k.BQk()),2&n){var e=k.oxw().$implicit;k.xp6(2),k.Oqu(k.xi3(3,1,e,"1.1-2"))}}function hn(n,t){1&n&&k.YNc(0,fn,4,4,"ng-container",2),2&n&&k.Q6J("ngIf",t.$implicit)}function bn(n,t){1&n&&k._UZ(0,"ion-icon",41)}function yn(n,t){1&n&&k._UZ(0,"ion-icon",42)}function Cn(n,t){1&n&&k._UZ(0,"ion-icon",43)}function vn(n,t){1&n&&k._UZ(0,"ion-icon",44)}function On(n,t){1&n&&k._UZ(0,"ion-icon",45)}function _n(n,t){if(1&n&&(k.YNc(0,bn,1,0,"ion-icon",36),k.YNc(1,yn,1,0,"ion-icon",37),k.YNc(2,Cn,1,0,"ion-icon",38),k.YNc(3,vn,1,0,"ion-icon",39),k.YNc(4,On,1,0,"ion-icon",40)),2&n){var e=t.$implicit,o=k.oxw();k.Q6J("ngIf",e===o.uxStatusEnum.underConsideration),k.xp6(1),k.Q6J("ngIf",e===o.uxStatusEnum.planned),k.xp6(1),k.Q6J("ngIf",e===o.uxStatusEnum.inProgress),k.xp6(1),k.Q6J("ngIf",e===o.uxStatusEnum.ready),k.xp6(1),k.Q6J("ngIf",e===o.uxStatusEnum.notCurrentlyPlanned)}}function xn(n,t){1&n&&k._UZ(0,"ion-icon",41)}function Pn(n,t){1&n&&k._UZ(0,"ion-icon",42)}function Tn(n,t){1&n&&k._UZ(0,"ion-icon",43)}function Zn(n,t){1&n&&k._UZ(0,"ion-icon",44)}function kn(n,t){1&n&&k._UZ(0,"ion-icon",45)}function Mn(n,t){if(1&n&&(k.YNc(0,xn,1,0,"ion-icon",36),k.YNc(1,Pn,1,0,"ion-icon",37),k.YNc(2,Tn,1,0,"ion-icon",38),k.YNc(3,Zn,1,0,"ion-icon",39),k.YNc(4,kn,1,0,"ion-icon",40)),2&n){var e=t.$implicit,o=k.oxw();k.Q6J("ngIf",e===o.codeStatusEnum.underConsideration),k.xp6(1),k.Q6J("ngIf",e===o.codeStatusEnum.planned),k.xp6(1),k.Q6J("ngIf",e===o.codeStatusEnum.inProgress),k.xp6(1),k.Q6J("ngIf",e===o.codeStatusEnum.ready),k.xp6(1),k.Q6J("ngIf",e===o.codeStatusEnum.notCurrentlyPlanned)}}function In(n,t){1&n&&k._UZ(0,"kirby-spinner")}var An=function(n,t){return[n,t]},Un=function(){var e=function(){function e(n,t){i(this,e),this.http=n,this.db=t,this.isLoading=!0,this.gitHubError=!1,this.sortedItems=[],this.searchTerm$=new p.X(""),this.uxStatusEnum=P,this.codeStatusEnum=T,this.excludedStatuses=[],this.newIssueUrl=x.N.githubBaseUrl+"/issues/new/choose",this.milestone$=this.loadCurrentMilestone()}return u(e,[{key:"ngOnInit",value:function(){var n=this;this.items$=this.searchTerm$.pipe((0,b.U)(function(t){return n.filterItems(n.sortedItems,t,n.excludedStatuses)})),this.connectFirebase()}},{key:"connectFirebase",value:function(){var n=this,t=this.db.collection("componentStatusV2").valueChanges();this.firebaseSubscription=t.subscribe(function(t){n.isLoading=!0,n.items=t[0].items,n.ghostItems=t[0].ghostItems,n.initializeGithubStatus()})}},{key:"ngOnDestroy",value:function(){this.firebaseSubscription.unsubscribe()}},{key:"toggleExcluded",value:function(n){this.excludedStatuses=n.detail.checked?n.detail.value:[],this.searchTerm$.next(this.searchTerm$.value)}},{key:"loadCurrentMilestone",value:function(){var n={headers:new g.WM({Authorization:"token "+x.N.oauth.githubToken1+x.N.oauth.githubToken2})};return this.http.get(x.N.githubApi+"/repos/kirbydesign/designsystem/milestones?sort=due_on",n).pipe((0,b.U)(function(n){return n[0]}))}},{key:"initializeGithubStatus",value:function(){var n=this;Promise.all([this.loadGithubComponentRequests(),this.loadGithubComponentEnhancementRequests()]).then(function(t){n.setCurrentGithubStatus().then(function(t){n.sortedItems=n.sortItems(n.items),n.isLoading=!1})})}},{key:"loadGithubComponentRequests",value:function(){var n=this;return new Promise(function(t){n.getStatusItemsFromGithubIssues().pipe((0,y.P)()).subscribe(function(e){n.items=n.items.concat(e),t()})})}},{key:"loadGithubComponentEnhancementRequests",value:function(){var n=this;return new Promise(function(t){n.getEnhancementItemsFromGithubIssues().pipe((0,y.P)()).subscribe(function(e){var o=n.flattenItems(n.items);e.forEach(function(n){o.filter(function(t){return t.code&&t.title===n.parentTitle}).forEach(function(t){t.code.enhancements?t.code.enhancements.push(n):t.code.enhancements=[n]})}),t()})})}},{key:"getStatusItemsFromGithubIssues",value:function(){var n=this,t=this.flattenItems(this.items);return this.getGithubIssues("component").pipe((0,b.U)(function(e){return e.filter(function(n){return!function(n){return!!t.find(function(t){return t.code.githubIssueNo===n.number})}(n)}).filter(function(t){return n.hasComponentTitleLabel(t)}).map(function(t){return n.mapGithubIssueToStatusItem(t)})}))}},{key:"getEnhancementItemsFromGithubIssues",value:function(){var n=this;return this.getGithubIssues("enhancement").pipe((0,b.U)(function(t){return t.filter(function(t){return n.hasComponentTitleLabel(t)}).map(function(t){return n.mapGithubIssueToStatusItem(t)})}))}},{key:"mapGithubIssueToStatusItem",value:function(n){var t=this.getZeplinUrl(n),e=this.getSketchUrl(n),o=t?P.ready:P.underConsideration,i=this.getComponentTitle(n),r=n.title.replace("[Enhancement] ",""),u=n.labels.find(function(n){return n.name.indexOf("enhancement")>-1});return{title:u?r:i,parentTitle:u?i:null,priority:0,ux:{status:o,wireFrameUrl:t||e},code:{status:T.underConsideration,githubIssueNo:n.number}}}},{key:"getComponentTitle",value:function(n){return this.getComponentTitleLabel(n).name.split("component:")[1]}},{key:"hasComponentTitleLabel",value:function(n){return!!this.getComponentTitleLabel(n)}},{key:"getComponentTitleLabel",value:function(n){return n.labels.find(function(n){return n.name.indexOf("component:")>-1})}},{key:"getZeplinUrl",value:function(n){var t=n.body.match(/(https:\/\/(app\.zeplin|zpl)\.io\/)((project\/[a-z,0-9]{24}\/screen\/[a-z,0-9]{24})|(\b(?!project)[a-z,0-9]{7}\b)|(styleguide\/[a-z,0-9]{24}\/components\?(seid|cseid)\=[a-z,0-9]{24}))/i);return t?t[0]:null}},{key:"getSketchUrl",value:function(n){var t=n.body.match(/https:\/\/sketch\.cloud\/s\/[a-z,0-9]{5}\/[a-z,0-9]{7}(\/play)?/i);return t?t[0]:null}},{key:"isUnderConsiderationOrNotPlanned",value:function(n){return!(n.ux.status!==P.underConsideration&&n.ux.status!==P.notCurrentlyPlanned||n.code.status!==T.underConsideration&&n.code.status!==T.notCurrentlyPlanned)}},{key:"getGithubIssueUrl",value:function(n){return x.N.githubBaseUrl+"/issues/"+n}},{key:"sortItems",value:function(n){var t=this;return n.sort(function(n,e){var o=t.sortByStatus(n,e);return 0===o&&((n.code.status!=T.ready||e.code.status!=T.ready)&&(o=t.sortByPriority(n,e)),0===o&&(o=t.sortByComponentName(n,e))),o})}},{key:"sortByStatus",value:function(n,t){return Z[n.code.status]-Z[t.code.status]}},{key:"sortByPriority",value:function(n,t){return 0===n.priority?t.priority:0===t.priority?-n.priority:n.priority-t.priority}},{key:"sortByComponentName",value:function(n,t){return n.title.localeCompare(t.title)}},{key:"filterItems",value:function(n,t,e){var o=this,i=new RegExp(t,"i");return n.filter(function(n){return o.isIncluded(n,e)&&o.matchItem(n,i)}).concat(this.getGhostItems(t))}},{key:"isIncluded",value:function(n,t){return!this.isExcluded(n,t)||this.hasIncludedEnhancement(n,t)}},{key:"isExcluded",value:function(n,t){return t.includes(n.code.status)}},{key:"hasIncludedEnhancement",value:function(n,t){var e=this;return n.code.enhancements&&n.code.enhancements.find(function(n){return!e.isExcluded(n,t)})}},{key:"matchItem",value:function(n,t){return t.test(n.title)||this.matchAliases(n.aliases,t)||this.matchChildComponents(n.children,t)}},{key:"matchAliases",value:function(n,t){return!!Array.isArray(n)&&n.some(function(n){return t.test(n)})}},{key:"matchChildComponents",value:function(n,t){var e=this;return!!Array.isArray(n)&&n.filter(function(n){return e.matchItem(n,t)}).length>0}},{key:"getGhostItems",value:function(n){var t=this.ghostItems.find(function(t){return t.name.toLowerCase()===n.toLowerCase()});return t?[{title:t.tagline,priority:0,ux:{version:999,status:P.ready,wireFrameUrl:t.url||null},code:{version:999,status:T.ready}}]:[]}},{key:"getGithubIssues",value:function(n){var t=this;return this.getPageOfIssues(x.N.githubApi+"/repos/kirbydesign/designsystem/issues?labels=".concat(n,"&per_page=100")).pipe((0,C.jn)(function(n){var e=n.nextPageUrl;return e?t.getPageOfIssues(e):d.E}),(0,v.b)(function(n){return n.issues}),(0,O.q)())}},{key:"setCurrentGithubStatus",value:function(){var n=this;return new Promise(function(t){n.getGithubProjectStatus().pipe((0,y.P)()).subscribe(function(e){var o=n.flattenItems(n.items);e.forEach(function(n){o.filter(function(t){return t.code.githubIssueNo===n.number}).forEach(function(t){return t.code.status=n.status})}),t()})})}},{key:"flattenItems",value:function(n){var e=this;return n.map(function(n){return[n].concat(t(n.children?e.flattenItems(n.children):[]),t(n.code&&n.code.enhancements?n.code.enhancements:[]))}).reduce(function(n,t){return n.concat(t)},[])}},{key:"getGithubProjectCards",value:function(n,t){var e=this,o={headers:new g.WM({Authorization:"token "+x.N.oauth.githubToken1+x.N.oauth.githubToken2,Accept:"application/vnd.github.inertia-preview+json"})};return this.http.get(x.N.githubApi+"/projects/columns/"+n+"/cards",o).pipe((0,_.K)(function(n){return e.gitHubError=!0,e.isLoading=!1,(0,f.of)([])}),(0,b.U)(function(n){return e.mapGithubCardsToIssues(t,n)}))}},{key:"mapGithubCardsToIssues",value:function(n,t){return t.map(function(t){var e=0,o=t.content_url.match(/issues\/(\d+)$/);return 2===o.length&&(e=+o[1]),{number:e,status:n}})}},{key:"getGithubProjectStatus",value:function(){return(0,h.D)(this.getGithubProjectCards(4590936,T.planned),this.getGithubProjectCards(4590937,T.inProgress),this.getGithubProjectCards(5890332,T.inProgress),this.getGithubProjectCards(4590938,T.ready)).pipe((0,b.U)(function(e){var o=n(e,3),i=o[0],r=o[1],u=o[2];return[].concat(t(i),t(r),t(u))}))}},{key:"getPageOfIssues",value:function(n){var t=this,e={headers:new g.WM({Authorization:"token "+x.N.oauth.githubToken1+x.N.oauth.githubToken2}),observe:"response"};return this.http.get(n,e).pipe((0,b.U)(function(n){return{issues:n.body,nextPageUrl:t.getNextPageUrl(n)}}))}},{key:"getNextPageUrl",value:function(t){var e,o=t.headers.get("Link");if(o){var i=o.match(/<([^>]+)>;\s*rel="next"/);i&&(e=n(i,2)[1])}return e}}]),e}();return e.\u0275fac=function(n){return new(n||e)(k.Y36(g.eN),k.Y36(M.ST))},e.\u0275cmp=k.Xpm({type:e,selectors:[["cookbook-component-status"]],decls:66,vars:11,consts:[[1,"hero"],[3,"href"],[4,"ngIf"],["href","https://github.com/kirbydesign/designsystem/projects/1"],[1,"search"],["autofocus","","type","text",3,"keyup"],["class","github-error",4,"ngIf"],[1,"filter"],[3,"value","ionChange"],["class","component-status",4,"ngIf","ngIfElse"],["itemTemplate",""],["enhancementTemplate",""],["componentTemplate",""],["codeTemplate",""],["uxTemplate",""],["versionTemplate",""],["uxStatusTemplate",""],["codeStatusTemplate",""],["loading",""],[1,"github-error"],["name","alert","color","danger"],[1,"component-status"],[4,"ngFor","ngForOf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["componentrow",""],["color","medium",3,"name","click",4,"ngIf"],["color","medium",3,"name","click"],[3,"class","someday-maybe",4,"ngFor","ngForOf"],["themeColor","warning",1,"vnext"],[3,"routerLink",4,"ngIf"],[3,"routerLink"],[3,"innerHTML"],[3,"href",4,"ngIf"],["name","open",4,"ngIf"],["name","open"],[1,"version"],["color","medium","name","heart-empty",4,"ngIf"],["color","success","name","heart-empty",4,"ngIf"],["color","success","name","heart-half",4,"ngIf"],["name","heart","color","success",4,"ngIf"],["color","medium","name","heart-dislike",4,"ngIf"],["color","medium","name","heart-empty"],["color","success","name","heart-empty"],["color","success","name","heart-half"],["name","heart","color","success"],["color","medium","name","heart-dislike"]],template:function(n,t){if(1&n&&(k.TgZ(0,"div",0),k.TgZ(1,"h1"),k._uU(2,"Component Status"),k.qZA(),k.qZA(),k.TgZ(3,"p"),k._uU(4," The latest component updates and changes. If you have a suggestion for a new component not listed here, an enhancement to an existing component or you found a bug, "),k.TgZ(5,"a",1),k._uU(6,"create an issue on GitHub"),k.qZA(),k.qZA(),k.YNc(7,U,4,2,"p",2),k.ALo(8,"async"),k.TgZ(9,"p"),k._uU(10," You can follow working progress "),k.TgZ(11,"a",3),k._uU(12,"here - Kirby kan-ban board"),k.qZA(),k.qZA(),k.TgZ(13,"h2"),k._uU(14,"Versioning of components"),k.qZA(),k.TgZ(15,"table"),k.TgZ(16,"tr"),k.TgZ(17,"td"),k._uU(18,"v1.0"),k.qZA(),k.TgZ(19,"td"),k._uU(20,"Production ready"),k.qZA(),k.qZA(),k.TgZ(21,"tr"),k.TgZ(22,"td"),k._uU(23,"v0.9"),k.qZA(),k.TgZ(24,"td"),k._uU(25,"Almost ready"),k.qZA(),k.qZA(),k.TgZ(26,"tr"),k.TgZ(27,"td"),k._uU(28,"v0.5"),k.qZA(),k.TgZ(29,"td"),k._uU(30,"Halfway ready for production"),k.qZA(),k.qZA(),k.TgZ(31,"tr"),k.TgZ(32,"td"),k._uU(33,"v0.1"),k.qZA(),k.TgZ(34,"td"),k._uU(35,"Walking Skeleton"),k.qZA(),k.qZA(),k.qZA(),k._UZ(36,"br"),k._UZ(37,"br"),k.TgZ(38,"div",4),k._uU(39," Search Component(s): "),k.TgZ(40,"input",5),k.NdJ("keyup",function(n){return t.searchTerm$.next(n.target.value)}),k.qZA(),k.qZA(),k.YNc(41,N,3,0,"div",6),k.TgZ(42,"div",7),k.TgZ(43,"ion-item"),k.TgZ(44,"ion-label"),k._uU(45,"Only show components in progress:"),k.qZA(),k.TgZ(46,"ion-toggle",8),k.NdJ("ionChange",function(n){return t.toggleExcluded(n)}),k.qZA(),k.qZA(),k.qZA(),k.YNc(47,G,11,3,"table",9),k.YNc(48,W,10,26,"ng-template",null,10,k.W1O),k.YNc(50,R,1,1,"ng-template",null,11,k.W1O),k.YNc(52,tn,2,2,"ng-template",null,12,k.W1O),k.YNc(54,cn,4,10,"ng-template",null,13,k.W1O),k.YNc(56,dn,4,10,"ng-template",null,14,k.W1O),k.YNc(58,hn,1,1,"ng-template",null,15,k.W1O),k.YNc(60,_n,5,5,"ng-template",null,16,k.W1O),k.YNc(62,Mn,5,5,"ng-template",null,17,k.W1O),k.YNc(64,In,1,0,"ng-template",null,18,k.W1O)),2&n){var e=k.MAs(65);k.xp6(5),k.Q6J("href",t.newIssueUrl,k.LSH),k.xp6(2),k.Q6J("ngIf",k.lcZ(8,6,t.milestone$)),k.xp6(34),k.Q6J("ngIf",t.gitHubError),k.xp6(5),k.Q6J("value",k.WLB(8,An,t.codeStatusEnum.ready,t.codeStatusEnum.notCurrentlyPlanned)),k.xp6(1),k.Q6J("ngIf",!t.isLoading)("ngIfElse",e)}},directives:[s.O5,l.Ie,l.Q$,l.ho,l.w,l.gu,s.sg,s.tP,I.X,c.yS,l.YI,A.O],pipes:[s.Ov,s.JJ],styles:['[_nghost-%COMP%]   a[_ngcontent-%COMP%]{color:#000}.search[_ngcontent-%COMP%]{margin-bottom:1rem}.github-error[_ngcontent-%COMP%]{font-style:italic}.github-error[_ngcontent-%COMP%]   ion-icon[name=alert][_ngcontent-%COMP%]{font-size:24px;vertical-align:text-bottom}.component-status[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;border-spacing:0;margin-left:1rem}.component-status[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]{text-align:left}.component-status[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-weight:400;line-height:1.6;text-transform:uppercase;letter-spacing:.1rem;padding:1rem;font-size:1.3rem}.component-status[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child{padding-left:0}.component-status[_ngcontent-%COMP%]   tr.component[_ngcontent-%COMP%]{vertical-align:middle}.component-status[_ngcontent-%COMP%]   tr.component[_ngcontent-%COMP%]   .component[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{cursor:pointer;display:block;position:absolute;margin-left:-2rem;font-size:24px}.component-status[_ngcontent-%COMP%]   tr.component[_ngcontent-%COMP%] ~ .subcomponent[_ngcontent-%COMP%], .component-status[_ngcontent-%COMP%]   tr.component[_ngcontent-%COMP%] ~ .enhancement-subcomponent[_ngcontent-%COMP%]{display:none}.component-status[_ngcontent-%COMP%]   tr.component.expanded[_ngcontent-%COMP%] ~ .subcomponent[_ngcontent-%COMP%], .component-status[_ngcontent-%COMP%]   tr.component.expanded[_ngcontent-%COMP%] ~ .enhancement-subcomponent[_ngcontent-%COMP%]{display:table-row}.component-status[_ngcontent-%COMP%]   tr.component[_ngcontent-%COMP%]{border-top:.1rem solid var(--kirby-medium)}.component-status[_ngcontent-%COMP%]   tr.subcomponent[_ngcontent-%COMP%], .component-status[_ngcontent-%COMP%]   tr.enhancement[_ngcontent-%COMP%]{vertical-align:middle;border-top:.1rem dashed var(--kirby-medium);color:var(--kirby-dark-tint);font-size:14px}.component-status[_ngcontent-%COMP%]   tr.subcomponent[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child, .component-status[_ngcontent-%COMP%]   tr.enhancement[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-left:1rem}.component-status[_ngcontent-%COMP%]   tr.subcomponent[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .component-status[_ngcontent-%COMP%]   tr.enhancement[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--kirby-dark-tint)}.component-status[_ngcontent-%COMP%]   tr.subcomponent[_ngcontent-%COMP%]   .vnext[_ngcontent-%COMP%], .component-status[_ngcontent-%COMP%]   tr.enhancement[_ngcontent-%COMP%]   .vnext[_ngcontent-%COMP%]{font-style:normal}.component-status[_ngcontent-%COMP%]   tr.enhancement[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding-top:.5rem;padding-bottom:.5rem}.component-status[_ngcontent-%COMP%]   tr.enhancement-subcomponent[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-left:2rem}.component-status[_ngcontent-%COMP%]   tr.enhancement[_ngcontent-%COMP%]   ion-icon[name=add-circle][_ngcontent-%COMP%]{font-size:16px;vertical-align:sub}.component-status[_ngcontent-%COMP%]   tr.someday-maybe[_ngcontent-%COMP%], .component-status[_ngcontent-%COMP%]   tr.someday-maybe[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:var(--kirby-dark-tint);font-style:italic}.component-status[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:1rem}.component-status[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child{padding-left:0}.component-status[_ngcontent-%COMP%]   td.component[_ngcontent-%COMP%]{font-weight:700}.component-status[_ngcontent-%COMP%]   a[href^="https://"][_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{vertical-align:sub;font-size:18px}.component-status[_ngcontent-%COMP%]   a[href^="https://"][_ngcontent-%COMP%]   ion-icon[name=open][_ngcontent-%COMP%]{color:var(--kirby-dark-tint)}.component-status[_ngcontent-%COMP%]   kirby-badge[_ngcontent-%COMP%]{vertical-align:sub}.component-status[_ngcontent-%COMP%]   kirby-badge.version[_ngcontent-%COMP%]{margin-left:.5rem;--ion-color-base: var(--kirby-semi-dark);--ion-color-contrast: var(--kirby-white)}']}),e}(),Nn=function(){var n=u(function n(){i(this,n)});return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=k.oAB({type:n}),n.\u0275inj=k.cJS({imports:[[s.ez,c.Bz.forChild([{path:"",component:Un}]),l.Pc,m.J_]]}),n}()}}])}();