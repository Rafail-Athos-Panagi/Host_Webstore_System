import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import TickIcon from "../../../assets/img/TickIcon.png";
import HostHand from "../../../assets/img/HostHand.png";

export default function ProgressWidget(props) {
  var stepProgress = 0;
  if (props.orderStatus === "pending") {
    stepProgress = 0;
  } else if (props.orderStatus === "in Progress") {
    stepProgress = 50;
  } else if (props.orderStatus === "ready" || props.orderStatus === "delivered") {
    stepProgress = 100;
  } else {
    stepProgress = 0;
  }
  return (
    <ProgressBar
      percent={stepProgress}
      filledBackground="linear-gradient(to right, #0C777F, #09575d)"
    >
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            alt="#"
            width="40"
            src={TickIcon}
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            alt="#"
            width="40"
            src={TickIcon}
          />
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <img
            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
            alt="#"
            width="40"
            src={TickIcon}
          />
        )}
      </Step>
    </ProgressBar>
  );
}
