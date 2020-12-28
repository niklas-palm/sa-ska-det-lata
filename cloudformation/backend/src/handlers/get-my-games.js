// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
const tableName = process.env.GAMES_TABLE;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.getMyGamesHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `getMyGames only accept POST method, you tried: ${event.httpMethod}`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);

  const { userEmail } = JSON.parse(event.body);

  // get all items from the table (only first 1MB data, you can use `LastEvaluatedKey` to get the rest of data)
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
  // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html
  var params = {
    TableName: tableName,
    KeyConditionExpression:
      "UserID = :userEmail and begins_with(sk, :sortKeyStart)",
    ExpressionAttributeValues: {
      ":userEmail": userEmail,
      ":sortKeyStart": "sk#",
    },
  };

  let items;
  try {
    const data = await docClient.query(params).promise();
    console.info(data);
    items = data.Items;
  } catch (err) {
    throw new Error(`Error retriving items from DDb: ${err}.`);
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(items),
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
