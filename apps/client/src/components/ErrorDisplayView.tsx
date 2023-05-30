import "../scss/_errorDisplayView.scss";

const ErrorDisplayView = () => {
  return (
    <div className="errorContainer">
      <div className="wrapper">
        <div className="message">
          <h2>Oops! Something went wrong</h2>
          <p style={{ color: "#636363", fontSize: "12px" }}>
            We apologize for the inconvenience. Our team is already working on
            fixing the issue. Please try again later
          </p>
          <p style={{ color: "#636363", fontSize: "12px" }}>
            Thank you for your patience
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplayView;
