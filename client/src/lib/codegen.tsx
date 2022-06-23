import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type Mutation = {
  assignTaskToUser: Task;
  createSubtask: Subtask;
  createTask: Task;
  deleteSubtask: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  login?: Maybe<User>;
  logout?: Maybe<Scalars['String']>;
  register: User;
  unassignTaskToUser: Task;
  updateSubtask: Subtask;
  updateTask: Task;
};


export type MutationAssignTaskToUserArgs = {
  taskId: Scalars['Float'];
  userEmail: Scalars['String'];
};


export type MutationCreateSubtaskArgs = {
  data: SubtaskInput;
  taskId: Scalars['Float'];
};


export type MutationCreateTaskArgs = {
  data: TaskInput;
};


export type MutationDeleteSubtaskArgs = {
  subtaskId: Scalars['Float'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUnassignTaskToUserArgs = {
  taskId: Scalars['Float'];
  userEmail: Scalars['String'];
};


export type MutationUpdateSubtaskArgs = {
  data: SubtaskInput;
  subtaskId: Scalars['Float'];
};


export type MutationUpdateTaskArgs = {
  data: TaskInput;
  id: Scalars['Float'];
};

export type Query = {
  me?: Maybe<User>;
  subtask: Subtask;
  subtasks: Array<Subtask>;
  task: Task;
  tasks: Array<Task>;
  users: Array<User>;
};


export type QuerySubtaskArgs = {
  subtaskId: Scalars['Float'];
};


export type QuerySubtasksArgs = {
  taskId: Scalars['Float'];
};


export type QueryTaskArgs = {
  id: Scalars['Float'];
};


export type QueryTasksArgs = {
  filters?: Maybe<TaskFilters>;
};


export type QueryUsersArgs = {
  data: SearchUserInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

/** User access role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SearchUserInput = {
  email: Scalars['String'];
};

export type Subtask = {
  createdBy: User;
  id: Scalars['Int'];
  isCompleted: Scalars['Boolean'];
  parentTask: Task;
  title: Scalars['String'];
};

export type SubtaskInput = {
  isCompleted: Scalars['Boolean'];
  title: Scalars['String'];
};

export type Task = {
  assignedTo: Array<User>;
  createdBy: User;
  dateCreated: Scalars['DateTime'];
  dateDue?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isCompleted: Scalars['Boolean'];
  isImportant: Scalars['Boolean'];
  subtasks: Array<Subtask>;
  title: Scalars['String'];
};

export type TaskFilters = {
  dateAscending?: Maybe<Scalars['Boolean']>;
  dateDue?: Maybe<Scalars['DateTime']>;
  dateDueOperator?: Maybe<TaskFiltersDateOperator>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  isImportant?: Maybe<Scalars['Boolean']>;
  taskOwner?: Maybe<TaskFiltersOwner>;
  title?: Maybe<Scalars['String']>;
};

/** Filter dates by value */
export enum TaskFiltersDateOperator {
  Equal = 'EQUAL',
  GreaterThan = 'GREATER_THAN',
  LessThan = 'LESS_THAN'
}

/** Filter dates by value */
export enum TaskFiltersOwner {
  UserAssigned = 'USER_ASSIGNED',
  UserCreated = 'USER_CREATED'
}

export type TaskInput = {
  dateDue?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  isCompleted: Scalars['Boolean'];
  isImportant: Scalars['Boolean'];
  title: Scalars['String'];
};

export type User = {
  authCount?: Maybe<Scalars['Float']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  role: Role;
};

export type SubtaskFragment = Pick<Subtask, 'id' | 'title' | 'isCompleted'>;

export type CreateSubtaskMutationVariables = Exact<{
  taskId: Scalars['Float'];
  data: SubtaskInput;
}>;


export type CreateSubtaskMutation = { createSubtask: SubtaskFragment };

export type UpdateSubtaskMutationVariables = Exact<{
  subtaskId: Scalars['Float'];
  data: SubtaskInput;
}>;


export type UpdateSubtaskMutation = { updateSubtask: SubtaskFragment };

export type DeleteSubtaskMutationVariables = Exact<{
  subtaskId: Scalars['Float'];
}>;


export type DeleteSubtaskMutation = Pick<Mutation, 'deleteSubtask'>;

export type SubtaskQueryVariables = Exact<{
  subtaskId: Scalars['Float'];
}>;


export type SubtaskQuery = { subtask: SubtaskFragment };

export type SubtasksQueryVariables = Exact<{
  taskId: Scalars['Float'];
}>;


export type SubtasksQuery = { subtasks: Array<SubtaskFragment> };

export type TaskFragment = (
  Pick<Task, 'id' | 'title' | 'description' | 'isCompleted' | 'isImportant' | 'dateDue' | 'dateCreated'>
  & { subtasks: Array<SubtaskFragment>, assignedTo: Array<Pick<User, 'id' | 'firstName' | 'lastName' | 'name' | 'email'>>, createdBy: Pick<User, 'id' | 'firstName' | 'lastName' | 'name' | 'email'> }
);

export type CreateTaskMutationVariables = Exact<{
  data: TaskInput;
}>;


export type CreateTaskMutation = { createTask: TaskFragment };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['Float'];
  data: TaskInput;
}>;


export type UpdateTaskMutation = { updateTask: TaskFragment };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTaskMutation = Pick<Mutation, 'deleteTask'>;

export type TaskQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type TaskQuery = { task: TaskFragment };

export type TasksQueryVariables = Exact<{
  filters: TaskFilters;
}>;


export type TasksQuery = { tasks: Array<TaskFragment> };

export type AssignTaskToUserMutationVariables = Exact<{
  taskId: Scalars['Float'];
  userEmail: Scalars['String'];
}>;


export type AssignTaskToUserMutation = { assignTaskToUser: TaskFragment };

export type UnassignTaskToUserMutationVariables = Exact<{
  taskId: Scalars['Float'];
  userEmail: Scalars['String'];
}>;


export type UnassignTaskToUserMutation = { unassignTaskToUser: TaskFragment };

export type UserFieldsFragment = Pick<User, 'id' | 'firstName' | 'lastName' | 'name' | 'email' | 'role'>;

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { register: UserFieldsFragment };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login?: Maybe<UserFieldsFragment> };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = Pick<Mutation, 'logout'>;

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: Maybe<UserFieldsFragment> };

