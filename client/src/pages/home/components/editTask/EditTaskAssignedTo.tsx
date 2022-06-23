import React, { useState } from "react";
import { Select, Tag } from 'antd';
import { Exact, TaskFragment, TaskQuery, useUsersQuery, useAssignTaskToUserMutation, useUnassignTaskToUserMutation } from '../../../../lib/codegen';
import { QueryResult } from 'react-apollo';

interface EditTaskAssignedToProps {
  task: TaskFragment
  taskQuery: QueryResult<TaskQuery, Exact<{
    id: number
  }>>
}

export const EditTaskAssignedTo: React.FC<EditTaskAssignedToProps> = props => {
  // state
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  // graphql
  const [assignTaskToUserMutation] = useAssignTaskToUserMutation()
  const [unassignTaskToUserMutation] = useUnassignTaskToUserMutation()
  const usersQuery = useUsersQuery({ variables: { data: { email: '' } } })
  let options = usersQuery.data && usersQuery.data.users ? usersQuery.data.users : []

  const handleAssignUser = (value: string) => {
    assignTaskToUserMutation({ variables: { taskId: props.task.id, userEmail: value } })
      .catch(err => console.log(err))
      .then(() => {
        props.taskQuery.refetch()
        setSearchValue(undefined)
        setSelectedValue(undefined)
      })
  }

  const handleUnassignUser = (value: string) => {
    unassignTaskToUserMutation({ variables: { taskId: props.task.id, userEmail: value } })
      .catch(err => console.log(err))
      .then(() => {
        props.taskQuery.refetch()
      })
  }

  return (
    <div>
      {props.task.assignedTo.map(user =>
        <Tag
          key={user.email}
          closable
          onClose={e => handleUnassignUser(user.email)}
        >
          {user.email}
        </Tag>
      )}
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search a user"
        optionFilterProp="children"
        onSelect={handleAssignUser as any}
        searchValue={searchValue}
        onBlur={() => setSelectedValue('')}
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
        onSearch={(text) => { setSearchValue(text); usersQuery.refetch({ data: { email: text } }) }}
      >
        {options.map(option => <Select.Option key={option.id} value={option.email}>{option.email}</Select.Option>)}
      </Select>

    </div>
  )
}