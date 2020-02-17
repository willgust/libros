
class ApiManager {

    static token = "";
    static userLogged_Id = 0;
    static userLogged_Name = "";
    static userLogged_Password = "";

    constructor() {

    }

    Login(user, pass, onSucces, onFailure) {
        let st = 'userName=' + user + '&' + 'password=' + pass;
        let compose = 'http://ferdev.es/PlaceMyBetBackend/app/routes/login.php?' + st;
        console.log(compose);
        fetch(compose, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                token = responseJson.jwt;
                userLogged_Id = responseJson.id;
                userLogged_Name = responseJson.userName;
                userLogged_Password = pass;
                console.log("token:");
                let userLogged = {};
                userLogged.id = userLogged_Id;
                userLogged.userName = userLogged_Name;
                userLogged.userPassword = userLogged_Password;
                console.log("userLogged:");

                if (onSucces != null) onSucces(token, userLogged);

            })
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                onFailure();
            });
    }

    GetEvents(onSucces, onError) {
        fetch('http://ferdev.es/PlaceMyBetBackend/app/routes/events.php', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (onSucces != null) onSucces(responseJson);
                // console.log(responseJson);
            })
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                onError();
            });
    }

    GetMarketsFromEvent(id, onSucces, onError) {
        let st = 'eventId=' + id;
        let compose = 'http://ferdev.es/PlaceMyBetBackend/app/routes/markets.php?' + st;
        console.log(compose);
        fetch(compose, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (onSucces != null) onSucces(responseJson);
                // console.log(responseJson);
            })
            .catch(function (error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
                onError();
            });
    }

    GetUserLoggedInfo(onSucces, onError) {
        let st = 'id=' + userLogged_Id + '&' + 'token=' + token;
        let compose = 'http://ferdev.es/PlaceMyBetBackend/app/routes/user.php?' + st;
        console.log(compose);
        fetch(compose, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // responseJson.forEach(element => {
                //     console.log(element);
                // });
                if (onSucces != null) onSucces(responseJson);
                // console.log(responseJson);
            })
            .catch(function (error) {
                console.log(error.message);
                onError();
            });
    }

    CreateBet(marketId, yourBet, isOver, onSucces, onError) {
        let st = 'marketId=' + marketId + '&' + 'yourBet=' + yourBet + '&' + 'isOver=' + isOver +'&' + 'token=' + token;
        let compose = 'http://ferdev.es/PlaceMyBetBackend/app/routes/createBet.php?' + st;
        console.log(compose);
        fetch(compose, {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // responseJson.forEach(element => {
                //     console.log(element);
                // });
                if (onSucces != null) onSucces(responseJson);
                // console.log(responseJson);
            })
            .catch(function (error) {
                console.log(error.message);
                onError();
            });
    }

}


export default ApiManager;