let apenddiv= document.getElementById("fetchdiv")
var param={
    _page:1,
    _limit:4

}
let totalBtn=0;
const url= new URL("https://priti-api.vercel.app/posts")
function searchParams(){
    url.search= new URLSearchParams(param).toString();
    renderRecipe(url)
}
window.addEventListener("load",()=>{
    pagination().then((res)=>{
        searchParams(param)
    })
    renderRecipe(url)
})

//pagination
function pagination(){
    return fetch("https://priti-api.vercel.app/posts")
    .then((res)=>res.json())
    .then((res)=>{
        totalBtn= Math.ceil(res.length/4)
        let paginationBtn= document.getElementById("paginationBtn");
        let allBtnArr= new Array(totalBtn).fill(0);
        console.log(allBtnArr)
        let btn= `
            ${allBtnArr?.map((item,i)=>renderBtn(i+1)).join("")}

        `
        paginationBtn.innerHTML= btn;

    })
}

function renderBtn(i){
    let btn=`
        <button onclick=(${`handleBtn(${i})`})>${i}</button>
    `
    return btn;
}

const handleBtn = (page)=>{
    console.log(page);
    param._page=page;
    searchParams(param)
}

function renderRecipe(url){
    fetch(url)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res)
        appneData(res)
    }).catch((err)=>{
        console.log(err)
    })
}
// renderRecipe()

function appneData(data){
   
    // console.log(data)
    // apenddiv.innerHTML=null;
    let cardList=`
        ${data?.map((el,i)=>cardData(el.id, el.image, el.title, el.origin, el.description, el.category, el.price)).join(" ")}
    `
    apenddiv.innerHTML= cardList;

}
function cardData(id,image,title,origin,description,category,price){
    let card=`
    <div class="card" data-id=${id}>
        <img class="img" src=${image} alt="error">
        <h2>${title}</h2>
        <h3>${origin}</h3>
        <p>${description}</p>
        <h4>${category}</h4>
        <h1>${price}</h1>
        <button onclick=${`handleBuy(${id})`}>Buy</button>
    </div>
   
    `
    // console.log(card)
    return card;
}
let sort= document.getElementById('sort')
sort.addEventListener("change",(e)=>{
    let order= e.target.value
    param._sort= "price";
    param._order= order;
    searchParams(param)
    e.stopPropagation();


})

let cate= document.getElementById('category');
cate.addEventListener("change",(e)=>{
    let category=e.target.value;
    param.category= category;
    console.log(param)
    searchParams(param)
    e.stopPropagation();
})

let origin= document.getElementById('origin');
origin.addEventListener("change",(e)=>{
    param.origin= e.target.value;;
    console.log(param)
    searchParams(param)
    e.stopPropagation();
})

