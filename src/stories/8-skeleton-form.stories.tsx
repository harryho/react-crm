import React from "react";

import { storiesOf } from "@storybook/react";

import { linkTo } from "@storybook/addon-links";
import  SkeletonForm  from "../components/SkeletonForm";
import { Welcome } from "@storybook/react/demo";

storiesOf("Welcome", module).add("SkeletonForm", () => <Welcome showApp={linkTo("SkeletonForm")} />);



storiesOf("SkeletonForm", module)
  .add(
    "default layout without list skeleton",
    () => (
           <SkeletonForm />
    )
    
  ).add(
    "layout with list skeleton",
    () => (
           <SkeletonForm withList={true} />
    )
    
  );

