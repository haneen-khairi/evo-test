import { Button, Drawer, Form, Typography } from "antd";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { t } from "i18next";
import { HiXMark } from "react-icons/hi2";
import useRooms from "@/hooks/useRooms";
import useResultModal from "@/hooks/useResultModal";
import { createOrder } from "@/services/restaurantOrders";
import { useMutation, useQuery } from "@tanstack/react-query";
import RoomSelector from "@/components/forms/RoomSelector";
import { itemSizes } from "../../components/restaurant/sizesEnum";
import useTheme from "@/hooks/useTheme";
import { fetchAllRestaurants } from "@/services/restaurants";
import BuildingSelector from "../../components/forms/BuildingSelector";
export function CartDrawer({ cart, open, onClose, onDeleteItem }) {
  const [form] = Form.useForm();

  const { token } = useTheme();
  const globalModal = useResultModal();
  const building = Form.useWatch("buildingId", form);
  const { data: restaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: () => fetchAllRestaurants(),
    staleTime: 1000 * 60 * 30,
  });
  const placeOrderMutation = useMutation({
    mutationFn: (values) => createOrder(values),
    mutationKey: ["createOrder"],
    onSuccess: () => {
      globalModal.success({
        title: t("placedSuccessfully"),
        subtitle: t("orderPlacedSuccessfully"),
      });
    },
    onError: () => {
      globalModal.error(t("error"), t("errorWhileCreatingProduct"));
    },
    onSettled: () => {
      onClose();
    },
  });
  function handleCreateOrder(values) {
    placeOrderMutation.mutate({
      restaurantId: restaurants.data[0].id,
      items: cart.map((item) => ({
        itemId: item.id,
        count: item.count,
        isAddSugar: item.isAddSugar,
        itemSize: item.size,
      })),
      instructions: values.notes,
      ...values,
    });
  }
  return (
    <Drawer
      placement="left"
      open={open}
      onClose={onClose}
      title={t("cart")}
      size="large"
      footer={
        <Button
          type="primary"
          disabled={cart.length === 0}
          loading={placeOrderMutation.isPending}
          className="w-full border-none"
          onClick={() => {
            form.submit();
          }}
        >
          {t("placeOrder")}
        </Button>
      }
    >
      <div className="flex flex-col gap-3">
        {cart.map((item) => (
          <div className="flex gap-4">
            <img
              src={item.image}
              className="rounded-xl w-32 h-32 object-cover"
            ></img>
            <div className="flex flex-col gap-2 grow">
              <Typography className="text-lg font-semibold">
                {item.name}
              </Typography>
              <Typography>
                {t("count")}: {item.count}
              </Typography>
              <Typography>
                {t("hasSugar")}: {item.isAddSugar ? t("yes") : t("no")}
              </Typography>
              <Typography>
                {t("size")}: {itemSizes[item.size]}
              </Typography>
            </div>
            <Button
              type="default"
              shape="circle"
              danger
              onClick={() => {
                onDeleteItem(item.local_id);
              }}
              className="justify-self-end w-8 h-8 flex justify-center items-center"
            >
              <HiXMark />
            </Button>
          </div>
        ))}
        <Typography
          className="px-3 py-4 rounded-xl"
          style={{
            backgroundColor: token.geekblue1,
          }}
        >
          {t("orderDetails")}
        </Typography>
        <Form layout="vertical" onFinish={handleCreateOrder} form={form}>
          <Form.Item
            name="buildingId"
            label={t("building")}
            rules={[{ required: true }]}
          >
            <BuildingSelector
              size="large"
              onChange={() => {
                form.resetFields(["roomId"]);
              }}
            />
          </Form.Item>
          <Form.Item
            name="roomId"
            label={t("room")}
            rules={[{ required: true }]}
          >
            <RoomSelector
              size="large"
              disabled={!building}
              buildingId={building}
            />
          </Form.Item>
          <Form.Item name="notes" label={t("notes")}>
            <FormInput.TextArea />
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}
