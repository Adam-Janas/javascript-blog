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

function generateTags(){
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
    }

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagslist.innerHTML= html;

    /* END LOOP: for every article: */
  }
  
}

generateTags();

