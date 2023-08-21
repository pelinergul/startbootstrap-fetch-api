/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

let posts=[];
let users=[];
const prefixUrl = "https://jsonplaceholder.org/"
const requestUrl=`${prefixUrl}posts`
const requestUserUrl=`${prefixUrl}users`
const requestCommentsUrl=`${prefixUrl}comments`

const body = document.querySelector('body')
const postsBox = document.querySelector(".posts")
const postTitle =document.querySelector('.post-title')

async function loadData(){
    posts= await fetch(requestUrl).then(x=>x.json())
    users= await fetch(requestUserUrl).then(x=>x.json())
    renderPosts();
}

function renderPosts(){
    for (const post of posts) {
        const author=users.find(x=>x.id===post.userId)
        postsBox.innerHTML +=
            `<div class="post-preview" data-id="${post.id}">
                <a href="#">
                    <h2 class="post-title">${post.slug}</h2>
                    <h4 class="post-subtitle">${post.title}</h4>
                </a>
                <p class="post-meta">
                    Posted by ${author.firstname} ${author.lastname}
                    <br>
                    <span>${post.publishedAt}</span>
                </p>
            </div>
            <hr class="my-4" />
        `
        bindPostsClikcs();
    }
}
function renderDetailPage(postDetail, postComments) {
    const comments = postComments.map(x => `<div class="comment"><p>${x.comment}</p></div>`);
    body.innerHTML=''
    body.innerHTML = `
    <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="index.html">Start Bootstrap</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto py-4 py-lg-0">
                        <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="about.html">About</a></li>
                        <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="post.html">Sample Post</a></li>
                        <li class="nav-item"><a class="nav-link px-lg-3 py-3 py-lg-4" href="contact.html">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Page Header-->
        <header class="masthead" style="background-image: url('assets/img/post-bg.jpg')">
            <div class="container position-relative px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <div class="post-heading">
                            <h1>${postDetail.title}</h1>
                            <p class="post-meta">
                            <br>
                            <span>${postDetail.publishedAt}</span>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- Post Content-->

        <article class="mb-4">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                ${postDetail.content}
                    <div class="post-title col-md-10 col-lg-8 col-xl-7">
                        <div class ="comments">${comments.join("")}</div>
                        </p>
                    </div>
                </div>
            </div>
        </article>
        <!-- Footer-->
        <footer class="border-top">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <ul class="list-inline text-center">
                            <li class="list-inline-item">
                                <a href="#!">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#!">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#!">
                                    <span class="fa-stack fa-lg">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div class="small text-center text-muted fst-italic">Copyright &copy; Your Website 2023</div>
                    </div>
                </div>
            </div>
        </footer>
    `;
   
}
async function loadDetailPage(postId) {
    const postDetail = await fetch(`${requestUrl}/${postId}`).then(x => x.json());
    const postComments = await fetch(`${requestCommentsUrl}?postId=${postId}`).then(x => x.json());
    console.log(postComments)
    console.log(postDetail)
    renderDetailPage(postDetail, postComments);
}
function handleHomePageClicks(e){
    e.preventDefault();
    loadDetailPage(e.target.parentElement.parentElement.dataset.id);
}
function bindPostsClikcs() {
    document.querySelectorAll(".post-preview a")
    .forEach(x => x.addEventListener("click", handleHomePageClicks))

}

loadData();