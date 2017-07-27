$(document).ready(function(){
    // Toggle Search Class
    $('.search-icon').click(function(){
        $('.search-box').toggleClass('active');
    });

    // Add Default Template
    $('#wikiSearchResult').html(`
            <div class="jumbotron welcome">
                <h1>Wikipedia Viewer Applicaation</h1>
                <p class="lead">
                    Welcome to Wikipedia Viewer Application! Search for a keyword, and get detail information from Wikipedia.
                </p>
                <p>Want to check Wikipedia random articles?</p>
                <a class="btn btn-primary" target="_blank" href="https://en.wikipedia.org/wiki/Special:Random">Random Article</a>
            </div>
        `);

    // Submit Button Click Event
    $('#searchWiki').on('click', function(e){
        e.preventDefault();
        var inputWiki = $('#inputWiki').val();
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+inputWiki+'&format=json&callback=?';
        if(inputWiki) {
            $.ajax({
            type:'GET',
            url: url, 
            async: false,
            dataType:'json',
            success: function(result){
            
            $('.search-box').removeClass('active');
            $('#wikiSearchResult').html('');

            for(var i=0; i<result[1].length; i++) {
                $('#wikiSearchResult').append(`
                <div class="row justify-content-start">
                <div class="col-10 offset-md-1 mb-2">
                    <div class="card">
                        <div class="card-block">
                            <h3 class="card-title">`+result[1][i]+`</h3>
                            <p class="card-text">`+result[2][i]+`</p>
                            <a target="_blank" href="`+result[3][i]+`" class="btn btn-primary pull-right">Read More</a>
                        </div>
                    </div>
                </div>
                </div>
            `);
            }
                $('#wikiSearchResult').append(`
                <div class="container">
                    <div class="row justify-content-start">
                        <div class="col-10 offset-md-1 mb-2 gotoHome">
                            <button onclick="gotoHome()" id="gotoHome" class='btn btn-primary'>Home</button>
                        </div>
                    </div>
                </div>
                `);
            },
            error: function(error){
                console.log('Error');
            }
        });
        }else {
            $('#inputWiki').attr("placeholder", "Input field must not be empty");
        }
    });
});

/* GOTO TOP BUTTON START */
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("gotoTop").style.display = "block";
    } else {
        document.getElementById("gotoTop").style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
/* GOTO TOP BUTTON END */

/* GOTO HOMW BUTTON START */
function gotoHome(){
    $('#wikiSearchResult').html(`
            <div class="jumbotron welcome">
                <h1>Wikipedia Viewer Applicaation</h1>
                <p class="lead">
                    Welcome to Wikipedia Viewer Application! Search for a keyword, and get detail information from Wikipedia.
                </p>
                <p>Want to check Wikipedia random articles?</p>
                <a class="btn btn-primary" target="_blank" href="https://en.wikipedia.org/wiki/Special:Random">Random Article</a>
            </div>
        `);
}
/* GOTO HOMW BUTTON END */