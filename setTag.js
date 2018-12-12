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
	
// Get conversation so that we get current tags
const getConversationConfig = { method: 'GET', headers: authHeaders };
const getConversationURL = `https://api.helpscout.net/v2/conversations/${inputData.message_id}`;
const conversationResult = await fetch(getConversationURL, getConversationConfig);
const conversationJSON = await conversationResult.json();
var tags = conversationJSON.tags;

// Remove existing tag
var newTags = [];
if (tags !== undefined) {
	tags.forEach( function(tag) {
  	if (tag != inputData.newTag) {
    	newTags.push(tag);
	  }
	});
}
newTags.push(inputData.newTag);

const tagsBody = JSON.stringify({ 'tags' : newTags });
const putTagsConfig = { method: 'PUT', headers: authHeaders, body: tagsBody };
const putTagsURL = `https://api.helpscout.net/v2/conversations/${inputData.message_id}/tags`;
const putTagsResult = await fetch(putTagsURL, putTagsConfig);
const out = putTagsResult.statusText;
output = {status: out, access_token: access_token};
