# AWS resources

## Inventory

- `hosting.yml` sets up an S3 bucket, adds permissions for an Origin Access Identity to read from that bucket (otherwise locked down) and a CloudFront distribution to use that OAI to serve content as well as redirect all traffic to HTTPS.

- `cd-pipeline.yml`
  sets up a CodePipeline, triggered by changes in a given branch and repo in GitHub. The code is passed to CodeBuild which runs the commands specified in `"../buildspec.yml"`, in essence performing unittesting and build operations. The build artefacts are then passes to CodeDeploy which deploys them to the S3 bucket configured in `hosting.yml`.

- `template-pipeline-parameters.json` is a template file containing the parameters that need to be passed to AWS when deploying the `cd-pipeline-yml` stack above.

## Deployment instructions

1. Create a secret in Systems manager with the Github OAuth token.

2. Create a new file based on `template-pipeline-parameters.json` and enter all relevant values.

3. Deploy static web hosting stack:

```bash
aws cloudformation deploy --template-file hosting.yml --stack-name my-stack-name
```

4. Deploy CD-pipeline stack:

```bash
aws cloudformation deploy \
--template-file cd-pipeline.yml \
--stack-name my-stack-name-pipeline \
--capabilities CAPABILITY_IAM \
--parameter-overrides file://secret-pipeline-parameters.json
```
