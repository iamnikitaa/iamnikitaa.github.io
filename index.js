$(document).ready(function () {
	new GitHubCalendar(".calendar", "nikita7526");

	fetch('https://codeforces.com/api/user.rating?handle=nikita7526').then(function (response) {
		return response.json();
	}).then(function (data) {
		let rating = data.result[data.result.length - 1].newRating
		document.getElementById('cfRating').innerHTML = rating
	}).catch(function () {
		console.log("Booo");
	})

	fetch('https://api.github.com/users/nikita7526/repos').then(function (response) {
		return response.json();
	}).then(function (data) {
		let pr = data.length
		document.getElementById('githubRepos').innerHTML = pr
	}).catch(function () {
		console.log("Booo");
	})
	$(document).on("scroll", onScroll);

	//smoothscroll
	$('a[href^="#"]').on('click', function (e) {
		e.preventDefault();
		$(document).off("scroll");

		$('a').each(function () {
			$(this).removeClass('selected');
		})
		$(this).addClass('selected');

		var target = this.hash,
			menu = target;
		$target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top + 2
		}, 500, 'swing', function () {
			window.location.hash = target;
			$(document).on("scroll", onScroll);
		});
	});
});

function onScroll(event) {
	var scrollPos = $(document).scrollTop();
	$('.header a').each(function () {
		var currLink = $(this);
		var refElement = $(currLink.attr("href"));
		if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
			$('.header a div').removeClass("selected");
			currLink.addClass("selected");
		}
		else {
			currLink.removeClass("selected");
		}
	});
}
