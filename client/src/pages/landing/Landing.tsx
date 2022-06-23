import "./Landing.less"
import React, { useContext } from "react"
import { Card, Col, Row, Typography } from 'antd'
import { ContentWrapper } from '../../components/contentWrapper/ContentWrapper'
import { AppContext } from '../../lib/helpers/AppContext'
import { Redirect } from 'react-router-dom'
const { Title } = Typography

interface LandingProps {

}

export const Landing: React.FC<LandingProps> = props => {
  const { user } = useContext(AppContext)

  if (user) return <Redirect to="/app"/>  
  return (
    <ContentWrapper>
      <div className="landing-root">
        <Title className="landing-title">Welcome the Todo-App</Title>
        <Row style={{ width: "100%" }} className="landing-cards">
          <Col xs={24} sm={12}>
            <Card
              title={<Title level={4}>Create Tasks</Title>}
            >
              Create tasks for what you want to get done and add descriptions to remember the details.
          </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              title={<Title level={4}>Stay Organize</Title>}
            >
              Filter tasks by due date, title, importance, details, and more!
          </Card>
          </Col>
        </Row>
        <Row style={{ width: "100%" }} className="landing-cards">
          <Col xs={24} sm={12}>
            <Card
              title={<Title level={4}>Share Tasks with Friends</Title>}
            >
              Share tasks with your friends and have friends share tasks with you, make it a team effort!
          </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              title={<Title level={4}>Stay Focused</Title>}
            >
              Star your important tasks so you can finish what is priority first
          </Card>
          </Col>
        </Row>
      </div>
    </ContentWrapper>

  );
}