const ULID = require("ulid");

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.GAMES_TABLE;

exports.putItemHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);
  console.info("Body:", body);

  const { userEmail, songs, gameDetails } = body;
  const songList = Object.values(songs);
  const { name, description, makePublic } = gameDetails;
  const gameId = ULID.ulid();

  // Creates a new item, or replaces an old item with a new item
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property

  const params = {
    TableName: tableName,
    Item: {
      UserID: userEmail,
      sk: `sk#${gameId}`,
      gameName: name,
      gameDescription: description,
      makePublic: makePublic,
      songList: songList,
    },
  };

  const result = await docClient.put(params).promise();

  console.info("dynamoDB result: ", result);

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ message: "ok" }),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
