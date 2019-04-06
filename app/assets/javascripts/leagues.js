function getLeagues() {
  $("a.details").click(function(e){
    e.preventDefault();
    let id = $(this).data("id");
    $.get("/leagues/" + id + ".json", function(data){
      let league = data;
      let leagueDetails = "<p>" + "<strong>Draft Type:</strong>" + "</p>" + "<ul>" + league["draft"] + "</ul>" + "<p>" + "<strong>Scoring Style:</strong>" + "</p>" + "<ul>" + league["scoring"] + "</ul>" + "<p>" + "<strong>Teams:</strong>" + "</p>";
      $("#league-" + id).html(leagueDetails);

      let teams = league["teams"];
      let teamList = "";
      teams.forEach(function(team) {

        teamList += '<ul data-id="' + team["id"] + '">' + team["team_name"] + '</ul>';
      });
      $("#league-" + id + "-teams").html(teamList);
    })
  })
}


function newLeague() {
  $('form#new_league').submit(function(e) {
      e.preventDefault();
      let values = $(this).serialize();
      let result = $.post('/leagues', values)
      result.done(function(response) {
        clearForm();
        var league = response;
        $("#leagueName").text(league["name"]);
        $("#leagueDraft").text(league["draft"]);
        $("#leagueScoring").text(league["scoring"]);
      });
    });
  }

function clearForm() {
  document.getElementById("new_submit").disabled = false;
  $(':input','#new_league') .not(':button, :submit, :reset, :hidden') .val('')
}

function nextLeague() {
  $(".js-next").on("click", function(e) {
    e.preventDefault();
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/leagues/" + nextId + "/league_data", function(data) {
      console.log(data)
      $("#leagueName").text(data["name"]);
      $("#leagueDraft").text(data["draft"]);
      $("#leagueScoring").text(data["scoring"]);
      $(".js-next").attr("data-id", data["id"]);
    });
  });
}
