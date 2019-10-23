console.log("Script loaded");

var resultInfo = null;

const getLambdaFeedback = async function() {
  let result = await new Promise(resolve => {
    const nekoUrl = "https://1b1u6ce6m6.execute-api.us-east-1.amazonaws.com/Prod/lambda_handler";
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        resolve(xmlHttp.responseText);
    }
    xmlHttp.open("POST", nekoUrl, true); 
    xmlHttp.send(JSON.stringify({userToken:"DtQmo", editable:{0:"asdf"}, hidden:{0:"asdf"}, shown:{0:"asdf"}}));
  });
  resultInfo = JSON.parse(result);
}

let result = getLambdaFeedback();