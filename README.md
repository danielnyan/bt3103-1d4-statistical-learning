# bt3103-1d4-statistical-learning

Steps for deploying to Lambda:

1. Fork this repository
2. Go to AWS Console and set up an S3 bucket. Create a name for your bucket, and set 
permissions for everything (except the last option) to public. Leave everything else as the default.
3. Go to your AWS Account and click Account Details
4. In your forked repo, go to settings. Add in the AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN and 
BUCKET_NAME under Secrets.
5. Make a change in your repository to trigger the Action. The function should 
automatically deploy to your account. 

(to do: add images)
