let fuee = new Vue({
  el: "#app",
  data: {
    newUserHeader: "Your save code is as follows",
    savecode: "Generating...",
    existingUserStatus: " "
  },
  methods: {
    newuser() {
      $("#login").animate({
        left: "0%"
      }, 500, "swing", () => {
        this.generateId().then((response) => {
          this.savecode = response;
          window.location.href = "contents.html"
        }).catch((error) => {
          this.savecode = error || "Network request failed. See Developer Logs for more details.";
          this.newUserHeader = "A network error has occurred";
        });
      });
    },
    existinguser() {
      $("#login").animate({
        left: "-200%"
      }, 500, "swing");
    },
    returntomain () {
      $("#login").animate({
        left: "-100%"
      }, 500, "swing");
    },
    generateId() {
      return new Promise((resolve, reject) => {
        const nekoUrl = window.location.origin + "/Prod/lambda_handler";
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let response = JSON.parse(xmlHttp.responseText);
            sessionStorage.setItem("userID", response.id);
            resolve(response.id);
          } else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
            console.error(xmlHttp);
            reject(xmlHttp.status + ": " + (xmlHttp.responseText || "Network error occurred"));
          }
        }
        xmlHttp.onerror = () => {reject(xmlHttp.responseText);};
        xmlHttp.open("POST", nekoUrl, true);
        xmlHttp.send(JSON.stringify({
          operation: "generateId"
        }));
      });
    },
    submitId() {
      this.existingUserStatus = "Querying database for user ID..."
      this.restoreId($("#userid").val()).then((userId) => {
        sessionStorage.setItem("userID", userId);
        if (userId === "debugnyan") {
          this.existingUserStatus = "Nyan nya! You are now entering Debug Mode! Warning: Some stuff might break";
        } else {
          this.existingUserStatus = "Save data loaded! You are being redirected.";
        }
        window.setTimeout(() => {
          window.location.href = "contents.html";
        }, 1000);
      }).catch((error) => {
        this.existingUserStatus = error || "Network request failed. See Developer Logs for more details.";
      });
    },
    restoreId(userId) {
      if (userId === "debugnyan") {
        return new Promise((resolve, reject) => {
          resolve("debugnyan");
        });
      }
      return new Promise((resolve, reject) => {
        const nekoUrl = window.location.origin + "/Prod/lambda_handler";
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            resolve(userId);
          } else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
            if (xmlHttp.status === 401 && 
              JSON.parse(xmlHttp.responseText).error === "The user cannot be found") {
                reject("The save code that you entered is invalid.")
            } else {
              console.error(xmlHttp);
              reject(xmlHttp.status + ": " + (xmlHttp.responseText || "Network error occurred"));
            }            
          }
        }
        xmlHttp.onerror = () => {reject(xmlHttp.responseText);};
        xmlHttp.open("POST", nekoUrl, true);
        xmlHttp.send(JSON.stringify({
          userId: userId,
          operation: "getProgress"
        }));
      });
    }
  }
});

$(document).ready(() => {
  $("#userid").on('keyup', function (e) {
    if (e.keyCode === 13) {
      fuee.submitId();
    }
  });
});