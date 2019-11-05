/* To do:
performance.navigation.type = 1 indicates a refresh
In Python, uuid4() in the uuid library makes a key.
Thus, we should also make a table that stores user ID
and the questions they completed.
We can either use window.name or sessionStorage.getItem /
setItem to persist the user ID across webpages.
 */

const setup = async function () {
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

setup();