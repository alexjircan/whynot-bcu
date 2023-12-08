
async function kill(event){
    console.log(event.currentTarget.link);
    resp = await (await fetch(event.currentTarget.link)).text()
    let doc = new DOMParser().parseFromString(resp, "text/html");
    anchor = doc.querySelector("body > table > tbody > tr:nth-child(2) > td > a")
    console.log(anchor.href)
}

const trs = document.querySelectorAll("body > table:nth-child(9) > tbody > tr");
if(trs.length > 0) {
    console.log(trs)
    console.log("Home bby")
    for (let tr of trs) {
        let anchors = tr.querySelectorAll("td:nth-child(8) > table > tbody > tr > td > a")
        for (let anchor of anchors){
            if( anchor != null && anchor.href ){
                anchor.href = anchor.href.substring(24, anchor.href.length - 2);
            }
        }
    }
}

const iframe = document.querySelector("#pdf-js-viewer")
if( iframe != null){
    console.log("PDF bby")
    console.log(iframe.src)
    let regex = /file=(?:..\/..\/)?(.*?)&/;
    let match = iframe.src.match(regex);
    
    if (match) {
        console.log("yeah bby")
        book_url = "https://www.bcucluj.ro/"+match[1]
        console.log(book_url);
        location.replace(book_url)
    }
    iframe.parentElement.removeChild(iframe)
}
