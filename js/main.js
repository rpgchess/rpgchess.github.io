var navBtnWidth = $('.navbar a').css('width');

var github = [];

$('.navbar a').mouseenter(e => {
  $(e.target).clearQueue();
  $(e.target).animate({
    width: $(e.target).get(0).scrollWidth
  }, 300, () => {
    $(e.target).width('auto');
  });
});

$('.navbar a').mouseout(e => {
  $(e.target).animate({
    width: navBtnWidth
  }, 300);
});

function loadRepositories() {
  $.get( "https://api.github.com/users/rpgchess/repos", function(data) {
    data.forEach(function(repo, index, repos) {
      github.push({
        name: repo.name,
        href: repo.html_url,
        description: repo.description,
        language: repo.language
      });
    });
    addProfiles();
  });
}

loadRepositories();

function addProfiles() {
  var slide = document.getElementById('github');
  var html = '<h1>Portfolio</h1>';
      html +='<div class="row" style="width: 99%">';

  github.forEach(function(repo, index, repos) {
    repo.description = (repo.description == null)? '...' : repo.description;
    repo.language = (repo.language == null)? '' : repo.language;
    html += '<div class="col mb-2 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">'
    html += '<div class="card border-dark" style="height:92%">';
    html += '<a href="' + repo.href + '" target="_blank">';
    html += '<div class="card-header font-weight-bold text-left text-uppercase small">' + repo.name + '</div>';
    html += '<div class="card-text mt-2 text-center"><p>' + repo.description + '</p></div>';
    html += '<div class="card-footer text-uppercase text-muted small d-flex justify-content-end">' + repo.language + '</div>';
    html += '</a>';
    html += '</div>';
    html += '</div>';
  });

  html += '</div>';
  slide.innerHTML += html;
}