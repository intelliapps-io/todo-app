import "./CreateTask.less"
import React, { useState } from "react";
import { Card, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Exact, TaskFilters, TasksQuery, useCreateTaskMutation } from '../../../../lib/codegen';
import { QueryResult } from 'react-apollo';

interface CreateTaskProps {
  tasksQuery: QueryResult<TasksQuery, Exact<{ filters: TaskFilters }>>
}

export const CreateTask: React.FC<CreateTaskProps> = props => {
  const [input, setInput] = useState('')

  const [createTaskMutation] = useCreateTaskMutation()

  const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.persist()
    createTaskMutation({ variables: { data: { title: input, isCompleted: false, isImportant: false, description: '' } } })
      .then(() => {
        props.tasksQuery.refetch()
        setInput('')
      })
  }

  return (
    <Card
      className='task-item-card'
      style={{ width: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PlusOutlined />
        <Input
          className='create-task-input'
          style={{ margin: "0 10px" }}
          placeholder="Create task"
          onPressEnter={handleOnEnter}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
    </Card>
  );
}