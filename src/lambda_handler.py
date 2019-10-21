import json
from content_parser import *

def lambda_handler(event, context):
    method = event.get('httpMethod', {})
    if method == 'GET':
        path = event.get('path')
        return content_parser(path)
    if method == 'POST':
        postReq = json.loads(event.get('body', {}))
        
        # Retrieve the contents from the request
        editable = postReq["editable"]["0"].strip()
        hidden = postReq["hidden"]["0"]
        shown = postReq["shown"]["0"]
        userToken = postReq["userToken"]
        
        # Calculate different feedbacks
        allFeedback = {
          "isComplete": True,
          "jsonFeedback": { "code": userToken },
          "htmlFeedback": "<div>{}</div>".format(shown),
          "textFeedback": shown
        }
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
            },
            "body":  json.dumps({
                "isComplete": allFeedback["isComplete"],
                "jsonFeedback": allFeedback["jsonFeedback"],
                "htmlFeedback": allFeedback["htmlFeedback"],
                "textFeedback": allFeedback["textFeedback"]
            })
        }
