from code_runner import *

def question_checker(postReq):
    if "userToken" in postReq:
        return alset_api(postReq)
    question_id = postReq["questionId"]
    if question_id == "1a":
        return question_1a(postReq)
    elif question_id == "1b":
        return question_1b(postReq)

def alset_api(postReq):
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

def question_1a(postReq):
    pass
