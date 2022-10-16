import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormEventHandler } from "react";

export default function HikerForm(
  onSubmit: FormEventHandler<HTMLFormElement>,
  register: UseFormRegister<FieldValues>
) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Hiker ID</Form.Label>
        <Form.Control type="text" {...register("id", { required: true })} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Hiker Speed</Form.Label>
        <Form.Control
          type="number"
          {...register("speed", { required: true })}
        />
      </Form.Group>
      <br />
      <Button type="submit">Create Hiker</Button>
    </Form>
  );
}
