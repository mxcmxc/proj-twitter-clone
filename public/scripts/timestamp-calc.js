function postTime(data) {

  let currentDate = Date.now(); // returns date now in ms
  let timestamp = data['created_at'];
  let timeDiff = currentDate - timestamp;

  if (Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365) > 0)) {
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365)) + " years ago";
  } else if (Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)) > 0) {
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)) + " months ago";
  } else if (Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 24)) > 0) {
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + " days ago";
  } else if (Math.floor(timeDiff / (1000 * 60 * 60) > 0)) {
    return Math.floor(timeDiff / (1000 * 60 * 60)) + " hours ago";
  } else if(Math.floor(timeDiff / (1000 * 60) > 0 )) {
    return Math.floor(timeDiff / 1000 * 60) + " minutes ago";
  } else if (Math.floor(timeDiff / 1000 > 0)) {
    return Math.floor(timeDiff / 1000) + " seconds ago";
  } else {
    return "0 seconds ago";
  }
}