export type UsersQueryVariables = Exact<{
  data: SearchUserInput;
}>;


export type UsersQuery = { users: Array<UserFieldsFragment> };

export const SubtaskFragmentDoc = gql`
    fragment Subtask on Subtask {
  id
  title
  isCompleted
}
    `;
export const TaskFragmentDoc = gql`
    fragment Task on Task {
  id
  title
  description
  isCompleted
  isImportant
  dateDue
  dateCreated
  subtasks {
    ...Subtask
  }
  assignedTo {
    id
    firstName
    lastName
    name
    email
  }
  createdBy {
    id
    firstName
    lastName
    name
    email
  }
}
    ${SubtaskFragmentDoc}`;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  firstName
  lastName
  name
  email
  role
}
    `;
export const CreateSubtaskDocument = gql`
    mutation CreateSubtask($taskId: Float!, $data: SubtaskInput!) {
  createSubtask(taskId: $taskId, data: $data) {
    ...Subtask
  }
}
    ${SubtaskFragmentDoc}`;
export type CreateSubtaskMutationFn = Apollo.MutationFunction<CreateSubtaskMutation, CreateSubtaskMutationVariables>;

/**
 * __useCreateSubtaskMutation__
 *
 * To run a mutation, you first call `useCreateSubtaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubtaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubtaskMutation, { data, loading, error }] = useCreateSubtaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSubtaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubtaskMutation, CreateSubtaskMutationVariables>) {
        return Apollo.useMutation<CreateSubtaskMutation, CreateSubtaskMutationVariables>(CreateSubtaskDocument, baseOptions);
      }
export type CreateSubtaskMutationHookResult = ReturnType<typeof useCreateSubtaskMutation>;
export type CreateSubtaskMutationResult = Apollo.MutationResult<CreateSubtaskMutation>;
export type CreateSubtaskMutationOptions = Apollo.BaseMutationOptions<CreateSubtaskMutation, CreateSubtaskMutationVariables>;
export const UpdateSubtaskDocument = gql`
    mutation UpdateSubtask($subtaskId: Float!, $data: SubtaskInput!) {
  updateSubtask(subtaskId: $subtaskId, data: $data) {
    ...Subtask
  }
}
    ${SubtaskFragmentDoc}`;
