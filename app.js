function getData() {
    let country = document.getElementById("country").value;

    document.getElementById("result").innerHTML = "Loading... ⏳";

    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(data => {

        let currencyCode = Object.keys(data[0].currencies)[0];
        let currencyName = data[0].currencies[currencyCode].name;

        document.getElementById("result").innerHTML = `
            <p><b>Country:</b> ${data[0].name.common}</p>
            <p><b>Currency:</b> ${currencyCode} - ${currencyName}</p>
        `;
    })
    .catch(() => {
        document.getElementById("result").innerHTML = "❌ Country not found";
    });
}