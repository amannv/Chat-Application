import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

const socketToUsername = new Map<WebSocket, String>();
const socketToRoomId = new Map<WebSocket, Number>();
const roomToUsers = new Map<Number, Set<WebSocket>>();

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    let parsedMessage;

    try {
      parsedMessage = JSON.parse(message as unknown as string);
    } catch (e) {
      return console.error("Error while parsing message");
    }

    if (typeof parsedMessage !== "object" || parsedMessage === null) {
      return console.error("Invalid message structure");
    }

    if (!("type" in parsedMessage) || !("payload" in parsedMessage)) {
      return console.error("Type and Payload is not present in the message");
    }

    if (parsedMessage.type == "join") {
      const roomId = parsedMessage.payload.roomId;
      const username = parsedMessage.payload.username;

      if (roomId === undefined || username === undefined) {
        return console.error("No roomId and username is given in the message");
      }

      socketToUsername.set(socket, username);
      socketToRoomId.set(socket, roomId);

      if (!roomToUsers.has(roomId)) {
        roomToUsers.set(roomId, new Set());
      }

      const sockets = roomToUsers.get(roomId);

      if (!sockets) {
        return console.error("No users present in the room");
      } else {
        sockets.add(socket);
      }

      const joinMessage = {
        type: "join",
        message: `${username} joined`,
      };

      sockets.forEach((socket) => {
        socket.send(JSON.stringify(joinMessage));
      });
    }

    if (parsedMessage.type == "chat") {
      const chatMessage = parsedMessage.payload.message;

      if (chatMessage === undefined) {
        return console.error("No chat message");
      }

      const username = socketToUsername.get(socket);
      const roomId = socketToRoomId.get(socket);

      if (roomId === undefined) {
        return console.error("Room not exists");
      }

      if (username === undefined) {
        return console.error("Username not defined");
      }

      const sockets = roomToUsers.get(roomId);

      if (!sockets) {
        return console.error("No users exists in the room");
      }

      const message = {
        type: "chat",
        username: username,
        message: chatMessage,
      };

      sockets.forEach((socket) => {
        socket.send(JSON.stringify(message));
      });
    }
  });

  socket.on("close", () => {
    const roomId = socketToRoomId.get(socket);
    const username = socketToUsername.get(socket);

    if (roomId === undefined) {
      return console.error("User has no valid room");
    }

    if (username === undefined) {
      return console.error("Username not defined");
    }

    const sockets = roomToUsers.get(roomId);

    if (!sockets) {
      return console.error("No users present inside the room");
    } else {
      sockets.delete(socket);
    }

    if (sockets.size == 0) {
      roomToUsers.delete(roomId);
    }

    socketToUsername.delete(socket);
    socketToRoomId.delete(socket);

    const leaveMessage = {
      type: "leave",
      message: `${username} left the room`,
    };

    if (sockets.size > 0) {
      sockets.forEach((socket) => {
        socket.send(JSON.stringify(leaveMessage));
      });
    }
  });
});
