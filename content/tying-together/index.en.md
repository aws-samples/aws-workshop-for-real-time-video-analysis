---
title : "6. Tying it all together"
weight : 70
---

Refer to the solution components as listed below to verify all the components you have created till now-

![Step by Step](/static/images/stepbystep.png)


1. Your laptop camera and the video feed via webRTC is setup via the [Kinesis Video Streams WebRTC Test Page](https://awslabs.github.io/amazon-kinesis-video-streams-webrtc-sdk-js/examples/index.html).
2. Kinesis Video Stream successfully streams video via webRTC (as confirmed in [section 3](../kvs/) step 16).
3. kvslambda and the S3 bucket to store videos are created.
4. SNS topic and rekognitionlambda are created.
5. OpenSearch Domain is created and required IAM role is attached.
6. The front-end search app, CloudFront distribution to serve media, searchApiGateway and searchlambda are created and setup.

Now the only 2 steps that you have to do are-

- Restart the Master Feed (as done earlier while testing in [section 3](../kvs/) step 12): Open the **Kinesis Video Streams WebRTC Test Page** and confirm the values as selected in earlier steps. And click on `Start Master` button.

- Trigger Step Function, created in [section 4.1](..//create-cfn#4.1-create-cloudformation-stack), to orchestrate KVS-Lambda-Rekognition flow. This is the workflow that connects 2nd and 3rd boxes in the diagram above. To do this, go to the **Cloud9 environment** again. Open a new terminal by clicking on the **+** button.

![Step Function New Terminal](/static/images/06/01.png)

Now update the *<STATE_MACHINE_ARN>* field in the command mentioned below with the value of **Step Function ARN** obtained from [section 4.1](../create-cfn#4.1-create-cloudformation-stack) **Step 6**. Or, you can also navigate to the [CloudFormation Console](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/) and select **iot304-lambda-stack** created in the previous section and navigate to the **Outputs** tab to copy the Value corresponding to **StepFunctionARN** (refer to the image below the code snippet).
:::code{showCopyAction=true}
aws stepfunctions start-execution --state-machine-arn <STATE_MACHINE_ARN> --input "{\"doContinue\" : true}"
:::

![Step Function ARN](/static/images/06/02.png)

And **run** the command.

![Step Function Execution](/static/images/06/03.png)

This will now initiate the whole workflow.

---
### Verify the orchestration

 To verify if the execution has started, you can go to the [Step Functions Console](https://us-west-2.console.aws.amazon.com/states/home?region=us-west-2#/statemachines).

![Step Function Verification](/static/images/06/04.png)

Click on the **KVSStateMachine-** and scroll down to the **Executions**. Select the execution that would be in the **Running** Status and scroll to the **Events** section at the bottom.

![Step Function Events](/static/images/06/05.png)

**TaskSucceeded** would indicate that the invocations have started. After a few seconds you can go back to the Video Analytics front-end application to begin searching for entities.
