var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var shortdesc = document.querySelector('.short-desc');
var visibility = document.querySelector('.visibility span'); // Sửa lại chọn `span`
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var time = document.querySelector('.time');
var content = document.querySelector('.content');
var body = document.body; // Sửa lại body

async function changeWeatherUI(capitalSearch) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=67c359b2f73302a1c7433460ab07f577&units=metric`;
    let data = await fetch(apiURL).then(res => res.json());

    console.log("Dữ liệu API:", data); // Kiểm tra dữ liệu trả về từ API

    if (data.cod === 200) {
        content.classList.remove('hide');

        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        sun.innerText = data.main.humidity + '%';

        let temp = data.main.temp;
        value.innerText = temp.toFixed(1) + "°C";
        shortdesc.innerText = data.weather[0].main; // Truy cập `weather[0]`
        time.innerText = new Date().toLocaleString('vi-VN');

        console.log("Body:", body);

        // Xử lý đổi màu nền theo nhiệt độ
        body.className = 'hot';
        if (temp <= 25) body.className = 'cool';
        if (temp <= 22) body.className = 'warm';
        if (temp <= 19) body.className = 'cold';
    } else {
        console.log("Lỗi API:", data.message);
        content.classList.add('hide');
    }
}

search.addEventListener('keypress', function(e) {
    if (e.code === 'Enter') {
        let capitalSearch = search.value.trim();
        if (capitalSearch !== "") {
            changeWeatherUI(capitalSearch);
        }
    }
});

changeWeatherUI('Ha Noi'); // Gọi lần đầu để hiển thị thời tiết Hà Nội
