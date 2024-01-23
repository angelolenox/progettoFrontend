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


fetch('./annunci.json').then((response)=>response.json()).then((data)=>{
    let categoryWrapper = document.querySelector('#categoryWrapper');
    let cardsWrapper = document.querySelector('#cardsWrapper');

    function showCards(array){
        cardsWrapper.innerHTML = '';
        array.sort((a,b)=>b.price - a.price);
        array.forEach((annuncio,i)=>{
            let div = document.createElement('div');
            div.classList.add('col-6','col-md-3',);
            div.innerHTML=`
            <div class="announcement-card text-center">
                <div class="card-head">
                    <img class="img-Card-Custom" src="https://picsum.photos/${200+i}" alt="">
                </div>
                <h5 class="text-mydarkblue">${annuncio.name}</h5>
                <h6 class="text-mydarkblue">${annuncio.category}</</h6>
                <p class="fw-bold text-mydarkblue">${annuncio.price} $</p>
            </div>
            
            `;
            cardsWrapper.appendChild(div);
        })
    };
    showCards(data);

    function setCategoryFilter(){
        let categories = data.map((annuncio)=> annuncio.category);
        let uniqueCategories = [];
        categories.forEach((categoria)=> {
            if(!uniqueCategories.includes(categoria)){
                uniqueCategories.push(categoria);
            }
            
        });
        uniqueCategories.forEach((category)=>{
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
                    <label class="form-check-label" for="${category}">
                        ${category}
                    </label>
            `;
            categoryWrapper.appendChild(div);
        })
    }
    setCategoryFilter();


    function filterByCategory(array){

        // let categoria = Array.from(checkInputs).find((bottone)=>bottone.cheked).id;
        let arrayFromNodeList = Array.from(checkInputs);
        let buttonChecked = arrayFromNodeList.find((bottone)=> bottone.checked);
        let categoria = buttonChecked.id;

        if(categoria!='All'){
            let filtered = array.filter((annuncio)=>annuncio.category==categoria);
            return filtered;
        }else{
            return data;
        }
       
    };

    let checkInputs = document.querySelectorAll('.form-check-input');
    let priceInput = document.querySelector('#priceInput');
    let incrementNumber = document.querySelector('#incrementNumber');

    function setPriceInput(){
        let prices = data.map((annuncio)=>Number(annuncio.price));
        let maxPrice = (Math.max(...prices));
        priceInput.max= Math.ceil(maxPrice);
        priceInput.value = Math.ceil(maxPrice);
        incrementNumber.innerHTML= Math.ceil(maxPrice);
    }
    setPriceInput()

    function filterByPrice(array){
        let filtered = array.filter((annuncio)=>Number(annuncio.price <= Number(priceInput.value)));
        console.log(filtered);
        return filtered;
    };

    
    let wordInput = document.querySelector('#wordInput');

    function filterByWord(array){
        let nome = wordInput.value;
        let filtered = array.filter((annuncio)=>annuncio.name.toLowerCase().includes(nome.toLowerCase()));
        return filtered;
    };


    // global Filter

    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);
        
        showCards(filteredByWord);
    };


    // event filter 

    checkInputs.forEach((radio)=>{
        radio.addEventListener('click',()=>{
          globalFilter();
          incrementNumber.innerHTML= priceInput.value;
        })
    });
    
    priceInput.addEventListener('input',()=>{
        // cardsWrapper.innerHTML = '';
        incrementNumber.innerHTML= priceInput.value;
        globalFilter();
        
    });

    wordInput.addEventListener('input',()=>{
        globalFilter();
    });


});