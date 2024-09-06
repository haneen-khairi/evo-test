import { useTranslation } from "react-i18next";
import CustomCard from "@/components/CardWithHeader";
import ButtonGroup from "@/components/CustomButtonGroup";
import EmployeesComponent from "./employees";
import DepartmentsComponent from "./departments";
import { useState } from "react";
import BuildingsComponent from "./buildings";
import RoomsComponent from "./rooms";
import CountriesComponent from "./countries";
import GuestsComponent from "./guests";
import AuditLog from "@/pages/auditlog/index.jsx";

import { useCallback } from "react";
import { useSelector } from "react-redux";
export default function Organization() {
  const { t } = useTranslation();
  const { ability } = useSelector((state) => state.ability);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "1"
  );
  const buildOptionsFromAbility = useCallback(() => {
    let options = [];
    if (ability.can("manage", "Users")) {
      options.push({ value: "1", label: t("employees") });
    }
    if (ability.can("manage", "Departments")) {
      options.push({ value: "2", label: t("departments") });
    }
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "3", label: t("buildings") });
    }
    if (ability.can("manage", "Rooms")) {
      options.push({ value: "4", label: t("rooms") });
    }
    if (ability.can("manage", "Guests")) {
      options.push({ value: "6", label: t("guests") });
    }
    if (ability.can("manage", "Administrator")) {
      options.push({ value: "7", label: t("auditLog") });
    }
    return options;
  });

  return (
    <div className="w-full">
      <CustomCard>
        <ButtonGroup
          defaultValue="1"
          onChange={(e) => {
            setActiveTab(e.target.value);
            localStorage.setItem("activeTab", e.target.value);
          }}
          value={activeTab}
          options={buildOptionsFromAbility()}
        />
        <div className="w-full mt-2">
          {activeTab === "1" && <EmployeesComponent />}
          {activeTab === "2" && <DepartmentsComponent />}
          {activeTab === "3" && <BuildingsComponent />}
          {activeTab === "4" && <RoomsComponent />}
          {activeTab === "6" && <GuestsComponent />}
          {activeTab === "7" && <AuditLog />}
        </div>
      </CustomCard>
    </div>
  );
}
