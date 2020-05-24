import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import { linkTo } from "@storybook/addon-links";
import DeleteDialog from "../components/DeleteDialog";
import { Welcome } from "@storybook/react/demo";

storiesOf("Welcome", module).add("DeleteDialog", () => (
  <Welcome showApp={linkTo("DeleteDialog")} />
));

let open = true;

storiesOf("DeleteDialog", module)
  .add("default dialog ", () => (
    <DeleteDialog
      open={true}
      closeDialog={(isConfirmed) => {
        console.log(`close dialg`);
      }}
    />
  ))
  .add("customized  title and text ", () => (
    <DeleteDialog
      open={true}
      closeDialog={action(`close dialg`)}
      dialogText="Customized Text"
      dialogTitle="Customized Title"
    />
  ))
  .add("customized  action ", ({ dialogText, dialogTitle }) => (
    <DeleteDialog
      open={open}
      closeDialog={() => {
        console.log(`closeDialog |->  ${open}`);
        open = !open;
      }}
      dialogText={dialogText}
      dialogTitle={dialogTitle}
    />
  ));
