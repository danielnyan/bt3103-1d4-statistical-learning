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
    elif question_id == '6a':
        return question_6a(postReq)

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
    expected = {'response': 'Survived', 'predictors': ['Intercept', 'Fare', 'Pclass', 'Age'], 'model': True}
    gotten = get_output(answer, "import scipy\nimport statsmodels\n", "", '{"response":result.model.endog_names, "predictors":result.model.exog_names, "model":isinstance(result.model,statsmodels.discrete.discrete_model.Probit)}')
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

def question_6a(postReq):
    answer = json.loads(postReq["answer"])
    expected = {'cabin': False, 'nan': False, 'cols':['PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age', 'SibSp',
       'Parch', 'Ticket', 'Fare', 'Embarked', 'C85', 'C123', 'E46', 'G6', 'C103', 'D56', 'A6',
       'C23 C25 C27', 'B78', 'D33', 'B30', 'C52', 'B28', 'C83', 'F33',
       'F G73', 'E31', 'A5', 'D10 D12', 'D26', 'C110', 'B58 B60', 'E101',
       'F E69', 'D47', 'B86', 'F2', 'C2', 'E33', 'B19', 'A7', 'C49', 'F4',
       'A32', 'B4', 'B80', 'A31', 'D36', 'D15', 'C93', 'C78', 'D35',
       'C87', 'B77', 'E67', 'B94', 'C125', 'C99', 'C118', 'D7', 'A19',
       'B49', 'D', 'C22 C26', 'C106', 'C65', 'E36', 'C54',
       'B57 B59 B63 B66', 'C7', 'E34', 'C32', 'B18', 'C124', 'C91', 'E40',
       'T', 'C128', 'D37', 'B35', 'E50', 'C82', 'B96 B98', 'E10', 'E44',
       'A34', 'C104', 'C111', 'C92', 'E38', 'D21', 'E12', 'E63', 'A14',
       'B37', 'C30', 'D20', 'B79', 'E25', 'D46', 'B73', 'C95', 'B38',
       'B39', 'B22', 'C86', 'C70', 'A16', 'C101', 'C68', 'A10', 'E68',
       'B41', 'A20', 'D19', 'D50', 'D9', 'A23', 'B50', 'A26', 'D48',
       'E58', 'C126', 'B71', 'B51 B53 B55', 'D49', 'B5', 'B20', 'F G63',
       'C62 C64', 'E24', 'C90', 'C45', 'E8', 'B101', 'D45', 'C46', 'D30',
       'E121', 'D11', 'E77', 'F38', 'B3', 'D6', 'B82 B84', 'D17', 'A36',
       'B102', 'B69', 'E49', 'C47', 'D28', 'E17', 'A24', 'C50', 'B42',
       'C148']}
    gotten = get_output(answer, "", "", '{"cabin": True if "Cabin" in df.columns.unique().tolist() else False , "nan": True if np.nan in df.columns.unique().tolist() else False , "cols":df.columns.unique().tolist()}')
    gotten = json.loads(gotten)
    if "cols" in expected:
            expected["cols"] = sorted(expected["cols"])
    if "cols" in gotten["output"]:
        gotten["output"]["cols"] = sorted(gotten["output"]["cols"])
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