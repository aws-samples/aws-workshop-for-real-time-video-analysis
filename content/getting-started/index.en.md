---
title : "2. Getting Started"
weight : 30
---

###### Let's first review the resources that have already been created for you as part of this workshop:

1. Navigate to the [AWS CloudFormation console](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/).
(you need to be in the **US West (Oregon)** region to be able to view the resources)

2. Click on the stack with name **iot304-base-stack** and go to the **Outputs** tab.

![CFN Base](/static/images/02/01.png)


3. The Amazon OpenSearch Service Domain is pre-created in this workshop. This will be used to store the labels related to entities detected in your streaming videos.

4. Make a note of the `Key` (*OpenSearchURL*) and `Value` (*search-kvs-workshop-domain-...*). You'll use them in later parts of the workshop.

5. You can also explore the **Resources** tab. In addition to the OpenSearch Domain, there is an [AWS Cloud9](https://aws.amazon.com/pm/cloud9/) instance also created which you'll use to host the Video Analytics application (front-end) in later half of this workshop.

![Base CFN Cloud9](/static/images/02/02.png)
