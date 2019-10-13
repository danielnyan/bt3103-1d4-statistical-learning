import json
def lambda_handler(event, context):
    method = event.get('httpMethod', {})
    if method == 'GET':
        return {
            "statusCode": 200,
            "headers": {
                'Content-Type': 'text/html',
            },
            "body": "Hey, that was a GET request"
        }
    if method == 'POST':
        postReq = json.loads(event.get('body', {}))
        print("POST request recevied")
        print(postReq)
        
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
