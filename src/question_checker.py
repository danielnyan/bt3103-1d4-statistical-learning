from code_runner import *
import json

def question_checker(postReq):
    if "userToken" in postReq:
        return alset_api(postReq)
    question_id = postReq["questionId"]
    if question_id == "1a":
        return question_1a(postReq)
    elif question_id == "1b":
        return question_1b(postReq)
    elif question_id == "2a":
        return question_2a(postReq)
    elif question_id == "2b":
        return question_2b(postReq)
    elif question_id == "5a":
        return question_5a(postReq)

def alset_api(postReq):
    # Retrieve the contents from the request
    editable = postReq["editable"]["0"].strip()
    hidden = postReq["hidden"]["0"]
    shown = postReq["shown"]["0"]
    userToken = postReq["userToken"]
    
    # Calculate different feedbacks
    allFeedback = {
      "isComplete": True,
      "jsonFeedback": { "code": userToken, "message": "Thank you for your feedback!" },
      "htmlFeedback": "<div>{}</div>".format("Thank you for your feedback!"),
      "textFeedback": "Thank you for your feedback!"
    }
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body":  json.dumps({
            "isComplete": allFeedback["isComplete"],
            "jsonFeedback": allFeedback["jsonFeedback"],
            "htmlFeedback": allFeedback["htmlFeedback"],
            "textFeedback": allFeedback["textFeedback"]
        })
    }

def question_1a(postReq):
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body":  json.dumps({
            "correct": True
        })
    }

def question_1b(postReq):
    answer = json.loads(postReq["answer"])
    expected = {'response': 'mpg', 'predictors': ['Intercept', 'acceleration']}
    gotten = get_output(answer, "import scipy\nimport pandas as pd\ndf=pd.read_csv('./data/dataset.csv')", "", '{"response":ols_result.model.endog_names, "predictors":ols_result.model.exog_names}')
    gotten = json.loads(gotten)
    solved = (expected == gotten["output"])
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body":  json.dumps({
            "correct": solved,
            "expected": expected,
            "gotten": gotten,
            "answer": answer
        })
    } 
    
def question_2a(postReq):
    answer = json.loads(postReq["answer"])
    expected = {'response': 'mpg', 'predictors': ['Intercept', 'cylinders', 'displacement', 'horsepower','weight','acceleration','year','origin']}
    gotten = get_output(answer, "import scipy\n", "", '{"response":ols_result.model.endog_names, "predictors":ols_result.model.exog_names}')
    gotten = json.loads(gotten)
    if "predictors" in expected:
        if "Intercept" in expected["predictors"]:
            expected["predictors"].remove("Intercept")
        expected["predictors"] = sorted(expected["predictors"])
    if "predictors" in gotten["output"]:
        if "Intercept" in gotten["output"]["predictors"]:
            gotten["output"]["predictors"].remove("Intercept")
        gotten["output"]["predictors"] = sorted(gotten["output"]["predictors"])
    solved = (expected == gotten["output"])
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body":  json.dumps({
            "correct": solved,
            "expected": expected,
            "gotten": gotten,
            "answer": answer
        })
    }  

def question_2b(postReq):
    answer = json.loads(postReq["answer"])
    rSquared = answer["rSquared"]
    properties = answer["selected"]
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body":  json.dumps({
            "rSquared": rSquared,
            "correct": (rSquared > 0.81825),
            "properties": json.dumps(properties),
            "answer": answer
        })
    }

def question_5a(postReq):
    answer = json.loads(postReq["answer"])
    expected = {'response': 'Survived', 'predictors': ['Intercept', 'Fare', 'Pclass', 'Age']}
    gotten = get_output(answer, "import scipy\n", "", '{"response":result.model.endog_names, "predictors":result.model.exog_names}')
    gotten = json.loads(gotten)
    if "predictors" in expected:
        if "Intercept" in expected["predictors"]:
            expected["predictors"].remove("Intercept")
        expected["predictors"] = sorted(expected["predictors"])
    if "predictors" in gotten["output"]:
        if "Intercept" in gotten["output"]["predictors"]:
            gotten["output"]["predictors"].remove("Intercept")
        gotten["output"]["predictors"] = sorted(gotten["output"]["predictors"])
    solved = (expected == gotten["output"])
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body":  json.dumps({
            "correct": solved,
            "expected": expected,
            "gotten": gotten,
            "answer": answer
        })
    }  