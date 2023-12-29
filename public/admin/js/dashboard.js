
const ctx = document.getElementById('myChart');
let url = new URL(window.location.href);

fetch('/admin/dashboard/api')
    .then(response => response.json())
    .then(data => {
        
        console.log(data);
        new Chart(ctx, {
            type: 'bar',
            data: {
            labels: data.dates,
                datasets: [{
                    label: 'Attendance',
                    data: data.counts,
                    borderWidth: 1,
                    backgroundColor: data.backgroundColor,
                    borderColor: 'rgba(0,0,0,0.8)'
                }]
            },
            options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                },
                maintainAspectRatio: false
            }
        });
                
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
const dateChoseInput = document.querySelector("#dateChose");
dateChoseInput.addEventListener("change",(e)=>{
    const dateChose = e.target.value;
    if(dateChose)
        url.searchParams.set("dateChose", dateChose);
    window.location.href = url
    console.log(url)

})


