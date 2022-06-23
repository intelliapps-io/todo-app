import { SubtaskMutatationsResolver } from "./subtask/SubtaskMutations";
import { SubtaskQueriesResolver } from "./subtask/SubtaskQueries";
import { TaskMutationsResolver } from "./task/TaskMutations";
import { TaskQueriesResolver } from "./task/TaskQueries";
import { FriendsResolver } from "./user/Friends";
import { LoginResolver } from "./user/Login";
import { LogoutResolver } from "./user/Logout";
import { MeResolver } from "./user/Me";
import { RegisterResolver } from "./user/Register";

export const resolvers: [Function, ...Function[]] = [
  // User
  LoginResolver,
  LogoutResolver,
  MeResolver,
  RegisterResolver,
  // FriendsResolver,

  // Task
  TaskQueriesResolver,
  TaskMutationsResolver,

  // Subtask
  SubtaskQueriesResolver,
  SubtaskMutatationsResolver
]