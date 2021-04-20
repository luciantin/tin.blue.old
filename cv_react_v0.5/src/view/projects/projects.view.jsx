import React, {useState,useEffect} from "react";
import './projects.view.style.scss'

import ProjectBox from "../../component/projectBox/projectBox.component";


function log(){
    console.log("hello")
}

function Projects() {
    const [projects,setProjects]=useState([]);
    // const [gridCoord,setgridCoord]=useState([]); // TODO

    let gridCoordOffset = [[2,2],[2,2],[0,1],[0,0],[1,0],[1,3],[2,1],[3,0],[0,0],[0,0]]

    useEffect(()=>{
        let abortController = new AbortController();

        getData().then((projects) => {
            setProjects(projects)
            // projects.map((project, index) => {})
            // setgridCoord([0])
        });

        return () => { abortController.abort()}
    },[])

    let gridCoordStart = {
        row: 1,
        col: 1
    }

    return (
        <div className={"Background"} >

            <div className="ProjectBoardTop">
                {
                    projects.map((project, index) => {
                        if(index%2!==0) return;
                        else return <div
                            key={index}
                            style={{
                                gridArea:`${gridCoordStart.row + gridCoordOffset[index][0]}/${gridCoordStart.col + gridCoordOffset[index][1]}/${gridCoordStart.row+1  + gridCoordOffset[index][0]}/${gridCoordStart.col+1 + gridCoordOffset[index][1]}`,
                                pointerEvents: "none"
                            }}>
                                <ProjectBox
                                    onClick={log}
                                    pname={project.pname}
                                    pdesc={"tst"}
                                    pgit={"http://google.com"}
                                    plink={"http://google.com"}
                                    tstack={["tst", "tst"]}
                                    isWip={true}
                                />
                        </div>
                    })
                }
            </div>

            <div className="ProjectBoardBot">
                {
                    projects.map((project, index) => {
                        if(index%2===0) return;
                        else return <div
                            key={index}
                            style={{
                                gridArea:`${gridCoordStart.row + gridCoordOffset[index][0]}/${gridCoordStart.col + gridCoordOffset[index][1]}/${gridCoordStart.row+1  + gridCoordOffset[index][0]}/${gridCoordStart.col+1 + gridCoordOffset[index][1]}`,
                                pointerEvents: "none"
                            }}>
                            <ProjectBox
                                onClick={log}
                                pname={project.pname}
                                pdesc={"tst"}
                                pgit={"http://google.com"}
                                plink={"http://google.com"}
                                tstack={["tst", "tst"]}
                                isWip={true}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    );

}

const getData=()=>{
    return fetch('projects.json',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then(function(response){
        // console.log(response)
        return response.json();
    })
}

export default Projects;