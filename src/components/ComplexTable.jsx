import { Table } from "antd";
import TableTopbar from "./TableTopbar";
export default function ComplexTable({
  title,
  downloadFunction,
  filterMenu,
  searchFunction,
  statusList,
  statusFilter,
  addFunction,
  columns,
  data,
  addText,
  tableTitle,
  hasSearch = true,
  hasAdd = true,
  hasDownload = true,
  hasFilter = true,
  hasStatusFilter = true,
  loading = false,
  onChange,
  paginationConfig,
  ...props
}) {
  return (
    <>
      <TableTopbar
        title={title}
        downloadFunction={downloadFunction}
        filterMenu={filterMenu}
        searchFunction={searchFunction}
        statusList={statusList}
        statusFilter={statusFilter}
        addFunction={addFunction}
        addText={addText}
        tableTitle={tableTitle}
        hasSearch={hasSearch}
        hasAdd={hasAdd}
        hasDownload={hasDownload}
        hasFilter={hasFilter}
        hasStatusFilter={hasStatusFilter}
      />
      <Table
        className="mt-4"
        columns={columns}
        loading={loading}
        dataSource={data}
        onChange={onChange}
        pagination={paginationConfig}
        {...props}
      ></Table>
    </>
  );
}
