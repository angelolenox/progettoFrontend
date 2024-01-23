let navBar = document.querySelector('#navBar');
let listNavbar = document.querySelectorAll('#listNavbar');
let logo = document.querySelector('#logo');
let logo2 = document.querySelector('#logo2');
let iconNav = document.querySelector('#iconNav');
let aNavbar = document.querySelector('#aNavbar');

let firstSpan = document.querySelector('#firstSpan');
let secondSpan = document.querySelector('#secondSpan');
let thirdSpan = document.querySelector('#thirdSpan');

let scroller = document.querySelector('#scroller');
// let styleScroller = document.querySelector('.style-scroller');
let btnScroller = document.querySelector('#btnScroller');

window.addEventListener('scroll',()=>{
    if(window.scrollY > 0){
        scroller.classList.remove('d-none');
        navBar.style.backgroundColor = 'var(--darkblue)';
        logo.classList.add('d-none');
        logo2.classList.remove('d-none');
        listNavbar.forEach((el)=>{
            el.classList.remove('text-mydarkblue');
            el.classList.add('text-mywhite');
            
        });
    } else {
        scroller.classList.add('d-none');
        navBar.style.backgroundColor = 'transparent';
        logo.classList.remove('d-none');
        logo2.classList.add('d-none');
        listNavbar.forEach((el)=>{
            el.classList.remove('text-mywhite');
            el.classList.add('text-mydarkblue');
            
        });
    };
    
    
});

let footerIntersection = document.querySelector('#footerIntersection');
checkFooter = true;
let footerObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && checkFooter ==true){
            btnScroller.classList.remove('style-scroller2');
            btnScroller.classList.add('style-scroller');
            checkFooter = false;
        }else{
            btnScroller.classList.remove('style-scroller');
            btnScroller.classList.add('style-scroller2');
            checkFooter=true;
        }
    });
});

footerObserver.observe(footerIntersection);


let opener = document.querySelector('.opener');
let movedDivs = document.querySelectorAll('.moved');
let cardWrapper = document.querySelector('#cardWrapper');

let check = true;

let teachers = [
    {name:'Valerio',languages:'html,css,bootstrap,pokemon',url:'./img/valerio.png'},
    {name:'Donato',languages:'laravel,php,banHammer',url:'./img/andrea.png'},
    {name:'Mattia',languages:'webDes,tailWind,react',url:'./img/Matteo.png'},
    {name:'Carlo',languages:'oop,database,balletti,bacetti',url:'./img/Nicola.png'},
];
movedDivs.forEach((moved,i)=>{
    moved.style.backgroundImage = `url('${teachers[i].url}')`;

    moved.addEventListener('click', ()=>{

        cardWrapper.innerHTML = '';

        let div = document.createElement('div');

        div.classList.add('teacher-card');

        div.innerHTML = `
        
                    <h3 class="text-mydarkblue">${teachers[i].name}</h3>
                    <p class="text-mydarkblue">${teachers[i].languages}</p>

        `;
        cardWrapper.appendChild(div);

        let cardTeacher = document.querySelector('.teacher-card');
        cardTeacher.style.backgroundImage = `url(${teachers[i].url})`;

    });
});




opener.addEventListener('click',()=>{
    if(check ==true){
        check = false;
        opener.style.transform = `rotate(360deg)`;
        movedDivs.forEach((moved,i)=>{
        let angle = (360*i) / movedDivs.length;
        moved.style.transform = `rotate(${angle}deg) translate(125px) rotate(-${angle}deg)`;
    });
    }else{
        opener.style.transform = `rotate(0deg)`;
        cardWrapper.innerHTML = ``;
        movedDivs.forEach((moved)=>{
            moved.style.transform = `rotate(0deg) translate(0px)`;
        });
        check = true;
    };
    
});


