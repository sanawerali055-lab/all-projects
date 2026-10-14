const tracks = [
 {title:'Zara Zara',artist:'Omkar Singh',file:'zara-zara.mp3',cover:'zara-zara.jpg',mood:'Romantic'},
 {title:'Casa Tupka',artist:'Yo Yo Honey Singh',file:'casa-tupika.mp3',cover:'casa-tupika.jpg',mood:'Desi'},
 {title:'Alvida Alvida',artist:'Nabeel Shaukat Ali',file:'alvida-alvida.mp3',cover:'alvida-alvida.jpg',mood:'Romantic'},
 {title:'Dil Dilbara Bharta',artist:'Ammar Hosenzehi',file:'dil-dilbara-bharta.mp3',cover:'dil-dilbara-bharta.jpg',mood:'Chill'},
 {title:'Nazrein',artist:'Gravero & Faizal',file:'nazrein.mp3',cover:'nazrein.jpg',mood:'Romantic'},
 {title:'Ashke',artist:'Karan Aujla',file:'ashke.mp3',cover:'ashke.jpg',mood:'Desi'},
 {title:'Ruposh',artist:'Wajhi Farooki',file:'ruposh.mp3',cover:'ruposh.jpg',mood:'Romantic'},
 {title:'Jhol',artist:'Maanu & Annural Khalid',file:'jhol.mp3',cover:'jhol.jpg',mood:'Chill'},
 {title:'Barbaad',artist:'Jubin Nautiyal',file:'barbaad.mp3',cover:'barbaad.png',mood:'Sad'},
 {title:'Barsaat',artist:'Banjaare',file:'barsaat.mp3',cover:'barsaat.jpg',mood:'Chill'}
];
const $ = id => document.getElementById(id);
const audio = $('audioPlayer'); let currentIndex = 0; let shuffled = false; let repeat = false; let liked = false;
const grid = $('songGrid');
function renderTracks(list = tracks){
 grid.innerHTML = '';
 list.forEach(track => { const i = tracks.indexOf(track); const card = document.createElement('article'); card.className='song-card'; card.innerHTML=`<div class="cover-wrap"><img src="images/${track.cover}" alt="${track.title} cover" loading="lazy"><span class="track-number">${String(i+1).padStart(2,'0')}</span><button class="cover-play" aria-label="Play ${track.title}"><i class="bi bi-play-fill"></i></button></div><div class="song-name" title="${track.title}">${track.title}</div><div class="song-artist" title="${track.artist}">${track.artist}</div><span class="tag ${track.mood.toLowerCase()}">${track.mood}</span>`; card.querySelector('button').addEventListener('click',()=>playTrack(i,true)); card.querySelector('.cover-wrap img').addEventListener('click',()=>playTrack(i,true)); card.querySelector('img').style.cursor='pointer'; grid.appendChild(card); });
 if(!list.length) grid.innerHTML='<p class="empty-state">No songs found. Try another search.</p>';
}
function fmt(seconds){if(!Number.isFinite(seconds))return '0:00';return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`}
function updateTrackUI(){const t=tracks[currentIndex]; $('npArt').src='images/'+t.cover;$('npArt').alt=t.title+' cover';$('npTitle').textContent=t.title;$('npArtist').textContent=t.artist;$('bottomArt').src='images/'+t.cover;$('bottomTitle').textContent=t.title;$('bottomArtist').textContent=t.artist;document.title=`${t.title} — Echo`;updatePlayIcons();$('likeBtn').innerHTML=`<i class="bi ${liked?'bi-heart-fill':'bi-heart'}"></i>`;$('likeBtn').classList.toggle('liked',liked);}
function updatePlayIcons(){const icon=audio.paused?'bi-play-fill':'bi-pause-fill';['playBtn','bottomPlay'].forEach(id=>$(id).innerHTML=`<i class="bi ${icon}"></i>`);$('playBtn').setAttribute('aria-label',audio.paused?'Play':'Pause');$('bottomPlay').setAttribute('aria-label',audio.paused?'Play':'Pause');}
function playTrack(index,autoplay=false){currentIndex=(index+tracks.length)%tracks.length;liked=false;audio.src='audio/'+tracks[currentIndex].file;audio.load();updateTrackUI();if(autoplay)audio.play().then(updatePlayIcons).catch(()=>updatePlayIcons());}
function togglePlay(){if(!audio.src)playTrack(currentIndex,false);if(audio.paused){audio.play().then(updatePlayIcons).catch(()=>updatePlayIcons())}else{audio.pause();updatePlayIcons()}}
function nextTrack(){if(shuffled){let n=currentIndex;while(tracks.length>1&&n===currentIndex)n=Math.floor(Math.random()*tracks.length);playTrack(n,true)}else playTrack(currentIndex+1,true)}
function prevTrack(){if(audio.currentTime>3){audio.currentTime=0;return}playTrack(currentIndex-1,true)}
function syncProgress(){const pct=audio.duration?(audio.currentTime/audio.duration)*100:0;['progress','bottomProgress'].forEach(id=>$(id).value=pct);['currentTime','bottomCurrent'].forEach(id=>$(id).textContent=fmt(audio.currentTime));['duration','bottomDuration'].forEach(id=>$(id).textContent=fmt(audio.duration));}
function seek(value){if(audio.duration)audio.currentTime=(Number(value)/100)*audio.duration}
function setVolume(value){audio.volume=Number(value);$('volume').value=value;$('bottomVolume').value=value}
renderTracks();playTrack(0,false);setVolume(.8);
['playBtn','bottomPlay'].forEach(id=>$(id).addEventListener('click',togglePlay));['nextBtn','bottomNext'].forEach(id=>$(id).addEventListener('click',nextTrack));['prevBtn','bottomPrev'].forEach(id=>$(id).addEventListener('click',prevTrack));
audio.addEventListener('play',updatePlayIcons);audio.addEventListener('pause',updatePlayIcons);audio.addEventListener('timeupdate',syncProgress);audio.addEventListener('loadedmetadata',syncProgress);audio.addEventListener('ended',()=>repeat?(audio.currentTime=0,audio.play()):nextTrack());
['progress','bottomProgress'].forEach(id=>$(id).addEventListener('input',e=>seek(e.target.value)));['volume','bottomVolume'].forEach(id=>$(id).addEventListener('input',e=>setVolume(e.target.value)));
$('shuffleBtn').addEventListener('click',()=>{shuffled=!shuffled;$('shuffleBtn').style.color=shuffled?'#c56aff':''});$('repeatBtn').addEventListener('click',()=>{repeat=!repeat;$('repeatBtn').style.color=repeat?'#c56aff':''});$('likeBtn').addEventListener('click',()=>{liked=!liked;updateTrackUI()});$('queueBtn').addEventListener('click',()=>{grid.scrollIntoView({behavior:'smooth',block:'center'});});
$('scrollLeft').addEventListener('click',()=>grid.scrollBy({left:-350,behavior:'smooth'}));$('scrollRight').addEventListener('click',()=>grid.scrollBy({left:350,behavior:'smooth'}));
$('songSearch').addEventListener('input',e=>renderTracks(tracks.filter(t=>(t.title+' '+t.artist+' '+t.mood).toLowerCase().includes(e.target.value.toLowerCase()))));
document.querySelectorAll('.mood-card').forEach(card=>card.addEventListener('click',()=>{const mood=card.dataset.mood; $('songSearch').value=mood;renderTracks(tracks.filter(t=>t.mood===mood));$('music').scrollIntoView({behavior:'smooth'});}));
$('themeToggle').addEventListener('click',()=>{document.body.classList.toggle('light-mode');$('themeToggle').innerHTML=`<i class="bi ${document.body.classList.contains('light-mode')?'bi-moon-stars':'bi-sun'}"></i>`});
const contactForm = $('contactForm');
const contactFields = {
 name: {input: $('contactName'), error: $('nameError')},
 email: {input: $('contactEmail'), error: $('emailError')},
 comments: {input: $('contactComments'), error: $('commentsError')}
};
function setFieldError(key, message) {
 const field = contactFields[key];
 field.error.textContent = message;
 field.input.classList.toggle('is-invalid', Boolean(message));
 field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
}
function validateContactField(key) {
 const value = contactFields[key].input.value.trim();
 let message = '';
 if (key === 'name') {
   if (!value) message = 'Please enter your name.';
   else if (value.length < 2) message = 'Name must be at least 2 characters.';
   else if (value.length > 60) message = 'Name must be 60 characters or fewer.';
   else if (!/[\p{L}]/u.test(value)) message = 'Please enter a valid name.';
 } else if (key === 'email') {
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
   if (!value) message = 'Please enter your email address.';
   else if (value.length > 254 || !emailPattern.test(value)) message = 'Please enter a valid email address.';
 } else {
   if (!value) message = 'Please add a comment or song recommendation.';
   else if (value.length < 10) message = 'Please write at least 10 characters.';
   else if (value.length > 1000) message = 'Comments must be 1000 characters or fewer.';
 }
 setFieldError(key, message);
 return !message;
}
Object.entries(contactFields).forEach(([key, field]) => {
 field.input.addEventListener('blur', () => validateContactField(key));
 field.input.addEventListener('input', () => {
   if (field.input.classList.contains('is-invalid')) validateContactField(key);
   $('formMessage').textContent = '';
 });
});
contactForm.addEventListener('submit', e => {
 e.preventDefault();
 const keys = Object.keys(contactFields);
 const valid = keys.map(validateContactField).every(Boolean);
 if (!valid) {
   const firstInvalid = contactForm.querySelector('.is-invalid');
   if (firstInvalid) firstInvalid.focus();
   $('formMessage').textContent = 'Please fix the highlighted fields and try again.';
   $('formMessage').className = 'form-message error';
   return;
 }
 $('formMessage').textContent = `Thanks, ${contactFields.name.input.value.trim()}! Your form passed validation. This demo does not send email yet.`;
 $('formMessage').className = 'form-message success';
 contactForm.reset();
 keys.forEach(key => setFieldError(key, ''));
});
