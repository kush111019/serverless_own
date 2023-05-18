import { DynamoDB } from "aws-sdk";
// import AWS from "aws-sdk";
const dynamodb = new DynamoDB.DocumentClient();

export const createTask = async (event) => {
  try {
    const {
      ID,
      Title,
      Description,
      DateCreated,
      DateAssigned,
      DateCompleted,
      DateClosed,
      Status,
      CreatedBy,
      AssignedTo,
    } = JSON.parse(event.body);
    const newProduct = {
      ID: ID,
      Title: Title,
      Description: Description,
      DateCreated: Date.now(),
      DateAssigned: DateAssigned,
      DateCompleted: DateCompleted,
      DateClosed: DateClosed,
      Status: Status,
      CreatedBy: CreatedBy,
      AssignedTo: AssignedTo,
    };
    console.log("New Product is", newProduct);

    await dynamodb
      .put({
        TableName: "taskTable",
        Item: newProduct,
      })
      .promise();

    //sqs
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product added successfully !",
      }),
    };

    return response;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
