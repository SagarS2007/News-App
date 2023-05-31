const API_KEY = "ababe08f428d44d58a42c35d39e3eb5d";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load', () => {
  fetchNews("India");
})
async function fetchNews(query) {
  const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  console.log(data);
  bindData(data.articles);
}



const reload=()=>{
  window.location.reload();
}
function bindData(articles) {
  const container = document.getElementById('cardcontainer');
  const newsCardTemplate = document.getElementById('newscardtemplate');
  container.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    container.appendChild(cardClone);
  })
}
const fillDataInCard = (cardClone, article) => {
  const newsImage = cardClone.querySelector("#news-img");
  const newsHeading = cardClone.querySelector("#newsHeading");
  const newsDescription = cardClone.querySelector("#news-desc");
  const newsSource = cardClone.querySelector("#news-source");


  newsImage.src = article.urlToImage;
  newsHeading.innerHTML = article.title;
  newsDescription.innerHTML = article.description;


  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
  });
  newsSource.innerHTML =`${article.source.name} 🕧 ${date} `;
  cardClone.firstElementChild.addEventListener('click',() =>{
window.open(article.url,"_blank");
  })
}
let currentSelectNav=null;
let onNavItemClick =(id)=>{
fetchNews(id);
const navItem=document.getElementById(id);
currentSelectNav?.classList.remove('active');
currentSelectNav=navItem;
currentSelectNav.classList.add('active');
}
const Input=document.getElementById("inputbox");
const searchButton=document.getElementById("btn");
searchButton.addEventListener('click', ()=>{
  const query=Input.value;
  if(!query) return;
  fetchNews(query);
  currentSelectNav?.classList.remove('active');
  currentSelectNav = null;
  Input.value=" ";
})