import React from "react";

import { expect } from "chai";
import InfoBox from "./InfoBox";

import { shallow} from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// configure({ adapter: new Adapter() });

function MyIcon (){
  return (<>Icon</>)
}

describe("<InfoBox />", () => {
  it("should have a span with the title and value", () => {
    const wrapper = shallow(<InfoBox  Icon={MyIcon} title="Title" value="1500" spanBgColor="white"      />);
    
    const icon =  wrapper.find("span > img");
    expect (icon).to.a.instanceof(Object)
    
    const content = wrapper.find("div > span");
// console.log(content)
    // expect(content).to.equal("")
    expect("Title").to.equal(content.at(0).text());
    expect("1500").to.equal(content.at(1).text());
  });
});
