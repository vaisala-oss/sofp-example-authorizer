# SOFP Example Authorizer

This is an example authorizer for the SOFP API Features server. This authorizer is for demonstration purposes only and is meant to be used with the example backend.

More reading:
* SOFP Core: https://github.com/vaisala-oss/sofp-core
* SOFP Example Backend: https://github.com/vaisala-oss/sofp-example-backend

## Function

The authorizer limits use to two users, Alice and Bob. Alice can only see temperature measurements and Bob only humidity measurements. The example authorizer receives the name of the authorized user via the X-User HTTP request header. The value must be lower case. The architecture is designed so that a frontend server will do the authentication and pass a token (in this case, the username) to SOFP for authorization purposes.

## To release

To release a new version, do the following:

1. Bump the version appropriately in package.json
2. Commit and push all changes
3. rm -r dist/
4. npm run build
5. npm publish
