const Dashboard = () => {
  const deleteLocalStorage = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <>
      <h2>DashBoard</h2>
      <button onClick={deleteLocalStorage}>logout</button>
    </>
  );
};

export default Dashboard;
