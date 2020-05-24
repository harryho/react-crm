import React from "react";

import { storiesOf } from "@storybook/react";

import { linkTo } from "@storybook/addon-links";
import SkeletonList from "../components/SkeletonList";
import { Welcome } from "@storybook/react/demo";

storiesOf("Welcome", module).add("SkeletonList", () => (
  <Welcome showApp={linkTo("SkeletonList")} />
));

storiesOf("SkeletonList", module).add("is used in list page.", () => (
  <SkeletonList />
));
