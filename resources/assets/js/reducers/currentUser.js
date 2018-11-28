/**
 * Created by Rajesh on 11/28/18.
 */

import {getCurrentUser} from '../actions/usersActions';

class UserClass {

    constructor(){
        this.user = {
            email: null,
            username: null,
            canAddDB: false,
            canAddKey: false,
            canAddUser: false
        };
        this.fetched = false;
        this.loggedIn = false;
    }

    fetchUser(){
        getCurrentUser().then((response) => {
            if(response.success){
                this.user = response.user;
                this.fetched = true;
            }
            this.loggedIn = response.success;
        })
    }

    logOut(){
        this.user = {
            email: null,
            username: null,
            canAddDB: false,
            canAddKey: false,
            canAddUser: false
        };
        this.fetched = false;
        this.loggedIn = false;
    }

    getUser(){
        if(!this.fetched && this.loggedIn)
            this.fetchUser();

        return this.user;
    }
}

export const CurrentUser = new UserClass();
