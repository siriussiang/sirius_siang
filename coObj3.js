
try{
console.info=console.log=function(jkqvwz){
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createTextNode(jkqvwz))};

var fr=new FileReader,tBody=document.getElementsByTagName("table").item(0),s=new String,i=-1,obsos=null,pathObje=null;


document.getElementsByTagName("input").item(0).onchange=function(){if(this.files.length)fr.readAsText(this.files.item(0))}

function skipWhitespace(){
 var c=null;
 while(i<s.length&&((c=s.charCodeAt(i))==0x20||c==0xA||c==0xD||c==0x9))++i}


 function parseToken(path,beforeToken){
  var t0=null;
  while(++i<s.length)switch(s.charAt(i)){
   case '"':/*Jump string*/
    while(++i<s.length){
     if((t0=s.charAt(i))=="\\")++i;
     else if(t0=='"')break};break;
   case ",":
    return true;



   case "[":
    var token=pathObje[path]={"start":i};
    if(beforeToken)token.beforeToken=beforeToken;

    for(var arrayIndex=0;parseToken(path+"["+arrayIndex+"]");++arrayIndex);

    t0=s.substring(token.start,token.end=i+1);
    if(t0 in obsos){
     if(Array.isArray(obsos[t0]))obsos[t0].push(path);
     else obsos[t0]=[obsos[t0],path]}
    else if(t0.length<s.length-i)obsos[t0]=path;
    /*暫？刪大*/else delete pathObje[path];/*←暫*/break;



   case "{":
    var token=pathObje[path]={"start":i},pName,pName1;
    if(beforeToken)token.beforeToken=beforeToken;

    do{
     /*現在在「{」或「,」之前*/
     i++;/*為了跳空白*/
     /*現在在「{」或「,」之後*/
     skipWhitespace();
     if(s.charAt(i)==="}")break;/*檢查是否空*/
     beforeToken=i;
    
     while(++i<s.length){
      if((t0=s.charAt(i))=="\\")++i;
      else if(t0=='"')break};
     /*pName=s.substring(beforeToken,++i);*/
     pName="."+s.substring(beforeToken+1,i++);/*暫時粗糙*/
     }while(parseToken(path+pName,beforeToken));


    t0=s.substring(token.start,token.end=i+1);
    if(t0 in obsos){
     if(Array.isArray(obsos[t0]))obsos[t0].push(path);
     else obsos[t0]=[obsos[t0],path]}
    else if(t0.length<s.length-i)obsos[t0]=path;
    /*暫？刪大*/else delete pathObje[path];/*←暫*/break;

   case "]":case "}":
    return false}}


