---
title : "5. Set up the front-end search application"
weight : 60
---

You'll now host the Node.js based '**Video Analytics App**' (front-end application) on an AWS Cloud9 IDE instance. AWS Cloud9 is a cloud-based integrated development environment (IDE) that lets you write, run, and debug your code with just a browser.

This instance was pre-created for you as part of the `iot304-base-stack` as mentioned in Step 5 of [section 2](../getting-started/).  This application would be your interface to search for entities in video streams and verify the occurrences, timestamps and clips based on labels detected. Artifacts for this app already exist [here](https://github.com/aws-samples/aws-workshop-for-real-time-video-analysis). You just need to clone this to get started.

1. Navigate to [AWS Cloud9 Console](https://us-west-2.console.aws.amazon.com/cloud9control/home?region=us-west-2#/)
2. Click on **Open** under **Cloud9 IDE** for the Environment named `kvs-workshop-environment`

![Cloud9](/static/images/05/01.png)

3. You should see the Welcome page load up. The terminal is on the bottom part of the screen. On the left you have the directory options and on top the **+** sign gives you options to start new files, terminals, configurations etc. -

![Cloud9 Welcome](/static/images/05/02.png)

4. Head to the terminal and clone the Git repository. To do this, copy and paste the following into Cloud9 terminal
:::code{showCopyAction=true}
git clone https://github.com/aws-samples/aws-workshop-for-real-time-video-analysis
:::

![Clone Repo](/static/images/05/03.png)

5. Go to the cloned directory **aws-workshop-for-real-time-video-analysis** in your Cloud9 IDE and expand it. Navigate to **frontend** > **src** > `config.js` file. Double click on that to open it.

![Config JS](/static/images/05/04.png)

6. Take the value of the Amazon CloudFront Distribution URL and Amazon API Gateway URL copied earlier in Step 6 [here](../create-cfn#4.1-create-cloudformation-stack). Alternatively, you can get them from the **Outputs** section of the **iot304-lambda-stack** in [CloudFormation](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/). These would be the values corresponding to **MyCloudFrontDistribution** and **APIGWURL** Keys (refer to the first screenshot, below). Paste the values in the `CLOUDFRONT_URL` and `API_GW_URL` parameter in **config.js** (refer to the second screenshot, below). And save the file.

![Lambda Stack Outputs](/static/images/05/05.png)

![Update Params 01](/static/images/05/06.png)

7. In the terminal, `cd` into the `frontend` folder within the `aws-workshop-for-real-time-video-analysis` directory by running the following command:
:::code{showCopyAction=true}
cd aws-workshop-for-real-time-video-analysis/frontend/
:::

8. From this directory, run the following command in the terminal:
:::code{showCopyAction=true}
npm install
:::

![Install Dependencies](/static/images/05/07.png)

9. Now start the application by running the following command in the terminal once the previous step is completed:
:::code{showCopyAction=true}
npm run start
:::
10. After a few seconds the compilation would complete. Post that, click on the **Preview** option  on top.

![Preview](/static/images/05/08.png)

11. Click on **Preview Running Application**. This would open a small window on the bottom-right part of the screen. Click on **Pop Out Into New Window** option.

![Preview Final](/static/images/05/09.png)

12. This would open the application in a new tab in your browser.

![Video Analytics App](/static/images/05/10.png)
