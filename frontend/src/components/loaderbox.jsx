import "../scss/_loaderMaintr.scss"


export default function Loader() {
    return (
      <div className="TheMainLoader">
        <table>
          <tbody>
            {[...Array(10)].map((_, rowIndex) => (
              <tr key={rowIndex}> 
                {[...Array(14)].map((_, cellIndex) => (
                  <td key={cellIndex}></td> 
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  