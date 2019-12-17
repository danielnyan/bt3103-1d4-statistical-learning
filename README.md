# GitHub Pages version of Regression Analysis by Team 1d4  
*lazily ported to GitHub Pages by Daniel (danielnyan)*  
You may view the deployment by going to the Environment page. The GitHub Pages version differs 
signficiantly from the Amazon AWS Lambda version. Some of the features not included are:  
1. Savecode-based progress tracking (we don't use cookies or login credentials because we don't need those)  
2. Code checking using test cases, as well as more descriptive error messages that tell you where you 
went wrong.

To deploy your own version of the full app, create an AWS Educate account and follow the instructions 
given in the master branch. Alternatively, you may view our deployment of the full app (link given 
upon request only to specific people). 

FAQ:  
**What's BT3103?**  
It's a module from the National University of Singapore's Business Analytics course titled 
Application Systems Development for Business Analytics. We're tasked to create a serverless application 
that teaches users a certain topic, providing feedback to guide users along the way, and using user 
feedback to craft the learning process. 

In our original concept, we decided to be ambitious and implement something called adaptive learning 
for the coding sections where we incrementally guide users less and less as they progress. However, 
since we were only given 13 weeks to develop the project, we scrapped that idea and implemented a 
hint system instead. Nonetheless, we did make some effort to work on that by creating a DynamoDB table 
that tracks user clicks (that's of course not in this GitHub pages demo), so one could improve on that 
idea to implement adaptive learning. 

Also, if you find that there are a bunch of weird design choices and requirements in the website, 
that's also partly because we're trying to fit the project to the website's specs. 

**What's 1d4?**  
It's our team name for BT3103. There were four of us, and we decided to randomly generate a name. 
But wait... "random" --> "dice". And a dice with 4 sides is called 1d4 in Dungeons and Dragons 
terminology (no, I don't play DnD, sorry!). So we're 1d4 because we are a group of four that 
randomly generated our name.

**There is no way a linear model is a good fit.**  
This app is more of a proof of concept rather than an actual educational device. The repository is MIT 
licensed, meaning that one could fork the repository and deploy their own version with everything 
made factually correct and with better exercises, so long as it complies with the license.

**Your FAQ sucks.**  
If you have any questions that you want me to answer, create an issue! Though since this is a past 
school project, I may not be very active here. Also, I won't maintain the code base anymore (since 
we're technically not allowed to modify the project after the deadline as the professor grades these). 
By the way, our professor is Chris Boesch. His GitHub page is https://github.com/scboesch. He is bae. 

And no, I'm not going to give out my contact information. If you wanna talk to me, do so via the 
comments section or the Issues page. Though I might put down contact info in my GitHub profile 
eventually. 

See my other projects: https://github.com/danielnyan

Special thanks to my awesome teammates of Team 1d4, it's been a pleasure working with you guys!

Brandon: https://github.com/coldsonata  
AWS backend (auto-deployment with GitHub Actions and CloudFormation stack), hints button, HTML styling and lesson design

Meng Yuan: https://github.com/MENGYUAN1  
Code blocks, promotional videos, ALSET Achievement Path  
https://achievements-prod.firebaseapp.com/#/paths/-Lq5Ie7SjSB9FDAiKlxC

Nelson: https://github.com/Nelsonho1999  
HTML lesson design, multiple choice questions
