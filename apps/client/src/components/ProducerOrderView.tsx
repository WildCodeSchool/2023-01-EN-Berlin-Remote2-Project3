import "../scss/_producerOrderView.scss";

const ProducerOrderView = () => {
  const item = (e) => {
    console.log(e.target);
  };
  return (
    <div className="producer-order">
      <table onClick={item}>
        <tr>
          <th>Item</th>
          <th>Waiter</th>
          <th>Time</th>
          <th>Current Status</th>
        </tr>
        <tr>
          <td>Pizza Margarita</td>
          <td>David</td>
          <td>22:30</td>
          <td>
            currnet status:
            <select name="" id="">
              <option value="accepted">In progress</option>
              <option value="accepted">Ready</option>
              <option value="accepted">Refunded</option>
              <option value="accepted">anyStatus</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Tiramisu</td>
          <td>David</td>
          <td>22:36</td>
          <td>
            currnet status:
            <select name="" id="">
              <option value="accepted">In progress</option>
              <option value="accepted">Ready</option>
              <option value="accepted">Refunded</option>
              <option value="accepted">anyStatus</option>
            </select>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default ProducerOrderView;
