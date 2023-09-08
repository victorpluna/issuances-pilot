import { Badge, Button, Form, Popover } from "antd";
import { Formik, FormikProps } from "formik";
import { FormItem } from "formik-antd";
import { useState } from "react";
import { InputCurrency } from "../../../components/InputCurrency/InputCurrency";
import { constants } from "../../../config/constants";
import { initialValues, investSchema } from "./invest-form-schema";

import './invest-button.scss';
import React from "react";

export const InvestButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = React.useRef<FormikProps<any>>();

  const handleSubmitForm = (values) => {
    console.log('==handleSubmitForm', values);
  };

  return (
    <Popover
      overlayClassName="modal-popover invest-issuance"
      destroyTooltipOnHide
      title={<h3>Invest</h3>}
      trigger="click"
      open={isOpen}
      onOpenChange={(visible) => setIsOpen(visible)}
      placement="topRight"
      content={
        <Formik
          onSubmit={handleSubmitForm}
          validationSchema={investSchema}
          initialValues={initialValues}
          innerRef={formRef}
        >
          <Form className="invest-form" role="form" layout="vertical" autoComplete="off">
            <FormItem name="amount" label={`Amount (${constants.currencyMultiplicationAbbreviation})`}>
              <InputCurrency name="amount" aria-label="amount" precision={constants.inputCurrencyPrecision} />
            </FormItem>

            <Button type="primary" onClick={() => formRef.current.submitForm()}>Publish investment</Button>
          </Form>
        </Formik>
      }
    >
      <Badge>
        <Button type="primary" onClick={() => setIsOpen(true)}>Invest</Button>
      </Badge>
    </Popover>
  );
};
