from twilio.rest import TwilioRestClient

# Find these values at https://twilio.com/user/account
account_sid = "AC65dbba5ba9537d9767f3fdaa2ccce368"
auth_token = "dbc2b12cd4beb3c3dba0be0fcee401e4"
client = TwilioRestClient(account_sid, auth_token)

message = client.messages.create(
    to="+12069497471",
    from_="+12069497471",
    body="Hello there!")
