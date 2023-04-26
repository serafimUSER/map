let status = 0;
let status_lang = false;
let last_title;

let window_statis = false;
let window_id = -1;
let window_id_local = -1

let maxLength = 155
let data_loc = {};

const labels = {
    by: ["Помнікі", "Музеі", "Мемарыялы"],
    ru: ["Памятники", "Музеи", "Мемориалы"]
};


document.getElementById("close").onclick = function() {
    window_statis = false
    
    let window = document.getElementById("windowContent")
    window.classList.add('unactive')
}

function linkWindow(title, text, src_, key){
    if (!window_statis){
        let window = document.getElementById("windowContent")
        let title__window = document.getElementById('title__window')
        let text_window = document.getElementById('text_window')
        
        document.getElementById('img_window').src = src_
        window_id_local = key

        let maxLengthWindowText = 200

        if (text.length > maxLengthWindowText) {
            text = text.substring(0, maxLength)
            text += "..."
        }

        last_title = title
        title__window.textContent = title
        text_window.textContent = text

        window.classList.remove('unactive')
        window_statis = true;
    }
}

document.getElementById('route').onclick = function () {
    console.log(data_loc)
    let location = data_loc[last_title]
    let lat = location[0]
    let lon = location[1]


    window.location.href = `/route/?lat=${lat}&lon=${lon}&key_global=${window_id}&key_local=${window_id_local}`
}

document.getElementById('Lang').onclick = function() {
    ButtonActive(status)
    if (status_lang){
        ButtonUnActiveLang();
        status_lang = false;
        return;
    }
    setTimeout(function() {
        document.getElementById('Lang').style.backgroundColor = "#E8ECF1"
        document.getElementById('ImgLang').src = '../img/black/black_lang.svg';
    }, 50)
    status_lang = true;
}

function ButtonUnActiveLang() {
    setTimeout(function() {
        document.getElementById('Lang').style.backgroundColor = "#587a86"
        document.getElementById('ImgLang').src = '../img/active/lang.svg';
    }, 50)
}

function Render(data) {
    let htmlData = ``;
    

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const item = data[key];
            if (!status_lang) {
                title = item.by_title
                text = item.by_text
            } else {
                title = item.ru_title
                text = item.ru_text
            }
            if (text.length > maxLength) {
                text = text.substring(0, maxLength)
                text += "..."
            }

            htmlData += `
            <a href="#" onclick="linkWindow('${title}', '${item.by_text}', '${item.card_image}', ${key})">
                <div class="crad__info">
                    <div class="image" style="background: url('${item.card_image}'); background-size: cover;">
                    </div>
                    <div class="descript">
                        <h3>${title}</h3>
                        <p>${text}</p>
                    </div>
                </div>
            </a>`
            let mark = L.marker(item.location, {icon: Icon}).addTo(map);
            mark.bindTooltip("<b>" + title + "</b>")
            data_loc[title] = item.location
        }
      }
    document.getElementById('render').innerHTML = htmlData;
}

document.querySelectorAll(".nav_item").forEach(item => {
    item.addEventListener("click", function() {
        ButtonActive(item.getAttribute("data-id"))
    })
});

function ButtonActive(id){
    if (status != 0 && status != id) {
        ButtonUnActive(status);
    }

    status = id;
    let renderData;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/json/data.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            let column = document.getElementById("column");

            let data_box = {
                1: data.mon,
                2: data.mus,
                3: data.oth
            };
            if (!status_lang) {
                column.textContent = labels.by[id - 1];
            } else {
                column.textContent = labels.ru[id - 1];
            }
            window_id = id
            Render(data_box[id])
        }
    };
    xhr.send();

    let srcs = ["../img/black/black_monuments.svg", "../img/black/black_musiem.svg", "../img/black/black_others.svg"]
    setTimeout(function() {
        document.getElementById('ButtonActive' + id).style.backgroundColor = "#E8ECF1";
        document.getElementById('Img' + id).src = srcs[id-1];
    }, 50); 
}

function ButtonUnActive(id){
    let srcs = ["../img/active/monuments.svg", "../img/active/musiem.svg", "../img/active/others.svg"]

    document.getElementById('ButtonActive' + id).style.backgroundColor = "#587a86";
    document.getElementById('Img' + id).src = srcs[id-1];
}