fr.onload=function(){try{
 s=this.result;i=-1;
 obsos=new Object;pathObje=new Object;
/*objectSources:"source→path",
   pathObject:"path→object"*/

 parseToken("this",0);


 for(var os in obsos)if(!Array.isArray(obsos[os])){
  delete pathObje[obsos[os]];
  delete obsos[os]
  /*大型Token沒錄到obsos裡，卻有記在pathObje上，這樣會漏刪。已處理。*/}

 var souA=Object.keys(obsos).sort(function(a,b){/*
  return obsos[b].length-obsos[a].length*/
  return b.length-a.length})

 if(souA.length){
  var ri=null,wi=null,i1=null,ri1=null,wi1=null,l=null,c=null,r=null,patA=null,start=null,end=null,k=null,sou=null;
  /*souA:sourceArray,r:result
     readIndex,writeIndex*/

  for(ri=0,wi=0;sou=souA[ri];ri++){
   /*↓加速用*/
   r=false;
   for(i1=1,l=sou.length-1;i1<l;i1++)if((c=sou.charAt(i1))==='"')while(++i1<l){
    if((c=sou.charAt(i1))==="\\")++i;
    else if(c==='"')break}
   else if(c==="["||c==="{"){
    r=true;break};


   if(r){/*←加速用*/
    for(patA=obsos[sou],l=patA.length,ri1=1,wi1=1;ri1<l;ri1++)if(patA[ri1] in pathObje){
     start=pathObje[patA[ri1]].start;
     end=pathObje[patA[ri1]].end;
     for(k in pathObje)if(pathObje[k].start>start&&pathObje[k].end<end)delete pathObje[k];
     patA[wi1++]=patA[ri1]}}
    /*pa[0]一定有，不檢查，從一開始*/
   else for(patA=obsos[sou],l=patA.length,ri1=1,wi1=1;ri1<l;ri1++)if(patA[ri1] in pathObje)patA[wi1++]=patA[ri1];
   if((patA.length=wi1)>1)souA[wi++]=sou;
   else delete pathObje[patA[0]]}
  souA.length=wi;
  /*刪掉只剩一條的 pathArray。已往上合併。*/


  /*souA.length<=obsos.keys.length？*/
  var indA=[];
  for(ri=0;sou=souA[ri];ri++)for(patA=obsos[sou],ri1=1;ri1<patA.length;ri1++)indA.push(pathObje[patA[ri1]]);
  indA.sort(function(a,b){return a.start-b.start});
  /*{}|[]:0 n
    {,:1 d
    ,,;2 od an
    ,}:3 d
    [,: n
    ,]: n


  last:keep for next sub
  if("beforeToken" in indA[0])
   check left string right trim remember character
   check right string left trim remember character
   if left touch(<=)previousEnd(lastBegin)???
     if right is "}", last=before"}"
     if right is ",", last=afterComma
   if left is "{", subLeft and concat (rs+=last,curr)
     if right is "}", last=before"}"
     if right is ",", last=afterComma
   if left is ",", 
    if last==beforeComma last=end+afterBlank
    if last!=beforeComma, cut it out, rs+=last,beforeComma
    [last=end+afterBlank]==[
     if right is "}", last=before"}"
     if right is ",", last=beforeComma]

  else
   if [] onlycut
   if ,] cutComma？→null
   if ,, insert(null)
   if [,
 可用倒數的方式簡化全null array，但太難，先不要
 存成lastRemoveArrayItemIndex，若兩處間僅逗號＆空白*/


  function skipToLeft(p){
   var c=null;
   do --p;
   while(p>0&&((c=s.charCodeAt(p))==0x20||c==0xA||c==0xD||c==0x9));
   return p};
  function skipToRight(p){
   var c=null;
   while(p<s.length&&((c=s.charCodeAt(p))==0x20||c==0xA||c==0xD||c==0x9))++p;
   return p};
  function resolv(i){
   return s.substring(needD&&s.charAt(l)!="}"?l-1:l,i)};
  /*"l" means "last";
    "rs" means resultString
    "c" for character
    "needD" delimiter,is comma cut*/
  var rs="",pos=null,needD=false;
  l=0;
  for(i1=0;pos=indA[i1];++i1)if("beforeToken" in pos){
   i=skipToLeft(pos.beforeToken);
   if(i>l){
    if((c=s.charAt(i))=="{"){
     rs+=resolv(i+1);
     needD=false}
    else if(c==","){
     rs+=resolv(i);
     needD=true}
    else console.error(i,c)};

   if((c=s.charAt(i=skipToRight(pos.end)))==",")l=i+1;
   else if(c=="}")l=i
   else console.error(i,c)}
  else{
   rs+=resolv(pos.start)+"null";
   needD=false;
   l=pos.end};

  rs+=s.substring(needD&&s.charAt(l)!="}"?l-1:l);

  for(ri=0;sou=souA[ri];ri++){/*
   rs+=";\n";
   patA=obsos[sou];
   ri1=patA.length;
   while(--ri1>0)rs+=patA[ri1]+"=";
   rs+=patA[0]*/
   rs+=";\n"+obsos[sou].reverse().join("=")};
  var pre=document.body.appendChild(document.createElement("pre"));
  pre.style.whiteSpace="pre-wrap";
  pre.appendChild(document.createTextNode(rs));

  souA.sort(function(a,b){
   return obsos[b].length-obsos[a].length||pathObje[obsos[a][1]].start-pathObje[obsos[b][1]].start})}/*「if(souA.length)」End*/;

 var o,tri=0,minLen=Math.min(souA.length,tBody.rows.length),row,cells;
 /*o:object,tri:tableRowIndex,minLength*/

 while(tri<minLen){
  o=souA[tri];
  cells=tBody.rows.item(tri++).cells;
  cells.item(0).firstChild.data=obsos[o].length;
  cells.item(1).firstChild.data=obsos[o][0];
  cells.item(2).firstChild.data=o}

 while(tri<souA.length){
  o=souA[tri++];
  row=tBody.insertRow(-1);
  row.insertCell(0).appendChild(document.createTextNode(obsos[o].length));
  row.insertCell(1).appendChild(document.createTextNode(obsos[o][0]));
  row.insertCell(2).appendChild(document.createTextNode(o))}

 while(tBody.rows.length>tri/*souA.length*/)tBody.deleteRow(-1);
 /*
 while(document.body.childNodes.length>2)document.body.removeChild(document.body.childNodes.item(2));*/
 if(souA.length)for(k in pathObje)console.log("beforeToken" in pathObje[k]?k+"«"+pathObje[k].beforeToken:k);

}catch(er){console.log(er.stack)}}

}catch(er){console.log(er.message)};
console.log("Loaded")
