// StreamContext.js
import React, { createContext, useState } from 'react';

export const StreamContext = createContext();

export function StreamProvider({ children }) {
  const [stream, setStream] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  return (
    <StreamContext.Provider value={{ stream, setStream, permissionGranted, setPermissionGranted }}>
      {children}
    </StreamContext.Provider>
  );
}
