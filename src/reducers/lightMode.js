export default function(darkMode = false, action) {
    if(action.type == 'sendDarkMode') {
      var newgDarkMode = action.darkMode;
      return newgDarkMode;
    } else {
      return darkMode;
    }
  };