import{c,r as o,j as e,b7 as m}from"./index-BPcX-l9F.js";import{A as p}from"./index-qnxKIWpP.js";import{m as y}from"./proxy-CjiiRnnn.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],v=c("chevron-down",u);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}]],j=c("file",b);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",key:"1kt360"}]],g=c("folder",N);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["line",{x1:"22",x2:"2",y1:"12",y2:"12",key:"1y58io"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16",key:"sgf278"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16",key:"1l4acy"}]],f=c("hard-drive",z);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],w=c("plus",k);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],M=c("trash-2",_),H=()=>{const[d,S]=o.useState({id:"root",name:"/",type:"directory",children:[{id:"1",name:"home",type:"directory",children:[{id:"2",name:"user",type:"directory",children:[{id:"3",name:"resume.pdf",type:"file"},{id:"4",name:"projects",type:"directory",children:[]}]}]},{id:"5",name:"etc",type:"directory",children:[]},{id:"6",name:"var",type:"directory",children:[]}]}),[r,l]=o.useState(new Set(["root","1","2"])),x=t=>{const s=new Set(r);s.has(t)?s.delete(t):s.add(t),l(s)},a=(t,s=0)=>{const n=r.has(t.id),i=t.type==="directory";return e.jsxs("div",{className:"select-none",children:[e.jsxs("div",{className:`flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors cursor-pointer group ${i?"hover:bg-zinc-800/50":"hover:bg-zinc-800/30"}`,style:{paddingLeft:`${s*1.5+.5}rem`},onClick:()=>i&&x(t.id),children:[i?n?e.jsx(v,{className:"w-4 h-4 text-zinc-500"}):e.jsx(m,{className:"w-4 h-4 text-zinc-500"}):e.jsx("div",{className:"w-4"}),i?e.jsx(g,{className:`w-4 h-4 ${n?"text-blue-400":"text-zinc-400"}`}):e.jsx(j,{className:"w-4 h-4 text-zinc-500"}),e.jsx("span",{className:`text-sm ${i?"text-zinc-200 font-medium":"text-zinc-400"}`,children:t.name}),i&&e.jsxs("div",{className:"ml-auto opacity-0 group-hover:opacity-100 flex gap-1",children:[e.jsx("button",{className:"p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-blue-400 transition-colors",children:e.jsx(w,{className:"w-3 h-3"})}),e.jsx("button",{className:"p-1 hover:bg-zinc-700 rounded text-zinc-500 hover:text-red-400 transition-colors",children:e.jsx(M,{className:"w-3 h-3"})})]})]}),e.jsx(p,{children:i&&n&&t.children&&e.jsx(y.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.2},className:"overflow-hidden",children:t.children.map(h=>a(h,s+1))})})]},t.id)};return e.jsxs("div",{className:"p-6 bg-zinc-900 rounded-xl border border-zinc-800 shadow-2xl",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800",children:[e.jsx("div",{className:"p-2 bg-blue-500/10 rounded-lg",children:e.jsx(f,{className:"w-5 h-5 text-blue-400"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-bold text-white",children:"File System Simulation"}),e.jsx("p",{className:"text-xs text-zinc-500",children:"Composite Pattern & Hierarchical Navigation"})]})]}),e.jsx("div",{className:"bg-zinc-950 rounded-lg p-4 border border-zinc-800 min-h-[300px]",children:a(d)}),e.jsxs("div",{className:"mt-6 grid grid-cols-1 md:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"p-3 bg-zinc-800/30 rounded-lg border border-zinc-800",children:[e.jsx("p",{className:"text-[10px] text-zinc-500 uppercase font-bold mb-1",children:"Pattern"}),e.jsx("p",{className:"text-xs text-zinc-300",children:"Composite"})]}),e.jsxs("div",{className:"p-3 bg-zinc-800/30 rounded-lg border border-zinc-800",children:[e.jsx("p",{className:"text-[10px] text-zinc-500 uppercase font-bold mb-1",children:"Complexity"}),e.jsx("p",{className:"text-xs text-zinc-300",children:"O(Depth) Path Resolution"})]}),e.jsxs("div",{className:"p-3 bg-zinc-800/30 rounded-lg border border-zinc-800",children:[e.jsx("p",{className:"text-[10px] text-zinc-500 uppercase font-bold mb-1",children:"Structure"}),e.jsx("p",{className:"text-xs text-zinc-300",children:"Recursive Tree"})]})]})]})};export{H as FileSystemSim};
