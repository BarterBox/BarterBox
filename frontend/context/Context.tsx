import React, { createContext } from 'react';
import { MainContextType } from '../@types/app';

const mainContext = createContext<MainContextType | null>(null)

export default mainContext

export const ChatRedirectContext = createContext<{chatRedirect: any, setChatRedirect: (any)=>void}>(null)