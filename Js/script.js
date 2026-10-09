const club={
    name:"Harare Amateur Swimming Club",
    founded:2025,
    motto:'Train Hard, Swim Fast',
    homeGround:'Highlands Swimming Pool',
    trainingdays:['Saturday']

}
const events=[
    {
    name:'Home',
    type: '',
    date:'',
    venue:'',
    note:''
},
{
    name:'Home',
    type: '',
    date:'',
    venue:'',
    note:''
},
{
    name:'Home',
    type: '',
    date:'',
    venue:'',
    note:''
},
{
    name:'Home',
    type: '',
    date:'',
    venue:'',
    note:''
}
];
function renderEvents(){
    const list = document.getElementsById('eventList');
    if (list)return;

    let html ='';

    for(let i =0; i<events.length; i++){
        const ev = events[i];
        const when =formatDate(ev.date);
        html += `
        <div class="card event-card" data-index="${i}">  
        <span class="tag"> ${ev.type.toUpperCase()} </span>
        <h3>${ev.name}</h3>
        <p >${when} &middot;${ev.venue}</p>
        <p class="event-note" style="display:none; color:var(--clay-dark); font-size:0.88rem;">${ev.note}</p>
        </div> `;
    }

    list.innerHTML =html;

    const cards =list.querySelectorAll('.event-card');
    cards.forEach(function (card){
        const note=card.querySelector('.event-note');
        card.addEventListener('mouseover', function (){
            note.style.display='block';
        });
       card.addEventListener('mouseout', function (){
            note.style.display='none';
        });
 });

    }
    function renderFixtureTable(){
        const body= document.getElementsById('fixtureTableBody');
        if (!body) return;

        let rows ='';
        for (let i=0; i< events.length; i++){
            const ev =events[i];
            rows +=`
            <tr>
            <td>${formatDate(ev.date)}</td>
            <td>${ev.name}</td>
            <td>${ev.venue}</td>
            <td>${ev.type}</td>
            </tr>`;
        }
        body.innerHTML= rows;
    }
    function formatDate(isoString) {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const d = new Date(isoString);
  return d.toLocaleString('en-GB', options);
}


function getNextEvent() {
  const now = new Date();
  for (let i = 0; i < events.length; i++) {
    const eventDate = new Date(events[i].date);
    if (eventDate > now) {
      return events[i];
    }
  }
  return null; 
}



function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

function setupGalleryLightbox() {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const closeBtn = document.getElementById('lightboxClose');
  const imageEl = document.getElementById('lightboxImage');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');

  const items = grid.querySelectorAll('.gallery-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      const thumbnail = item.querySelector('.gallery-img');
      const caption = item.querySelector('.caption');
      imageEl.src = thumbnail.src;
      imageEl.alt = thumbnail.alt;
      titleEl.textContent = item.dataset.title || thumbnail.alt;
      captionEl.textContent = item.dataset.caption || caption.textContent;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
}


function setupFormValidation() {
  const form = document.getElementById('clubForm');
  if (!form) return;

  const reasonSelect = document.getElementById('reason');
  

 
  
  reasonSelect.addEventListener('change', togglePositionField);
  togglePositionField();

  function showError(fieldWrapper) {
    fieldWrapper.classList.add('invalid');
  }
  function clearError(fieldWrapper) {
    fieldWrapper.classList.remove('invalid');
  }

  function validateField(id) {
    const wrapper = document.getElementById('field-' + id);
    const input = document.getElementById(id);
    const value = input.value.trim();
    let valid = true;

    if (id === 'full_name') {
      valid = value.length >= 2;
    } else if (id === 'email') {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      valid = pattern.test(value);
    } else if (id === 'phone') {
      valid = value === '' || /^[0-9+ ()-]{7,20}$/.test(value);
    } else if (id === 'position') {
      valid = reasonSelect.value !== 'join' || value.length > 0;
    }

    if (valid) {
      clearError(wrapper);
    } else {
      showError(wrapper);
    }
    return valid;
  }

  
  ['full_name', 'email', 'phone'].forEach(function (id) {
    document.getElementById(id).addEventListener('blur', function () {
      validateField(id);
    });
  });

}


function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

