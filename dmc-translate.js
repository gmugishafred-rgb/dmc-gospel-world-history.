/* DMC full-content translation helper (online translation; cached on this device) */
(function(){
 const sel=document.getElementById('appLanguage'); if(!sel)return;
 const cacheKey='dmcTranslationCacheV1';
 let cache={}; try{cache=JSON.parse(localStorage.getItem(cacheKey)||'{}')}catch{}
 const original=new WeakMap(); let running=false,observer;
 const skipTags=new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','INPUT','SELECT','OPTION']);
 function lang(){return sel.value||'en'}
 function nodes(){
  const out=[]; const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){const n=walker.currentNode, p=n.parentElement;if(!p||skipTags.has(p.tagName)||!n.nodeValue.trim()||p.closest('[data-translation-ignore]'))continue;out.push(n)}
  return out;
 }
 async function translateText(s,target){
  const key=target+'|'+s;if(cache[key])return cache[key];
  try{
   const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='+target+'&dt=t&q='+encodeURIComponent(s);
   const res=await fetch(url);if(!res.ok)throw 0;const data=await res.json();
   const translated=(data[0]||[]).map(x=>x[0]).join('');if(translated){cache[key]=translated;return translated}
  }catch(e){}
  return s;
 }
 async function apply(){
  if(running)return;running=true;const target=lang();
  if(observer)observer.disconnect();
  const list=nodes();
  for(let i=0;i<list.length;i++){
   const n=list[i];if(!original.has(n))original.set(n,n.nodeValue);
   const base=original.get(n);
   if(target==='en'){continue}
   const tr=await translateText(base,target);n.nodeValue=tr;
  }
  for(const el of document.querySelectorAll('input[placeholder],button[title],img[alt], [aria-label]')){
   for(const attr of ['placeholder','title','alt','aria-label']){
    if(!el.hasAttribute(attr))continue;const k=attr+'Original';if(!el.dataset[k])el.dataset[k]=el.getAttribute(attr);
    const base=el.dataset[k];if(target==='en'){el.setAttribute(attr,base);continue}
    el.setAttribute(attr,await translateText(base,target));
   }
  }
  try{localStorage.setItem(cacheKey,JSON.stringify(cache))}catch{}
  running=false;if(observer)observer.observe(document.body,{childList:true,subtree:true,characterData:true});
 }
 observer=new MutationObserver(()=>{if(!running)apply()});
 sel.addEventListener('change',apply);
 observer.observe(document.body,{childList:true,subtree:true,characterData:true});
 window.dmcTranslateAll=apply;
})();
