import useRooms from "@/hooks/useRooms";
import FormSelect from "./FormSelect";
export default function RoomSelector({ buildingId = null, ...props }) {
  const { data, isPending } = useRooms({
    isActive: true,
    isGetAll: true,
    buildingId,
  });
  return (
    <FormSelect
      showSearch
      options={data?.data?.map((room) => ({
        label: room.name,
        value: room.id,
      }))}
      loading={isPending}
      optionFilterProp="label"
      {...props}
    ></FormSelect>
  );
}
