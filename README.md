#What are we doing? 🤓

In this post, we're going to use Reddit to make a beautiful gallery of landscapes 🏔.

The gallery is going to look like this.

![Picture of the gallery](https://thepracticaldev.s3.amazonaws.com/i/39n4jvp86glckziqxk93.jpg)

Each photo will navigate to its corresponding Post in the subreddit.

It's important to note that I also made a YouTube Video about this that you can [watch here](https://youtu.be/D-RSCre3hzg?t=15);

##Getting Started 👩‍💻
Alright, to get started you need to create these three files:
* index.HTML
* style.CSS
* index.js

Create a new UL element and link the CSS and JavaScript in the HTML like this:
```
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="style.css">
    <title>/r/EarthPorn</title>
</head>

<body>
    <ul></ul>
    <script src="index.js"></script>
</body>

</html>
```
---

##JavaScript-ing 📜
Go to the Javascript file and create a variable with the subreddit URL + '.json',
We're going to use /r/earthporn for thisو you can go ahead and use whatever you like.
```javascript
const request_URL = 'https://www.reddit.com/r/earthporn.json';
```

After that many to cache our UL HTML element in our JavaScript so we can append the images to it
```javascript
const imageList = document.querySelector('ul');
```

###Fetching the data!
We'll fetch the data from our request_URL using fetch()
you can learn more about [fetch from this link](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
When we retrieve the data we'll append it to the UL element
```javascript

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
```
And just like that JavaScript is done!

---

##Styling 🎨🖌
We're pretty much done, we only have styling left!
```css
body {
    margin: 0; //Remove any margin from the body element
    font-family: 'Segoe UI'; //Change the font family
}

ul {
    margin: 3px 0;
    padding: 0;
    width: 100%;
    list-style: none;
    display: grid; Display as a grid with three columns
    grid-template-columns: repeat(3, 1fr);
    row-gap: 10px;
    column-gap: 10px;
}

li {
    position: relative;
    height: 30vh;
    opacity: .5;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7px;
}

li p,
li h5,
li a {
    position: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
    transition: all 100ms ease-in-out;
}

li:hover,li:hover *{
    opacity: 1;
}
li p{
    top :10px;
    left :10px;
    color: #fff;
    text-shadow: 0 0 5px black; 
    font-weight: 500
}

li h5{
    background: #fff;
    font-weight: 100;
    bottom: 10px;
    left: 10px;
    font-size: 1.3rem;
    padding: 3px;
}
li a{
    bottom: 10px;
    right: 10px;
    font-size: 1.3rem;
    padding: 3px;
    text-decoration: none;
}
```

And just like that, you're done!

---

I'm excited to see what you guys can build on top of this!
I'd like to see some of you make pull requests to the [GitHub repository](https://github.com/NourSofanati/redditgallery), maybe some of you will make it a bit more responsive to screen sizes?

Also please tell me what do you think of this kind of posts, excited to hear your feedback!

