---
title : "4. Provision supporting resources - Lambda, API Gateway & Step Function"
weight : 50
---
You will now create the following resources which will be used further in the workshop (a CloudFormation script is provided in the next step which will be used to create all the resources mentioned below)-

| **Resource Identifier in CloudFormation** 	| **Usage**                                                                                                                                                                                                                              	|
|-------------------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| kvslambda                                 	| This Lambda function would get the KVS video stream and cut them into smaller chunks and store into S3. This would also call the StartLabelDetection API for Rekognition to start asynchronous detection of labels in the stored video. 	|
| LambdaRole                                	| This is the IAM role that will enable AWS Lambda to work with Rekognition, Kinesis Video Streams, OpenSearch cluster, SNS and S3.                                                                                                      	|
| MyCloudFrontDistribution                  	| This is the CloudFront Distribution URL which would serve the media in our front-end application.                                                                                                                                      	|
| rekognitionlambda                         	| SNS would trigger this Lambda function to get the detected labels, their confidence scores and timestamp from Rekognition and store them into Amazon OpenSearch Service.                                                               	|
| RekognitionRole                           	| This is the IAM role that will enable Amazon Rekognition to conduct stored video analysis.                                                                                                                                             	|
| S3BucketVideo                             	| This is an Amazon S3 Bucket that will be used for storing video snippets. The incoming video streams from KVS would be cut into smaller segments and stored into this S3 bucket.                                                   	|
| searchApiGateway                          	| This is a REST API within API Gateway to facilitate search option in the final front-end application.                                                                                                                                  	|
| searchlambda                              	| This Lambda function would be invoked when an end user accesses the front-end application and searches for an entity. The search API would trigger this function which in turn would get the entities from OpenSearch.                 	|
| SnsTopic                                  	| Once Rekognition completes label detection for a video clip, it will trigger a notification via this SNS topic.                                                                                                                        	|
| KVSStateMachine                           	| Step Function to orchestrate the whole workflow.                                                                                                                                                                                       	|


---
## 4.1 Create CloudFormation Stack

Follow the steps mentioned below and pass the Parameter values as described carefully-

1. Click [![Cloudformation Launch Stack button](/static/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=iot304-lambda-stack&templateURL=https://ws-assets-prod-iad-r-pdx-f3b3f9f1a7d6a3d0.s3.us-west-2.amazonaws.com/0c7e49a5-b5c4-4f6d-b26b-9b2d8b5cbd2f/iot304-lambda-stack.yaml) to launch the CloudFormation stack.

2. You'll see something similar to this load up within the AWS Management Console (ensure the region is selected as **Oregon**)-

![CFN PreLoaded](/static/images/04/01.png)

Click **Next**.

3. Under the **Parameters** section of the **Specify stack details** page, provide the following values:
	* **KVSStreamName**: :code[WebRTCStream]{showCopyAction=true}. (This is the name of the KVS Video Stream created in [Section 3](../kvs/) Step 9.)
	* **OpenSearchApiUrl**: This is the domain endpoint for the Amazon OpenSearch Service Domain. Paste the value noted in Step 4 of the '[Getting Started](../getting-started/)' section. For quick access, you can also navigate to the **Output** section of **iot304-base-stack** [here](https://us-west-2.console.aws.amazon.com/cloudformation/) and get the value.

![CFN Params](/static/images/04/02.png)

4. Click **Next** till you get to the **Review** page (Step 4 in console). Scroll down till the end and check the box for **I acknowledge that AWS CloudFormation might create IAM resources with custom names** and click **Submit**.

![CFN Review](/static/images/04/03.png)

5. Wait for the stack creation to reach **CREATE_COMPLETE**.

::alert[While the stack creation is in progress, you can go to next section titled '**4.2 Mapping the IAM role for Lambda with Amazon OpenSearch Service domain**' on this page and cover steps 1-10.]{header="Please Note"}

6. Once stack is provisioned, make a note of the **Amazon API Gateway URL**, **AWS Lambda Role ARN**, **Amazon CloudFront Distribution** and the **AWS Step Function ARN** from the `Outputs` section. You'll use these in the upcoming sections.

![CFN Output](/static/images/04/04.png)

---
## 4.2 Mapping the IAM role for Lambda with Amazon OpenSearch Service domain

For the **searchlambda** function to be able to work with Amazon OpenSearch Service, for searching or analyzing data stored in OpenSearch, you'll need to map the Lambda IAM role *(LambdaRole)* created in the section above, with the OpenSearch domain.

1. Navigate to the [Amazon OpenSearch Service Domain console](https://us-west-2.console.aws.amazon.com/aos/home?region=us-west-2#opensearch/domains).
2. Click on the Domain Name `kvs-workshop-domain`.
3. Search for the `OpenSearch Dashboards URL` on the top-right corner and click on it. This will open a new tab for the OpenSearch Dashboards.

![OpenSearch Dashboard](/static/images/04/05.png)

4. You'll be prompted to enter the login credentials here. Copy and paste the following and click **Log in**-
	- Username: :code[admin]{showCopyAction=true}
	- Password: :code[Amazon90!]{showCopyAction=true}
5. Keep the tenant selection as **Global** and **Confirm** (if you get a pop-up asking you to add data, select **Explore on my own**).

![OpenSearch Tenant Selection](/static/images/04/06.png)

6. Click on the hamburger menu option on the top-left side of the screen and select **Security** under **Management** section in the left navigation pane.

![OpenSearch Security](/static/images/04/07.png)

7. Click on **Roles** and copy-paste :code[all_access]{showCopyAction=true} in the Search option and hit **return**/**enter**.

![OpenSearch Roles](/static/images/04/08.png)

8. Click on the **all_access** hyperlink and switch to the **Mapped Users** tab on top half of the screen. Click on **Manage Mapping**.

![OpenSearch Mapped Users](/static/images/04/09.png)

9. Scroll down to the **Backend roles** section.

![Backend Role Section](/static/images/04/10.png)

10. You need to paste the IAM Role ARN for **LambdaRole** that you copied earlier in Step 6 [here](../create-cfn#4.1-create-cloudformation-stack). Or, you can also go back to the [CloudFormation Console](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/) and select **iot304-lambda-stack** created in the previous section. And navigate to the **Outputs** tab and copy the Value corresponding to the LambdaRole key.

![Physical ID for LambdaRole](/static/images/04/11.png)

11. Go back to the **OpenSearch Dashboards** console and paste this value under the **Backend roles** section.

![BackendRole OpenSearch](/static/images/04/12.png)

12. Click on **Map**

13. Once the role has successfully been added you will see an entry named **Backend role** with **LambdaRole's ARN** mapped to it

![OpenSearch Final](/static/images/04/13.png)
