import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FieldErrorsImpl, FieldValues, UseFormRegister } from "react-hook-form";
import { FormEventHandler } from "react";

export default function BridgeForm(
  onSubmit: FormEventHandler<HTMLFormElement>,
  register: UseFormRegister<FieldValues>,
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>,
  min: number
) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Bridge Length</Form.Label>
        <Form.Control
          type="number"
          {...register("length", { required: true })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Number of Hikers</Form.Label>
        <Form.Control
          type="number"
          {...register("hikers", { required: true, min })}
        />
        {errors.hikers && (
          <p className="error">Must be at least {min} hikers</p>
        )}
      </Form.Group>
      <br />
      <Button type="submit">Create Bridge</Button>
    </Form>
  );
}
