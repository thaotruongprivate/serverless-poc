<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Serverless Framework AWS NodeJS Example

This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework. The deployed function does not include any event definitions as well as any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which includes integrations with SQS, DynamoDB or examples of functions that are triggered in `cron`-like manner. For details about configuration of specific `events`, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Setup

First make sure you have all the secrets needed for this to run. Go to Secret Manager in AWS and create a new secret 
called "dev/bullfinch", it should have these keys: bullfinch_api_client_id, bullfinch_api_client_secret and 
bullfinch_id with corresponding values. 

## Explanation

We'll have an endpoint that receive events. This is a stand-in for Salesforce Relay. Send events like this to this 
endpoint: 

```
{
    "source": "salesforce",
    "detail_type": "opportunity_change",
    "detail": {
        "id": "xxxxxxx",
        "object": "opportunity",
        "changed_property": "stagename",
        "new_value": "Ready for QA",
        "record": {
            "cleantech_order_id__c": ""
        },
        "related_objects": {
            "synced_quote": {
                "record_type_id": "xxxxyyyyzzzz"
            },
            "account": {},
            "contacts": [
                {
                    "id": "1254",
                    "street_address": "Berlin 12",
                    "city": "Berlin",
                    "phone_number": "015754786996",
                    "postcode": "13187",
                    "first_name": "Jane",
                    "last_name": "Doe",
                    "gender": "male"
                },
                {
                    "id": "1254",
                    "street_address": "Berlin 12",
                    "city": "Berlin",
                    "phone_number": "015754745946",
                    "postcode": "13187",
                    "first_name": "Dyn",
                    "last_name": "Doe",
                    "gender": "female"
                }
            ]
        }
    }
}
```

After this event is sent, receiveEvent function will receive it and put it into the default event bus, then 
createContract function should receive it, create a contract and then put another event into the event bus with the 
contract ID and then lastly the contractCreated function should receive that and just log it. You should see this 
flow when you run "serverless dev".

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-project-dev (112s)

functions:
  hello: aws-node-project-dev-hello (1.5 kB)
```

### Monitoring

Serverless makes it easy to pull logs from cloudwatch so you can monitor all Lamdba functions at the same time. 

```
$ serverless dev
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": {}\n}"
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
    "statusCode": 200,
    "body": "{\n  \"message\": \"Go Serverless v3.0! Your function executed successfully!\",\n  \"input\": \"\"\n}"
}
```
