import React from "react"
import { Layout } from "antd"

interface ContentWrapperProps {

}

export const ContentWrapper: React.FC<ContentWrapperProps> = props => {
  return(
    <Layout.Content className="content">
      {props.children}
    </Layout.Content>
  );
}