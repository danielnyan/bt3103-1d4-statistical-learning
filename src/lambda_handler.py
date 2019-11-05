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
    log['userId'] = "HoshizoraRinyan"
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
                "userId" : generatedId
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

def lambda_handler(event, context):
    method = event.get('httpMethod', {})
    if method == 'GET':
        path = event.get('path')
        return content_parser(path)
    if method == 'POST':
        postReq = json.loads(event.get('body', {})) 
        save_logs(postReq)
        if "userToken" in postReq or "questionId" in postReq:
            return question_checker(postReq)
        elif "operation" in postReq:
            if postReq["operation"] == "generateId":
                return generate_id()
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
