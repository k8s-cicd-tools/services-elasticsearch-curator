## Services - Elasticsearch Curator

This service is used to manage the Elasticsearch indices. Contains Kubernetes manifests, implementation using Pulumi, and Jenkinsfile pipeline.


## How to get started

1. Install kubectl and pulumi.
2. Clone this repo.
3. Run `$ npm install`
4. Run `$ pulumi up` to create the kubernetes resources.
5. check the status of the cronjob using `$ kubectl get cronjob`
6. trigger the cronjob manually using `$ kubectl create job --from=cronjob/elasticsearch-curator elasticsearch-curator-manual`
7. check the logs of the job using `$ kubectl logs job.batch/elasticsearch-curator-manual`
8. Run `$ pulumi destroy` to delete the kubernetes resources.

Alternatively, you can use kubectl directly:

```
$ kubectl apply -f path/to/kubernetes/manifests/elasticsearch-curator.yaml
$ kubectl get cronjob
$ kubectl create job --from=cronjob/elasticsearch-curator elasticsearch-curator-manual
$ kubectl logs job.batch/elasticsearch-curator-manual
$ kubectl delete -f path/to/kubernetes/manifests/elasticsearch-curator.yaml
```

Alternatively, you can use the Jenkinsfile to run the pipeline:

| Jenkinsfile                        | Description                                |
|------------------------------------|--------------------------------------------|
| jenkins/Jenkinsfile-pulumi-up      | This will create the kubernetes resources. |
| jenkins/Jenkinsfile-pulumi-destroy | This will delete the kubernetes resources. |

Environment variables required by Jenkins:

| Name                | Description                                |
|---------------------|--------------------------------------------|
| PULUMI_ACCESS_TOKEN | It is the access token to the Pulumi account. It is recommended to create a key with the same name in the credentials manager. |


Other requirements:
1. A jenkins agent with pulumi and kubectl installed and configured to connect to the kubernetes cluster.
2. The agent must have the "pulumi" label
3. Global tool configuration: add a NodeJS 16.17.0 installation with the name "node 16.17.0"
4. Configure the SCM Pipeline script with this repository, select the branch and change the Jenkins file path to the corresponding option to deploy.


## Resources and dependencies

| Name           | Version | Required |
|----------------|---------|----------|
| kubernetes     | 1.23    | yes      |
| pulumi         | 3.38.0  | no       |
| elasticsearch  | 7.17.0  | no       |


#### Also:
- create a Kubernetes namespace named "monitoring"

## Support kubernetes versions

| Version k8s | Description | Branch |
|-------------|-------------|---------|
| 1.23        |             | main    |




