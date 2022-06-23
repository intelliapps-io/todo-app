import './EditTask.less'
import React from "react";
import moment, { Moment } from "moment"
import { useForm } from 'antd/lib/form/Form';
import { DatePicker, Divider, Form, Input } from "antd"
import { TaskInput, useTaskQuery, useUpdateTaskMutation } from '../../../../lib/codegen';
import { EditSubTasks } from './EditSubTasks';
import { EditTaskAssignedTo } from './EditTaskAssignedTo';
import { CheckOutlined, FolderOutlined, TeamOutlined } from '@ant-design/icons';

interface EditTaskProps {
  openTaskId: number
}

/**
 * title
 * description
 * dateDue
 * subtasks
 * assignedTo
 */

export const EditTask: React.FC<EditTaskProps> = props => {
  const [form] = useForm()

  // mutations
  const [updateTaskMutation] = useUpdateTaskMutation()

  // task query
  const taskQuery = useTaskQuery({
    variables: { id: props.openTaskId },
    onCompleted: (data) => {
      form.setFieldsValue({
        'title': data.task.title,
        'description': data.task.description,
        'dateDue': data.task.dateDue ? moment(data.task.dateDue) : undefined
      })
    }
  })
  const task = taskQuery.data && taskQuery.data.task ? taskQuery.data.task : undefined
  if (!task)
    return <div>There was an error with your request, please try again</div>

  const handleUpdateTask = () => {
    // format data from form
    const taskData: TaskInput = {
      title: form.getFieldValue('title'),
      description: form.getFieldValue('description'),
      dateDue: (() => {
        const date = form.getFieldValue('dateDue') as Moment | undefined
        if (typeof date === "object")
          try { return date.toDate() } catch (err) { return null }
      })(),
      isCompleted: task.isCompleted,
      isImportant: task.isImportant
    }

    // check if update is needed
    if (
      taskData.title !== task.title ||
      (typeof taskData === "undefined" ? undefined : moment(taskData.dateDue).format("MM-DD-YYYY")) !== (typeof task.dateDue === "undefined" ? undefined : moment(task.dateDue).format("MM-DD-YYYY")) ||
      taskData.description !== task.description
    )
      updateTaskMutation({ variables: { id: task.id, data: taskData } }).catch(err => console.log(err))
  }

  return (
    <div>
      {/* <Divider orientation="left">
        <CheckOutlined />
        Task Details
      </Divider> */}
      <Form
        form={form}
        onBlur={handleUpdateTask}
      >
        <Form.Item
          name="title"
          label="Title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="dateDue"
          label="Due Date"
        >
          <DatePicker allowClear={true} onChange={(val) => { handleUpdateTask() }} />
        </Form.Item>
      </Form>
      <Divider orientation="left">
        {/* <FolderOutlined /> */}
        Subtasks</Divider>
      <EditSubTasks task={task} taskQuery={taskQuery as any} />
      <Divider orientation="left">
        {/* <TeamOutlined /> */}
        Assigned To</Divider>
      <EditTaskAssignedTo task={task} taskQuery={taskQuery as any}/>
    </div>
  );
}