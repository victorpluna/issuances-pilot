import { Button, Modal } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input } from 'formik-antd'
import { Row } from 'react-display-flex';

import { uploadSoulboundSchema, initialValues } from './upload-soulbound-schema.ts';

import './upload-soulbound-modal.scss';
import React from 'react';

interface Props {
  visible: boolean
  onClose: () => void
}

export const UploadSoulboundModal = ({ visible, onClose }: Props) => {
  const formRef = React.useRef<FormikProps<any>>();

  const onSubmitFormClick = async () => {
    await formRef.current.submitForm();
  };

  const handleSubmitForm = (values) => {
    console.log('==handleSubmitForm', values);
  };

  return (
    <Modal
      className="create-issuance-modal"
      centered
      destroyOnClose
      maskClosable={false}
      keyboard={false}
      title="Upload Document"
      open={visible}
      width="40vw"
      onCancel={onClose}
      footer={(
        <Button key="publish-issuance" disabled={false} onClick={onSubmitFormClick} type="primary" size="large">
          Send document
        </Button>
      )}
    >
      <Formik
        onSubmit={handleSubmitForm}
        validationSchema={uploadSoulboundSchema}
        initialValues={initialValues}
        innerRef={formRef}
      >
          <Form className="issuance-form" role="form" layout="vertical" autoComplete="off">
            <FormItem name="name" label="Name">
              <Input name="name" aria-label="Name" />
            </FormItem>
            <Row className="horizontal-form">
              <FormItem name="type" label="Document Type">
                <Input name="type" aria-label="Document Type" />
              </FormItem>

              <FormItem name="document" label="Document">
                <Input name="document" aria-label="Document" />
              </FormItem>
            </Row>
          </Form>
      </Formik>
    </Modal>
  );
}
