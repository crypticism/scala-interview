import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Bridge } from "../app/types";
import { AppDispatch } from "../app/store";
import { api } from "../services/api";

export default function BridgeCard(
  bridge: Bridge,
  key: number,
  dispatch: AppDispatch
) {
  function onDelete() {
    dispatch(
      api.util.updateQueryData("getBridges", null, (draft) => {
        return draft.filter((b) => b.id !== bridge.id);
      })
    );
  }

  return (
    <Card className="bridge-card" key={key}>
      <Card.Body>
        <Card.Title>Bridge {bridge.id}</Card.Title>
        <Card.Text>
          {bridge.length} ft
          <br />
          {bridge.hikers} hikers crossing
          <br />
          <Button onClick={onDelete}>Delete</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
