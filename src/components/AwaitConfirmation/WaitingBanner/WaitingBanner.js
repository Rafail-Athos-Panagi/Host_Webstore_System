import React from "react";
import "./WaitingBanner.css";

export default function WaitingBanner() {
    return (
        <div style={{textAlign: "center" }}>
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
            <br/>
            <p>Your order is pending confirmation</p>
            <p>Please wait...</p>
        </div>
    );
}