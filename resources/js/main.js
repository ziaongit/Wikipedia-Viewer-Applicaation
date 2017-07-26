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
                <div class="col-sm-10 mb-2">
                    <div class="card">
                        <div class="card-block">
                            <h3 class="card-title">`+result[1][i]+`</h3>
                            <p class="card-text">`+result[2][i]+`</p>
                            <a target="_blank" href="`+result[3][i]+`" class="btn btn-primary pull-right">Read More</a>
                        </div>
                    </div>
                </div>
            `);

            }
            
            },
            error: function(error){
                console.log('Error');
            }
        });
    });
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}