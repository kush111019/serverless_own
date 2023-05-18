import { DynamoDB } from "aws-sdk";
const dynamodb = new DynamoDB.DocumentClient();

export const getAllTask = async (event) => {
    const params = {
        TableName: "taskTable",
    };
    try {
        const data = await dynamodb.scan(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
