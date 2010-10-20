YUI.add("resize-constrain",function(c){var j=c.Lang,p=j.isBoolean,t=j.isNumber,r=j.isString,z=function(G){return(G instanceof c.Node);},C="borderBottomWidth",g="borderLeftWidth",y="borderRightWidth",k="borderTopWidth",n="bottom",m="con",D="constrain",E="host",s="left",i="maxHeight",v="maxWidth",a="minHeight",l="minWidth",F="node",b="offsetHeight",o="offsetWidth",e="preserveRatio",x="region",u="resizeConstrained",q="right",f="tickX",d="tickY",w="top",B="view",A="viewportRegion";function h(){h.superclass.constructor.apply(this,arguments);}c.mix(h,{NAME:u,NS:m,ATTRS:{constrain:{setter:function(G){if(G&&(z(G)||r(G)||G.nodeType)){G=c.one(G);}return G;}},minHeight:{value:15,validator:t},minWidth:{value:15,validator:t},maxHeight:{value:Infinity,validator:t},maxWidth:{value:Infinity,validator:t},preserveRatio:{value:false,validator:p},tickX:{value:false},tickY:{value:false}}});c.extend(h,c.Plugin.Base,{constrainBorderInfo:null,initializer:function(){var G=this,H=G.get(E);G.constrainBorderInfo={bottom:0,left:0,right:0,top:0};H.delegate.dd.plug(c.Plugin.DDConstrained,{tickX:G.get(f),tickY:G.get(d)});H.after("resize:align",c.bind(G._handleResizeAlignEvent,G));H.on("resize:start",c.bind(G._handleResizeStartEvent,G));},_checkConstrain:function(H,Q,I){var N=this,M,J,K,P,O=N.get(E),G=O.info,L=N._getConstrainRegion();if(L){M=G[H]+G[I];J=L[Q]-N.constrainBorderInfo[Q];if(M>=J){G[I]-=(M-J);}K=G[H];P=L[H]+N.constrainBorderInfo[H];if(K<=P){G[H]+=(P-K);G[I]-=(P-K);}}},_checkHeight:function(){var G=this,I=G.get(E),K=I.info,H=G.get(i),J=G.get(a);G._checkConstrain(w,n,b);if(K.offsetHeight>H){I._checkSize(b,H);}if(K.offsetHeight<J){I._checkSize(b,J);}},_checkRatio:function(){var U=this,N=U.get(E),T=N.info,J=N.originalInfo,M=J.offsetWidth,V=J.offsetHeight,L=J.top,W=J.left,P=J.bottom,S=J.right,I=function(){return(T.offsetWidth/M);},K=function(){return(T.offsetHeight/V);},O=N.changeHeightHandles,G,X,Q,R,H,Y;if(U.get(D)&&N.changeHeightHandles&&N.changeWidthHandles){Q=U._getConstrainRegion();X=U.constrainBorderInfo;G=(Q.bottom-X.bottom)-P;R=W-(Q.left+X.left);H=(Q.right-X.right)-S;Y=L-(Q.top+X.top);if(N.changeLeftHandles&&N.changeTopHandles){O=(Y<R);}else{if(N.changeLeftHandles){O=(G<R);}else{if(N.changeTopHandles){O=(Y<H);}else{O=(G<H);}}}}if(O){T.offsetWidth=M*K();U._checkWidth();T.offsetHeight=V*I();}else{T.offsetHeight=V*I();U._checkHeight();T.offsetWidth=M*K();}if(N.changeTopHandles){T.top=L+(V-T.offsetHeight);}if(N.changeLeftHandles){T.left=W+(M-T.offsetWidth);}c.each(T,function(aa,Z){if(t(aa)){T[Z]=Math.round(aa);}});},_checkRegion:function(){var G=this,H=G.get(E),I=G._getConstrainRegion();return c.DOM.inRegion(null,I,true,H.info);},_checkWidth:function(){var G=this,J=G.get(E),K=J.info,I=G.get(v),H=G.get(l);G._checkConstrain(s,q,o);if(K.offsetWidth<H){J._checkSize(o,H);}if(K.offsetWidth>I){J._checkSize(o,I);}},_getConstrainRegion:function(){var G=this,I=G.get(E),H=I.get(F),K=G.get(D),J=null;if(K){if(K==B){J=H.get(A);}else{if(z(K)){J=K.get(x);}else{J=K;}}}return J;},_handleResizeAlignEvent:function(I){var G=this,H=G.get(E);G._checkHeight();G._checkWidth();if(G.get(e)){G._checkRatio();}if(G.get(D)&&!G._checkRegion()){H.info=H.lastInfo;}},_handleResizeStartEvent:function(H){var G=this;G._updateConstrainBorderInfo();},_updateConstrainBorderInfo:function(){var H=this,I=H.get(D),G;if(z(I)){G=function(J){return parseFloat(I.getStyle(J))||0;};H.constrainBorderInfo.bottom=G(C);H.constrainBorderInfo.left=G(g);H.constrainBorderInfo.right=G(y);H.constrainBorderInfo.top=G(k);}}});c.namespace("Plugin");c.Plugin.ResizeConstrained=h;},"@VERSION@",{requires:["resize-base","plugin"],skinnable:false});