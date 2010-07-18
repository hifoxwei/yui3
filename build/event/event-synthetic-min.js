YUI.add("event-synthetic",function(B){var G=B.Env.evt.dom_map,D=B.Array,F=B.Lang,I=F.isObject,C=F.isString,H=function(){};function E(L,J,K){this.handle=L;this.emitFacade=J;this.delegate=K;}E.prototype.fire=function(O){var J=D(arguments,0,true),M=this.handle,N=M.evt,K=M.sub,P=K.context,L=O||{};if(this.emitFacade){if(!O||!O.preventDefault){L=N._getFacade();if(I(O)&&!O.preventDefault){B.mix(L,O,true);J[0]=L;}else{J.unshift(L);}}L.type=N.type;L.details=J.slice();if(this.delegate){L.container=N.host;}}else{if(this.delegate){J.shift();}}K.context=P||L.currentTarget||N.host;N.fire.apply(N,J);K.context=P;};function A(){this._init.apply(this,arguments);}B.mix(A,{Notifier:E,getRegistry:function(P,O,M){var N=P._node,L=B.stamp(N),K="event:"+L+O,J=G[L]||(G[L]={});if(!J[K]&&M){J[K]={type:"_synth_",fn:H,capture:false,el:N,key:K,domkey:L,notifiers:[],detachAll:function(){var Q=this.notifiers,R=Q.length;while(--R>=0){Q[R].detach();}}};}return(J[K])?J[K].notifiers:null;},_deleteSub:function(K){if(K&&K.fn){var J=this.eventDef,L=(K.filter)?"detachDelegate":"detach";this.subscribers={};this.subCount=0;J[L](K.node,K,this.notifier,K.filter);J._unregisterSub(K);delete K.fn;delete K.node;delete K.context;}},prototype:{constructor:A,_init:function(){var J=this.publishConfig||(this.publishConfig={});this.emitFacade=("emitFacade" in J)?J.emitFacade:true;J.emitFacade=false;},processArgs:H,on:H,detach:H,delegate:H,detachDelegate:H,_on:function(L,N){var M=[],J=L[2],K=B.all(J),P=N?"delegate":"on",O;if(!K.size()&&C(J)){O=B.on("available",function(){B.mix(O,B[P].apply(B,L),true);},J);return O;}K.each(function(S){var T=L.slice(),Q=this.processArgs(T,N),R;if(N){R=T.splice(3,1)[0];}T.splice(0,4,T[1],T[3]);if(this.allowDups||!this.getSubs(S,L,null,true)){O=this._getNotifier(S,T,Q,R);this[P](S,O.sub,O.notifier,R);M.push(O);}},this);return(M.length===1)?M[0]:new B.EventHandle(M);},_getNotifier:function(M,P,N,L){var R=new B.CustomEvent(this.type,this.publishConfig),O=R.on.apply(R,P),Q=new E(O,this.emitFacade,L),K=A.getRegistry(M,this.type,true),J=O.sub;O.notifier=Q;J.node=M;J.filter=L;J._extra=N;B.mix(R,{eventDef:this,notifier:Q,host:M,currentTarget:M,target:M,el:M._node,_delete:A._deleteSub},true);K.push(O);return O;},_unregisterSub:function(L){var J=A.getRegistry(L.node,this.type),K;if(J){for(K=J.length-1;K>=0;--K){if(J[K].sub===L){J.splice(K,1);break;}}}},_detach:function(K){var J=B.all(K[2]);K.splice(2,1);J.each(function(N){var M=this.getSubs(N,K),L;if(M){for(L=M.length-1;L>=0;--L){M[L].detach();}}},this);},getSubs:function(K,P,J,M){var Q=A.getRegistry(K,this.type),R=[],L,O,N;if(Q){if(!J){J=this.subMatch;}for(L=0,O=Q.length;L<O;++L){N=Q[L];if(J.call(this,N.sub,P)){if(M){return N;}else{R.push(Q[L]);}}}}return R.length&&R;},subMatch:function(K,J){return !J[1]||K.fn===J[1];}}},true);B.SyntheticEvent=A;B.Node.publish=B.Event.define=function(L,K,N){if(!K){K={};}var M=(B.Lang.isObject(L))?L:B.merge({type:L},K),O,J;if(N||!B.Node.DOM_EVENTS[M.type]){O=function(){A.apply(this,arguments);};B.extend(O,A,M);J=new O();L=J.type;B.Node.DOM_EVENTS[L]=B.Env.evt.plugins[L]={eventDef:J,on:function(){return J._on(D(arguments));},delegate:function(){return J._on(D(arguments),true);},detach:function(){return J._detach(D(arguments));}};}};},"@VERSION@",{requires:["node-base","event-custom"]});