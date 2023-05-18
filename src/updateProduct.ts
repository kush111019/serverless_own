import { DynamoDB } from "aws-sdk";
const dynamodb = new DynamoDB.DocumentClient();

export const updateProduct = async (event) => {
    var data = JSON.parse(event.body);
    var {
        flag,
        product_name,
        brand,
        quantity,
        total_price,
        tax,
        discount,
        amount_payable,
    } = data;
    console.log("data is ", data);
    const id = event.pathParameters.id;
    const tax_value = 0.15;
    const discount_value = 0.15;
    try {
        const key_params = {
            TableName: "taskTable",
            Key: {
                id: id,
            },
        };
        const result: any = await dynamodb.get(key_params).promise();

        const output = result.Item;

        if (flag == true) {
            quantity = output.quantity + 1;
            total_price = output.price * quantity;
            tax = total_price * tax_value;
            discount = (total_price + tax) * discount_value;
            amount_payable = total_price + tax - discount;
        } else {
            quantity = output.quantity + 2;
            total_price = output.price * quantity;
            tax = total_price * tax_value;
            discount = (total_price + tax) * discount_value;
            amount_payable = total_price + tax - discount;
        }

        const params = {
            Key: {
                id: id,
            },
            TableName: "taskTable",
            ConditionExpression: "attribute_exists(id)",
            UpdateExpression:
                "SET flag = :flag, product_name = :product_name, brand= :brand, quantity = :quantity, total_price = :total_price, tax = :tax, discount = :discount, amount_payable = :amount_payable",
            ExpressionAttributeValues: {
                ":flag": flag,
                ":product_name": product_name,
                ":brand": brand,
                ":quantity": quantity,
                ":total_price": total_price,
                ":tax": tax,
                ":discount": discount,
                ":amount_payable": amount_payable,
            },
            ReturnValues: "ALL_NEW",
        };

        await dynamodb.update(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: "Product updated successfully!",
                data: flag,
                product_name,
                brand,
                quantity,
                total_price,
                tax,
                discount,
                amount_payable,
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
