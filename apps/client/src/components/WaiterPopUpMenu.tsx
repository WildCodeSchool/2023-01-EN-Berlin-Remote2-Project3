import "../scss/_waiterPopUpMenu.scss";

const WaiterPopUpMenu = ({
  showPopUp,
  setShowPopUp,
}: {
  showPopUp: boolean;
  setShowPopUp: boolean;
}) => {
  return (
    <div>
      <div className={showPopUp ? "popUpWindow" : "hidden"}>
        <h1>Menu ?</h1>
      </div>

      <div
        onClick={() => setShowPopUp(false)}
        className={showPopUp ? "overlay" : "hidden"}
      ></div>
    </div>
  );
};

export default WaiterPopUpMenu;
