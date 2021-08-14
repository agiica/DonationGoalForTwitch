var donation = 0;
var goal = 0;
var percent = doPercent( donation );
var previousDonations;

// Initialization
window.addEventListener('onWidgetLoad', function (obj) {
  let data = obj["detail"]["session"]["data"];
  const fieldData = obj["detail"]["fieldData"];
  
  // Set goal Title
  document.getElementById("title").textContent=fieldData["titleText"];
  
  // Set correct values
  goal = fieldData["amount"];
  previousDonations = fieldData["subtractDonations"];
  donation = data["tip-goal"]["amount"] - previousDonations;
  if (donation <= 0){
    donation = 0;
  }
  
  // Set goal live
  reloadGoal();
});

// Update event
window.addEventListener('onEventReceived', function (obj) {
  const listener = obj.detail.listener;
  const event = obj["detail"]["event"];

  if ( listener == 'tip-latest' ) {
    donation = donation + event["amount"];
    reloadGoal();
  }
});

function reloadGoal() {
  $('#progress .endgame .amount').text( '$' + goal );
  percent = doPercent( donation );
  $('#progress .loading .amount').text( '$' + donation.toFixed(2) );
  $('#progress .loading').css(
    {
      'width': percent + '%'
    });
  $('#progress #current_goal').text( "0" );
}

function doPercent( donated ) {
  var perc = donated / goal;
  var amount = perc * 100;
  if ( amount < 10 ) {
    amount = 10;
  }
  if ( amount > 100 ) {
    amount = 100;
  }
  return amount;
}
