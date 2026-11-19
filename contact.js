(()=>{
 const toggle=document.getElementById('mobileToggle'); const panel=document.getElementById('mobileMenu');
 if(toggle&&panel){toggle.addEventListener('click',()=>{const open=panel.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기')});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}
 const form=document.getElementById('consultationForm'); if(!form)return;
 const chosenRegion=new URLSearchParams(location.search).get('region');
 const regionNames={busan:'부산',gimhae:'김해',yangsan:'양산',ulsan:'울산',changwon:'창원'};
 if(chosenRegion&&regionNames[chosenRegion])form.querySelector('[name=region]').value=regionNames[chosenRegion];
 const textarea=document.getElementById('message');const counter=document.getElementById('messageCount');const status=document.getElementById('formStatus');
 textarea.addEventListener('input',()=>{counter.textContent=textarea.value.length+' / 1000자'});
 form.addEventListener('submit',e=>{
   const phone=form.querySelector('[name=phone]');const digits=phone.value.replace(/\D/g,'');
   if(digits.length<8 || digits.length>15){e.preventDefault();phone.setCustomValidity('연락 가능한 전화번호를 입력해 주세요.');phone.reportValidity();return}
   phone.setCustomValidity('');
   if(!['http:','https:'].includes(location.protocol) || ['localhost','127.0.0.1','[::1]'].includes(location.hostname)){
     e.preventDefault();status.hidden=false;
     status.textContent='현재 화면은 미리보기입니다. 상담 신청 정보가 접수되거나 저장되지 않았습니다. Netlify 사이트로 게시하고 양식 접수를 활성화한 뒤 실제 제출할 수 있습니다.';
     status.scrollIntoView({behavior:'smooth',block:'nearest'});
   }
 });
 form.querySelector('[name=phone]').addEventListener('input',e=>e.target.setCustomValidity(''));
})();