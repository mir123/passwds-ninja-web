// Pronunceable passwords generator 
// based on https://github.com/allixsenos/passwds-ninja-web
// Modified by mir on the Atlantic Ocean

var template = ['Cvccvc99','Cvccvv99','99vlcvcc','Vlcvcv99','9Alcvcvc'];


function generatePasswords(template, number) {
    var chars = {}
    chars['l'] = 'abcdefghijklmnoprstuvwxyz';
    chars['U'] = chars['l'].toUpperCase();
    chars['v'] = 'aeiouaeiouaeioaeioaeioy';
    chars['V'] = chars['v'].toUpperCase();
    chars['c'] = 'bcdfghjklmnprstvwxz';
    chars['C'] = chars['c'].toUpperCase();
    chars['9'] = '0123456789';
    chars['#'] = '!@#$%^&*_-+=()[]{}';
    chars['a'] = chars['l'] + chars['9'];
    chars['A'] = chars['a'].toUpperCase();

    var i, c, possible;

    var passwords = [];
    for (i = 0; i < number; i++) {
        password = '';
        var chosentemplate = template[Math.floor(Math.random() * template.length)]
        for (c = 0; c < chosentemplate.length; c++) {
            possible = chars[chosentemplate.charAt(c)];
            password += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        passwords.push(password);
    }

    return passwords;
}

function doPasswords() {
  passwords = generatePasswords(template, 10);

  var passwordlist = $("ul#passwords");
  $.each(passwords, function(i, password) {
      passwordlist.append($("<li>").text(password));
  });
  mixpanel.track("Generated passwords");
}

doPasswords();

$('#passwords').on('click', 'li', function() {
  var range = document.createRange();  
  range.selectNode(this);  
  window.getSelection().addRange(range);  
    
  var successful = false;
  try {  
    // Now that we've selected the anchor text, execute the copy command  
    successful = document.execCommand('copy');  
  } catch(err) {  
    successful = false;
    // whatever
  }

  if (!successful) {
      prompt("Your browser does not support insta-copy. Sorry.", $(this).text());
  }

  mixpanel.track("Claimed password");

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported  
  window.getSelection().removeAllRanges();  
});

function disableSelect(e) { return false; }
function reEnable() { return true; }
document.onselectstart=disableSelect;
if (window.sidebar){
    document.onmousedown=disableSelect
    document.onclick=reEnable
}

$('.more').on('click', function() {
  $('#passwords li').remove();
  doPasswords();
  return false;
});
