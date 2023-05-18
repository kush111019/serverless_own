import { DynamoDB } from "aws-sdk";

const dynamodb = new DynamoDB.DocumentClient();

export const deleteProduct = async (event) => {
    try {
        const params = {
            TableName: "taskTable",
            Key: {
                id: event.pathParameters.id,
            },
        };
        await dynamodb.delete(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: "Product deleted successfully",
            }),
        };
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
