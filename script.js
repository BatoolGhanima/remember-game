let success = 0;
let fail = 0;
let hownum = 1000;
let num;
let randomnumber;
let attempts = 0;

function startgame() {
    showtable();
    if (attempts < 20) {
        randomnumber = randomnum();
        document.getElementById("div1").innerHTML = randomnumber;
        showNumber();
        attempts++;
        time();
        function time() {
            setTimeout(hideNumber, 1500)
            setTimeout(showcheck, 1500)
            setTimeout(showinput,1500)
            
        }
        function hideNumber() {
            document.getElementById("div1").style.display = "none";
        }
        function showNumber() {
            document.getElementById("div1").style.display = "block"
            // setTimeout(showinput,1500)
        }
        function randomnum() {
            num = Math.floor(Math.random() * hownum)
            return num;
        }
        
    }
    else {
        alert(" Game over ! ") 
        document.getElementById("boshra").innerHTML=
            ` <center><a href="first.html" id="a"><button class="button"> Go back</button></a>

            </button></center> `
        
    }
}

function check() {
    let user = document.getElementById("usernumber").value;
    if (user == randomnumber) {
        message();
        document.getElementById("popup").innerHTML = "pass";
        success++;
        hownum *= 10;
        setTimeout(startgame,1000)
        // startgame();
        playAudioSucsses();
        savedata();
        
        
    }
    else {
        message();
        document.getElementById("popup").innerHTML = "fail"; 
        fail++;
        hownum /= 10;
        setTimeout(startgame,1000)
        playAudioFail();
        savedata();
    }
    console.log(success);
    console.log(fail);
}
function message() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
    setTimeout(function () {
        popup.style.display = "none";
    }, 700)
}
function nonestart() {
    setTimeout(buttonstart, 300);
    setTimeout(startgame,600)

}
function buttonstart() {
    document.getElementById("start").style.display = "none";
    
}
//to change theme , dark or light
function toggleCSS() {
    var csslink = document.getElementById('css-link');
    if (csslink.getAttribute('href') == 'styles1.css') {
        csslink.setAttribute('href', 'styles2.css');
    } else {
        csslink.setAttribute('href', 'styles1.css');
    }
}
function playAudioSucsses() {
  
        document.getElementById("successAudio").play();
    
}
function playAudioFail() {
  
    document.getElementById("failAudoi").play();

}
document.getElementById("usernumber").style.display = "none";

function showinput() {
    document.getElementById("usernumber").style.display = "block";
}
document.getElementById("check").style.display = "none";
function showcheck() {
    document.getElementById("check").style.display = "block";
}

function savedata() {
    let username = document.getElementById("username").value;
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let currenplayer = players.find(player => player.name === username);
    if (currenplayer) {
        currenplayer.success = success;
        currenplayer.fail = fail;

    }
    else {
        players.push({ name: username, success: success, fail: fail });
    }
    localStorage.setItem("players", JSON.stringify(players));
}
function showtable() {
    let person = JSON.parse(localStorage.getItem("players")) || [];
    let table = document.getElementById("tbody");
    person.sort((a, b) => (a.success < b.success) ? 1 : ((a.success > b.success) ? -1 : 0));
    person.forEach(player => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${player.name}</td> <td>${player.success}</td> <td>${player.fail}</td>`;
    });
}
showtable();