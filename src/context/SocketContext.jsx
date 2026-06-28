import {
  createContext,
  useContext,
  useEffect
} from "react";

import socket from "../api/socket";

import { useAuth }
from "./AuthContext";

const SocketContext =
  createContext(null);

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