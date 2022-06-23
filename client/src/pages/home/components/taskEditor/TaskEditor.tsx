import { Drawer, Spin } from 'antd';
import React from "react";
import { useTaskQuery } from '../../../../lib/codegen';
import { EditTask } from '../editTask/EditTask';

interface TaskEditorProps {
  openTaskId?: number
  onClose: () => void
}

export const TaskEditor: React.FC<TaskEditorProps> = props => {
  return (
    <Drawer
      title="Edit Task"
      placement="right"
      closable={true}
      width={500}
      onClose={props.onClose}
      visible={props.openTaskId ? true : false}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      {props.openTaskId && <EditTask openTaskId={props.openTaskId}/>}
    </Drawer>
  )
}