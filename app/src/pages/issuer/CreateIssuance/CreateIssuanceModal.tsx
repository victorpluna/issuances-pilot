import { Button, Modal } from 'antd';
import { Formik, FormikProps } from 'formik';
import { Form, FormItem, Input, InputNumber } from 'formik-antd'
import { Row } from 'react-display-flex';

import { createIssuanceInformationSchema, initialValues } from './issuance-form-schema';

import './create-issuance-modal.scss';
import { InputCurrency } from '../../../components/InputCurrency/InputCurrency';
import { constants } from '../../../config/constants';
import React from 'react';

interface Props {
  visible: boolean
  onClose: () => void
}

export const CreateIssuanceModal = ({ visible, onClose }: Props) => {
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
      title="Create Issuance"
      open={visible}
      width="40vw"
      onCancel={onClose}
      footer={(
        <Button key="publish-issuance" disabled={false} onClick={onSubmitFormClick} type="primary" size="large">
          Publish issuance
        </Button>
      )}
    >
      <Formik
        onSubmit={handleSubmitForm}
        validationSchema={createIssuanceInformationSchema}
        initialValues={initialValues}
        innerRef={formRef}
      >
          <Form className="issuance-form" role="form" layout="vertical" autoComplete="off">
            <FormItem name="name" label="Name">
              <Input name="name" aria-label="Name" />
            </FormItem>
            <Row className="horizontal-form">
              <FormItem name="targetValue" label={`Target Funds (${constants.currencyMultiplicationAbbreviation})`}>
                <InputCurrency name="targetValue" aria-label="target funds" precision={constants.inputCurrencyPrecision} />
              </FormItem>

              <FormItem name="minimumLotsValue" label={`Minimum Amount (${constants.currencyMultiplicationAbbreviation})`}>
                <InputCurrency
                  name="minimumLotsValue"
                  aria-label="minimum amount"
                  precision={constants.inputCurrencyPrecision}
                />
              </FormItem>
            </Row>
          </Form>
      </Formik>
    </Modal>
  );
}
