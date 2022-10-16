import React from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";

import { useAppDispatch } from "./app/hooks";
import { Bridge, Hiker } from "./app/types";
import { api, useGetBridgesQuery, useGetHikersQuery } from "./services/api";
import HikerCard from "./components/HikerCard";
import BridgeCard from "./components/BridgeCard";
import HikerForm from "./components/HikerForm";
import BridgeForm from "./components/BridgeForm";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { truncate, traverseBridge } from "./functions/travel";
import BridgeInfoCard from "./components/BridgeInfoCard";

// This generates bridge ids starting at a specific number
function* generator(start: number): Generator<number> {
  let i = start;

  while (true) {
    yield i++;
  }
}

function App() {
  const dispatch = useAppDispatch();

  const { data: bridges } = useGetBridgesQuery(null);
  const { data: hikers } = useGetHikersQuery(null);

  const ids = generator(bridges?.length || 0);

  const {
    register: bridgeRegister,
    handleSubmit: bridgeHandleSubmit,
    reset: bridgeReset,
    formState: { errors: bridgeErrors },
  } = useForm();
  const onBridgeSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(
      api.util.updateQueryData("getBridges", null, (draft) => {
        const id: number = ids.next().value;
        draft.push({ id, length: data.length, hikers: data.hikers });
      })
    );
    bridgeReset();
  };

  const {
    register: hikerRegister,
    handleSubmit: hikerHandleSubmit,
    reset: hikerReset,
  } = useForm();
  const onHikerSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(
      api.util.updateQueryData("getHikers", null, (draft) => {
        draft.push({ id: data.id, speed: data.speed });
      })
    );
    hikerReset();
  };

  // Avoid rendering before data is retrieved from api
  if (typeof bridges === "undefined" || typeof hikers === "undefined") {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  const hikerCards = hikers?.map((hiker: Hiker, key: number) =>
    HikerCard(hiker, key, dispatch)
  );
  const bridgeCards = bridges?.map((bridge: Bridge, key: number) =>
    BridgeCard(bridge, key, dispatch)
  );

  const hikerWarning =
    hikers.length < bridges[bridges.length - 1].hikers ? (
      <div className="hiker-warning">
        There are {bridges[bridges.length - 1].hikers} hikers crossing but only{" "}
        {hikers.length} defined
      </div>
    ) : null;

  const bridgeWarning =
    bridges[bridges.length - 1].hikers < hikers.length ? (
      <div className="bridge-warning">
        There are {hikers.length} hikers total but only{" "}
        {bridges[bridges.length - 1].hikers} are crossing
      </div>
    ) : null;

  let bridgeInfoCards = null;
  let overallTime = 0;

  // If the set bridges and hikers are valid, traverse the bridges and render the calculated info
  if (hikerWarning === null && bridgeWarning === null) {
    bridgeInfoCards = bridges.map((bridge) => {
      const info = traverseBridge(bridge, hikers.slice(0, bridge.hikers));
      overallTime += info.time;
      return BridgeInfoCard(bridge, info);
    });
  }

  return (
    <div className="App">
      <div className="hiker-container">
        <div className="hiker-cards">
          {hikerCards} {hikerWarning}
        </div>
        <div className="hiker-form">
          {HikerForm(hikerHandleSubmit(onHikerSubmit), hikerRegister)}
        </div>
      </div>
      <div className="bridge-container">
        <div className="bridge-cards">
          {bridgeCards} {bridgeWarning}
        </div>
        <div className="bridge-form">
          {BridgeForm(
            bridgeHandleSubmit(onBridgeSubmit),
            bridgeRegister,
            bridgeErrors,
            bridges[bridges.length - 1].hikers
          )}
        </div>
      </div>
      <div className="bridge-info-container">
        <div className="bridge-info-cards">{bridgeInfoCards}</div>
        <h3>
          Overall time taken: <b>{truncate(overallTime)} minutes</b>
        </h3>
      </div>
    </div>
  );
}

export default App;
