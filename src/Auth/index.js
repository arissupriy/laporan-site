export function loginRequired(to, from, next){
    if(!isLoggedIn()){
        next({
            name: 'User',
            query: {
                redirect: to.fullpath
            }
        });
    } else {
        next()
    }
}

export function nonLogin(to, from, next){
    if(!!isLoggedIn()){
        next({
            name: 'Profile',
            query: {
                redirect: to.fullpath
            }
        });
    } else {
        next()
    }   
}

export function isLoggedIn() {
    const idToken = localStorage.getItem('auth');
    return !!idToken
}
