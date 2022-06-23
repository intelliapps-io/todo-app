import React, { useContext, useState } from "react";
import { Layout, Menu } from 'antd';
import { CalendarOutlined, CoffeeOutlined, GlobalOutlined, NotificationOutlined, StarOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { AppContext } from '../../../../lib/helpers/AppContext';
import { TaskViewFilterMode } from '../../Home';

const { Sider } = Layout;

interface HomeMenuProps {
  filterMode: TaskViewFilterMode
}

export const HomeMenu: React.FC<HomeMenuProps> = props => {
  const { router, responsiveCalc } = useContext(AppContext);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const setFilter = (mode: TaskViewFilterMode) => {
    router.history.push(`/app/${mode}`)
  }

  if (responsiveCalc('sm', 'down-include') && !isCollapsed) {
    setIsCollapsed(true)
  }

  if (responsiveCalc('md', 'up-include') && isCollapsed) {
    setIsCollapsed(false)
  }

  return (
    <Sider
      width={200}
      collapsedWidth={45}
      collapsed={isCollapsed}
      onCollapse={(val) => setIsCollapsed(val)}
      collapsible={true}
      className="home-menu-sider"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={[props.filterMode]}
        // selectedKeys={[props.filterMode]}
        style={{ height: '100%', borderRight: 0 }}
        collapsedWidth={45}
      >
        <Menu.Item key={TaskViewFilterMode['ALL_TASKS']} icon={<GlobalOutlined />} onClick={() => setFilter(TaskViewFilterMode['ALL_TASKS'])}>All Tasks</Menu.Item>
        <Menu.Item key={TaskViewFilterMode['IS_IMPORTANT']} icon={<StarOutlined />} onClick={() => setFilter(TaskViewFilterMode['IS_IMPORTANT'])}>Important</Menu.Item>
        <Menu.Divider />
        <Menu.Item key={TaskViewFilterMode['DATE_PAST_DUE']} icon={<NotificationOutlined />} onClick={() => setFilter(TaskViewFilterMode['DATE_PAST_DUE'])}>Past Due</Menu.Item>
        <Menu.Item key={TaskViewFilterMode['DATE_TODAY']} icon={<CoffeeOutlined />} onClick={() => setFilter(TaskViewFilterMode['DATE_TODAY'])}>Today</Menu.Item>
        <Menu.Item key={TaskViewFilterMode['DATE_UPCOMING']} icon={<CalendarOutlined />} onClick={() => setFilter(TaskViewFilterMode['DATE_UPCOMING'])}>Upcoming</Menu.Item>
        <Menu.Divider />
        <Menu.Item key={TaskViewFilterMode['TASK_USER_CREATED']} icon={<UserOutlined />} onClick={() => setFilter(TaskViewFilterMode['TASK_USER_CREATED'])}>Personal Tasks</Menu.Item>
        <Menu.Item key={TaskViewFilterMode['TASK_USER_ASSIGNED']} icon={<TeamOutlined />} onClick={() => setFilter(TaskViewFilterMode['TASK_USER_ASSIGNED'])}>Assigned Tasks</Menu.Item>
      </Menu>
    </Sider>
  );
}