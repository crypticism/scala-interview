import Card from "react-bootstrap/Card";

import { Bridge } from "../app/types";
import { BridgeInfo } from "../functions/travel";

export default function BridgeInfoCard(bridge: Bridge, info: BridgeInfo) {
  return (
    <Card className="bridge-info-card" border="primary">
      <Card.Body>
        <Card.Title>Crossing Bridge {bridge.id}</Card.Title>
        <Card.Text>
          <span>
            Bridge Length: <b>{info.length}</b>
          </span>
          <br />
          <span>
            Number of Hikers: <b>{info.count}</b>
          </span>
          <br />
          <span>
            Hiker IDs: <b>{info.hikers.join(", ")}</b>
          </span>
          <br />
          <span>
            Time taken: <b>{info.time} minutes</b>
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
