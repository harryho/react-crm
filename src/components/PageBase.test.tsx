import React from "react";
import { shallow } from "enzyme";
// import { expect } from "chai";
import PageBase from "./PageBase";
import {create, act} from 'react-test-renderer';

// describe("<PageBase />", () => {
//   it("should have a span with the navigation text", () => {
//     const wrapper = shallow(<PageBase navigation="navigation" />);
//     const actual = wrapper.find("span").text();
//     const expected = "navigation";

//     expect(expected).to.equal(actual);
//   });

//   it("should have a header with the title text", () => {
//     const wrapper = shallow(<PageBase title="title" />);
//     const actual = wrapper.find("h3").text();
//     const expected = "title";

//     expect(expected).to.equal(actual);
//   });
// });


test('renders learn react link', () => {
  let app;
  act(() => {
    app = create(
    <PageBase title="title" navigation="navigation">
      {"empty content"}
    </PageBase>
    );
  });

  expect(app.toJSON()).toMatchSnapshot();

});
