(()=>{
 const toggle=document.getElementById('mobileToggle'); const panel=document.getElementById('mobileMenu');
 if(toggle&&panel){toggle.addEventListener('click',()=>{const open=panel.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기')});panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}
 const form=document.getElementById('consultationForm'); if(!form)return;
 const isLive = location.protocol === 'https:' && !form.hasAttribute('data-netlify');
 const submitButton = form.querySelector('button[type=submit]');
 const availability = document.getElementById('formAvailability');
 if (isLive) {
   submitButton.disabled = false;
   availability.textContent = '접수된 내용을 확인한 뒤 남겨주신 연락처로 연락드립니다.';
 }
 const chosenRegion=new URLSearchParams(location.search).get('region');
 const regionNames={busan:'부산',gimhae:'김해',yangsan:'양산',ulsan:'울산',changwon:'창원'};
 if(chosenRegion&&regionNames[chosenRegion])form.querySelector('[name=region]').value=regionNames[chosenRegion];
 const textarea=document.getElementById('message');const counter=document.getElementById('messageCount');const status=document.getElementById('formStatus');
 textarea.addEventListener('input',()=>{counter.textContent=textarea.value.length+' / 1000자'});
 form.addEventListener('submit', event => {
   if (!isLive) {
     event.preventDefault();
     status.hidden = false;
     status.textContent = '현재는 전화 또는 카카오톡으로 상담 문의를 받고 있습니다.';
     return;
   }
   const phone = form.querySelector('[name=phone]');
   const digits = phone.value.replace(/\D/g, '');
   if (digits.length < 8 || digits.length > 15) {
     event.preventDefault();
     phone.setCustomValidity('연락 가능한 전화번호를 입력해 주세요.');
     phone.reportValidity();
   }
 });
 form.querySelector('[name=phone]').addEventListener('input',e=>e.target.setCustomValidity(''));
})();