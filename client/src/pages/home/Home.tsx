import React, { useContext } from "react";
import "./Home.less";
import { Spin, Layout } from "antd";
import { AppContext, IAppContext } from '../../lib/helpers/AppContext';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { HomeMenu } from './components/homeMenu/HomeMenu';
import { TaskList } from './components/taskList/TaskList';
import { useTasksQuery } from '../../lib/codegen';

const { Content } = Layout

interface IProps {

}

export enum TaskViewFilterMode {
  "ALL_TASKS" = "all_tasks",
  "IS_IMPORTANT" = "is_important",
  "DATE_PAST_DUE" = "date_past_due",
  "DATE_TODAY" = "date_today",
  "DATE_UPCOMING" = "date_upcoming",
  "TASK_USER_CREATED" = "task_user_created",
  "TASK_USER_ASSIGNED" = "task_user_assigned",
}

export interface RoutePropsTaskViewState {
  filterMode: TaskViewFilterMode
  openTaskId?: string
}

export const Home: React.FC<IProps & RouteComponentProps<RoutePropsTaskViewState>> = props => {
  const { user, meQuery } = useContext<IAppContext<RoutePropsTaskViewState>>(AppContext)

  // state variables
  let openTaskId = undefined, filterMode = props.match.params.filterMode
  if (props.match.params.openTaskId)
    try { openTaskId = Number.parseInt(props.match.params.openTaskId) } catch (err) { }

  // queries
  const tasksQuery = useTasksQuery({ variables: { filters: {} } })
  const { data } = tasksQuery
  const tasks = data && data.tasks ? data.tasks : []

  // redirects
  if (meQuery.loading) return <Spin />
  if (!user) return <Redirect to="/welcome" />
  if (props.location.pathname === "/") return <Redirect to={`/app/${TaskViewFilterMode['ALL_TASKS']}`} />
  if (props.location.pathname === "/app" || props.location.pathname === "/app/") return <Redirect to={`/app/${TaskViewFilterMode['ALL_TASKS']}`} />

  return (
    <Layout>
      <HomeMenu filterMode={filterMode} />
      <Layout className="task-list-layout" >
        <Content
          className="site-layout-background"
          style={{
            margin: 0,
            minHeight: 280,
          }}
        >
          <TaskList tasks={tasks} tasksQuery={tasksQuery as any} filterMode={filterMode} openTaskId={openTaskId} />
        </Content>
      </Layout>
    </Layout>
  );
}