$(document).ready(function () {

//Url for the wiki
const endUrl = 'https://fa.wikipedia.org/w/api.php';

$('.searchBox').autocomplete({
    serviceUrl: endUrl,
    dataType: 'jsonp',
    paramName: 'search',
    params: {
        action: 'opensearch',
        limit:0,
        format: "json"
    },
    transformResult: function (response) {
        return {
            suggestions: $.map(response[1], function (dataItem) {
                return { value: dataItem };
            })
        };
    }
});

//finding the enter key 
$('.searchBox').keypress(function (key) {
    if (key.which === 13) {
        $('.searchBtn').click();
    }
});

$('.searchButton').click(function () {
    var searchString = $('.searchBox').val();
    getJson(searchString);
});

//Random Clicked
$('.randomButton').click(function () {
    $.ajax({
        url: 'https://fa.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'query',
            list: 'random',
            format: 'json',
            rnnamespace: 0
        },
        success: function (data) {
            let title = data.query.random[0].title;
            $('.searchBox').val(title);
            getJson(title);
        }
    });
});

function getJson(searchString) {
    $.ajax({
        url: 'https://fa.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
            action: 'query',
            list: 'search',
            format: 'json',
            srlimit: 100,
            srsearch: searchString
        },
        success: function (response) {
            parse(response);
        }
    });
}

function parse(obj) {
    if (obj.error) return;
    $('.searchResult').html('');
    let count = obj.query.search.length;
    for (let i = 0; i < 5; i++) {
        let title = obj.query.search[i].title,
            desc = obj.query.search[i].snippet;
        showResult(title, desc);
    }
}

function showResult(title, desc) {
    $.ajax({
        url: endUrl,
        dataType: 'jsonp',
        data: {
            action: 'query',
            titles: title,
            prop: 'pageimages',
            format: 'json',
            pithumbsize: 300
        },
        success: function (response) {
            const key = Object.keys(response.query.pages);
            const noImage = "https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg"
            const { thumbnail } = response.query.pages[key];
            const imgUrl = thumbnail ? thumbnail.source : noImage;

            $('.searchResult').append(
                "<div class='DisplayBox' page='" + title.replace(" ", "_") + "'>" +
                "<a href='https://fa.wikipedia.org/wiki/" + title.replace(" ", "_") + " 'target='_blank'>" +
                "<div class='thumb' style='background-image: url(" + imgUrl + ")'></div></a>"+"<button>download</button>"+"<style>.cool{margin-top:20px;</style>" +
                 
                "<div class='description'>" + desc + "...</div>" +
  +
                "</div>" +
                "</div>" +
                "</div>"
            );
        }
    });
}
});