/* PCam Vision. Interacciones locales; no hay inferencia ni servicios de análisis. */
(function () {
"use strict";
const {data:D,metrics,score,clampIndex,resolveLocation,percent,decimal}=globalThis.PCam;
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const slides=$$("main > .slide");
const ids=slides.map(s=>s.id);
let active=resolveLocation(location.hash,ids);
let presenting=false, modelIndex=1, cnnStep=0, source="validation", metric="balanced_accuracy", learning="balanced";
let zoomTrigger=null, lastValidationMetric="balanced_accuracy";
const notes=$("#speaker-notes"), menu=$("#site-index"), dialog=$("#zoom-dialog");
const status=message=>{$("#app-status").textContent=message;};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const chartText=(x,y,text,extra="")=>'<text x="'+x+'" y="'+y+'" '+extra+'>'+escapeHTML(text)+'</text>';
function updateNavigation() {
  slides.forEach((s,i)=>{s.classList.toggle("active",i===active);s.hidden=presenting&&i!==active;});
  $("#slide-position").textContent=String(active+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
  $("#slide-label").textContent=slides[active].dataset.label;
  $("#slide-prev").disabled=active===0;
  $("#slide-next").disabled=active===slides.length-1;
  $("#reading-progress").style.width=((active+1)/slides.length*100)+"%";
  $("#notes-heading").textContent=D.notes[active][0];
  $("#notes-body").textContent=D.notes[active][1];
  $$("#site-index a").forEach((a,i)=>{if(i===active)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current");});
}
function closeMenu() {menu.hidden=true;$("#index-toggle").setAttribute("aria-expanded","false");}
function navigate(index,push=false) {
  active=clampIndex(index,slides.length);
  updateNavigation();if(ids[active]==="comparacion")renderComparison();if(ids[active]==="aprendizaje")renderLearning();const focusWasInMenu=menu.contains(document.activeElement);closeMenu();if(focusWasInMenu)$("#contenido").focus({preventScroll:true});
  if(push&&location.hash!=="#"+ids[active])history.pushState(null,"","#"+ids[active]);
  if(presenting)window.scrollTo({top:0,behavior:"instant"});
  else slides[active].scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
}
function setMode(enabled) {
  presenting=enabled;
  document.body.classList.toggle("presenting",enabled);
  $(".presentation-controls").hidden=!enabled;
  $("#mode-toggle").setAttribute("aria-pressed",String(enabled));
  $("#mode-toggle span").textContent=enabled?"Explorar":"Exponer";
  updateNavigation();closeMenu();
  if(enabled){window.scrollTo({top:0,behavior:"instant"});$("#contenido").focus({preventScroll:true});status("Modo de exposición. Usa las flechas para cambiar de diapositiva.");}
  else {slides[active].scrollIntoView({behavior:"instant",block:"start"});status("Modo de exploración.");if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});}
}
function setNotes(open) {
  notes.hidden=!open;
  document.body.classList.toggle("notes-open",open);
  renderComparison();renderLearning();
  $("#notes-toggle").setAttribute("aria-expanded",String(open));
}
$("#notes-toggle").addEventListener("click",()=>setNotes(notes.hidden));
$("#notes-close").addEventListener("click",()=>{setNotes(false);$("#notes-toggle").focus();});
$("#index-toggle").addEventListener("click",()=>{const open=menu.hidden;menu.hidden=!open;$("#index-toggle").setAttribute("aria-expanded",String(open));});
document.addEventListener("click",e=>{if(!menu.hidden&&!menu.contains(e.target)&&!$("#index-toggle").contains(e.target))closeMenu();});
$("#mode-toggle").addEventListener("click",()=>setMode(!presenting));
$$("[data-start-presenting]").forEach(b=>b.addEventListener("click",()=>setMode(true)));
$("#end-presentation").addEventListener("click",()=>{setMode(false);$("#mode-toggle").focus();});
$("#slide-prev").addEventListener("click",()=>navigate(active-1,true));
$("#slide-next").addEventListener("click",()=>navigate(active+1,true));
$$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const index=ids.indexOf(a.getAttribute("href").slice(1));
  if(index>=0){e.preventDefault();navigate(index,true);}
}));
window.addEventListener("popstate",()=>navigate(resolveLocation(location.hash,ids)));
window.addEventListener("hashchange",()=>navigate(resolveLocation(location.hash,ids)));
let pendingScroll=false;
window.addEventListener("scroll",()=>{
  if(presenting||pendingScroll)return;
  pendingScroll=true;
  requestAnimationFrame(()=>{
    pendingScroll=false;
    if(presenting)return;
    const line=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header"))+Math.min(innerHeight*.25,180);
    let found=0;slides.forEach((s,i)=>{if(s.getBoundingClientRect().top<=line)found=i;});
    if(found!==active){active=found;updateNavigation();}
  });
},{passive:true});
$("#fullscreen-toggle").addEventListener("click",async()=>{
  try{
    if(document.fullscreenElement)await document.exitFullscreen();
    else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();
    else status("Este navegador no permite activar la pantalla completa. Puedes usar el modo de exposición.");
  }catch(error){status("No se pudo activar la pantalla completa. El modo de exposición sigue disponible.");}
});
document.addEventListener("fullscreenchange",()=>{
  const on=Boolean(document.fullscreenElement);
  $("#fullscreen-toggle").setAttribute("aria-pressed",String(on));
  $("#fullscreen-toggle").setAttribute("aria-label",on?"Salir de pantalla completa":"Pantalla completa");
});
document.addEventListener("keydown",e=>{
  if(dialog.open)return;
  if(e.key==="Escape"){
    if(!menu.hidden){closeMenu();$("#index-toggle").focus();return;}
    if(!notes.hidden){setNotes(false);$("#notes-toggle").focus();return;}
    if(presenting){setMode(false);$("#mode-toggle").focus();return;}
  }
  if(!presenting||e.altKey||e.ctrlKey||e.metaKey||e.target.closest("input,select,textarea,summary,[contenteditable],.cnn-steps,.step-navigation,.experiment-list,.matrix,[data-chart-model],.speaker-notes"))return;
  const jump={ArrowRight:active+1,ArrowDown:active+1,PageDown:active+1,ArrowLeft:active-1,ArrowUp:active-1,PageUp:active-1,Home:0,End:slides.length-1};
  if(Object.prototype.hasOwnProperty.call(jump,e.key)){e.preventDefault();navigate(jump[e.key],true);}
});
let resizePending=false;
window.addEventListener("resize",()=>{if(resizePending)return;resizePending=true;requestAnimationFrame(()=>{resizePending=false;renderComparison();renderLearning();});});
function openZoom(trigger) {
  const figure=$(trigger.dataset.zoom);if(!figure)return;
  zoomTrigger=trigger;
  let title=trigger.dataset.zoomTitle||"Vista ampliada";
  if(figure.id==="comparison-chart")title=(source==="public"?"Kaggle público · ":"Validación · ")+(source==="public"?"Balanced accuracy":metrics[metric]);
  if(figure.id==="learning-chart")title="Dropout · "+(learning==="loss"?"Pérdida en entrenamiento y validación":"Balanced accuracy de validación");
  $("#zoom-heading").textContent=title;
  const clone=figure.cloneNode(true);
  const idMap=new Map();
  [clone,...clone.querySelectorAll("[id]")].forEach(el=>{if(el.id){idMap.set(el.id,"zoom-"+el.id);el.id="zoom-"+el.id;}});
  [clone,...clone.querySelectorAll("*")].forEach(el=>{
    ["aria-labelledby","aria-describedby"].forEach(attr=>{if(el.hasAttribute(attr))el.setAttribute(attr,el.getAttribute(attr).split(" ").map(x=>idMap.get(x)||x).join(" "));});
    if(el.hasAttribute("tabindex"))el.removeAttribute("tabindex");
    if(el.getAttribute("role")==="button"){el.removeAttribute("role");el.removeAttribute("aria-pressed");}
  });
  $("#zoom-content").replaceChildren(clone);
  if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
  document.body.classList.add("modal-open");$("#zoom-close").focus();
}
$$("[data-zoom]").forEach(b=>b.addEventListener("click",()=>openZoom(b)));
$("#zoom-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener("close",()=>{document.body.classList.remove("modal-open");$("#zoom-content").replaceChildren();if(zoomTrigger)zoomTrigger.focus();});
function setModel(index) {
  modelIndex=clampIndex(index,D.models.length);const m=D.models[modelIndex];
  $$(".experiment-button").forEach((b,i)=>{b.classList.toggle("selected",i===modelIndex);b.setAttribute("aria-pressed",String(i===modelIndex));});
  $("#experiment-tag").textContent=m.tag;
  $("#experiment-name").innerHTML=escapeHTML(m.name)+"<span>"+String(modelIndex+1).padStart(2,"0")+"</span>";
  $("#experiment-description").textContent=m.description;
  $("#experiment-architecture").textContent=m.architecture;
  $("#experiment-epochs").textContent=m.epocas_ejecutadas+" / "+m.maxEpochs;
  $("#experiment-best").textContent=m.mejor_epoca;
  $("#experiment-time").textContent=decimal(m.segundos,2)+" s";
  renderComparison();
}
$$(".experiment-button").forEach(b=>b.addEventListener("click",()=>setModel(Number(b.dataset.model))));
const metricHelp={
 balanced_accuracy:"Balanced accuracy: promedio de la proporción de aciertos dentro de cada clase.",
 accuracy:"Accuracy: proporción de aciertos entre todas las imágenes de validación.",
 precision:"Precision: entre los fragmentos predichos como clase 1, proporción que realmente era clase 1.",
 recall:"Recall o sensibilidad: entre los fragmentos de clase 1, proporción detectada correctamente.",
 f1:"F1: media armónica de precision y recall para la clase 1.",
 roc_auc:"ROC AUC: mide la capacidad de separar las clases al variar el umbral. No es un porcentaje de aciertos."
};
function renderComparison() {
  const metricName=source==="public"?"Balanced accuracy":metrics[metric];
  const compact=$("#comparison-chart").clientWidth>0&&$("#comparison-chart").clientWidth<520;
  const plotX=compact?0:155,plotWidth=compact?410:560;
  const chartWidth=compact?510:820,chartHeight=compact?450:390;
  $("#comparison-chart").setAttribute("viewBox","0 0 "+chartWidth+" "+chartHeight);
  let svg='<title id="comparison-chart-title">'+escapeHTML(metricName+" · "+(source==="public"?"Kaggle público":"validación"))+'</title><desc id="comparison-chart-desc">'+D.models.map(m=>escapeHTML(m.name+": "+decimal(score(m,metric,source),source==="public"?5:6))).join(". ")+'. Escala de 0 a 1. Se puede seleccionar cada modelo.</desc>';
  [0,.25,.5,.75,1].forEach(t=>{const x=plotX+t*plotWidth;svg+='<line x1="'+x+'" y1="'+(compact?36:28)+'" x2="'+x+'" y2="'+(compact?401:340)+'" stroke="#5c2e5d" stroke-opacity=".12"/>'+chartText(x,compact?432:370,t.toLocaleString("es-ES"),'text-anchor="'+(compact&&t===0?"start":"middle")+'" fill="#665a65" font-size="14" font-family="Inter, sans-serif"');});
  D.models.forEach((m,i)=>{
    const y=(compact?42:42)+i*(compact?76:60),v=score(m,metric,source),selected=i===modelIndex;
    svg+='<g data-chart-model="'+i+'" role="button" tabindex="0" aria-pressed="'+selected+'" aria-label="'+escapeHTML(m.name+", "+metricName+": "+decimal(v,source==="public"?5:6)+". Seleccionar modelo.")+'"><title>'+escapeHTML(m.name+": "+decimal(v,source==="public"?5:6))+'</title><rect x="0" y="'+(y-(compact?24:10))+'" width="'+chartWidth+'" height="'+(compact?67:54)+'" rx="7" fill="'+(selected?"#5c2e5d0c":"transparent")+'"/>'+chartText(compact?0:140,compact?y-7:y+20,m.name,'text-anchor="'+(compact?"start":"end")+'" fill="#431745" font-size="'+(compact?20:16)+'" font-family="Manrope, sans-serif" font-weight="'+(selected?"700":"500")+'"')+'<rect x="'+plotX+'" y="'+(y+(compact?6:0))+'" width="'+(v*plotWidth)+'" height="29" rx="5" fill="'+(selected?"#5c2e5d":"#b99bb9")+'"/>'+chartText(compact?chartWidth:plotX+v*plotWidth+12,y+(compact?28:21),decimal(v,source==="public"?5:6),'text-anchor="'+(compact?"end":"start")+'" fill="#431745" font-size="'+(compact?18:14)+'" font-family="Inter, sans-serif" font-weight="'+(selected?"700":"500")+'"')+'</g>';
  });
  $("#comparison-chart").innerHTML=svg;
  $("#comparison-caption").textContent=metricName+" · "+(source==="public"?"Kaggle público · registro del 15 nov 2026":"validación")+" · escala completa de 0 a 1.";
  const m=D.models[modelIndex];
  $("#score-label").textContent=m.name.toUpperCase()+" · "+(source==="public"?"KAGGLE PÚBLICO":"VALIDACIÓN");
  $("#score-highlight").textContent=decimal(score(m,metric,source),source==="public"?5:6);
  $("#score-description").textContent=metricName;
  $("#metric-explainer").textContent=source==="public"?"Balanced accuracy pública de Kaggle. Es una evaluación distinta de validación; el resultado privado final no está incluido.":metricHelp[metric];
}
function selectChartModel(e) {
  const g=e.target.closest("[data-chart-model]");if(!g)return;
  const keyboard=e.type==="keydown";if(keyboard&&!["Enter"," "].includes(e.key))return;
  if(keyboard)e.preventDefault();
  const index=Number(g.dataset.chartModel);setModel(index);
  if(keyboard)$("#comparison-chart").querySelector('[data-chart-model="'+index+'"]').focus();
}
$("#comparison-chart").addEventListener("click",selectChartModel);
$("#comparison-chart").addEventListener("keydown",selectChartModel);
$$('input[name="score-source"]').forEach(r=>r.addEventListener("change",()=>{
  source=r.value;
  if(source==="public"){lastValidationMetric=metric;$("#metric-select").value="balanced_accuracy";}
  else {metric=lastValidationMetric;$("#metric-select").value=metric;}
  $("#metric-select").disabled=source==="public";renderComparison();
}));
$("#metric-select").addEventListener("change",e=>{metric=e.target.value;lastValidationMetric=metric;renderComparison();});
function renderLearning() {
  const compact=$("#learning-chart").clientWidth>0&&$("#learning-chart").clientWidth<520;
  const left=compact?45:66,top=30,width=compact?420:655,height=compact?240:302,bottom=top+height,legendY=compact?345:399;
  $("#learning-chart").setAttribute("viewBox","0 0 "+(compact?510:780)+" "+(compact?370:420));
  const point=(i,value)=>(left+i*width/4)+","+(bottom-value*height);
  const series=learning==="loss"?[{key:"loss",label:"Entrenamiento",color:"#5c2e5d"},{key:"val_loss",label:"Validación",color:"#16856a"}]:[{key:"val_balanced_accuracy",label:"BA de validación",color:"#5c2e5d"}];
  let svg='<title id="learning-title">'+(learning==="loss"?"Pérdida de Dropout en entrenamiento y validación":"Balanced accuracy de Dropout en validación")+'</title><desc id="learning-desc">Cinco épocas. Mejor época por BA: 2. '+series.map(s=>s.label+": "+D.history.map(h=>decimal(h[s.key],6)).join(", ")).join(". ")+'. Escala de 0 a 1.</desc>';
  [0,.25,.5,.75,1].forEach(t=>{const y=bottom-t*height;svg+='<line x1="'+left+'" x2="'+(left+width)+'" y1="'+y+'" y2="'+y+'" stroke="#5c2e5d" stroke-opacity=".13"/>'+chartText(left-15,y+5,t.toLocaleString("es-ES"),'text-anchor="end" fill="#665a65" font-size="13" font-family="Inter, sans-serif"');});
  D.history.forEach((h,i)=>{const x=left+i*width/4;svg+=chartText(x,bottom+30,h.epoch,'text-anchor="middle" fill="#665a65" font-size="14" font-family="Inter, sans-serif"');});
  const bestX=left+width/4;
  svg+='<line x1="'+bestX+'" x2="'+bestX+'" y1="'+top+'" y2="'+bottom+'" stroke="#9b65a0" stroke-width="1.5" stroke-dasharray="5 6"/>'+chartText(bestX+10,top+18,"Mejor época: 2",'fill="#5c2e5d" font-size="12" font-family="Inter, sans-serif"');
  series.forEach((s,si)=>{
    svg+='<polyline fill="none" stroke="'+s.color+'" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" points="'+D.history.map((h,i)=>point(i,h[s.key])).join(" ")+'"/>';
    D.history.forEach((h,i)=>{const [x,y]=point(i,h[s.key]).split(",");svg+='<circle cx="'+x+'" cy="'+y+'" r="'+(i===1?6:4)+'" fill="'+s.color+'" stroke="#fff7fb" stroke-width="2"><title>Época '+h.epoch+" · "+s.label+": "+decimal(h[s.key],6)+'</title></circle>';});
    svg+='<line x1="'+(left+si*235)+'" x2="'+(left+24+si*235)+'" y1="'+legendY+'" y2="'+legendY+'" stroke="'+s.color+'" stroke-width="3"/>'+chartText(left+33+si*235,legendY+5,s.label,'fill="#665a65" font-size="12" font-family="Inter, sans-serif"');
  });
  svg+=chartText(left+width,bottom+44,"Época",'text-anchor="end" fill="#665a65" font-size="12" font-family="Inter, sans-serif"');
  $("#learning-chart").innerHTML=svg;
  $("#learning-caption").textContent="Dropout · "+(learning==="loss"?"entropía cruzada binaria":"balanced accuracy de validación")+" · escala de 0 a 1.";
}
$$('input[name="learning-metric"]').forEach(r=>r.addEventListener("change",()=>{learning=r.value;renderLearning();}));
function cnnSVG(kind) {
  let svg='<svg viewBox="0 0 430 280" aria-hidden="true">';
  const text=(x,y,t,fill="#a9f1d9",size=13)=>chartText(x,y,t,'fill="'+fill+'" font-size="'+size+'" font-family="Inter, sans-serif" text-anchor="middle"');
  const grid=(x,y,rows,cols,cell,opacity=1)=>{
    let result="";for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)result+='<rect x="'+(x+c*(cell+3))+'" y="'+(y+r*(cell+3))+'" width="'+cell+'" height="'+cell+'" rx="2" fill="'+((r+c)%3===0?"#a9f1d9":"#d2aacb")+'" opacity="'+(opacity*((r+c)%3===0?.95:.45))+'"/>';return result;
  };
  if(kind==="conv"||kind==="deep"){
    const count=kind==="conv"?3:4;
    for(let p=count-1;p>=0;p--)svg+='<rect x="'+(145+p*23)+'" y="'+(45-p*10)+'" width="145" height="155" rx="8" fill="#5c2e5d" stroke="'+(p%2?"#a9f1d9":"#d2aacb")+'" stroke-width="1.5"/>';
    svg+=grid(155,57,6,5,19,.85);
    svg+=text(215,250,kind==="conv"?"16 mapas de características":"32 mapas · 8 × 8 cada uno");
  }else if(kind==="pool"){
    svg+=grid(35,60,4,4,26);
    svg+='<path d="M188 130h45m-10-10 10 10-10 10" fill="none" stroke="#a9f1d9" stroke-width="2"/>';
    svg+=grid(270,89,2,2,39);
    svg+=text(90,235,"32 × 32", "#d2aacb")+text(310,235,"16 × 16");
  }else if(kind==="dense"){
    const counts=[6,5,4];counts.forEach((count,column)=>{
      const x=95+column*120;
      for(let i=0;i<count;i++){
        const y=42+i*(196/(count-1));
        if(column<counts.length-1)for(let j=0;j<counts[column+1];j++)svg+='<line x1="'+x+'" y1="'+y+'" x2="'+(x+120)+'" y2="'+(42+j*196/(counts[column+1]-1))+'" stroke="#d2aacb" stroke-opacity=".22"/>';
      }
    });
    counts.forEach((count,column)=>{for(let i=0;i<count;i++)svg+='<circle cx="'+(95+column*120)+'" cy="'+(42+i*196/(count-1))+'" r="10" fill="'+(column===2?"#a9f1d9":"#9b65a0")+'" stroke="#d2aacb"/>';});
    svg+=text(215,275,"Conexiones ilustrativas · Dense 32","#d2aacb",11);
  }else if(kind==="output"){
    svg+='<path d="M65 200H370M95 220V40" stroke="#d2aacb" stroke-opacity=".4"/><path d="M105 194C170 194 178 180 214 128S265 65 350 64" fill="none" stroke="#a9f1d9" stroke-width="5"/><path d="M214 49V214" stroke="#d2aacb" stroke-dasharray="4 6"/>';
    svg+=text(215,242,"Umbral = 0,5")+text(130,268,"Clase 0","#d2aacb",12)+text(310,268,"Clase 1","#d2aacb",12)+text(66,68,"1","#d2aacb",12)+text(65,202,"0","#d2aacb",12);
  }
  return svg+"</svg>";
}
function renderCNN() {
  const s=D.steps[cnnStep];
  $$(".cnn-step").forEach((b,i)=>{b.classList.toggle("selected",i===cnnStep);b.setAttribute("aria-pressed",String(i===cnnStep));});
  $("#cnn-counter").textContent=String(cnnStep+1).padStart(2,"0")+" / 06";
  $("#cnn-title").textContent=s.title;$("#cnn-text").textContent=s.text;$("#cnn-size").textContent=s.size;$("#cnn-note").textContent=s.note;
  $("#cnn-prev").disabled=cnnStep===0;$("#cnn-next").disabled=cnnStep===D.steps.length-1;
  $("#cnn-visual").innerHTML=s.visual==="image"?'<div class="tissue-crop crop-a"><img src="assets/tejidos-pcam.png" alt="" width="1025" height="1120"></div>':cnnSVG(s.visual);
}
$$(".cnn-step").forEach(b=>b.addEventListener("click",()=>{cnnStep=Number(b.dataset.step);renderCNN();}));
$("#cnn-prev").addEventListener("click",()=>{cnnStep=clampIndex(cnnStep-1,D.steps.length);renderCNN();});
$("#cnn-next").addEventListener("click",()=>{cnnStep=clampIndex(cnnStep+1,D.steps.length);renderCNN();});
const cells=[
 ["ACIERTOS DE CLASE 0","12 802 fragmentos bien clasificados.","Tenían etiqueta de clase 0 y la red los clasificó como clase 0."],
 ["FALSOS POSITIVOS","3 597 fragmentos marcados de más.","Tenían etiqueta de clase 0, pero la red los clasificó como clase 1."],
 ["FALSOS NEGATIVOS","4 637 fragmentos no detectados.","Tenían etiqueta de clase 1, pero la red los clasificó como clase 0."],
 ["ACIERTOS DE CLASE 1","11 732 fragmentos bien detectados.","Tenían etiqueta de clase 1 y la red los clasificó como clase 1."]
];
function setCell(index) {
  $$(".matrix-cell").forEach((b,i)=>{b.classList.toggle("selected",i===index);b.setAttribute("aria-pressed",String(i===index));});
  $("#cell-label").textContent=cells[index][0];$("#cell-title").textContent=cells[index][1];$("#cell-description").textContent=cells[index][2];
}
$$(".matrix-cell").forEach(b=>b.addEventListener("click",()=>setCell(Number(b.dataset.cell))));
updateNavigation();setModel(1);renderLearning();renderCNN();setCell(2);
if(location.hash&&ids.includes(location.hash.slice(1)))requestAnimationFrame(()=>slides[active].scrollIntoView({behavior:"instant",block:"start"}));
})();
