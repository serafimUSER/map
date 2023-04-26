let url = window.location.href
let searchParams = new URLSearchParams(url.split("?")[1]);

let lat = searchParams.get("lat");
let lon = searchParams.get("lon");

let global_key = searchParams.get('key_global')
let local_key = searchParams.get('key_local')




// Создаем карту
var map = L.map('map').setView([lat, lon], 6);

// Добавляем слой карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);


if ("geolocation" in navigator) {
    // Поддерживается геолокация
    navigator.geolocation.getCurrentPosition(function(position) {
        // Получаем координаты
        const lat__user = position.coords.latitude;
        const lon__user = position.coords.longitude;
  
        let pointA = L.latLng(lat__user, lon__user);
        let pointB = L.latLng(lat, lon);

        L.Routing.control({
        waypoints: [
            pointA,
            pointB
        ],
        routeWhileDragging: true,
        lineOptions: {
            styles: [{color: '#7393A7', opacity: 1, weight: 5}]
        }
        }).addTo(map);
    });
  } else {
    // Геолокация не поддерживается
    console.log("Геолокация не поддерживается");
}

var xhr = new XMLHttpRequest();
    xhr.open('GET', '/js/json/data.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            let data_box = {
                1: data.mon,
                2: data.mus,
                3: data.oth
            };
            renderData = data_box[global_key][local_key];

            document.getElementById('title_card').innerText = renderData['by_title']
            document.getElementById('text_card').innerText = renderData['by_text']

            let id_img = 1
            renderData["slider"].forEach(src_img => {
                document.getElementById(`img_${id_img}`).src = src_img
                id_img++;
            });
        }
};
xhr.send();


document.getElementById('back').onclick = function () {
  window.location.href = '/'
}