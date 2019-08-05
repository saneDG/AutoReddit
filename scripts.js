urls = [];
var decUri = [];
var subreddit = "videos";
var amount = 25;

var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

$.ajax({
    url: "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=" + amount,

    success: function (result) {
        console.log(result)

        amount = result.data.dist

        console.log(amount)

        for (let i = 0; i <= amount - 1; i++) {

            urls[i] = result.data.children[i].data.media.oembed.html

            decUri[i] = decodeHTML(urls[i])

            console.log(decUri[i]);

            $( decUri[i]
            ).appendTo('#videoContainer').css({"width": "600px", "height": "300px"});

            $("").css("background-color");
        }
    }
})