
async function kill(event){
    console.log(event.currentTarget.link);
    resp = await (await fetch(event.currentTarget.link)).text()
    let doc = new DOMParser().parseFromString(resp, "text/html");
    anchor = doc.querySelector("body > table > tbody > tr:nth-child(2) > td > a")
    resp2 = await (await fetch(anchor.href)).text()
    let doc2 = new DOMParser().parseFromString(resp2, "text/html");
    body = doc2.querySelector("body")
    info = body.getAttribute("onload")
    link2 = info.substring(17, info.length - 1)
    resp3 = await (await fetch(link2, { headers: {
        "RequestMode": "no-cors",
      }, })).text()
    console.log( resp3 )
}

const trs = document.querySelectorAll("body > table:nth-child(9) > tbody > tr");
if(trs) {
    for (let tr of trs) {
        let td = document.createElement('td');
        if( tr.className == "tr1" ){
            let content = document.createTextNode("💀");
            td.setAttribute("style", "text-align:center; vertical-align: middle;");
            td.appendChild(content);
            tr.appendChild(td);
        }
        else {
            // > table > tbody > tr > td > a
            let info = tr.querySelector("td:nth-child(8) > table > tbody > tr > td > a")
            let anchor = document.createElement("a");
            if( info != null && info.href ){
                anchor.link = info.href.substring(24, info.href.length - 2);
                anchor.addEventListener("click", kill)
                let content = document.createElement("img");
                content.src = chrome.runtime.getURL("download.png");
                content.setAttribute("width", "20px");
                td.setAttribute("style", "text-align:center; vertical-align: middle;");
                anchor.appendChild(content);
            }
            td.appendChild(anchor);
            tr.appendChild(td);
        }
    }

}