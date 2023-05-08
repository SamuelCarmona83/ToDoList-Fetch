import React, {useEffect, useState} from 'react';


const ToDoList = () => {
    
    const [inputValue, setInputValue] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {

        fetch('https://assets.breatheco.de/apis/fake/todos/user/carlosdlacoste', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log(resp.ok);
            console.log(resp.status);
            console.log(resp.text())
            return resp.json();
        })
        .then(data => {
            console.log(data);
            setTaskList(data)  // revisar nuevamente esta linea de codigo

            // data.map((element, index) => (
                            
            //     <li key={index} className="list-group-item d-flex justify-content-between">{element.label} {" "}
            //         <button type="button" onClick={() => handleDeleteTask(index)} className="btn-close" aria-label="Close"></button>
            //     </li>
        
            // ))  
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/carlosdlacoste', {
            method: "PUT",
            body: JSON.stringify(taskList),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            console.log(resp.ok); 
            console.log(resp.status); 
            console.log(resp.text()); 
            return resp.json(); 
        })
        .then(data => {
            console.log(data); 
            // setTaskList((taskList) => [...taskList, data]);
        })
        .catch(error => {
            console.log(error);
        });
    }, [taskList])

    const handleAddTask = (event) => {
        setInputValue(event.target.value);
        if(event.key == "Enter" && inputValue != ""){
            setTaskList([...taskList, {
                label: inputValue,
                done: false
            }]);
            // fetch('https://assets.breatheco.de/apis/fake/todos/user/carlosdlacoste', {
            //     method: "POST",
            //     body: JSON.stringify(taskList),
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // })
            // .then(resp => {
            //     console.log(resp.ok); 
            //     console.log(resp.status); 
            //     console.log(resp.text()); 
            //     return resp.json(); 
            // })
            // .then(data => {
            //     console.log(data); 
            // })
            // .catch(error => {
            //     console.log(error);
            // });
            event.target.value = "";
            setInputValue(event.target.value);
            setItemCount(itemCount + 1);
        }
    }

    const handleDeleteTask = (positionList) => {
        setTaskList(

            taskList.filter((taskList, taskIndex) => taskIndex != positionList)
        );
        setItemCount(itemCount - 1);
    }

    
    return (
        <>
            <div className='container'>
                <h1 className='text-center'>ToDo List with Fetch</h1>
                <div className="input-group mb-3">
                    <input type="text" onKeyUp={handleAddTask} className="form-control" placeholder="What do you need to do?" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <ul className="list-group">
                    {
                        taskList.length == 0 && <li className="list-group-item">No hay tareas pendientes</li>
                    }
                    {
                        taskList.length != 0 && taskList.map((element, index) => (
                            
                                <li key={index} className="list-group-item d-flex justify-content-between">{element.label} {" "}
                                    <button type="button" onClick={() => handleDeleteTask(index)} className="btn-close" aria-label="Close"></button>
                                </li>
                        
                        ))  
                    }
                    {
                        taskList.length != 0 && <li className="list-group-item">{itemCount}{" "}item left</li>
                    }
                </ul>
            </div>
        </>
    );

};

export default ToDoList;
