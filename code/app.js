var currentState = 0;
var goal = 0;
var percent = doPercent( currentState );
var previousValue;
var eventType;
var prefix;

// Initialization
window.addEventListener('onWidgetLoad', function (obj) {
  let data = obj["detail"]["session"]["data"];
  const fieldData = obj["detail"]["fieldData"];
  
  // Set goal Title
  document.getElementById("title").textContent=fieldData["titleText"];
  
  // Set correct values
  goal = fieldData["amount"];
  eventType = fieldData["eventType"];
  previousValue = fieldData["subtractDonations"];
  if (eventType == 'tip')
  {
    prefix = '$';
    currentState = data["tip-total"]["amount"] - previousValue;
  }
  if (eventType == 'cheer')
  {
    prefix = '☆';
    currentState = data["cheer-total"]["amount"] - previousValue;
  }
  if (eventType == 'follower')
  {
    prefix = '';
    currentState = data["follower-total"]["count"] - previousValue;
  }
  if (eventType == 'subscriber')
  {
    prefix = '';
    currentState = data["subscriber-total"]["count"] - previousValue;
  }
  
  // Set goal live
  reloadGoal();
});

// Update event
window.addEventListener('onEventReceived', function (obj) {
  const listener = obj.detail.listener;
  const event = obj["detail"]["event"];

  if ( listener == 'tip-latest' ) {
    currentState = currentState + event["amount"];
    reloadGoal();
  }
});

function reloadGoal() {
  $('#progress .endgame .amount').text( prefix + goal );
  percent = doPercent( currentState );
  if (percent != 100)
  {
    if (eventType == 'tip')
    {
      $('#progress .loading .amount').text( prefix + currentState.toFixed(2) );
    }
    else
    {
      $('#progress .loading .amount').text( prefix + currentState );
    }

    $('#progress .loading').css(
      {
        'width': percent + '%'
      });
    $('#progress #current_goal').text( "0" );
  }
  else
  {
    $('#progress .loading').css(
     {
       'width': '100%'
     }); 
    $('#progress .loading .amount').text( "★ Goal Completed!" );
  }
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
