import { io } from "socket.io-client";


// Socket.IO Client

const socket = io(

  import.meta.env.VITE_SOCKET_URL,

  {
    transports: [

      "websocket",
      "polling"
    ],

    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 3000
  }

);

// Connection Events

socket.on( "connect",
  () => {
    console.log(
      "Socket Connected:",
      socket.id
    );
  }
);

socket.on(

  "disconnect",

  () => {

    console.log(

      "Socket Disconnected"

    );

  }

);

socket.on(

  "connect_error",

  (error) => {

    console.error(

      "Socket Error:",

      error.message

    );

  }

);

export default socket;