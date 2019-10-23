console.log("Script loaded");

const getLambdaFeedback = async function() {
  let result = await new Promise(resolve => {
    const nekoUrl = "https://1b1u6ce6m6.execute-api.us-east-1.amazonaws.com/Prod/";
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        resolve(xmlHttp.responseText);
    }
    xmlHttp.open("POST", nekoUrl, true); 
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send({
      editable: {
        0: `test editable`
      },
      hidden: {
        0: "test hidden \n test hidden 2"
      },
      shown: {
        0: `test shown
        test shown 2`
      },
      userToken: "asdf"
    });
  });
  return result;
}

let result = getLambdaFeedback();