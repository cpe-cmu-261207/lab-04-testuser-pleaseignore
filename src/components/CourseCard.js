export const CourseCard = (props) => {
  // TODO: design HTML component that displays a course as a "card" on the webpage.
  return (<>
    <tr>
      <td>
      <p>วิชา : {props.n}</p>
      <p>เกรด : {props.g}</p>
      <p>หน่วยกิต: {props.c}</p>
      </td>
      <td>
        <button onClick ={()=>{
          props.del(props.n)
        }}>x</button>
      </td>
    </tr>
  </>);
};
