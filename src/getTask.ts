import { DynamoDB } from "aws-sdk";
const dynamodb = new DynamoDB.DocumentClient();

export const getTask = async (event) => {
    const params = {
        TableName: "taskTable",
        Key: {
            ID: event.pathParameters.id,
        },
    };

    try {
        const data = await dynamodb.get(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(
                data.Item ? data.Item : { message: "Item not found" }
            ),
        };
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
