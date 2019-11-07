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
          this.savecode = error || "Network request failed";
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
      this.restoreId($("#userid").val()).then(() => {
        sessionStorage.setItem("userID", $("#userid").val());
        existingUserStatus: "Save data loaded! You are being redirected."
        window.location.href = "contents.html"
      }).catch((error) => {
        this.existingUserStatus = error || "Network request failed";
      });
    },
    restoreId(userId) {
      return new Promise((resolve, reject) => {
        const nekoUrl = window.location.origin + "/Prod/lambda_handler";
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            resolve(xmlHttp.responseText);
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