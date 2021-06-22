const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash api
const count = 30;
apiKey = 'NEqUo1ZNWwFZ3vJ7O7DncVKoVAJ7EOJC3IVk-lQYNVM';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check if all images were loaded
function imageloaded(){
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true; 
    loader.hidden = true;
     
  }
}
// helper function to set attributes
function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links and photos, add to dom
function displayPhotos(){
  totalImages = photosArray.length;
   
  photosArray.forEach((photo)=>{
    const item = document.createElement('a');
    setAttributes(item,{
      href:photo.links.html,
      target:"_blank"
    })
    // item.setAttribute('href',photo.links.html);
    // item.setAttribute('target', '_blank');
    const img = document.createElement('img');
    setAttributes(img,{
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description
    })
    // event listener, check when each is finished loading
    img.addEventListener('load',imageloaded);

    item.appendChild(img);
    imageContainer.appendChild(item);

  })
}



// get photos form unsplash api
async function getPhotos(){
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
     displayPhotos();
    
  } catch (error) {
    console.log(error);
  }
}
// check if scrolling near bottom, load more
window.addEventListener('scroll',()=>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    totalImages = 0;
    imagesLoaded = 0;
    getPhotos();
    
  }
})

// on load
getPhotos();