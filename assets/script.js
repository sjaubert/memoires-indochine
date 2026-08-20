(function(){
  var j=document.querySelector('.jauge span'); if(!j) return;
  function maj(){
    var h=document.documentElement, m=h.scrollHeight-h.clientHeight;
    j.style.width=(m>0?(h.scrollTop||document.body.scrollTop)/m*100:0)+'%';
  }
  addEventListener('scroll',maj,{passive:true}); addEventListener('resize',maj); maj();
})();
/* Cartes : clic pour basculer entre largeur de page et taille reelle,
   puis defilement a la souris maintenue. */
(function(){
  document.querySelectorAll('.carte-cadre').forEach(function(cadre){
    var img=cadre.querySelector('img'); if(!img) return;
    function bascule(){
      var z=cadre.classList.toggle('zoom');
      var b=cadre.parentNode.querySelector('.js-zoom');
      if(b) b.textContent = z ? 'Ajuster à la page' : 'Voir en taille réelle';
      if(z){
        cadre.scrollLeft=(cadre.scrollWidth-cadre.clientWidth)/2;
        cadre.scrollTop=(cadre.scrollHeight-cadre.clientHeight)/2;
      }
    }
    img.addEventListener('click',bascule);
    var b=cadre.parentNode.querySelector('.js-zoom');
    if(b) b.addEventListener('click',bascule);
    var tire=false,x0=0,y0=0,sx=0,sy=0;
    cadre.addEventListener('mousedown',function(e){
      if(!cadre.classList.contains('zoom')) return;
      tire=true; x0=e.pageX; y0=e.pageY; sx=cadre.scrollLeft; sy=cadre.scrollTop;
      cadre.style.cursor='grabbing'; e.preventDefault();
    });
    addEventListener('mouseup',function(){tire=false; cadre.style.cursor='';});
    addEventListener('mousemove',function(e){
      if(!tire) return;
      cadre.scrollLeft=sx-(e.pageX-x0); cadre.scrollTop=sy-(e.pageY-y0);
    });
  });
})();
(function(){
  var p=document.body.dataset.prec, s=document.body.dataset.suiv;
  addEventListener('keydown',function(e){
    if(e.metaKey||e.ctrlKey||e.altKey) return;
    if(e.key==='ArrowLeft'&&p) location.href=p;
    if(e.key==='ArrowRight'&&s) location.href=s;
  });
})();
/* Lien de contact : l'adresse est assemblee au chargement pour qu'elle
   n'apparaisse pas en clair dans le code source des pages. */
(function(){
  var cible=document.getElementById('contact'); if(!cible) return;
  var nom='stephane.jaubert', domaine='gmail.com';
  var objet=encodeURIComponent('Mémoires du Colonel Jacques JAUBERT');
  var lien=document.createElement('a');
  lien.href='mailto:'+nom+'@'+domaine+'?subject='+objet;
  lien.textContent='Contact';
  cible.appendChild(document.createTextNode(' · '));
  cible.appendChild(lien);
})();
