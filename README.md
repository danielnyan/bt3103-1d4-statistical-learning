# bt3103-1d4-statistical-learning
*Now called Regression Analysis by Team 1d4*

Steps for deploying to Lambda:
1)Go to your AWS Educate account and click Account Details. Click Show 
to reveal your AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN
<p align="center">
  <img src="./img/lambda_image3.png">
</p>
2) If you already have a S3 bucket, skip this step. Else, make an AWS S3 
Bucket. Configure the permissions as follows:
<p align="center">
  <img src="./img/lambda_image10.png">
</p>
3) Fork this repo and go to Secrets. Key in your AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN and BUCKET_NAME, where 
BUCKET_NAME is the name of the S3 bucket from Step 2
4) Then make a change to any file and commit the change. This will trigger 
our GitHub action which will deploy everything for you. Your website URL 
can be found on your Lambda function that's automatically created.
<p align="center">
  <img src="./img/lambda_image14.png">
</p>

### Troubleshooting
**Invalid Credentials**  
Assuming that you're using AWS Educate, repeat steps 3 to 8 and replace your AWS_SECRET_ACCESS_KEY, 
AWS_SESSION_TOKEN and AWS_ACCESS_KEY_ID with the new values. Your credentials expire every 3 hours.

**Unable to create stack / ROLLBACK COMPLETE**  
Search for CloudFormation on AWS Console and delete the stack called StatisticalLearning, if it exists. 
Then rerun the checks again. Usually deleting and recreating the stack rectifies the problem.

**Other stuff**  
When the build fails, you can open up the logs for the failing build. 
Search for ResourceStatusReason. The reasons for failure should be there. 
