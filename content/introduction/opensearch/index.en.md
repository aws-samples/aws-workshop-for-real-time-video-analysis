---
title : "Amazon OpenSearch Service"
weight : 14
---

Amazon OpenSearch Service makes it easy for you to perform interactive log analytics, real-time application monitoring, website search, and more. OpenSearch is an open source, distributed search and analytics suite derived from Elasticsearch. Amazon OpenSearch Service offers the latest versions of OpenSearch, support for 19 versions of Elasticsearch (1.5 to 7.10 versions), as well as visualization capabilities powered by OpenSearch Dashboards and Kibana (1.5 to 7.10 versions).


## Data processing with Rekognition

Once media assets are ingested into Amazon S3, they are ready to be processed. Amazon Rekognition determines the entities within each asset. Amazon Rekognition then extracts the entities in JSON format and assigns a confidence score. It also supports custom modeling to help identify entities within the images for specific business needs.

In this workshop, we use a Lambda function to invoke Rekognition to extract the entities from the ingested assets. The following is a sample output from [detect_labels API call](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/rekognition/client/detect_labels.html#) in Rekognition and the transformed output that will be updated to downstream search engine:

```
{'Labels': [{'Name': 'Clothing', 'Confidence': 99.98137664794922, 'Instances': [], 'Parents': []}, {'Name': 'Apparel', 'Confidence': 99.98137664794922,'Instances': [], 'Parents': []}, {'Name': 'Shirt', 'Confidence': 97.00833129882812, 'Instances': [], 'Parents': [{'Name': 'Clothing'}]}, {'Name': 'T-Shirt', 'Confidence': 76.36670684814453, 'Instances': [{'BoundingBox': {'Width': 0.7963646650314331, 'Height': 0.6813027262687683, 'Left':
0.09593021124601364, 'Top': 0.1719706505537033}, 'Confidence': 53.39663314819336}], 'Parents': [{'Name': 'Clothing'}]}], 'LabelModelVersion': '2.0', 'ResponseMetadata': {'RequestId': '3a561e82-badc-4ba0-aa77-39a13f1bb3a6', 'HTTPStatusCode': 200, 'HTTPHeaders': {'content-type': 'application/x-amz-json-1.1', 'date': 'Mon, 17 May 2021 18:32:27 GMT', 'x-amzn-requestid': '3a561e82-badc-4ba0-aa77-39a13f1bb3a6','content-length': '542', 'connection': 'keep-alive'}, 'RetryAttempts': 0}}
```

In this example, the Lambda function submits an API call to Amazon Rekognition, where a T-shirt image in .jpeg format is provided as the input.


## Indexing with Amazon OpenSearch Service

In this workshop, assets are searched based on entities that are used as metadata to update the index.

Labels are identified and marked as tags, which are assigned to .jpeg formatted images. The following sample output shows the query on one of the tags issued on an Amazon OpenSearch Service domain (OpenSearch cluster).

Query:
```
curl-XGET https://<ElasticSearch Endpoint>/<_IndexName>/_search?q=T-Shirt
```

Output:
```
{"took":140,"timed_out":false,"_shards":{"total":5,"successful":5,"skipped":0,"failed":0},"hits":{"total":{"value":1,"relation":"eq"},"max_score":0.05460011,"hits":[{"_index":"movies","_type":"_doc","_id":"15","_score":0.05460011,"_source":{"fileName":"s7-1370766_lifestyle.jpg","objectTags":["Clothing","Apparel","Sailor
Suit","Sleeve","T-Shirt","Shirt","Jersey"]}}]}}
```
