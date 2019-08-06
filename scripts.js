

urls = [];
var decUri = [];
var subreddit = "videos";
var amount = 1;

var player = []

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'wNo7qoLRtkQ',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

$.ajax({
    url: "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=" + amount,

    success: function (result) {

        amount = result.data.dist

        for (let i = 0; i <= amount - 1; i++) {

            urls[i] = result.data.children[i].data.url

            console.log(decUri[i])
        }
    }
})
