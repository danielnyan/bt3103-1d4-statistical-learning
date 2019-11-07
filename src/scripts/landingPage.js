/* To do:
performance.navigation.type = 1 indicates a refresh
In Python, uuid4() in the uuid library makes a key.
Thus, we should also make a table that stores user ID
and the questions they completed.
We can either use window.name or sessionStorage.getItem /
setItem to persist the user ID across webpages.
 */

const generateId = async function () {
	let result = await new Promise((resolve, reject) => {
			const nekoUrl = window.location.origin + "/Prod/lambda_handler";
			const xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					resolve(xmlHttp.responseText);
				}
			}
			xmlHttp.open("POST", nekoUrl, true);
			xmlHttp.send(JSON.stringify({
					operation: "generateId"
				}));
		});
	let response = JSON.parse(result);
	console.log(response.id);
	sessionStorage.setItem("userID", response.id);
}

const restoreId = async function (userId) {
	let result = await new Promise((resolve, reject) => {
			const nekoUrl = window.location.origin + "/Prod/lambda_handler";
			const xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
					resolve(xmlHttp.responseText);
				} else if (xmlHttp.readyState === 4 && xmlHttp.status === 401) {
					if (xmlHttp.responseText.error === "The user cannot be found") {
						resolve(JSON.stringify({
              error: "No user found"
            }));
					}
				}
			}
			xmlHttp.open("POST", nekoUrl, true);
			xmlHttp.send(JSON.stringify({
					userId: userId,
					operation: "getProgress"
				}));
		});
	let response = JSON.parse(result);
	if (response.error === "No user found") {
		console.log("User not found");
	} else {
		sessionStorage.setItem("userID", userId);
	}
}

generateId();

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