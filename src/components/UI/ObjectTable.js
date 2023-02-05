import './ObjectTable.scss';

export default function ObjectTable({ object, attributes }) {
  // State
  // Context
  // Methods
  // View
  return (
    <table className="ObjectTable">
      <tbody>
      {
        attributes 
          ?
          attributes.map((attribute) => {
            //console.log(typeof(object[attribute.key]));
            //console.log(object[attribute.key]);
            const value = typeof(object[attribute.key]) === "number" ? (object[attribute.key] === 1 ? "Completed" : "Not Completed") : object[attribute.key];
            //console.log(value);
            return (
              <tr key={attribute.key}>
                <td className="left">{attribute.label}</td>
                <td className="right">{value}</td>
              </tr>
            )
          })
          :
          ""
      } 
      </tbody>
    </table>
  );
}