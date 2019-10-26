import json
from content_parser import *
from question_checker import *
import numpy as np
import statsmodels.formula as smf
import pandas as pd


def lambda_handler(event, context):
    method = event.get('httpMethod', {})
    if method == 'GET':
        path = event.get('path')
        return content_parser(path)
    if method == 'POST':
        postReq = json.loads(event.get('body', {}))
        return question_checker(postReq)
        
