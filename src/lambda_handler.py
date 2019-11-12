import json
import os
import boto3 
import decimal
from datetime import datetime
from content_parser import *
from question_checker import *
from uuid import uuid4
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

dynamodb = boto3.resource('dynamodb')

def save_logs(logData):
    timestamp = datetime.utcnow()

    table_name = os.environ['LOG_TABLE_NAME']
    table = dynamodb.Table(table_name)
    
    log = logData.copy() 
    log['logId'] = str(timestamp.timestamp())
    log['createdAt'] = str(timestamp)

    table.put_item(Item=log)
    
def generate_id():
    table_name = os.environ['USER_TABLE_NAME']
    table = dynamodb.Table(table_name)
    generatedId = None
    while generatedId == None:
        generatedId = str(uuid4())
        response = table.get_item(
            Key={
                'userId' : generatedId
            }
        )
        if "Item" in response:
            generatedId = None
        else:
            table.put_item(Item={
                "userId" : generatedId,
                "completed" : json.dumps([])
            })
    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body":  json.dumps({
            "id" : generatedId
        })
    }

def update_completed(questionId, userId):
    table_name = os.environ['USER_TABLE_NAME']
    table = dynamodb.Table(table_name)
    userdata = table.get_item(
        Key={"userId":userId}
    )
    new_completed = json.loads(userdata["Item"]["completed"])
    if questionId not in new_completed:
        new_completed.append(questionId)
        new_completed.sort()
    new_completed = json.dumps(new_completed)
    table.update_item(
        Key={"userId":userId},
        UpdateExpression="SET completed = :newCompleted",
        ExpressionAttributeValues={
            ":newCompleted": new_completed
        },
        ReturnValues="UPDATED_NEW"
    )
    
def getProgress(userId):
    table_name = os.environ['USER_TABLE_NAME']
    table = dynamodb.Table(table_name)
    response = table.get_item(
        Key={
            'userId' : userId
        }
    )
    if "Item" in response:
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            "body":  json.dumps({
                "completed": response["Item"]["completed"]
            })
        }
    else:
        return {
            "statusCode": 401,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            "body":  json.dumps({
                "error": "The user cannot be found"
            })
        }

def lambda_handler(event, context):
    method = event.get('httpMethod', {})
    if method == 'GET':
        path = event.get('path')
        return content_parser(path)
    if method == 'POST':
        postReq = json.loads(event.get('body', {}))
        if "userToken" in postReq:
            response = question_checker(postReq)
            logged = response.copy()
            logged["userId"] = logged["userToken"]
            save_logs(logged)
            return response
        elif "questionId" in postReq:
            response = question_checker(postReq)
            logged = response.copy()
            logged["userId"] = postReq["userId"]
            if postReq["operation"] == "checkAnswer":
                logged["operation"] = "checkAnswer"
                logged["questionId"] = postReq["questionId"]
                if json.loads(logged["body"])["correct"]:
                    update_completed(postReq["questionId"], postReq["userId"])
            save_logs(logged)
            return response
        elif "operation" in postReq:
            if postReq["operation"] == "generateId":
                return generate_id()
            elif postReq["operation"] == "getProgress":
                return getProgress(postReq["userId"])
            elif postReq["operation"] == "navigate":
                save_logs(postReq)
                return {
                    "statusCode": 200,
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    "body":  json.dumps({
                        "content" : "Operation successful"
                    })
                }
        else:
            return {
                "statusCode": 200,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                "body":  json.dumps({
                    "content" : "Operation successful"
                })
            }
