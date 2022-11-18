
$(function () {
  // Add a listener for click events on the save button. 
  var saveBtn = $('.saveBtn');
  $('.saveBtn').on('click', function() {
    // Get the id of the time-block clicked
    let hourClickedEl = $(this).parent();
    let hourClicked = hourClickedEl.attr('id');
    // Get the event desciption
    let hourDesc = hourClickedEl.children('.description');
    let eventDesc = hourDesc.val();
    // Save to local storage
    localStorage.setItem(hourClicked, eventDesc);
  }) 

  // Get current date and time 
  var currentTime = dayjs();
  // Get the current hour
  var currentHour = currentTime.hour();

  // Iterates through all the time blocks
  $('.time-block').each(function() {
    // Get element id and hour block of each block
    let timeblockID = $(this).attr('id');
    let timeblockHour = parseInt(timeblockID.substr($(this).attr('id').indexOf('-')+1));
    
    // Add class to each time block by comparing the id to the current hour. 
    if (timeblockHour < currentHour) {
      $(this).removeClass('future');
      $(this).addClass('past');
    } else if (timeblockHour === currentHour) {
      $(this).removeClass('future');
      $(this).addClass('present');
    }
    // Retrive saved event for this hour, if any
    let savedEvent = localStorage.getItem(timeblockID);
    if (timeblockID !== null) {
      // Display event in element with class description
      $(this).children('.description').text(savedEvent);
    }
  });

  // Display the current date in the header of the page.
  $('#currentDay').text(currentTime.format('dddd, MMMM D, YYYY'));

});
