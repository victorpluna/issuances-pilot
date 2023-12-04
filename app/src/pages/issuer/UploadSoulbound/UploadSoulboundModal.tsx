import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input } from 'formik-antd'

import { uploadSoulboundSchema, initialValues } from './upload-soulbound-schema.ts';

import './upload-soulbound-modal.scss';

interface Props {
  visible: boolean
  onClose: () => void
  uploadDocument: ({ tokenURI }: { tokenURI: string }) => Promise<void>
}

export const UploadSoulboundModal = ({ visible, uploadDocument, onClose }: Props) => {
  const [isDocumentUploading, setIsDocumentUploading] = useState(false)
  const formRef = React.useRef<FormikProps<any>>();

  const onSubmitFormClick = async () => {
    await formRef.current.submitForm();
  };

  const handleSubmitForm = async (values) => {
    setIsDocumentUploading(true)
    await uploadDocument(values)
    setIsDocumentUploading(false)
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
        <Button
          key="publish-issuance"
          loading={isDocumentUploading}
          onClick={onSubmitFormClick}
          type="primary"
          size="large"
        >
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
            <FormItem name="tokenURI" label="Document Link (IPFS)">
              <Input name="tokenURI" aria-label="tokenURI" />
            </FormItem>
            <FormItem name="price" label="Price">
              <Input name="price" aria-label="price" />
            </FormItem>
          </Form>
      </Formik>
    </Modal>
  );
}