export type UpdateSubtaskMutationFn = Apollo.MutationFunction<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>;

/**
 * __useUpdateSubtaskMutation__
 *
 * To run a mutation, you first call `useUpdateSubtaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubtaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubtaskMutation, { data, loading, error }] = useUpdateSubtaskMutation({
 *   variables: {
 *      subtaskId: // value for 'subtaskId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSubtaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>) {
        return Apollo.useMutation<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>(UpdateSubtaskDocument, baseOptions);
      }
export type UpdateSubtaskMutationHookResult = ReturnType<typeof useUpdateSubtaskMutation>;
export type UpdateSubtaskMutationResult = Apollo.MutationResult<UpdateSubtaskMutation>;
export type UpdateSubtaskMutationOptions = Apollo.BaseMutationOptions<UpdateSubtaskMutation, UpdateSubtaskMutationVariables>;
export const DeleteSubtaskDocument = gql`
    mutation DeleteSubtask($subtaskId: Float!) {
  deleteSubtask(subtaskId: $subtaskId)
}
    `;
export type DeleteSubtaskMutationFn = Apollo.MutationFunction<DeleteSubtaskMutation, DeleteSubtaskMutationVariables>;

/**
 * __useDeleteSubtaskMutation__
 *
 * To run a mutation, you first call `useDeleteSubtaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubtaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubtaskMutation, { data, loading, error }] = useDeleteSubtaskMutation({
 *   variables: {
 *      subtaskId: // value for 'subtaskId'
 *   },
 * });
 */
export function useDeleteSubtaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubtaskMutation, DeleteSubtaskMutationVariables>) {
        return Apollo.useMutation<DeleteSubtaskMutation, DeleteSubtaskMutationVariables>(DeleteSubtaskDocument, baseOptions);
      }
export type DeleteSubtaskMutationHookResult = ReturnType<typeof useDeleteSubtaskMutation>;
export type DeleteSubtaskMutationResult = Apollo.MutationResult<DeleteSubtaskMutation>;
export type DeleteSubtaskMutationOptions = Apollo.BaseMutationOptions<DeleteSubtaskMutation, DeleteSubtaskMutationVariables>;
export const SubtaskDocument = gql`
    query Subtask($subtaskId: Float!) {
  subtask(subtaskId: $subtaskId) {
    ...Subtask
  }
}
    ${SubtaskFragmentDoc}`;

/**
 * __useSubtaskQuery__
 *
 * To run a query within a React component, call `useSubtaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubtaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubtaskQuery({
 *   variables: {
 *      subtaskId: // value for 'subtaskId'
 *   },
 * });
 */
export function useSubtaskQuery(baseOptions?: Apollo.QueryHookOptions<SubtaskQuery, SubtaskQueryVariables>) {
        return Apollo.useQuery<SubtaskQuery, SubtaskQueryVariables>(SubtaskDocument, baseOptions);
      }
export function useSubtaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubtaskQuery, SubtaskQueryVariables>) {
          return Apollo.useLazyQuery<SubtaskQuery, SubtaskQueryVariables>(SubtaskDocument, baseOptions);
        }
export type SubtaskQueryHookResult = ReturnType<typeof useSubtaskQuery>;
export type SubtaskLazyQueryHookResult = ReturnType<typeof useSubtaskLazyQuery>;
export type SubtaskQueryResult = Apollo.QueryResult<SubtaskQuery, SubtaskQueryVariables>;
export const SubtasksDocument = gql`
    query Subtasks($taskId: Float!) {
  subtasks(taskId: $taskId) {
    ...Subtask
  }
}
    ${SubtaskFragmentDoc}`;

