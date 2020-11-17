/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sectionList = document.querySelectorAll(".landing__container") ;// section divs 
let header = document.querySelector(".page__header") // nav header 
let headers = document.querySelectorAll(".landing__container h2"); // h2s of all sections 
let navList = document.getElementById("navbar__list"); // the unordered list 

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

let callback = (entries, observer) =>{
    entries.forEach(entry => {
        let element = entry.target.parentElement ;// this gets the section 
        if (entry.intersectionRatio > .5){ //if half of the div child of element(section) is in the viewport do the next 
            if (! element.classList.contains("your-active-class") ){ // check if the section isn't highlighted 
                let prevLighted = document.querySelector(".your-active-class");// get the highlighted section 
                prevLighted.classList.remove("your-active-class");// unhighlight it  
                element.classList.add("your-active-class")} // highlight the section (element) which observed in the viewport 
                // for hilighting the nav element 
                let highlitedLinke = document.querySelector(`li .${element.id}`);//select the linke element that have the class = the section id 
                if(!highlitedLinke.classList.contains("active")){ //cheack if it isn't  actvie  
                    document.querySelector(".active").classList.remove("active");// unhighlight the previoues highlighted link 
                    highlitedLinke.classList.add("active");// highlight the nav element that is pointing to the current 

        }
       

    }
    })
        

    };



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav

function addNavs(headers,nav){
    const fragement = document.createDocumentFragment();

    for (let head of headers){
        const listElement = document.createElement("li");
        const anchorTONav = document.createElement("a");
        anchorTONav.textContent =head.textContent;
        anchorTONav.href = '#'+head.id.replace(/\s+/g, '').toLowerCase() ; 
        anchorTONav.className = head.textContent.replace(/\s+/g, '').toLowerCase();
        listElement.appendChild(anchorTONav)
        anchorTONav.classList.add('menu__link') 
        fragement.appendChild(listElement)
    }
    fragement.firstElementChild.firstElementChild.classList.add("active")
    nav.appendChild(fragement);
}
// Add class 'active' to section when near top of viewport
function changView(callback){
    let options = {
        root : document , 
        threshold:  .5
    };//the controlers of the observer 

    let observer = new IntersectionObserver(callback, options);//initiate  a observer
    
        for (let section of sectionList){
            observer.observe(section) // add section's div to the observer to observ 
        }
    
  
} 

// Scroll to anchor ID using scrollIntoView 
function scroll(){
    navList.addEventListener("click",function(evt){
        target = evt.target ; //get the link that was clicked 
        evt.preventDefault();// prevent the normal scrolling 
        txid = target.textContent.replace(/\s+/g, '').toLowerCase();//id of the section that have the id that equal to the link text . could use nav-data instead actually it's better .  
        section = document.getElementById(txid) ; //get the section that have the id 
        section.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}); // scroll smothly to the section 
    })
}
// navbar visibility  

function navVisibility(nav){
    let scrollingEnd;  // the function to run after scroll end  
    
    document.addEventListener("scroll",()=>{
        nav.classList.add("visible")
        window.clearTimeout(scrollingEnd)
        scrollingEnd = setTimeout(()=>{
            nav.classList.remove("visible")
        },800)
    })
    
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

addNavs(headers,navList);

// Scroll to section on link click
scroll(); 
// Set sections as active
changView(callback)

// 
navVisibility(header)