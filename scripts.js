

urls = [];
var subreddit = "videos";
var amount = 10;
var player = []
var y = 0;

function onYouTubeIframeAPIReady(id) {
    $.ajax({
        url: "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=" + amount,
        success: function (result) {
            amount = result.data.dist;

            for (let i = 0; i <= amount - 1; i++) {
                var url = result.data.children[i].data.url;
                urls[i] = parseYoutubeId(url);

                $('#playerContainer').append('<div class="vh-100"><div id="video_' + i + '"></div></div>');

                player[i] = new YT.Player('video_' + i, {
                    height: '100%',
                    width: '100%',
                    videoId: urls[i],
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });
                
                /*
                console.log(player[i])
                $("html").keypress(function(data) {
                    console.log(data)
                })
                */
            }
        }
    });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

var lastEndedId;

function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.ENDED) {

        if (event.target.a.id != lastEndedId) {

            lastEndedId = event.target.a.id;
            y++;
            player[y].playVideo();

            $('html, body').animate({
                scrollTop: $("#video_" + y).offset().top
            }, 500);

        }
    }
}

function skipVideo(){
    
}


function parseYoutubeId(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);

    return (match && match[7].length == 11) ? match[7] : false;
}

