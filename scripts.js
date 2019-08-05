urls = [];
var decUri = [];
var subreddit = "videos";
var amount = 3;

var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

function onPlayerReady(event) {
    var embedCode = event.target.getVideoEmbedCode();
    event.target.playVideo();
    if (document.getElementById('embed-code')) {
      document.getElementById('embed-code').innerHTML = embedCode;
    }
  }

var player = []

$.ajax({
    url: "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=" + amount,

    success: function (result) {

        amount = result.data.dist

        for (let i = 0; i <= amount - 1; i++) {

            urls[i] = result.data.children[i].data.media.oembed.html

            decUri[i] = decodeHTML(urls[i])

            console.log(decUri[i])

            $( decUri[i]
            ).appendTo('#videoContainer').attr('id', 'player' + i).css({"width": "600px", "height": "300px"});

            player[i] = $('#player' + i)
        }
    }
})

player[0].setPlayerState(1)