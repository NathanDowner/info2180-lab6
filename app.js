window.onload = function() {
    const search = document.querySelector('#search');
    const result = document.querySelector("#result");
    const all = document.querySelector("#search-all");
    var httpRequest = new XMLHttpRequest();
    var url = "https://info2180-lab6-nnawdr.c9users.io/request.php";
    
    search.addEventListener('click', function(e) {
        e.preventDefault();
        let word = document.querySelector("input").value;
        httpRequest.onreadystatechange = getResponse;
        httpRequest.open('GET', url+`?q=${word}`);
        httpRequest.send();
    });
    
    all.addEventListener('click', function(e) {
        e.preventDefault();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let xmlRes = httpRequest.responseXML;
                    let output = document.createElement("ol");
                    let documents = xmlRes.getElementsByTagName('definition');
                    for(let i=0; i<documents.length; i++) {
                        output.innerHTML += `
                        <li class="card">
                            <h3>${documents[i].getAttribute('name').toUpperCase()}</h3>
                            <p>${documents[i].textContent}</p>
                            <p> -${documents[i].getAttribute('author').toUpperCase()}</p>`;
                    }
                    
                    result.innerHTML = '';
                    result.appendChild(output);
                    
                } else {
                    alert("Theres a problem with the request");
                }
            }
        };
        httpRequest.open('GET', `./request.php?q=&all=true`);//another way of writing the address
        httpRequest.send();
    });
    
    function getResponse() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let resp;
                resp = document.querySelector("input").value == ""? "Enter one of the above suggested terms to see a definition": httpRequest.responseText;
                result.innerHTML = `<div class="card">${resp}</div>`;
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}; 