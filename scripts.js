// 6.8.2019 saneDG

// KORJATTAVAA
// kun haetaan videoita samasta subredditistä. Haku alkaa alusta ja haetut videot tulevat tuplana.
// kun haetaan videoita useammasta subredditistä. videoId ei jatku vaan alkaa alusta.

var urls = [];
var subreddit = "";
var amount = 2;
var player = []
var y = 0;
var x = 0;
var youtubeUrlMatch;
var actualVideo;

$(".btn").on("click", function (e) {

  amount = $('.form-control').val()
  console.log(amount)
  subreddit = $(this).attr("value")

  $.ajax({

    url: "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=" + amount,
    success: function (result) {

      amount = result.data.dist;

      for (let i = 0; i <= amount - 1; i++) {

        var url = result.data.children[i].data.url;

        actualVideo = checkIfYoutubeUrl(url)

        if (actualVideo != null) {

          urls[x] = parseYoutubeId(url);

          $('#playerContainer').append('<div class="vh-100"><div id="video_' + x + '"></div></div>');

          player[x] = new YT.Player('video_' + x, {
            height: '100%',
            width: '100%',
            videoId: urls[x],
            events: {
              'onStateChange': onPlayerStateChange
            }
          });

          x++

          $('html, body').animate({
            scrollTop: $("#video_" + y).offset().top
          }, 500);

        }



        /*
        console.log(player[i])
        $("html").keypress(function(data) {
            console.log(data)
        })
        */
      }
    }
  });
});


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

function skipVideo() {

}

function checkIfYoutubeUrl(url) {
  var regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  var youtubeUrlMatch = url.match(regExp);

  console.log(youtubeUrlMatch);

  return youtubeUrlMatch;
}

function parseYoutubeId(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  var match = url.match(regExp);

  return (match && match[7].length == 11) ? match[7] : false;
}