/**
 * __useSubtasksQuery__
 *
 * To run a query within a React component, call `useSubtasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubtasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubtasksQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useSubtasksQuery(baseOptions?: Apollo.QueryHookOptions<SubtasksQuery, SubtasksQueryVariables>) {
        return Apollo.useQuery<SubtasksQuery, SubtasksQueryVariables>(SubtasksDocument, baseOptions);
      }
export function useSubtasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SubtasksQuery, SubtasksQueryVariables>) {
          return Apollo.useLazyQuery<SubtasksQuery, SubtasksQueryVariables>(SubtasksDocument, baseOptions);
        }
export type SubtasksQueryHookResult = ReturnType<typeof useSubtasksQuery>;
export type SubtasksLazyQueryHookResult = ReturnType<typeof useSubtasksLazyQuery>;
export type SubtasksQueryResult = Apollo.QueryResult<SubtasksQuery, SubtasksQueryVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($data: TaskInput!) {
  createTask(data: $data) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: Float!, $data: TaskInput!) {
  updateTask(id: $id, data: $data) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: Float!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const TaskDocument = gql`
    query Task($id: Float!) {
  task(id: $id) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(baseOptions?: Apollo.QueryHookOptions<TaskQuery, TaskQueryVariables>) {
        return Apollo.useQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
      }
export function useTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaskQuery, TaskQueryVariables>) {
          return Apollo.useLazyQuery<TaskQuery, TaskQueryVariables>(TaskDocument, baseOptions);
        }
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskQueryResult = Apollo.QueryResult<TaskQuery, TaskQueryVariables>;
export const TasksDocument = gql`
    query Tasks($filters: TaskFilters!) {
  tasks(filters: $filters) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
      }
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, baseOptions);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;
export const AssignTaskToUserDocument = gql`
    mutation AssignTaskToUser($taskId: Float!, $userEmail: String!) {
  assignTaskToUser(taskId: $taskId, userEmail: $userEmail) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type AssignTaskToUserMutationFn = Apollo.MutationFunction<AssignTaskToUserMutation, AssignTaskToUserMutationVariables>;

/**
 * __useAssignTaskToUserMutation__
 *
 * To run a mutation, you first call `useAssignTaskToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignTaskToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignTaskToUserMutation, { data, loading, error }] = useAssignTaskToUserMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useAssignTaskToUserMutation(baseOptions?: Apollo.MutationHookOptions<AssignTaskToUserMutation, AssignTaskToUserMutationVariables>) {
        return Apollo.useMutation<AssignTaskToUserMutation, AssignTaskToUserMutationVariables>(AssignTaskToUserDocument, baseOptions);
      }
export type AssignTaskToUserMutationHookResult = ReturnType<typeof useAssignTaskToUserMutation>;
export type AssignTaskToUserMutationResult = Apollo.MutationResult<AssignTaskToUserMutation>;
export type AssignTaskToUserMutationOptions = Apollo.BaseMutationOptions<AssignTaskToUserMutation, AssignTaskToUserMutationVariables>;
export const UnassignTaskToUserDocument = gql`
    mutation UnassignTaskToUser($taskId: Float!, $userEmail: String!) {
  unassignTaskToUser(taskId: $taskId, userEmail: $userEmail) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type UnassignTaskToUserMutationFn = Apollo.MutationFunction<UnassignTaskToUserMutation, UnassignTaskToUserMutationVariables>;

/**
 * __useUnassignTaskToUserMutation__
 *
 * To run a mutation, you first call `useUnassignTaskToUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignTaskToUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignTaskToUserMutation, { data, loading, error }] = useUnassignTaskToUserMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useUnassignTaskToUserMutation(baseOptions?: Apollo.MutationHookOptions<UnassignTaskToUserMutation, UnassignTaskToUserMutationVariables>) {
        return Apollo.useMutation<UnassignTaskToUserMutation, UnassignTaskToUserMutationVariables>(UnassignTaskToUserDocument, baseOptions);
      }
export type UnassignTaskToUserMutationHookResult = ReturnType<typeof useUnassignTaskToUserMutation>;
export type UnassignTaskToUserMutationResult = Apollo.MutationResult<UnassignTaskToUserMutation>;
export type UnassignTaskToUserMutationOptions = Apollo.BaseMutationOptions<UnassignTaskToUserMutation, UnassignTaskToUserMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UsersDocument = gql`
    query Users($data: SearchUserInput!) {
  users(data: $data) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;