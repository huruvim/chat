import {RootState} from "../store";
import {MessageI, Nullable, User} from "../../shapes";

export const currentUserSelector = (state: RootState) => state.messenger.currentUser;
export const typingUsersSelector = (state: RootState) => state.messenger.usersTyping;
export const hasTypingUsersSelector = (state: RootState) => state.messenger.usersTyping.length > 0;
export const messagesSelector = (state: RootState) => state.messenger.messages;

export const compareUser = (prev: Nullable<User>, next: Nullable<User>) => prev?.id === next?.id
export const compareMessages = (prev: MessageI[], next: MessageI[]) => JSON.stringify(prev) === JSON.stringify(next);
export const compareTypingUsers = (prev: User[], next: User[]) => JSON.stringify(prev) === JSON.stringify(next);