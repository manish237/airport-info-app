
/***********************************************************
 Object to hold search params for API call
 ************************************************************/
var searchRequest = {
    url:'https://services.faa.gov/airport/status/',
    format:'JSON',
    apCode:'',
}

/***********************************************************
 UI Renderer using the data returned.
 ************************************************************/

/***********************************************************
 Processor function to load data from API
 ************************************************************/
function renderData(apiData,localData)
{
    console.log(apiData)
    console.log(localData)

    //set api data

    //status column
    $('#avgdelay').text(apiData.status.avgDelay)
    $('#delaytype').text(apiData.status.type)
    $('#delayreason').text(apiData.status.reason)

    //weather conditions column
    $('#temperature').text(apiData.weather.temp)
    $('#wind').text(apiData.weather.wind)
    $('#visibility').text(apiData.weather.visibility)
    $('#wcondition').text(apiData.weather.weather)

    //airport data column

    $('#apcity').text(localData.city)
    $('#apstate').text(localData.state)
    $('#apcountry').text(localData.country)
    $('#apname').text(localData.name)
    $('#apelev').text(localData.elev)
    $('#aplat').text(localData.lat)
    $('#aplon').text(localData.lon)

    $('#inforow').show()
    $('#invalidmsg').hide()
    $('#unknownmsg').hide()
    $('#successmsg').show()

    initMap($('#mapinfo'),localData.lon,localData.lat)
}

function processData(data,localData) {
    $.getJSON(searchRequest.url+data.toUpperCase(), {format: 'JSON'}, function(apiData){
        renderData(apiData,localData)
    });
}

function processInput(apCode)
{
    $.getJSON("airports.json",function(json){
        var filteredApCodes = json.filter(function(o){
            return o.country==="United States" &&
                    o.code===apCode.toUpperCase()
        })
        if(filteredApCodes.length===0) {
            console.log('invalid')
            $('#invalidmsg').show()
            $('#unknownmsg').hide()
            $('#successmsg').hide()
        }
        else {
            console.log('vallid')
            $('#invalidmsg').hide()
            $('#unknownmsg').hide()
            $('#successmsg').hide()
            processData(apCode,filteredApCodes[0])
        }
        // console.log(filteredApCodes)
    })
}
/***********************************************************
Event Listeners
 ************************************************************/

//Navigation Listener for Prev link
$('#submitbtn').click(function (e) {
    e.preventDefault()
    $('#invalidmsg').hide()
    $('#unknownmsg').hide()
    $('#successmsg').hide()
    processInput($('#airportcode').val())
})


//Initialization on page load
function initCurrLocationMap(position)
{
    //console.log($('.map'))
    initMap($('#mapinfo'),position.coords.longitude,position.coords.latitude)
}
function initDefaultMap()
{
    initMap($('#mapinfo'),-122.392,37.6148)
}

$(document).ready(function() {

    $('#invalidmsg').hide()
    $('#unknownmsg').hide()
    $('#successmsg').hide()
    $('#inforow').hide()
    if( navigator.geolocation )
    {
       // Call getCurrentPosition with success and failure callbacks
       navigator.geolocation.getCurrentPosition( initCurrLocationMap, initDefaultMap );
    }
    else
    {
       alert("Sorry, your browser does not support geolocation services.");
    }
});



