import { Tabs } from "antd";
import "./Tab.css";

const { TabPane } = Tabs;

const Tab = ({ options }) => (
  <Tabs className="custom-tab" defaultActiveKey="1" >
    {options.map((option) => (
      <TabPane tab={option.title} key={option.key}>
        {option.children}
      </TabPane>
    ))}
  </Tabs>
);

export default Tab;
