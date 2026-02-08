import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const User = new Map<string, string>(); 
const roomId = new Map<string, number>();

wss.on("connection", (socket) => {

    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);
        if (parsedMessage.type == "join") {
            console.log("User joined " + parsedMessage.payload.username);
            User.set("username", parsedMessage.payload.username);
            roomId.set("roomId", parsedMessage.payload.roomId);
            console.log(User.get("username"));
            console.log(roomId.get("roomId"));
        }
    })
})