import React from 'react';


class Card extends React.Component{  
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="card">
                    {!this.props.first && <span className="moveLeft" onClick={() => {this.props.moveLeft(this.props.index)}}> {"<"}</span>}
                    {this.props.cardText}
                    {!this.props.last && <span className="moveRight" onClick={() => {this.props.moveRight(this.props.index)}}> ></span>}                 
                </div>
            </div>
        )
    }
}

export default Card;