/*
TODO : 
- Fetch JSON data from /r/EarthPorn. ✅
- Loop through the data and create a 'PostObject'. ✅
- Display the data of 'PostObject' on the HTML Page.  ✅
*/

//First we create the variables
let request_URL = "https://www.reddit.com/r/EarthPorn.json"; //the subreddit json data.

//Cache the ul element to store new elements in it
const imageList = document.querySelector('ul');

//Start the fetching request with request_URL
fetch(request_URL)
  .then(data => {
    return data.json(); //Returning the data blob to the fetch request so we can extract the JSON from it.
  }).then(posts => {
    posts.data.children.forEach(post => {

      //Defining 'PostObject'
      let postObject = {
        imgurl: post.data.preview.images[0].resolutions[3].url, //Parsing the resultuion of the images
        imgtitle: post.data.title, //Parsing the title.
        upvotes: post.data.ups, //Parsing the upvotes
        posturl: 'https://www.reddit.com' + post.data.permalink //Parsing the post URL
      }

      //Adding a new element to the UL html element.
      imageList.innerHTML += addNewImage(postObject);
    })
  });


function addNewImage(postObject) {
  return `
  <li>
    <p>${postObject.imgtitle}</p>
    <img src="${postObject.imgurl}">
    <h5>🔼${postObject.upvotes}</h5>
    <a target="_blank" href="${postObject.posturl}">🔗</a>
  </li>
  `;
}