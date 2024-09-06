import { Button, Dropdown, Input, Select, Avatar } from "antd";
import { t } from "i18next";
import { FiDownload } from "react-icons/fi";
import { BsSearch, BsSliders } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { useTranslation } from "react-i18next";
import debounce from "debounce";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";

export default function TableTopbar({
  title,
  downloadFunction,
  filterMenu,
  searchFunction,
  statusList,
  statusFilter,
  addFunction,
  addText,
  tableTitle,
  hasSearch = true,
  hasAdd = true,
  hasDownload = true,
  hasFilter = true,
  hasStatusFilter = true,
  ...props
}) {
  const { token } = useTheme();
  const { t } = useTranslation();
  const debouncedSearch = debounce(searchFunction ?? (() => {}), 500);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      className="p-3 mt-2 flex items-center justify-between rounded-2xl"
      style={{
        backgroundColor: token.cardHeaderColor,
        color: token.primaryTextColor,
      }}
    >
      <div className="flex gap-4 items-center basis-2/4">
        <h1 className="font-bold">{tableTitle ?? t("thisWeek")}</h1>
        {hasDownload && (
          <Button
            shape="circle"
            className=" border-none"
            icon={<FiDownload className="text-md" />}
            onClick={downloadFunction ?? (() => {})}
          ></Button>
        )}
        {hasFilter && filterMenu && (
          <Dropdown
            menu={filterMenu}
            open={menuOpen}
            onOpenChange={(e, i) => {
              if (i.source == "trigger") setMenuOpen(e);
            }}
          >
            <Button
              shape="circle"
              className=" border-none"
              icon={<BsSliders className="text-md" />}
            ></Button>
          </Dropdown>
        )}
        {hasSearch && (
          <Input
            placeholder={t("search")}
            className="rounded-xl border-none"
            onChange={debouncedSearch}
            style={{
              width: "50%",
            }}
            prefix={
              <Avatar
                style={{
                  color: token.colorPrimary,
                  backgroundColor: token.colorSecondary,
                }}
              >
                <BsSearch className="text-md" />
              </Avatar>
            }
          ></Input>
        )}
      </div>
      {(hasStatusFilter || hasAdd) && (
        <div className="flex gap-1 items-center basis-1/4 justify-end">
          {hasStatusFilter && (
            <Select
              style={{
                width: "50%",
                boxShadow: token.cardShadow,
                borderRadius: "10px",
              }}
              bordered={false}
              defaultValue={t("status")}
              options={statusList}
              onChange={statusFilter ?? (() => {})}
            ></Select>
          )}
          {hasAdd && (
            <Button
              type="primary"
              className="flex items-center"
              onClick={addFunction}
            >
              <MdAdd className="text-xl" />
              {addText ?? t("add")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
