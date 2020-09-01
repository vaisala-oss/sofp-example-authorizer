import { AuthorizerProvider, Authorizer, Collection, Feature } from 'sofp-lib';

import * as express from 'express';
import * as _ from 'lodash';

interface UserConfiguration {
    username : string;
    authorization : { propertiesMustEqual: { [name: string]: string} }
};

export class ExampleAuthorizer extends Authorizer {
    filterClass : string = 'ExampleAuthorizer';
    user : UserConfiguration;

    constructor(user : UserConfiguration) {
        super();
        this.user = user;
    }

    accept(feature : Feature) : boolean {
        let accept = true;
        _.each(this.user.authorization.propertiesMustEqual, (v,k) => {
            if (feature.properties[k] != v) {
                accept = false;
            }
        });
        return accept;
    }
}

const MOCK_USERDATA = require('../data/users.json');

export const authorizerProvider : AuthorizerProvider = {
    createAuthorizer(req : express.Request, collection : Collection) : Promise<Authorizer> {
        return new Promise((resolve, reject) => {
            let user = _.find(MOCK_USERDATA.users,
                u => u.username === req.headers['x-user']
            );
            if (!user) {
                reject(new Error('Authorization failed: no such user'));
            } else {
                resolve(new ExampleAuthorizer(user));
            }
        });
    }
}