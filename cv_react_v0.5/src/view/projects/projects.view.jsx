import React from "react";
import './projects.view.style.scss'

import ProjectBox from "../../component/projectBox/projectBox.component";

function log(){
    console.log("hello")
}

function Projects() {

    getData()

    let gridCoord = {
        row: 2,
        col: 2
    }

    return (
        <div className={"Background"} >
            {/*<p className={"Title"}>{"Title"}</p>*/}
            <div className="ProjectBoardTop">
                <div
                    style={{
                        gridArea:`${gridCoord.row}/${gridCoord.col}/${gridCoord.row+1}/${gridCoord.col+1}`,
                        pointerEvents: "none"
                    }}
                >
                    <ProjectBox
                        onClick={log}
                        pname={"tst"}
                        pdesc={"tst"}
                        pgit={"http://google.com"}
                        plink={"http://google.com"}
                        tstack={["tst", "tst"]}
                        isWip={true}
                    />
                </div>
            </div>
            <div className="ProjectBoardBot">
                <div
                    style={{
                        gridArea:`${gridCoord.row}/${gridCoord.col}/${gridCoord.row+1}/${gridCoord.col+1}`,
                        pointerEvents: "none"
                    }}
                >
                    <ProjectBox
                        onClick={log}
                        pname={"tst"}
                        pdesc={"tst"}
                        pgit={"http://google.com"}
                        plink={"http://google.com"}
                        tstack={["tst", "tst"]}
                        isWip={true}
                    />
                </div>
            </div>
        </div>
    );

}

const getData=()=>{
    fetch('projects.json',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
        });
}

export default Projects;