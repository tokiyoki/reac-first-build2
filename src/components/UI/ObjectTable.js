import './ObjectTable.scss';

export default function ObjectTable({ object, attributes }) {
  // State
  // Context
  // Methods
  console.log(attributes);
  console.log(object);
  // View
  return (
    <table className="ObjectTable">
      {
        attributes ?
          <tbody>
            {
              attributes.map((attribute) => {
                const value = typeof(object[attribute.key]) === "number" ? (object[attribute.key] === 1 ? "Completed" : "Not Completed") : object[attribute.key];
                
                return (
                  <tr key={attribute.key}>
                    <td className="left">{attribute.label}</td>
                    <td className="right">{value}</td>
                  </tr>
                )
              })
            }
          </tbody>
        : <tbody/>
      } 
    </table>
  );
}