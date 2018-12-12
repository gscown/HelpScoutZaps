var access_token = inputData.access_token;
if (access_token === undefined) {
// Get access token
  const tokenHeaders = { 'Content-Type' : 'application/json; charset=utf-8' };
  const tokenParams = { 'grant_type': 'client_credentials',
	  	'client_id': inputData.client_id,
		  'client_secret' : inputData.client_secret };
  const tokenBody = JSON.stringify(tokenParams);
  const tokenConfig = { method: 'POST', headers: tokenHeaders, body: tokenBody };
  const tokenURL = 'https://api.helpscout.net/v2/oauth2/token';
  const tokenResult = await fetch(tokenURL, tokenConfig);
  const tokenJSON = await tokenResult.json();
  access_token = tokenJSON.access_token;
}
const authHeaders = { 'Content-Type' : 'application/json; charset=utf-8',
	'Authorization' : `Bearer ${access_token}` };
	
// Get conversation so that we get current custom fields
const getConversationConfig = { method: 'GET', headers: authHeaders };
const getConversationURL = `https://api.helpscout.net/v2/conversations/${inputData.message_id}`;
const conversationResult = await fetch(getConversationURL, getConversationConfig);
const conversationJSON = await conversationResult.json();
var customFields = conversationJSON.customFields;

// Remove existing description
var newCustomFields = [];
if (customFields !== undefined) {
  customFields.forEach( function(field) {
    if (field.id != inputData.custom_field_id) {
      newCustomFields.push(field);
    }
  });
}
newCustomFields.push({ id: inputData.custom_field_id, value: inputData.description });

const fieldsBody = JSON.stringify({ 'fields' : newCustomFields });
const putFieldsConfig = { method: 'PUT', headers: authHeaders, body: fieldsBody };
const putFieldsURL = `https://api.helpscout.net/v2/conversations/${inputData.message_id}/fields`;
const putFieldsResult = await fetch(putFieldsURL, putFieldsConfig);
const out = putFieldsResult.statusText;
output = {status: out, access_token: access_token};
