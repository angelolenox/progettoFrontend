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
let check = true;

function createInterval(finalNumber,elemento){
    let counter = 0;
    let interval = setInterval(()=>{
        
    if(counter < finalNumber){
        counter++
        elemento.innerHTML = counter;
        
    } else{
       clearInterval(interval); 
    }

    },1)
};

let titleIntersection = document.querySelector('#titleIntersection');

let observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && check ==true){
            createInterval(300,firstSpan);
            createInterval(500,secondSpan);
            createInterval(250,thirdSpan);
            check = false;
        }
    });



});

observer.observe(titleIntersection);

let truck = document.querySelectorAll('.fa-truck-fast');
let cardEnterLeave = document.querySelectorAll('.card-enterleave');
// let transport = document.querySelectorAll('.h4-truck');
checkTruck= true;
cardEnterLeave.forEach((column , i)=>{
    column.addEventListener('mouseenter',()=>{
        if(checkTruck==true){
            truck[i].classList.remove('text-myblue');
            truck[i].classList.add('text-myorange');
        }else{
            truck[i].classList.remove('text-myblue');
            truck[i].classList.add('text-mywhite');
        }
    });
    
    column.addEventListener('mouseleave',()=>{
        if(checkTruck==true){
            truck[i].classList.remove('text-myorange');
            truck[i].classList.add('text-myblue');
            checkTruck=false;
        }else{
            truck[i].classList.remove('text-mywhite');
            truck[i].classList.add('text-myblue');
            checkTruck= true;
        }
        
        
    });
});

// categories

let categories = [
    {name: 'Yatch', icon:'<i class="fa-solid fa-ship fa-3x mb-2"></i>',announcement:'2456'},
    {name: 'Auto', icon:'<i class="fa-solid fa-car fa-3x mb-2"></i>',announcement:'2678'},
    {name: 'Film', icon:'<i class="fa-solid fa-film fa-3x mb-2"></i>',announcement:'567'},
    {name: 'Appartamenti', icon:'<i class="fa-solid fa-city fa-3x mb-2"></i>',announcement:'896'},
    {name: 'Videogames', icon:'<i class="fa-solid fa-gamepad fa-3x mb-2"></i>',announcement:'78'},
    {name: 'Smartphone', icon:'<i class="fa-solid fa-mobile fa-3x mb-2"></i>',announcement:'3434'},
    {name: 'PC Desktop', icon:'<i class="fa-solid fa-desktop fa-3x mb-2"></i>',announcement:'6543'},
    {name: 'Motociclette', icon:'<i class="fa-solid fa-motorcycle fa-3x mb-2"></i>',announcement:'565'},
    
];

let cardsCategoriesWrapper = document.querySelector('#cardsCategoriesWrapper');

categories.forEach((categoria)=>{
    let div = document.createElement('div');
    div.classList.add('col-5','col-md-3','mb-4');
    div.innerHTML = `
        <div class="card-categories">
            <div class="card-style d-flex flex-column align-items-center">
                <div class="text-myblue">${categoria.icon}</div>
                <h4 class="text-mydarkblue">${categoria.name}</h4>
                <p class="text-mydarkblue fw-bold">${categoria.announcement}</p>
            </div>
        </div>
    `;
    cardsCategoriesWrapper.appendChild(div);
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