import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import { linkTo } from "@storybook/addon-links";
import DataTable from "../components/DataTable";
import { Welcome } from "@storybook/react/demo";

let open = true;

const model = "customer";
const dataKeysWithActions = ["headera", "headerb", "headerc", "actions"];
const headersWithActions = ["Header A", "Header B", "Header C", "Actions"];
const dataKeys = ["headera", "headerb", "headerc"];
const headers = ["Header A", "Header B", "Header C"];
const enptyItems = [];
const dataItems = [
  {
    headera: "Column A1",
    headerb: "Column B1",
    headerc: "Column C1",
  },
  {
    headera: "Column A2",
    headerb: "Column B2",
    headerc: "Column C2",
  },
];

storiesOf("Welcome", module).add("DataTable", () => (
  <Welcome showApp={linkTo("DataTable")} />
));

storiesOf("DataTable", module)
  .add("default without data ", () => (
    <DataTable
      model={model}
      items={enptyItems}
      dataKeys={dataKeys}
      headers={headers}
      page={1}
      totalPages={2}
      onDelete={action("delete button click")}
      onPageChange={action("pagination click")}
    />
  ))
  .add("with data only ", () => (
    <DataTable
      model={model}
      items={dataItems}
      dataKeys={dataKeys}
      headers={headers}
      page={1}
      totalPages={2}
      onDelete={action("delete button click")}
      onPageChange={action("pagination click")}
    />
  ))
  .add("with data and actions ", () => (
    <DataTable
      model={"?path=/story/datatable--with-data-and-actions"}
      items={dataItems}
      dataKeys={dataKeysWithActions}
      headers={headersWithActions}
      page={1}
      totalPages={2}
      onDelete={action("delete button click")}
      onPageChange={action("pagination click")}
    />
  ),
  {
      info: 
      {
          text: 
          `
          ~~~tsx
          const model = "customer";
            const dataKeysWithActions = ["headera", "headerb", "headerc", "actions"];
            const headersWithActions = ["Header A", "Header B", "Header C", "Actions"];
            const dataItems = [
                { headera: "Column A1", headerb: "Column B1", headerc: "Column C1", },
                { headera: "Column A2", headerb: "Column B2", headerc: "Column C2", },
              ];
              <DataTable
              model={model}
              items={dataItems}
              dataKeys={dataKeysWithActions}
              headers={headersWithActions}
              page={1}
              totalPages={2}
              onDelete={action("delete button click")}
              onPageChange={action("pagination click")}
            />
            ~~~
          `
      }
  }
  
  )
