function fetchJSONData(name) {
    let obj;

    fetch('./news.json')
    .then(res => res.json())
    .then(data => {
        obj = data;
    })
    .then(() => {
        console.log(obj);
        document.getElementById("articleTitle").innerText = `${name}`
        document.getElementById("articleImage").src = `${obj[name]['cover']}`
        document.getElementById("newsBlock").style.display = "none";
        document.getElementById("articleContent").innerHTML = `
            <a href="./index.html">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#512889" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
            </svg>
            &nbsp;&nbsp;
            Return</a>
            
            <div class="articleContainer">
                <div class="newsContent">
                    <span>${obj[name]['date']}</span>
                    <p>${obj[name]['text']}</p>
                </div>
            </div>
        `;
    });
}


function loadNews(){
    let obj;
    fetch('./news.json')
    .then(res => res.json())
    .then(data => {
        obj = data;
    })
    .then(() => {
        // console.log(obj);
        let importantNewsGrid = '';
        for (const article in obj) {
            // console.log(obj[article]['important']);
            if (obj[article]['important']=='True'){
                let textPreview = obj[article]['text'].slice(0, 200) + "..."
                importantNewsGrid += `
                <div class="single-news">
                    <div class="news-head" style="background-image: url('${obj[article]['cover']}');">
                        <div class="overlay"> </div>
                            <div class="pinned-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-pin-fill" viewBox="0 0 16 16">
                                    <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354"/>
                                </svg>
                            </div>
                            <h3 onclick="fetchJSONData('${article}')"><a href="#">${article}</a></h3>
                        </div>
                    <div class="news-body">
                        <div class="news-content">
                                <div class="date">${obj[article]['date']}</div>
                                    <p class="text">${textPreview}</p>
                        </div>
                    </div>
                </div>
                `
            }
        }

        let regularNewsGrid = '';
        for (const article in obj) {
            // console.log(obj[article]['important']);
            if (obj[article]['important']=='False'){
                let regularTextPreview = obj[article]['text'].slice(0, 100) + "..."
                regularNewsGrid += 
                `<div class="single-news">
                        <div class="news-head" style="background-image: url('${obj[article]['cover']}');">
                            <div class="overlay"> </div>
                            <h3 onclick="fetchJSONData('${article}')"><a href="#">${article}</a></h3>
                        </div>
                        <div class="news-body">
                            <div class="news-content">
                                <div class="date">${obj[article]['date']}</div>
                                <p class="text">${regularTextPreview}</p>
                            </div>
                        </div>
                </div>`
            }
        }
        
        document.getElementById("importantNews").innerHTML = importantNewsGrid;
        document.getElementById("regularNews").innerHTML = regularNewsGrid;

        
    });
}






//     <div class="coverImage" style="background-image:url('${obj[name]['cover']}');">
//     <div class="overlay">
//         <h1>${name}</h1>
//     </div>
// </div>

    // fetch("./news.json")
    //     .then((res) => {
    //         if (!res.ok) {
    //             throw new Error
    //                 (`HTTP error! Status: ${res.status}`);
    //         }
    //         return res.json();
    //     })
        
    //     .then((data) =>
    //         // console.log(data)
    //         obj = data,
    //         console.log(obj),
    //         document.getElementById("newsBlock").style.display = "none",
    //         console.log(data['Some'])
    //         // document.getElementById("item").innerHTML = `<p>${data[name]}</p>`
    //     )
    //     .catch((error) =>
    //         console.error("Unable to fetch data:", error));