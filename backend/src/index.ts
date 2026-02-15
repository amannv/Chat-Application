import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const socketToUser = new Map<WebSocket, string>();
const userToroomId = new Map<string, number>();
const roomToUsers = new Map<number, Set<string>>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type == "join") {
      console.log(
        parsedMessage.payload.username +
          " created and joined room with id " +
          parsedMessage.payload.roomId,
      );

      const username = parsedMessage.payload.username;
      const roomId = parsedMessage.payload.roomId;

      socketToUser.set(socket, username);
      userToroomId.set(username, roomId);

      if (!roomToUsers.has(roomId)) {
        roomToUsers.set(roomId, new Set());
      }

      const users = roomToUsers.get(roomId);
      if (users) {
        users.add(username);
      }
    }

    if (parsedMessage.type == "chat") {
      const chatMessage = parsedMessage.payload.message;
      const username = socketToUser.get(socket);

      if (!username) {
        return console.log("User don't exist");
      }

      const roomId = userToroomId.get(username);

      if (!roomId) {
        return console.log("Room not exists");
      }

      const users = roomToUsers.get(roomId);
      console.log(users);
    }
  });
});
