"use strict";(self.webpackChunkcookbook=self.webpackChunkcookbook||[]).push([[6499],{76499:(y,l,e)=>{e.r(l),e.d(l,{createSwipeBackGesture:()=>k});var g=e(1656),u=e(62782),M=e(2104);const k=(n,m,v,P,X)=>{const i=n.ownerDocument.defaultView;let o=(0,u.i)(n);const d=t=>o?-t.deltaX:t.deltaX;return(0,M.createGesture)({el:n,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:t=>(o=(0,u.i)(n),(t=>{const{startX:s}=t;return o?s>=i.innerWidth-50:s<=50})(t)&&m()),onStart:v,onMove:t=>{const s=d(t)/i.innerWidth;P(s)},onEnd:t=>{const c=d(t),s=i.innerWidth,r=c/s,a=(t=>o?-t.velocityX:t.velocityX)(t),h=a>=0&&(a>.2||c>s/2),E=(h?1-r:r)*s;let D=0;if(E>5){const w=E/Math.abs(a);D=Math.min(w,540)}X(h,r<=0?.01:(0,g.k)(0,r,.9999),D)}})}}}]);