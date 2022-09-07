import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx";


const appLabels = { app: "elasticsearch-curator" };

// Create a cron job to run the curator
const job = new k8s.batch.v1.CronJob("elasticsearch-curator", {
    metadata: {
        name: "elasticsearch-curator",
        namespace: "monitoring",
        labels: appLabels,
    },
    spec: {
        schedule: "0 0 * * *",
        jobTemplate: {
            spec: {
                template: {
                    metadata: {
                        name: "elasticsearch-curator",
                        labels: appLabels,
                    },
                    spec: {
                        restartPolicy: "Never",
                        containers: [{
                            name: "ingestor",
                            image: "python:3.6-alpine",
                            args: ["sh", "-c", "pip install elasticsearch-curator && curator_cli --host elasticsearch.monitoring delete-indices --filter_list '[{\"filtertype\":\"age\",\"source\":\"creation_date\",\"direction\":\"older\",\"unit\":\"days\",\"unit_count\":7},{\"filtertype\":\"pattern\",\"kind\":\"prefix\",\"value\":\"logstash\"}]' || true"]
                        }],
                    },
                },
                backoffLimit: 1,
            },
        },
    },
});


export const name = job.metadata.name;
