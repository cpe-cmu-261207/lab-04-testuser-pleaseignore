import { useState } from "react";
import { CourseCard } from "./components/CourseCard";
function App() {
  const grade = [{g:"A",v:4}, {g:"B+",v:3.5}, {g:"B",v:3}
                 , {g:"C+",v:2.5}, {g:"C",v:2}, {g:"D+",v:1.5}
                 , {g:"D",v:1}, {g:"F",v:0}, {g:"W",v:-1}];
  const credit = [1, 2, 3];

  const [myCourses, setMyCourse] = useState([]);
  const [inputData, setInputData] = useState({name:"",grade:"",val:0,cred:0});
  const [GPA, setGPA] = useState(0.0);

  /**
   * Calculate the GPA of current courses
   * @returns the GPA of current courses
   */
  function calculateGPA(course) {
    // TODO
    var gpa = 0
    var cred = 0
    course.forEach(c => {
      if(c.grade !== "W"){
        gpa += Number(c.val) *Number(c.cred)
        cred += Number(c.cred)
      }      
    });
    gpa = Number(gpa)/ Number(cred)
    if(gpa > 0.00){
      setGPA(gpa)
    }else{
      setGPA(0.00)
    }
  }

  /**
   * Should be called when a course is to be added to the list.
   * After adding the course to the list, the displayed GPA should be updated.
   * @param {*} event
   */
  function addCourse(event) {
    event.preventDefault();
    // TODO
    const course = [...myCourses,inputData]
    setMyCourse(course)
    // recalculate GPA
    calculateGPA(course);
  }

  /**
   * Should be called when a course is to be removed from the list.
   * After removing the course from the list, the displayed GPA should be updated.
   * @param {*} id
   */
  function onDeleteCourse(id) {
    // TODO
    const remain = myCourses.filter((course)=>{
      return course.name !== id
    })
    setMyCourse(remain)
    calculateGPA(remain)
  }

  return (
    <div className="container mx-auto h-screen">
      <h1 className="text-center text-4xl p-3 tracking-widest">
        GPA CALCULATOR
      </h1>
      <div className="h-2/3 md:w-2/4 p-3 rounded-lg mx-auto overflow-auto">
        <h1 className="text-2xl my-3">My courses</h1>
        {/* TODO display courses */}
        {myCourses.map((course)=>{
          return (<CourseCard n= {course.name} g={course.grade} c={course.cred} del={onDeleteCourse} />)
        })}
      </div>
      {/* TODO add course input form */}
      <form onSubmit = {(e)=>{
        addCourse(e)
      }}>
        <input  placeholder="Subject name or code " onChange ={(e)=>{
          setInputData({...inputData,name:e.currentTarget.value})
        }}></input>
        <select onChange = {(e) => {
          setInputData({...inputData,val:e.currentTarget.value,
                        grade:e.currentTarget.options[e.currentTarget.selectedIndex].text})
        }}>
          <option></option>
          {grade.map((obj)=>{
            return (<option value={obj.v}>{obj.g}</option>)
          })}
        </select>
        <select onChange ={(e) => {
          setInputData({...inputData,cred:e.currentTarget.value})
        }}>
        {credit.map((obj)=>{
            return (<option value={obj}>{obj}</option>)
          })}
        </select>
        <button type="submit">add</button>
      </form>
      {/* TODO display calculated GPA */}
      <h1>{GPA.toFixed(2)}</h1>
    </div>
  );
}

export default App;
