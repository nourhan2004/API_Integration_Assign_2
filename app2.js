function getData() {
    let country = document.getElementById("country").value;

    document.getElementById("result").innerHTML = "Loading... ⏳";

    // 1️⃣ جلب بيانات الدولة
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => res.json())
    .then(data => {

        let currencyCode = Object.keys(data[0].currencies)[0];
        let currencyName = data[0].currencies[currencyCode].name;

        // 2️⃣ جلب أسعار الصرف
        fetch(`https://api.exchangerate-api.com/v4/latest/${currencyCode}`)
        .then(res => res.json())
        .then(rateData => {

            let usd = rateData.rates["USD"];
            let ils = rateData.rates["ILS"];

            // 3️⃣ عرض النتائج
            document.getElementById("result").innerHTML = `
                <p><b>Country:</b> ${data[0].name.common}</p>
                <p><b>Currency:</b> ${currencyCode} - ${currencyName}</p>

                <hr>

                <p><b>Exchange Rates:</b></p>
                <p>USD: 1 ${currencyCode} = ${usd} USD</p>
                <p>ILS: 1 ${currencyCode} = ${ils} ILS</p>
            `;
        });

    })
    .catch(() => {
        document.getElementById("result").innerHTML = "❌ Error fetching data";
    });
}