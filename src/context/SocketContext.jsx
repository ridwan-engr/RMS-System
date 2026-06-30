import {
  createContext,
  useContext,
  useEffect
} from "react";

import socket from "../api/socket.jsx";

import { useAuth }
from "./context/AuthContext";

const SocketContext =
  createContext();

export function SocketProvider({

  children

}) {

  const {

    authenticated

  } = useAuth();

  useEffect(() => {

    if (authenticated) {

      socket.connect();

    }

    return () => {

      socket.disconnect();

    };

  }, [authenticated]);

  return (

    <SocketContext.Provider
      value={socket}
    >

      {children}

    </SocketContext.Provider>

  );

}

export function useSocket() {

  return useContext(
    SocketContext
  );

}