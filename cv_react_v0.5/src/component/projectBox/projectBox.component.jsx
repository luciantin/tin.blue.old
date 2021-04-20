import React from 'react'

import './projectBox.component.style.scss'

import paper1 from './../../assets/projects/projectBoxBackground/paper1.svg'
function log(){
    console.log("hello")
}
// Input :
//  - pname - project name
//  - pdesc - project description
//  - pgit - project git link (if exists)
//  - plink - project web link (if exists)
//  - tstack - projects tech stack, list of tech from json
//  - isWip - is project still WIP

function ProjectBox({pname, pdesc, pgit, plink, tstack, isWip}) {
    return (
        <div
            style={{ backgroundImage: `url(${paper1})` }}
            className={"ProjectBox"}
            onClick={log}
        >
            <h1>{pname}</h1>
            <p>{pdesc}</p>
            <a href={pgit}/>
            <a href={plink}/>
            <p>{tstack}</p>
            <p>{isWip ? "WIP" : null}</p>
        </div>
    );
}

export default ProjectBox;