import * as signalR from '@microsoft/signalr';
import Cookies from 'js-cookie';
import { BASE_URL } from '../api/instance';
const createSignalRConnection = (hubUrl = BASE_URL + "signals/entities") => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl + "?access_token=" + Cookies.get('token'), {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();


    return connection;
};

export default createSignalRConnection;