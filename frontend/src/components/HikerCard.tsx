import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Hiker } from "../app/types";
import { AppDispatch } from "../app/store";
import { api } from "../services/api";

export default function HikerCard(
  hiker: Hiker,
  key: number,
  dispatch: AppDispatch
) {
  function onDelete() {
    dispatch(
      api.util.updateQueryData("getHikers", null, (draft) => {
        return draft.filter((h) => h.id !== hiker.id);
      })
    );
  }

  return (
    <Card className="hiker-card" key={key}>
      <Card.Body>
        <Card.Title>Hiker {hiker.id}</Card.Title>
        <Card.Text>
          {hiker.speed} ft/min
          <br />
          <Button onClick={onDelete}>Delete</Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
