// const { active } = require("browser-sync");
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#author-link').innerHTML),
  sidebarTagLink: Handlebars.compile(document.querySelector('#sidebar-tag-link').innerHTML),
}
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
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = '5';
const optCloudClassPrefix = 'tag-size-';
function generateTitleLinks(customSelector = ' '){
  const titleList =document.querySelector(optTitleListSelector);
  console.log('customSelector', customSelector);
  console.log('optArticleSelector + customSelectorr', optArticleSelector + customSelector);
  /* remove contents of titleList */
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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
function calculateTagClass(count,params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
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
      const linkHTMLData = {tag:tag};
      const linkHTML = templates.tagLink(linkHTMLData);
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
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<a href="#tag-'+ tag + '" class= "'+calculateTagClass(allTags[tag], tagsParams)+'" >' + tag + ' (' + allTags[tag] + ')</a> '; 
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  console.log(allTags);
}


generateTags();

function addClickListenersToTags () {
  const tagliks = document.querySelectorAll('a[href^="#tag-"]');
  /* find all links to tags */
  for (let taglink of tagliks) {
    taglink.addEventListener('click', tagClickHandler);
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
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('.active[href^="#tag-"]');
  
  /* START LOOP: for each active tag link */
  for (let activeTaglink of activeTagLinks) {
      
    
    /* remove class active */
    activeTaglink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('.tags[href^="#tag-' + tag + '"]');
  /* START LOOP: for each found tag link */
  for (let allTagLink of allTagLinks ) {
    /* add class active */
    allTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

    

}



function generateAuthors() {


  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    const Authorwraper =article.querySelector(optArticleAuthorSelector);
    /* find tags wrapper */
    let html = '';
    /* make html variable with empty string */
    /* get tags from data-tags attribute */
    const  articleAuthor=article.getAttribute('data-author');
    console.log(articleAuthor);
    /* split tags into array */
    /* for each tag */
    /* generate HTML of the link */
    const linkHTMLData = {author: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    /* add generated code to HTML variable */
    html = html + linkHTML;

  
    /* END LOOP: for each tag */
  
    /* insert HTML of all the links into the tags wrapper */
    Authorwraper.innerHTML= html;

  /* END LOOP: for every article: */
  }

}
generateAuthors();

function addClickListenersToAuthor () {
  const tagliks = document.querySelectorAll('a[href^="#author-"]');
  /* find all links to tags */
  for (let taglink of tagliks) {
    taglink.addEventListener('click', AuthorClickHandler);
  }
  
}
 
addClickListenersToAuthor ();
 

function AuthorClickHandler (event) {
  event.preventDefault(); 
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('.active[href^="#author-"]');
   
  /* START LOOP: for each active tag link */
  for (let activeAuthorlink of activeAuthorLinks) {
       
     
    /* remove class active */
    activeAuthorlink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const allAuthorLinks = document.querySelectorAll('[href^="#author-' + author + '"]');
  /* START LOOP: for each found tag link */
  for (let allAuthorLink of allAuthorLinks ) {
    /* add class active */
    allAuthorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
 
     
 
}


 



