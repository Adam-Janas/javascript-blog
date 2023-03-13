const { active } = require("browser-sync");

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
    
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  
  /* find the correct article using the selector (value of 'href' attribute) */
  
  /* add class 'active' to the correct article */
  
  /* get 'href' attribute from the clicked link */
  const  articleSelector=clickedElement.getAttribute('href');
  console.log(articleSelector);
  const targetArticle= document.querySelector(articleSelector);
  console.log(targetArticle);
  targetArticle.classList.add('active');

};
 
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
// const optTagsListSelector = '.tags.list';
function generateTitleLinks(){
  const titleList =document.querySelector(optTitleListSelector);
  /* remove contents of titleList */
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  console.log(articles);
  for (let article of articles) {

    /* get the article id */
    const articleId=article.getAttribute('id');
    /* find the title element */
    console.log(article);
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    /* insert link into titleList */
    console.log();
    html = html + linkHTML;
  
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
function calculateTagsParams (tags) {
  const params = {
    min: 999999,
    max: 0
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    const tagslist =article.querySelector(optArticleTagsSelector);
    /* find tags wrapper */
    let html = '';
    /* make html variable with empty string */
    /* get tags from data-tags attribute */
    const  articleTags=article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML ='<li><a href="#tag-'+ tag + '">' + tag + '</a></li>';
      /* add generated code to HTML variable */
      html = html + linkHTML;
    
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */
    tagslist.innerHTML= html;

    /* END LOOP: for every article: */
  }
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  /* [NEW] find list of tags in right column */
  // const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  // tagList.innerHTML = allTags.join(' ');
  console.log(allTags);
}
  

generateTags();

function addClickListenersToTags () {
  const tagliks = document.querySelectorAll('a[href^="#tag-"]')
  /* find all links to tags */
  for (let taglink of tagliks) {
    taglink.addEventListener("click", tagClickHandler)
  }
  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();


function tagClickHandler (event) {
  
    /* prevent default action for this event */
  event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('.active[href^="#tag-"]');
  
    /* START LOOP: for each active tag link */
    for (let activeTaglink of activeTagLinks) {
      
    
      /* remove class active */
      activeTaglink.classList.remove("active");
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll('.tags[href^="#href-"]');
    /* START LOOP: for each found tag link */
    for (let allTagLink of allTagLinks ) {
      /* add class active */
      activeTaglink.classList.radd("active");
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */

    

  }



function generateAuthors() {

let allAuthors = {};

const articles = document.querySelectorAll(optArticleSelector);


const AuthorsParams = calculateAuthorsParams(allAuthors);
console.log('autherParams:', AuthorsParams);
let allAutherHTML = '';

console.log(allAuthors);
}

function addClickListenersToAuthors (){

}

function authorClickHandler (){



  generateTitleLinks(article);
 }


