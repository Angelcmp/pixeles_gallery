
let searchParam = location.search.split('=').pop();

const access_key = '7L0PyBH9qi2yGXoawG--w6GMn-iHr4n1sGUHYlOlehs';

const random_photo_url =`https://api.unsplash.com/photos/random?client_id=${access_key}&count=50`;
const search_photo_url =`https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParam}&per_page=50`;


const gallery = document.querySelector('.gallery');

let currentImage = 0;
let allImages; // this will store all the images

const getImages = () => {
    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        makeImages(allImages);
    });
}

const searchImages = () => {
    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        makeImages(allImages);
    });
}

const makeImages = (data) =>{
    data.forEach((item, index) => {
        let img = document.createElement('img');
        img.src = item.urls.regular;
        img.className = '.gallery-img';

        gallery.appendChild(img);

        //popup image

        img.addEventListener('click', () =>{
            currentImage = index;
            showPopup(item);
        })
    })
}

const showPopup = (item) =>{
    let popup = document.querySelector('.image-popup');
    const downloadBtn = document.querySelector('.downlaod-btn');
    const closeBtn = document.querySelector('.close-btn');
    const image = document.querySelector('.img-large');

    popup.classList.remove('hide');
    downloadBtn.href = item.links.html;
    image.src = item.urls.regular;

}

if(searchParam == ''){
    getImages();
}else{
    searchImages();
}
