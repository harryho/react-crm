import React from "react";

import { storiesOf } from "@storybook/react";

import { linkTo } from "@storybook/addon-links";
import  ChatInput  from "../components/ChatInput";
import { Welcome } from "@storybook/react/demo";

storiesOf("Welcome", module).add("ChatInput", () => <Welcome showApp={linkTo("ChatInput")} />);



storiesOf("ChatInput", module)
  .add(
    "with message",
    () => (
      <ChatInput
      userName={"User Name"}
      message={"message"}
      updateMessage={(m)=>{console.log(`updateMessage |-> ${this.props.message}` )}}
      sendMessage={(m)=>{console.log(`sendMessage |->   ${this.props.message}` )}}
    />
    )
    ,
    { message : " test message " }
  );

