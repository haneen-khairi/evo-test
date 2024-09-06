import { Modal, Result } from "antd";
export default function ResultModal({
  status,
  title,
  subtitle,
  content,
  close,
  closable,
}) {
  const isVisible = Boolean(status);
  return (
    <Modal
      open={isVisible}
      footer={null}
      centered
      onCancel={closable ? close : null}
      closeIcon={closable}
    >
      <Result status={status} title={title} subTitle={subtitle}>
        {content}
      </Result>
    </Modal>
  );
}
