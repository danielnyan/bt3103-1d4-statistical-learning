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

getLambdaFeedback();

const submit1a = async function() {
  let answer = $("#answer1a").val()
  if (answer === "7.82") {
    $("#incorrect1a").slideUp(500);
    $("#correct1a").slideDown(500);
    $('#neutral1a').slideUp(500);
  } else {
    $("#incorrect1a").slideDown(500);
    $("#correct1a").slideUp(500);
    $('#neutral1a').slideUp(500);
  }
}

const submit1b = async function() {
  let entered = $("#answer1b").text()
  $('#checking1b').slideDown(500);
  $("#incorrect1b").slideUp(500);
  $("#correct1b").slideUp(500);
  $('#neutral1b').slideUp(500);
  let result = await new Promise((resolve, reject) => {
    const nekoUrl = "https://1b1u6ce6m6.execute-api.us-east-1.amazonaws.com/Prod/lambda_handler";
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        resolve(xmlHttp.responseText);
      } 
    }
    xmlHttp.open("POST", nekoUrl, true); 
    xmlHttp.send(JSON.stringify({
      questionId:"1b", 
      answer:JSON.stringify(entered)
    }));
  });
  let resultInfo = JSON.parse(result);
  console.log(resultInfo);
  if (resultInfo.correct) {
    $("#incorrect1b").slideUp(500);
    $("#correct1b").slideDown(500);
    $('#checking1b').slideUp(500);
  } else {
    $("#incorrect1b").slideDown(500);
    $("#correct1b").slideUp(500);
    $('#checking1b').slideUp(500);
  }
}