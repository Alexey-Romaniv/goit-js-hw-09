((t,e)=>{const r=document.querySelector(t),d=document.querySelector(e);let o=null;r.addEventListener("click",(()=>{r.setAttribute("disabled","true"),d.removeAttribute("disabled"),o=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),d.addEventListener("click",(()=>{r.removeAttribute("disabled"),d.setAttribute("disabled","true"),clearInterval(o)}))})("button[data-start]","button[data-stop]");
//# sourceMappingURL=01-color-switcher.b147e159.js.map
