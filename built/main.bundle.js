!function(e){function t(t){for(var r,i,l=t[0],s=t[1],c=t[2],d=0,m=[];d<l.length;d++)i=l[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&m.push(o[i][0]),o[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);m.length;)m.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,l=1;l<n.length;l++){var s=n[l];0!==o[s]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={2:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=s;a.push([31,0]),n()}([function(e,t){e.exports=React},function(e,t){e.exports=antd},,,function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function l(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(19);var a=n(19);t.createStore=a.createStore,t.createPesistStore=a.createPesistStore;const i=n(0),l=n(1);t.useDescriptions=o.createStore([]),t.useApp=o.createPesistStore({logging:!1},"app"),t.useAuth=o.createPesistStore({},"auth");const s={requesting:!1,status:"IDLE"};t.useAPI=e=>{const[t,n]=i.useState(s);return[t,t=>r(void 0,void 0,void 0,(function*(){n(Object.assign(Object.assign({},s),{requesting:!0,status:"REQUESTING"}));try{const r=yield e(t);return n(Object.assign(Object.assign({},s),{requesting:!1,resp:r,status:"SUCCESS"})),r}catch(e){throw console.log("Action Failed: "+e.toString()),l.message.error("Action Failed: "+e.toString()),n(Object.assign(Object.assign({},s),{requesting:!1,error:e,status:"FAILED"})),e}}))]}},,,function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function l(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))},o=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0});const a=(e,{body:t,method:n})=>r(void 0,void 0,void 0,(function*(){console.log(e,{body:t,method:n});const r=yield fetch("http://localhost:3000"+e,{mode:"cors",body:t,method:n});if(!r.ok)throw new Error("Resp not ok");return r}));t.updateDescription=e=>r(void 0,void 0,void 0,(function*(){var{id:t}=e,n=o(e,["id"]);console.log(t);yield a("/update-description",{body:JSON.stringify(Object.assign({id:t},n)),method:"put"})})),t.listDescriptions=({})=>r(void 0,void 0,void 0,(function*(){const e=yield a("/list-descriptions",{method:"get"});return yield e.json()})),t.createDescriptions=({descriptions:e})=>r(void 0,void 0,void 0,(function*(){yield a("/massive-create",{body:JSON.stringify(e),method:"post"})})),t.logout=({id:e})=>r(void 0,void 0,void 0,(function*(){yield a("/logout",{body:JSON.stringify({id:e}),method:"put"})})),t.login=({email:e})=>r(void 0,void 0,void 0,(function*(){const t=yield a("/login",{body:JSON.stringify({email:e}),method:"put"});return yield t.json()}))},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RouteConfigs={table:{path:"/table",name:"Table Page"},chart:{path:"/chart",name:"Chart Page"}},t.routes=Object.values(t.RouteConfigs)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(4);t.private_=e=>t=>{const[n]=o.useAuth();return n&&n.id?r.createElement(e,Object.assign({},t)):null},t.protected_=e=>t=>{const[n]=o.useAuth();return n&&n.admin?r.createElement(e,Object.assign({},t)):null}},,,,function(e,t){e.exports=moment},,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0);t.createStore=e=>{const t=new Set;let n=e;return()=>{const[e,o]=r.useState(n);r.useEffect(()=>(t.add(o),()=>{t.delete(o)}),[]);return[e,e=>{n=e;for(const n of t)n(e)}]}},t.createPesistStore=(e,n)=>{const r=localStorage.getItem(n)&&JSON.parse(localStorage.getItem(n))||e,o=t.createStore(r);return()=>{const[e,t]=o();return[e,e=>{localStorage.setItem(n,JSON.stringify(e)),t(e)}]}}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JOB_DESCRIPTIONS=["Front-end Dev","Core Server","Product Manager","Project Manager","QA"]},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(14),a=n(0),i=n(21),l=n(4),s=n(54),{RangePicker:c}=r.DatePicker,{Option:u}=r.Select;t.defaults={name:void 0,description:void 0,duration:[void 0,void 0]},t.useConditions=l.createStore(t.defaults),t.Filter=()=>{const[e]=r.Form.useForm(),[n,l]=t.useConditions();return a.createElement(r.Form,Object.assign({},{labelCol:{span:8},wrapperCol:{span:16}},{form:e}),a.createElement(r.Row,{gutter:16},a.createElement(r.Col,{span:12},a.createElement(r.Form.Item,{name:"name",label:"Name",rules:[{required:!0}]},a.createElement(r.Input,{placeholder:"String Only"}))),a.createElement(r.Col,{span:12},a.createElement(r.Form.Item,{name:"description",label:"Job Description"},a.createElement(r.Select,{placeholder:"Select",allowClear:!0},i.JOB_DESCRIPTIONS.map(e=>a.createElement(u,{key:e,value:e},e)))))),a.createElement(r.Row,{gutter:16},a.createElement(r.Col,{span:12},a.createElement(r.Form.Item,{name:"duration",label:"Entry Date"},a.createElement(c,{style:{width:"100%"}}))),a.createElement(r.Col,{span:12},a.createElement("div",{className:s.actions},a.createElement(r.Button,{onClick:()=>e.validateFields().then(e=>{if(e.duration&&2==e.duration.filter(e=>null!=e).length){if(o.duration(e.duration[1].diff(e.duration[0])).asMonths()>24)return void r.message.error("Entry Date cannot be more than 2 years.")}l(e)}).catch(console.error)},"Submit"),a.createElement(r.Button,{style:{marginLeft:8},onClick:()=>{e.resetFields(),l(t.defaults)}},"Reset")))))}},,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),o=n(32),a=n(15),i=n(37);o.render(r.createElement(a.HashRouter,null,r.createElement(i.default,null)),document.querySelector("#app"))},function(e,t){e.exports=ReactDOM},,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(0),a=n(15),i=n(4),l=n(38),s=n(9),c=n(44),u=n(48);n(57);const{SubMenu:d}=r.Menu,{Sider:m}=r.Layout;t.App=()=>{const e=a.useLocation(),[t]=i.useApp(),n=a.useHistory();return t.logging?o.createElement(l.LoginPage,null):o.createElement(r.Layout,null,o.createElement(c.default,null),o.createElement(r.Layout,{style:{background:"white"}},o.createElement(m,{width:256,style:{height:"100%"}},o.createElement(r.Menu,{style:{width:256,height:"100%"},selectedKeys:[e.pathname],mode:"inline"},o.createElement(d,{key:"1",title:"System Management"},s.routes.map(e=>o.createElement(r.Menu.Item,{onClick:()=>n.push(e.path),key:e.path},e.name))))),o.createElement(u.default,null)))},t.default=t.App},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function l(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(1),a=n(39),i=n(0),l=n(7),s=n(4),c=n(43),{Item:u}=o.Form,{Option:d}=o.Select;t.LoginPage=()=>{const[e]=a.useForm(),[t,n]=s.useApp(),[d,m]=s.useAuth(),[p,f]=s.useAPI(l.login);return i.createElement("div",{className:c.container},i.createElement(o.Form,Object.assign({form:e},{labelCol:{span:4},wrapperCol:{span:16}},{layout:"horizontal",size:"large"}),i.createElement(u,{name:"email",label:"Email",rules:[{required:!0,message:"NameName is required!"}]},i.createElement(o.Input,{placeholder:"String Only"}))),i.createElement("div",{className:c.actions},i.createElement(o.Button,{disabled:"REQUESTING"==p.status,onClick:()=>r(void 0,void 0,void 0,(function*(){try{const{email:r}=yield e.validateFields(),o=yield f({email:r});console.log(o),m(Object.assign(Object.assign({},d),o)),n(Object.assign(Object.assign({},t),{logging:!1}))}catch(e){}}))},"Login"),i.createElement(o.Button,{onClick:()=>n(Object.assign(Object.assign({},t),{logging:!1}))},"Cancel")))}},,,,,function(e,t,n){e.exports={container:"_1hsW0NdE6YMu98xiDVYmf1",actions:"_12S7jDOv_hGtC3rRfCFieH"}},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function l(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(23),a=n(1),i=n(0),l=n(7),s=n(4),c=n(47);console.log(c),t.HeaderHeight=64;t.default=()=>{const[e,n]=s.useAuth(),[u,d]=s.useApp(),[{status:m},p]=s.useAPI(l.logout);return i.createElement(a.Layout.Header,{style:{height:t.HeaderHeight},className:c.header},i.createElement("p",null,i.createElement(o.UnorderedListOutlined,{style:{marginRight:"1em"}}),"System Management"),e&&e.id?i.createElement(a.Popover,{placement:"bottomRight",title:i.createElement("div",{className:c.popover},i.createElement("img",{src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"}),i.createElement("div",null,i.createElement("p",null,e.name),i.createElement("p",null,e.email))),content:"REQUESTING"==m?i.createElement("p",null,"..."):i.createElement("p",{onClick:()=>r(void 0,void 0,void 0,(function*(){try{yield p({id:e.id}),n(null)}catch(e){}}))},i.createElement(o.LogoutOutlined,{style:{marginRight:"1em"}}),"Logout"),trigger:"click"},i.createElement("img",{style:{height:42},src:"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"})):i.createElement("p",{onClick:()=>d(Object.assign(Object.assign({},u),{logging:!0}))},"Login"))}},,,function(e,t,n){e.exports={header:"hxvNd2BkJ1U82aZCTgnnT",popover:"bmyYbAjqG8r8LpfkCXVkQ"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(0),a=n(15),i=n(9),l=o.lazy(()=>Promise.resolve().then(()=>n(49))),s=o.lazy(()=>Promise.resolve().then(()=>n(55)));t.default=()=>o.createElement(r.Layout.Content,{style:{padding:16,backgroundColor:"white"}},o.createElement(a.Switch,null,o.createElement(a.Route,{path:i.RouteConfigs.table.path},o.createElement(o.Suspense,{fallback:o.createElement("div",null,"Loading...")},o.createElement(l,null))),o.createElement(a.Route,{path:i.RouteConfigs.chart.path},o.createElement(o.Suspense,{fallback:o.createElement("div",null,"Loading...")},o.createElement(s,null)))))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(0),a=n(9),i=n(50),l=n(53),s=n(22),c=n(10);t.TablePage=c.private_(()=>o.createElement("div",null,o.createElement(r.PageHeader,{title:"Table Page",breadcrumb:{routes:[{breadcrumbName:"System Management",path:"/"},{breadcrumbName:"Table Page",path:a.RouteConfigs.table.path}]}}),o.createElement(s.Filter,null),o.createElement(i.Create,null),o.createElement(l.EditableTable,null))),t.default=t.TablePage},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function l(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=n(23),a=n(1),i=n(0),l=n(0),s=n(60),c=n(7),u=n(51),d=n(4),m=n(52),p=n(10),{Dragger:f}=a.Upload,g={visible:!1,massive:!1};t.Create=p.protected_(()=>{const[e]=a.Form.useForm(),[t,n]=l.useState([]),[p,h]=l.useState(g),{visible:v,massive:y}=p,[b,E]=d.useAPI(c.createDescriptions),[O,S]=d.useDescriptions(),P=()=>{n([]),e.resetFields(),h(g)};return i.createElement(i.Fragment,null,i.createElement("div",{className:u.button},i.createElement(a.Button,{type:"primary",onClick:()=>h(Object.assign(Object.assign({},p),{visible:!0}))},"Create")),i.createElement(a.Modal,{width:720,visible:v,title:"Create Person",footer:[i.createElement(a.Button,{key:"Cancel",onClick:P},"Cancel"),i.createElement(a.Button,{key:"Submit",type:"primary",loading:"REQUESTING"==b.status,onClick:()=>r(void 0,void 0,void 0,(function*(){try{if(y){console.log(t);const e=yield t.reduce((e,t)=>r(void 0,void 0,void 0,(function*(){const n=yield e,r=new FileReader,o=yield new Promise((e,n)=>{r.onload=t=>e(t.target.result),r.onerror=n,r.readAsText(t)});return console.log(o,JSON.parse(o)),[...n,...JSON.parse(o)]})),Promise.resolve([])),n=[...e,...O];yield E({descriptions:n}),S([...e,...O]),P()}else{const t=yield e.validateFields(),n=Object.assign(Object.assign({},t),{id:s.v4()});yield E({descriptions:[n]}),S([n,...O]),P()}}catch(e){a.message.error(e.toString())}}))},"Submit")]},i.createElement("div",{className:u.modal},i.createElement(a.Menu,{style:{width:128},defaultSelectedKeys:["1"],mode:"inline"},i.createElement(a.Menu.Item,{key:"1",onClick:()=>h(Object.assign(Object.assign({},p),{massive:!1}))},"Single Create"),i.createElement(a.Menu.Item,{key:"2",onClick:()=>h(Object.assign(Object.assign({},p),{massive:!0}))},"Mass Create")),i.createElement("div",{className:u.contents},y?i.createElement("div",null,i.createElement(f,{fileList:t,multiple:!0,beforeUpload:e=>(n([...t,e]),!1),onRemove:e=>{const r=t.indexOf(e);n([...t.slice(0,r),...t.slice(r+1)])}},i.createElement("p",null,i.createElement(o.InboxOutlined,null)),i.createElement("p",null,"Click or drag file to this area to upload"))):i.createElement(m.SingleCreate,{form:e})))))})},function(e,t,n){e.exports={button:"_3-EbZPAjmP9DINQh6_kpUc",modal:"_2zPPBl7l3JX0fEMhxTAj7s",contents:"_34YN_-osjBti6rsa8ONiet"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(0),a=n(21),{Item:i}=r.Form,{RangePicker:l}=r.DatePicker;t.SingleCreate=({form:e})=>o.createElement(r.Form,Object.assign({form:e,style:{width:"100%"}},{labelCol:{span:8},wrapperCol:{span:16}},{layout:"horizontal",size:"large"}),o.createElement(i,{name:"name",label:"Name",rules:[{required:!0,message:"NameName is required!"}]},o.createElement(r.Input,{placeholder:"String Only"})),o.createElement(i,{name:"description",label:"Job Description",rules:[{required:!0,message:"Descriptoin is required!"}]},o.createElement(r.Select,{placeholder:"Select"},a.JOB_DESCRIPTIONS.map(e=>o.createElement(r.Select.Option,{value:e,key:e},e)))),o.createElement(i,{name:"duration",label:"Entry Date",rules:[{required:!0,message:"Duration is required!"}]},o.createElement(l,{style:{width:"100%"}})))},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{s(r.next(e))}catch(e){a(e)}}function l(e){try{s(r.throw(e))}catch(e){a(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,l)}s((r=r.apply(e,t||[])).next())}))},o=this&&this.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};Object.defineProperty(t,"__esModule",{value:!0});const a=n(1),i=n(14),l=n(0),s=n(0),c=n(7),u=n(4),d=n(22),m=n(58),p=n(10),f=l.createContext(null),g=e=>{var{index:t}=e,n=o(e,["index"]);const[r]=a.Form.useForm();return l.createElement(a.Form,{form:r,component:!1},l.createElement(f.Provider,{value:r},l.createElement("tr",Object.assign({},n))))},h=e=>{var{title:t,editable:n,children:i,dataIndex:c,record:d,handleSave:m}=e,p=o(e,["title","editable","children","dataIndex","record","handleSave"]);const[g]=u.useAuth(),[h,v]=s.useState(!1),y=s.useRef(null),b=s.useContext(f);s.useEffect(()=>{h&&y.current.focus()},[h]);const E=()=>{(g||g.admin)&&(v(!h),b.setFieldsValue({[c]:d[c]}))},O=()=>r(void 0,void 0,void 0,(function*(){try{const e=yield b.validateFields();E(),m(Object.assign(Object.assign({},d),e))}catch(e){console.log("Save failed:",e)}}));let S=i;return n&&(S=h?l.createElement(a.Form.Item,{name:c,rules:[{required:!0,message:t+" is required."}]},l.createElement(a.Input,{ref:y,onPressEnter:O,onBlur:O})):l.createElement("div",{onClick:E},i)),l.createElement("td",Object.assign({},p),S)};t.EditableTable=p.private_(()=>{const[e]=u.useAuth(),[t,n]=u.useDescriptions(),[o,s]=u.useAPI(c.updateDescription),[{status:p,resp:f},v]=u.useAPI(c.listDescriptions);l.useEffect(()=>{v({})},[]),l.useEffect(()=>{n(f||[])},[f]);const[y]=d.useConditions(),b=e=>r(void 0,void 0,void 0,(function*(){if(!m.equals(e,t.find(({id:t})=>t==e.id)))try{console.log(e),yield s(e),n(t.map(t=>t.id==e.id?e:t))}catch(e){}})),E={body:{row:g,cell:h}},O=[{title:"Name",dataIndex:"name",width:"30%",editable:!0},{title:"Job Description",dataIndex:"description"},{title:"Duration",dataIndex:"duration",render:(e,t)=>{const[n,r]=t.duration.map(e=>i(e));return i.duration(r.diff(n)).months()+" Month(s)"}},{title:"Action",dataIndex:"action",render:(r,o)=>l.createElement(a.Popconfirm,{title:"Are you sure to delete?",okText:"Delete",onConfirm:()=>n(t.filter(e=>e.id!=o.id))},e&&e.admin&&l.createElement("a",null,"Delete"))}].map(e=>e.editable?Object.assign(Object.assign({},e),{onCell:t=>({record:t,editable:e.editable,dataIndex:e.dataIndex,title:e.title,handleSave:b})}):e);return l.createElement("div",null,l.createElement(a.Table,{rowKey:"id",loading:"REQUESTING"==p,components:E,dataSource:t.filter(e=>{if(y.name&&!e.name.startsWith(y.name))return!1;if(y.description&&e.description!=y.description)return!1;if(y.duration&&2==y.duration.filter(e=>null!=e).length){const t=i.duration(i(e.duration[1]).diff(i(e.duration[0]))),n=i.duration(y.duration[1].diff(y.duration[0]));if(t.asMilliseconds()<n.asMilliseconds())return!1}return!0}),columns:O,pagination:{defaultPageSize:5,pageSize:5,showQuickJumper:!0,showSizeChanger:!0}}))})},function(e,t,n){e.exports={actions:"_3aQfN4gxkeiAdGLGRfKS6q"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),o=n(56),a=n(14),i=n(0),l=n(7),s=n(10),c=n(4),u=n(9);t.ChartPage=s.private_(()=>{const[e,t]=c.useDescriptions(),[{status:n,resp:s},d]=c.useAPI(l.listDescriptions);i.useEffect(()=>{d({})},[]),i.useEffect(()=>{t(s||[])},[s]);const m=[];for(let e=1;e<=9;e+=1)m.push({count:0,name:"0"+e});for(let e=10;e<=12;e+=1)m.push({count:0,name:e.toString()});for(const t of e){m[a(t.duration[0]).month()-1].count+=1}return i.createElement("div",{style:{width:"100%"}},i.createElement(r.PageHeader,{title:"Table Page",breadcrumb:{routes:[{breadcrumbName:"System Management",path:"/"},{breadcrumbName:"Chart Page",path:u.RouteConfigs.chart.path}]}}),i.createElement(o.Chart,{height:400,data:m,forceFit:!0},i.createElement(o.Axis,{name:"name"}),i.createElement(o.Axis,{name:"count"}),i.createElement(o.Legend,{position:"left-top"}),i.createElement(o.Tooltip,{enterable:!0}),i.createElement(o.Geom,{type:"interval",position:"name*count"})))}),t.default=t.ChartPage},,function(e,t,n){e.exports={app:"_3rkitb77DhZqzVSFVyfT07"}}]);
//# sourceMappingURL=main.bundle.js.map