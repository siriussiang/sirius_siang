var rule=document.head.appendChild(document.createElement("style")).sheet,selectorBase='ytm-single-column-watch-next-results-renderer.watch-content.big-thumbnail-experiment>',one='ytm-item-section-renderer[section-identifier=""]',two=selectorBase+one+"+"+one,vMuted=false,relateItemsSectionList=null;
one=selectorBase+one;/*selectorBase is for corr c(hannel) page*/
rule.insertRule(two+'{display:none}');
rule=rule.rules.item(0);
/*
var lastAl="";
function diffA(info){
 if(info!=lastAl){
  lastAl=info;
  alert(info)}}; */

function mute(){
 var apo=document.querySelector(".ytp-ad-player-overlay[id^=player-overlay]");
 if(apo){/*
  diffA("Pre-muted!");*/
  if(!vMuted){
   document.getElementsByTagName("video").item(0).muted=true;
   vMuted=true;/*
   diffA("Muted!")*/}}
 else{/*
  diffA("Pre-unmuted!")*/;
  if(vMuted){
   document.getElementsByTagName("video").item(0).muted=false;
   vMuted=false;/*
   diffA("Unmuted!")*/}}};

mute();

new MutationObserver(mute).observe(document.getElementById("player"),{childList:true,subtree:true});



new MutationObserver(function(mrs){if(mrs.some(function(mr){return mr.addedNodes.length})){

 var iss=document.querySelectorAll(one);
 if(iss.length==1&&iss.item(0).innerText.lastIndexOf("Comments",0)==-1){
  if(rule.selectorText!=one)rule.selectorText=one}
 else{
  if(rule.selectorText!=two)rule.selectorText=two};


 if(!relateItemsSectionList&&(relateItemsSectionList=document.querySelector("ytm-item-section-renderer[section-identifier=related-items]>lazy-list")))new MutationObserver(function(mrs){/*try{*/
    var channel=null,isrtAnch=null;
    if(mrs.some(function(mr){return mr.addedNodes.length})){
     var tagName="YTM-VIDEO-WITH-CONTEXT-RENDERER",cv=mrs[0].target.getElementsByTagName(tagName),i=cv.length;
     console.log("Here is CV: ",cv);
     while(--i>=0){
      if(/\x54\x69\x6B ?\x54\x6F\x6B/i.test(cv.item(i).getElementsByClassName("large-media-item-metadata").item(0).innerText)){
       console.log(cv.item(i).innerText);
       cv.item(i).classList.add("xsioHide")}
      else cv.item(i).classList.remove("xsioHide")};

     if((channel=document.querySelector("ytm-slim-owner-renderer>.slim-owner-icon-and-title>.slim-owner-bylines>h3"))&&(channel=channel.innerText)){
      var channelNameSele="ytm-large-media-item>.details>.large-media-item-info.cbox>.large-media-item-metadata ytm-badge-and-byline-renderer>.ytm-badge-and-byline-item-byline.small-text";/*:nth-child(1)*/
      i=0;

      while(i<mrs[0].target.childElementCount&&mrs[0].target.children.item(i).tagName!=tagName)++i;
      /*Cross not COMPACT-VIDEO.*/

      while(i<mrs[0].target.childElementCount&&(cv=mrs[0].target.children.item(i)).tagName==tagName&&cv.querySelector(channelNameSele).innerText==channel)++i;
      /*Cross COMPACT-VIDEO with same channel which do not need to move.*/

      if(isrtAnch=mrs[0].target.children.item(i)){/*Set anchor for insertBefore.*/
       do ++i;while(i<mrs[0].target.childElementCount&&((cv=mrs[0].target.children.item(i)).tagName!=tagName||cv.querySelector(channelNameSele)).innerText!=channel);
       /*Cross not COMPACT-VIDEO or channel is different.*/
       if(i<mrs[0].target.childElementCount){
       /* ? Shall takeRecords */
        while(i<mrs[0].target.childElementCount){
         if((cv=mrs[0].target.children.item(i)).tagName==tagName&&cv.querySelector(channelNameSele).innerText==channel)mrs[0].target.insertBefore(cv,isrtAnch);
         ++i};
        /*Insert same channel COMPACT-VIDEO after anchor.*/
        console.log(this.takeRecords())
        }}}} /*}catch(err){alert(err.stack)}*/ }).observe(relateItemsSectionList,{childList:true})


 }})
 .observe(document.getElementById("app"),{childList:true,subtree:true})

/*
 *Use CSS, so don't need*
 var i=-1,mr=null,svma=null,i1=0,nod=null;
 while(mr=mrs[++i])if(mr.addedNodes.length&&(svma=mr.target.getElementsByClassName("slim-video-metadata-actions").item(0))&&Math.random()<0.9375){
  svma.parentNode.removeChild(svma);
  i1=svma.childNodes.length;
  while(nod=svma.childNodes.item(--i1))svma.removeChild(nod)};*/
/*
  if(ris&&ris.previousElementSibling.getAttribute("section-identifier")===""){
   ris.parentNode.insertBefore(ris,ris.previousElementSibling);
   this.takeRecords()}

 Will-do
  
  document.querySelectorAll(".ITEM")*/