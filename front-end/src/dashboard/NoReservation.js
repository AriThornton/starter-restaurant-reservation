import React from "react";
import { Alert } from "react-bootstrap";

function NoReservation() {
  const show = true;
  function showMessage() {
    if (show) {
      return (
        <Alert show={show} variant="info">
          <Alert.Heading>
            There are no reservations available for this day
          </Alert.Heading>
          <hr />
        </Alert>
      );
    }
  }
  return (
    <div className="d-flex justify-content-center mb-5">
      <div className="mt-5 mb-5" style={{ width: "70%" }}>
        {showMessage()}
      </div>
    </div>
  );
}

export default NoReservation;
