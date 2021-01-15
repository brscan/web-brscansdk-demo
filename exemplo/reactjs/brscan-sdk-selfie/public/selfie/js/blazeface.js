/**
    * @license
    * Copyright 2020 Google LLC. All Rights Reserved.
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * =============================================================================
    */
!function(t,s){"object"==typeof exports&&"undefined"!=typeof module?s(exports,require("@tensorflow/tfjs-core"),require("@tensorflow/tfjs-converter")):"function"==typeof define&&define.amd?define(["exports","@tensorflow/tfjs-core","@tensorflow/tfjs-converter"],s):s(t.blazeface={},t.tf,t.tf)}(this,function(t,s,e){"use strict";const o=t=>{t.startEndTensor.dispose(),t.startPoint.dispose(),t.endPoint.dispose()},i=t=>({startEndTensor:t,startPoint:s.slice(t,[0,0],[-1,2]),endPoint:s.slice(t,[0,2],[-1,2])}),n=(t,e)=>{const o=s.mul(t.startPoint,e),n=s.mul(t.endPoint,e),a=s.concat2d([o,n],1);return i(a)},a={strides:[8,16],anchors:[2,6]},r=6;function c(t,e){let o,i,n;if(t.topLeft instanceof s.Tensor&&t.bottomRight instanceof s.Tensor){const[a,r]=s.tidy(()=>[s.concat([s.sub(e-1,t.topLeft.slice(0,1)),t.topLeft.slice(1,1)]),s.concat([s.sub(e-1,t.bottomRight.slice(0,1)),t.bottomRight.slice(1,1)])]);o=a,i=r,null!=t.landmarks&&(n=s.tidy(()=>{const o=s.sub(s.tensor1d([e-1,0]),t.landmarks),i=s.tensor1d([1,-1]);return s.mul(o,i)}))}else{const[s,a]=t.topLeft,[r,c]=t.bottomRight;o=[e-1-s,a],i=[e-1-r,c],null!=t.landmarks&&(n=t.landmarks.map(t=>[e-1-t[0],t[1]]))}const a={topLeft:o,bottomRight:i};return null!=n&&(a.landmarks=n),null!=t.probability&&(a.probability=t.probability instanceof s.Tensor?t.probability.clone():t.probability),a}function l(t,e){return s.tidy(()=>{let s;return s=t.hasOwnProperty("box")?t.box:t,n(s,e).startEndTensor.squeeze()})}class d{constructor(t,e,o,i,n,r){this.blazeFaceModel=t,this.width=e,this.height=o,this.maxFaces=i,this.anchorsData=function(t,s,e){const o=[];for(let i=0;i<e.strides.length;i++){const n=e.strides[i],a=Math.floor((s+n-1)/n),r=Math.floor((t+n-1)/n),c=e.anchors[i];for(let t=0;t<a;t++){const s=n*(t+.5);for(let t=0;t<r;t++){const e=n*(t+.5);for(let t=0;t<c;t++)o.push([e,s])}}}return o}(e,o,a),this.anchors=s.tensor2d(this.anchorsData),this.inputSizeData=[e,o],this.inputSize=s.tensor1d([e,o]),this.iouThreshold=n,this.scoreThreshold=r}async getBoundingBoxes(t,e,o=!0){const[n,a,c]=s.tidy(()=>{const e=t.resizeBilinear([this.width,this.height]),o=s.mul(s.sub(e.div(255),.5),2),i=this.blazeFaceModel.predict(o).squeeze(),n=function(t,e,o){const i=s.slice(t,[0,1],[-1,2]),n=s.add(i,e),a=s.slice(t,[0,3],[-1,2]),r=s.div(a,o),c=s.div(n,o),l=s.div(r,2),d=s.sub(c,l),h=s.add(c,l),u=s.mul(d,o),p=s.mul(h,o);return s.concat2d([u,p],1)}(i,this.anchors,this.inputSize),a=s.slice(i,[0,0],[-1,1]);return[i,n,s.sigmoid(a).squeeze()]}),l=console.warn;console.warn=(()=>{});const d=s.image.nonMaxSuppression(a,c,this.maxFaces,this.iouThreshold,this.scoreThreshold);console.warn=l;const h=await d.array();d.dispose();let u=h.map(t=>s.slice(a,[t,0],[1,-1]));e||(u=await Promise.all(u.map(async t=>{const s=await t.array();return t.dispose(),s})));const p=t.shape[1],f=t.shape[2];let b;b=e?s.div([f,p],this.inputSize):[f/this.inputSizeData[0],p/this.inputSizeData[1]];const m=[];for(let t=0;t<u.length;t++){const a=u[t],l=s.tidy(()=>{const l=a instanceof s.Tensor?i(a):i(s.tensor2d(a));if(!o)return l;const d=h[t];let u;return u=e?this.anchors.slice([d,0],[1,2]):this.anchorsData[d],{box:l,landmarks:s.slice(n,[d,r-1],[1,-1]).squeeze().reshape([r,-1]),probability:s.slice(c,[d],[1]),anchor:u}});m.push(l)}return a.dispose(),c.dispose(),n.dispose(),{boxes:m,scaleFactor:b}}async estimateFaces(t,e=!1,i=!1,n=!0){const[,a]=function(t){return t instanceof s.Tensor?[t.shape[0],t.shape[1]]:[t.height,t.width]}(t),r=s.tidy(()=>(t instanceof s.Tensor||(t=s.browser.fromPixels(t)),t.toFloat().expandDims(0))),{boxes:d,scaleFactor:h}=await this.getBoundingBoxes(r,e,n);return r.dispose(),e?d.map(t=>{const s=l(t,h);let e={topLeft:s.slice([0],[2]),bottomRight:s.slice([2],[2])};if(n){const{landmarks:s,probability:o,anchor:i}=t,n=s.add(i).mul(h);e.landmarks=n,e.probability=o}return i&&(e=c(e,a)),e}):Promise.all(d.map(async t=>{const s=l(t,h);let e;if(n){const[i,n,a]=await Promise.all([t.landmarks,s,t.probability].map(async t=>t.array())),r=t.anchor,[c,l]=h,d=i.map(t=>[(t[0]+r[0])*c,(t[1]+r[1])*l]);e={topLeft:n.slice(0,2),bottomRight:n.slice(2),landmarks:d,probability:a},o(t.box),t.landmarks.dispose(),t.probability.dispose()}else{const t=await s.array();e={topLeft:t.slice(0,2),bottomRight:t.slice(2)}}return s.dispose(),i&&(e=c(e,a)),e}))}}const h="https://tfhub.dev/tensorflow/tfjs-model/blazeface/1/default/1";t.load=async function({maxFaces:t=10,inputWidth:s=128,inputHeight:o=128,iouThreshold:i=.3,scoreThreshold:n=.75}={}){const a=await e.loadGraphModel(h,{fromTFHub:!0});return new d(a,s,o,t,i,n)},t.BlazeFaceModel=d,Object.defineProperty(t,"__esModule",{value:!0})});
