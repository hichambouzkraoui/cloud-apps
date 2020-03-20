
/** Cleans up API errors OR API promise rejections
 * @dev refer to /utils/validation in the API
 * @return clean error message
 * */

export const cleanError = error => {
  let type;
  let status;
  let message;
  let description;

  if (error.response) {
    const { type, status, description } = error.response.data;
    message = `API rejection: Status ${status} - ${type}`;
    if (type === "Swagger validation error"){
      const { dataPath, schemaPath } = error.response.data;
      message = message + " - " + dataPath + " - " + schemaPath + " - " + description;
    }
    if (type === "Promise rejection error"){
      message = message + " - " + description;
    }
  }
  else {
    message = `Response error: ${error}`;
  }
  return message;
};
