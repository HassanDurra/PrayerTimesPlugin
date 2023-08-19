$(document).ready(function()
{
    let CurrentYear = new Date().getFullYear();
    let startYear = 1;
    let yearSelect = $('select[name="year"]');
    
    for (var year = CurrentYear; year >= startYear; year--) {
        yearSelect.append($('<option></option>').val(year).html(year));
    };
    let  monthSelect  = $('select[name="month"]');

    for(var month = 1 ; month <= 12 ; month ++)
    {
        const monthName  =  new Date(2000 , month - 1 ).toLocaleString('default' , {month :'long'});
        monthSelect.append($('<option></option>').val(month).html(monthName));
    }
   //Month and Year
  // Ajax for calling data

  let country       =   $('input[name="country"]');
  let mosque         =  $('input[name="mosque"]');
  let city          =   $('input[name="city"]');
  let method        =   $('select[name="method"]');

 
  let submitBtn     =   $('#getTime');

  $(submitBtn).on('click' ,function(e){
    e.preventDefault();
   $.ajax({
    url  : "https://api.aladhan.com/v1/calendarByAddress/"+yearSelect.val()+"/"+monthSelect.val()+"?address="+mosque.val()+",%20"+city.val()+",%20"+country.val()+"&method="+method.val()+"",
    type : "Get",
    success:function(data)
    {
        $('#prayerContainer').empty(); // Clear previous data

        $(data.data).each(function(index, value) {
            let table = `
              <tr>
              <td>${index + 1}</td>
              <td>${value.timings.Fajr}</td>
              <td>${value.timings.Dhuhr}</td>
              <td>${value.timings.Asr}</td>
              <td>${value.timings.Maghrib}</td>
              <td>${value.timings.Isha}</td>
              </tr>
            `;
            $('#prayerContainer').append(table);
        });
        // $(data.data).each(function(index, value) {
        //     const fajrTime = new Date(`2000-01-${index + 1} ${value.timings.Fajr}`);
        //     const hourDegree = (fajrTime.getHours() % 12) * 30 + fajrTime.getMinutes() / 2;
        //     const minuteDegree = fajrTime.getMinutes() * 6;
        //     console.log("Hour" + hourDegree);
        //     console.log("Minute" + minuteDegree);
        //     // ... (existing code)
        // });

    }
})
  })




});