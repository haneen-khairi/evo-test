import SubtitleText from "@/components/Subtitle";
import { useTranslation } from "react-i18next";
export default function RowStatus({ text }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          text == "1" ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <SubtitleText>{text == "1" ? t("Active") : t("Inactive")}</SubtitleText>
    </div>
  );
}
