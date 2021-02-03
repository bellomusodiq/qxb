import { Tabs } from "antd";
import "./Tab.css";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Tab = ({ options }) => (
  <Tabs className="custom-tab" defaultActiveKey="1" onChange={callback}>
    {options.map((option) => (
      <TabPane tab={option.title} key={option.key}>
        {option.children}
      </TabPane>
    ))}
  </Tabs>
);

export default Tab;
