import {authorizerProvider} from './example_authorizer';

import * as express from 'express';

test('Test no such user (authorizer creation fails)', done => {
    let req : unknown = { headers: {} }
    authorizerProvider.createAuthorizer(<express.Request>req, {}).then(authorizer => {
        done(new Error('an error was expected'));
    }).catch((err : Error) => {
        expect(err.message).toBe('no such user');
        done();
    })
});

test('Test authorizerProvider for bob', done => {
    let req : unknown = { headers: {'x-user': 'bob'}}
    authorizerProvider.createAuthorizer(<express.Request>req, {}).then(authorizer => {
        expect(authorizer.user.username).toBe('bob');
        done();
    }).catch(done);
});


test('Test feature allowed for bob', done => {
    let req : unknown = { headers: {'x-user': 'bob'}}
    authorizerProvider.createAuthorizer(<express.Request>req, {}).then(authorizer => {
        let feature = { properties: { ParameterName: 'Humidity' }};
        expect(authorizer.accept(feature)).toBeTruthy();
        done();
    }).catch(done);
});

test('Test feature disallowed for bob', done => {
    let req : unknown = { headers: {'x-user': 'bob'}}
    authorizerProvider.createAuthorizer(<express.Request>req, {}).then(authorizer => {
        let feature = { properties: { ParameterName: 'Pressure' }};
        expect(authorizer.accept(feature)).toBeFalsy();
        done();
    }).catch(done);
});


